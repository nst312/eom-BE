import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { companies, users } from '@prisma/client';
import { CompaniesDTO, UpdateCompanyDTO } from './companies.dto';
import { SuccessMessageDTO } from '../posts/post.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  // async createCompanies(
  //   item: CreateCompanyDTO,
  //   user: users,
  // ): Promise<companies | CreateCompanyDTO> {
  //   const payload = {
  //     company_name: item.company_name,
  //     phone: item.phone,
  //     email: item.email,
  //     website: item.website,
  //     gstin: item.gstin,
  //     company_registry: item.company_registry,
  //     createdById: user.id,
  //   };
  //
  //   return await this.prisma.companies.create({
  //     data: {
  //       ...payload,
  //       addresses: {
  //         create: item.address,
  //       },
  //     },
  //   });
  // }

  async getAllCompanies(
    where,
    page: number,
    perPage: number,
  ): Promise<CompaniesDTO> {
    const count = await this.prisma.companies.count({ where });
    const response = await this.prisma.companies.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      where,
      include: {
        addresses: {
          where,
          select: {
            name: true,
            street1: true,
            street2: true,
            state: true,
            city: true,
            zip: true,
            country: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    response.forEach((el) => {
      delete el.deletedAt;
    });
    return {
      count,
      data: response,
    };
  }

  async getCompany(user: users): Promise<companies> {
    try {
      const userCompany: users = await this.userCompany({
        id: Number(user.id),
      });
      const company_id = userCompany['companies'][0].id;
      if (userCompany.id !== user.id)
        throw new ForbiddenException('No permission!');
      const response = await this.prisma.companies.findUnique({
        where: { id: company_id },
        include: {
          addresses: {
            // where: {
            //   deletedAt: null,
            // },
            select: {
              name: true,
              street1: true,
              street2: true,
              state: true,
              city: true,
              zip: true,
              country: true,
              id: true,
            },
          },
        },
      });
      // if (response.deletedAt) {
      //   throw new BadRequestException('Company not found.');
      // }
      delete response.deletedAt;
      return response;
    } catch (e) {
      throw new BadRequestException('Company not found.');
    }
  }

  async updateCompany(
    where,
    fileName,
    data,
    user: users,
  ): Promise<companies | UpdateCompanyDTO> {
    const userCompany: users = await this.userCompany({ id: Number(user.id) });
    const company_id = userCompany['companies'][0].id;
    if (where.id !== company_id)
      throw new NotFoundException('Company not found.');
    if (userCompany.id !== user.id)
      throw new ForbiddenException('No permission!');
    const payload = {
      ...data,
      company_logo: fileName,
    };

    const response = await this.prisma.companies.update({
      where,
      data: payload,
    });
    delete response.deletedAt;
    return response;
  }

  async deleteCompany(
    where,
    user: users,
  ): Promise<SuccessMessageDTO | companies> {
    const userCompany: users = await this.userCompany({ id: Number(user.id) });
    const company_id = userCompany['companies'][0].id;
    if (where.id !== company_id)
      throw new NotFoundException('Company not found.');
    if (userCompany.id !== user.id)
      throw new ForbiddenException('No permission!');
    await this.prisma.companies.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
    return { message: 'Company successfully Deleted' };
  }

  async findCompany(where): Promise<companies> {
    try {
      const response = await this.prisma.companies.findUnique({
        where,
        include: {
          users: true,
        },
      });
      // if (response.deletedAt) {
      //   throw new BadRequestException('Company not found.');
      // }
      return response;
    } catch (e) {
      throw new BadRequestException('Company not found.');
    }
  }

  async userCompany(where): Promise<users> {
    try {
      return await this.prisma.users.findUnique({
        where,
        include: {
          companies: {
            select: {
              id: true,
              company_name: true,
              addresses: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });
    } catch (e) {
      throw new ForbiddenException('No permission!');
      return e;
    }
  }
}
