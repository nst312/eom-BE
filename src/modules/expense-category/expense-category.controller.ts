import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { ExpenseCategoryService } from './expense-category.service';
import { expense_category, Role } from '@prisma/client';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import {
  CreateExpenseDTO,
  ExpenseDTO,
  UpdateExpenseDTO,
} from './expense-category.dto';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PERMISSION } from '../../shared/constants/permission.constants';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Expense Category')
@Controller('expense-category')
export class ExpenseCategoryController {
  constructor(private expenseCategoryService: ExpenseCategoryService) {}

  //Create Expense
  @SetMetadata('permission', [PERMISSION.CAN_EXPENSE_CATEGORY_ADD])
  @Post('add/:companyId')
  @ApiOperation({ summary: 'Add Expense Category' })
  @ApiOkResponse({ type: CreateExpenseDTO })
  async addExpense(
    @Param('companyId') company_id: number,
    @Body() body: CreateExpenseDTO,
  ): Promise<expense_category> {
    return this.expenseCategoryService.addExpense(Number(company_id), body);
  }

  //Update Expense
  @SetMetadata('permission', [PERMISSION.CAN_EXPENSE_CATEGORY_UPDATE])
  @Put('update/:id')
  @ApiOperation({ summary: 'Update Expense Category' })
  @ApiBody({ type: UpdateExpenseDTO })
  async updateExpense(
    @Param('id') id: number,
    @Body() body: UpdateExpenseDTO,
  ): Promise<expense_category | UpdateExpenseDTO> {
    return this.expenseCategoryService.updateExpense(Number(id), body);
  }

  //Get All Expense
  @SetMetadata('permission', [PERMISSION.CAN_EXPENSE_CATEGORY_LIST])
  @Get()
  @ApiQuery({ type: 'search', required: false })
  @ApiOperation({ summary: 'Get All Expense Category' })
  async getAllExpense(
    @Query('search') search: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
  ): Promise<ExpenseDTO> {
    return this.expenseCategoryService.getAllExpense(
      search,
      Number(page),
      Number(perPage),
    );
  }

  //Delete Expense
  @Delete(':id')
  @SetMetadata('permission', [PERMISSION.CAN_EXPENSE_CATEGORY_DELETE])
  @ApiOperation({ summary: 'Delete Expense Category' })
  @ApiOkResponse({ type: 'Expense Category successfully Deleted' })
  async deleteExpense(
    @Param('id') id: number,
  ): Promise<expense_category | SuccessMessageDTO> {
    return this.expenseCategoryService.deleteExpense({ id: Number(id) });
  }
}
