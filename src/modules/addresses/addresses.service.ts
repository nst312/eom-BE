import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { addresses, users } from '@prisma/client';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AddressResponseDTO } from './addresses.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AddressesService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async store(data, userId): Promise<AddressResponseDTO> {
    const where = { id: Number(userId) };
    await this.userService.findUser(where);
    await this.prisma.users.update({
      where,
      data: {
        addresses: {
          create: [data],
        },
      },
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'address created',
    };
  }

  async findOne(where, userId): Promise<addresses> {
    try {
      await this.userService.findUser(userId);
      const response = await this.prisma.users.findUnique({
        where: {
          id: userId.id,
        },
        include: {
          addresses: {
            where: {
              id: where.id,
              deletedAt: null,
            },
          },
        },
      });
      if (response.addresses.length < 1) {
        throw new NotFoundException('Address not found.');
      } else {
        const result = await this.prisma.addresses.findUnique({
          where,
        });
        return result;
      }
    } catch (err) {
      throw new BadRequestException('Address not found.');
    }
  }

  async findAll(userId): Promise<addresses[]> {
    try {
      await this.userService.findUser(userId);
      const response = await this.prisma.users.findUnique({
        where: userId,
        include: {
          addresses: {
            where: {
              deletedAt: null,
            },
            orderBy: {
              id: 'asc',
            },
          },
        },
      });
      return response.addresses;
    } catch (err) {
      throw new BadRequestException(err.message || 'Address not found.');
    }
  }

  async updateOne(addressId, meId, data): Promise<addresses> {
    try {
      const response = await this.findOne(addressId, meId);
      if (response) {
        return this.prisma.addresses.update({
          where: addressId,
          data,
        });
      }
    } catch (err) {
      throw new BadRequestException(err.message || 'Address not found.');
    }
  }

  async deleteOne(addressId, meId): Promise<SuccessMessageDTO> {
    try {
      const response = await this.findOne(addressId, meId);
      if (response) {
        await this.prisma.addresses.update({
          where: addressId,
          data: {
            deletedAt: new Date(),
          },
        });
        return { message: 'User Address Successfully Deleted.' };
      }
    } catch (err) {
      throw new BadRequestException('Address not found.');
    }
  }
}
