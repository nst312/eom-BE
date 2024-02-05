import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddressCompanyResponseDTO } from './company-address.dto';
import { addresses, companies, users } from '@prisma/client';
import { SuccessMessageDTO } from '../posts/post.dto';

@Injectable()
export class CompanyAddressService {
  constructor(private prisma: PrismaService) {}

  async store(
    data,
    user: companies & { company_id: number },
  ): Promise<AddressCompanyResponseDTO> {
    const company_id = user.company_id;
    await this.prisma.companies.update({
      where: { id: company_id },
      data: {
        addresses: {
          create: [data],
        },
      },
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Company Address Created.',
    };
  }

  async findOne(where): Promise<any> {
    try {
      const response = await this.prisma.addresses.findUnique({
        where: {
          id: where.id,
        },
      });
      if (response.deletedAt)
        throw new BadRequestException('Address not found.');
      return response;
    } catch (err) {
      throw new BadRequestException('Address not found.');
    }
  }

  async findAll(user): Promise<addresses[]> {
    try {
      return this.prisma.addresses.findMany({
        where: {
          deletedAt: null,
          companies: {
            some: {
              id: Number(user.company_id),
            },
          },
        },
        orderBy: {
          id: 'asc',
        },
      });
    } catch (err) {
      throw new BadRequestException('Address not found.');
    }
  }

  async deleteOne(where): Promise<SuccessMessageDTO> {
    await this.findOne(where);
    await this.prisma.addresses.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
    return { message: 'Address successfully Deleted' };
  }

  async updateOne(where, data): Promise<addresses> {
    try {
      const response = await this.prisma.addresses.update({
        where,
        data,
      });
      delete response.deletedAt;
      return response;
    } catch (err) {
      throw new BadRequestException('Address not found.');
    }
  }
}
