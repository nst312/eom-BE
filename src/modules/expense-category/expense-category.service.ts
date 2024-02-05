import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { expense_category } from '@prisma/client';
import { SuccessMessageDTO } from '../posts/post.dto';
import { postAnnounceDto } from '../post-announcement/post-announcement.dto';
import { ExpenseDTO } from './expense-category.dto';

@Injectable()
export class ExpenseCategoryService {
  constructor(private prisma: PrismaService) {}

  async addExpense(id, data): Promise<expense_category> {
    return this.prisma.expense_category.create({
      data: {
        ...data,
        company_id: id,
      },
    });
  }

  async updateExpense(where, data): Promise<expense_category> {
    return await this.prisma.expense_category.update({
      where: {
        id: where,
      },
      data,
    });
  }

  async getAllExpense(
    searchKey: string,
    page: number,
    perPage: number,
  ): Promise<ExpenseDTO> {
    try {
      const count = await this.prisma.expense_category.count({
        where: {
          deletedAt: null,
        },
      });

      if (searchKey) {
        searchKey = `*${searchKey}*`;
        const data = await this.prisma.expense_category.findMany({
          skip: perPage * (page - 1),
          take: perPage,
          where: {
            deletedAt: null,
            OR: {
              category: {
                search: `${searchKey}`,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        return { count, data };
      } else {
        const data = await this.prisma.expense_category.findMany({
          skip: perPage * (page - 1),
          take: perPage,
          where: {
            deletedAt: null,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        return { count, data };
      }
    } catch (err) {
      throw new NotFoundException('Post announcement not found.');
    }
  }

  async deleteExpense(where): Promise<SuccessMessageDTO | expense_category> {
    await this.findExpense(where);
    await this.prisma.expense_category.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Expense deleted successfully.' };
  }

  async findExpense(where): Promise<expense_category> {
    try {
      const response = await this.prisma.expense_category.findUnique({
        where,
      });
      if (response.deletedAt)
        throw new BadRequestException('Expense not found.');
      return response;
    } catch (e) {
      throw new BadRequestException('Expense not found.');
    }
  }
}
