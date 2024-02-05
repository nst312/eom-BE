import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { bank_details } from '@prisma/client';

@Injectable()
export class BankDetailsService {
  constructor(private prisma: PrismaService) {}

  async addBankDetails(employeeId, data): Promise<bank_details> {
    // console.log("data",data, id)
    return this.prisma.bank_details.create({
      data: {
        ...data,
        employeeId,
      },
    });
  }

  async updateBankDetails(where, data): Promise<bank_details> {
    const response = await this.prisma.bank_details.update({
      where: {
        id: where.id,
      },
      data,
    });
    return response;
  }

  async getBankDetails(where): Promise<bank_details> {
    try {
      const response = await this.prisma.bank_details.findFirst({
        where,
        orderBy: { createdAt: 'desc' },
      });
      return response;
    } catch (err) {
      throw new NotFoundException('Bank details not found.');
    }
  }
}
