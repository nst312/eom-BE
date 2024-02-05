import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { clients } from '@prisma/client';
import { ClientsDTO, CreateClientsDTO, UpdateClientsDTO } from './clients.dto';
import { SuccessMessageDTO } from '../posts/post.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async storeClients(
    fileName,
    data,
    user,
  ): Promise<CreateClientsDTO | clients> {
    let countryName;
    let stateName;
    let cityName;

    if (data.country_id !== '0') {
      countryName = await this.prisma.countries.findFirst({
        where: {
          id: Number(data.country_id),
        },
      });
    }

    if (data.state_id !== '0') {
      stateName = await this.prisma.states.findFirst({
        where: {
          id: Number(data.state_id),
        },
      });
    }

    if (data.city_id !== '0') {
      cityName = await this.prisma.cities.findFirst({
        where: {
          id: Number(data.city_id),
        },
      });
    }

    const addressObj = {
      name: data.name || 'permanent',
      street1: data.street1,
      street2: data.street2,
      zip: Number(data.zip) || null,
      country: countryName?.name || '',
      country_id: Number(data.country_id) || null,
      state: stateName?.name || '',
      city: cityName?.name || '',
      state_id: Number(data.state_id) || null,
      city_id: Number(data.city_id) || null,
    };

    const payload = {
      client_name: data.client_name,
      client_type: data.client_type,
      work_email: data.work_email,
      contact_number: data.contact_number,
      website: data.website,
      gstin: data.gstin,
      avatar_url: fileName,
      address: {
        create: addressObj,
      },
      companies: {
        connect: {
          id: user.company_id,
        },
      },
    };
    const response = await this.prisma.clients.create({
      data: payload,
      include: {
        address: true,
      },
    });

    // const updateResponse = {
    //   ...response,
    // };

    return response;
  }

  async showAllClients(
    where,
    searchKey: string,
    page,
    perPage,
    user,
  ): Promise<ClientsDTO> {
    const company_id = user.company_id;
    if (searchKey) {
      const count = await this.prisma.clients.count({
        where: {
          OR: [
            {
              client_name: { contains: `${searchKey}`, mode: 'insensitive' },
            },
            {
              work_email: { contains: `${searchKey}`, mode: 'insensitive' },
            },
          ],
          companies: {
            every: {
              id: company_id,
            },
          },
          deletedAt: null,
        },
      });
      const data = await this.prisma.clients.findMany({
        skip: perPage * (page - 1),
        take: perPage,
        where: {
          OR: [
            {
              client_name: { contains: `${searchKey}`, mode: 'insensitive' },
            },
            {
              work_email: { contains: `${searchKey}`, mode: 'insensitive' },
            },
          ],
          companies: {
            every: {
              id: company_id,
            },
          },
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { count, data };
    } else {
      const count = await this.prisma.clients.count({
        where: {
          companies: {
            every: {
              id: company_id,
            },
          },
          deletedAt: null,
        },
      });
      const data = await this.prisma.clients.findMany({
        skip: perPage * (page - 1),
        take: perPage,
        where: {
          companies: {
            every: {
              id: company_id,
            },
          },
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { count, data };
    }
  }

  async updateClients(
    fileName,
    where,
    data,
  ): Promise<UpdateClientsDTO | clients> {
    // check client exist or not
    await this.showClients(where);

    let countryName;
    let stateName;
    let cityName;

    if (data.country_id !== 'null') {
      countryName = await this.prisma.countries.findFirst({
        where: {
          id: Number(data.country_id),
        },
      });
    }

    if (data.state_id !== 'null') {
      stateName = await this.prisma.states.findFirst({
        where: {
          id: Number(data.state_id),
        },
      });
    }

    if (data.city_id !== 'null') {
      cityName = await this.prisma.cities.findFirst({
        where: {
          id: Number(data.city_id),
        },
      });
    }

    const addressObj = {
      name: data.name,
      street1: data.street1,
      street2: data.street2,
      zip: Number(data.zip) || null,
      country: countryName?.name || '',
      country_id: Number(data.country_id) || null,
      state: stateName?.name || '',
      city: cityName?.name || '',
      state_id: Number(data.state_id) || null,
      city_id: Number(data.city_id) || null,
    };

    const payload = {
      client_name: data.client_name,
      client_type: data.client_type,
      contact_number: data.contact_number,
      avatar_url: fileName,
      gstin: data.gstin,
      work_email: data.work_email,
      website: data.website,
    };

    const response = await this.prisma.clients.update({
      where,
      data: {
        ...payload,
        address: {
          update: {
            where: {
              id: Number(data.id),
            },
            data: addressObj,
          },
        },
      },
    });

    return response;
  }

  async deleteClients(where): Promise<SuccessMessageDTO> {
    // check client exist or not
    const response = await this.prisma.clients.updateMany({
      where: {
        id: {
          in: where,
        },
      },
      data: { deletedAt: new Date() },
    });
    if (!response) {
      throw new BadRequestException('Something went wrong!');
    }

    return { message: 'Client deleted successfully.' };
  }

  async showClients(where): Promise<clients> {
    try {
      const response = await this.prisma.clients.findUnique({
        where,
        include: {
          address: true,
        },
      });
      if (response.deletedAt !== null) {
        throw new BadRequestException('Client not found.');
      }
      delete response.deletedAt;
      const updateResponse = {
        ...response,
        address: response.address[0],
      };
      return updateResponse;
    } catch (err) {
      throw new BadRequestException('Client not found.');
    }
  }
}
