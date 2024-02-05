import { Module } from '@nestjs/common';
import { expenseController } from './expense.controller';
import { PrismaService } from '../prisma/prisma.service';
import { expenseService } from './expense.service';
import { UserService } from '../user/user.service';

@Module({
  providers: [expenseService, PrismaService, UserService],
  controllers: [expenseController],
})
export class ExpenseModule {}
