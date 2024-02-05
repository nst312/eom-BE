import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { expense, Expense_Status } from '@prisma/client';
import { GetExpenseDTO } from './expense.dto';
import { UserService } from '../user/user.service';
import { SuccessMessageDTO } from '../posts/post.dto';

@Injectable()
export class expenseService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async createExpense(user, body): Promise<expense> {
    await this.userService.findById({ id: user.id });
    return this.prisma.expense.create({
      data: {
        expenseDate: body.expenseDate,
        description: body.description,
        path: body.path,
        category: { connect: { id: Number(body.categoryId) } },
        companies: { connect: { id: Number(user.company_id) } },
        submittedAmount: Number(body.submittedAmount),
        status:
          user.role === 'CEO'
            ? Expense_Status.APPROVED
            : Expense_Status.PENDING,
      },
    });
  }

  async getExpenseById(id, user) {
    await this.userService.findById({ id: user.id });
    const result = await this.prisma.expense.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (result.status === Expense_Status.REJECTED) {
      throw new BadRequestException('expense already rejected.');
    }
    if (result.deletedAt !== null) {
      throw new BadRequestException('expense not found.');
    }
    return result;
  }

  async getAllExpense(user): Promise<GetExpenseDTO> {
    await this.userService.findById({ id: user.id });
    const count = await this.prisma.expense.count({
      where: {
        deletedAt: null,
        company_id: user.company_id,
      },
    });

    const data = await this.prisma.expense.findMany({
      where: {
        deletedAt: null,
        company_id: user.company_id,
      },
      include: {
        category: {
          select: {
            category: true,
          },
        },
      },
    });

    return { count, data };
  }

  async updateExpense(body, id, user): Promise<expense> {
    await this.getExpenseById(id, user);
    const categoryId = body.categoryId
      ? { connect: { id: Number(body.categoryId) } }
      : undefined;

    return this.prisma.expense.update({
      where: { id: Number(id) },
      data: {
        expenseDate: body.expenseDate,
        description: body.description,
        path: body.path,
        category: categoryId,
        submittedAmount: Number(body.submittedAmount),
        status: Expense_Status.PENDING,
      },
    });
  }

  async deleteExpense(id, user): Promise<SuccessMessageDTO> {
    await this.userService.findById({ id: user.id });
    await this.prisma.expense.update({
      where: {
        id: Number(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return { message: 'Expense deleted successfully.' };
  }

  async approvedExpense(id, body, user): Promise<SuccessMessageDTO> {
    const expense = await this.getExpenseById(id, user);
    const result = body.approvedAmount <= expense.submittedAmount;
    if (result === false) {
      throw new BadRequestException('approved amount should not be higher. ');
    }
    const data = {
      actionDate: new Date(),
      approvedAmount: body.approvedAmount,
      status: Expense_Status.APPROVED,
      actionById: user.id,
    };
    console.log('data', data);
    await this.prisma.expense.update({ where: { id: Number(id) }, data });
    return { message: 'Expense approved successfully.' };
  }

  async rejectedExpense(id, reason, user): Promise<SuccessMessageDTO> {
    await this.getExpenseById(id, user);
    await this.prisma.expense.update({
      where: { id: Number(id) },
      data: {
        actionDate: new Date(),
        rejectReason: reason.rejectReason,
        status: Expense_Status.REJECTED,
        actionById: user.id,
      },
    });
    return { message: 'Expense rejected.' };
  }

  async paidExpense(id, user): Promise<SuccessMessageDTO> {
    const expense = await this.getExpenseById(id, user);
    if (expense.status === Expense_Status.PENDING) {
      throw new BadRequestException('Expense not approved.');
    }
    await this.prisma.expense.update({
      where: {
        id: Number(id),
      },
      data: {
        payoutDate: new Date(),
        status: Expense_Status.PAID,
      },
    });
    return { message: 'Expense paid successfully. ' };
  }
}
