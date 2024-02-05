import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExpenseCategoryService } from './expense-category.service';
import { ExpenseCategoryController } from './expense-category.controller';

@Module({
  controllers: [ExpenseCategoryController],
  providers: [PrismaService, ExpenseCategoryService],
})
export class ExpenseCategoryModule {}
