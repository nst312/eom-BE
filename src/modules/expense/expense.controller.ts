import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { expenseService } from './expense.service';
import { expense, Role } from '@prisma/client';
import {
  approveExpenseDTO,
  CreateUserExpenseDTO,
  GetExpenseDTO,
  rejectExpenseDTO,
  UpdateUserExpenseDTO,
} from './expense.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveDocumentsToStorage } from '../image-upload/config';
import { PERMISSION } from '../../shared/constants/permission.constants';
import { SuccessMessageDTO } from '../posts/post.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('expense')
@Controller('expense')
export class expenseController {
  constructor(private expenseService: expenseService) {}

  @Post('')
  @ApiOperation({ summary: 'create Expense ' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('path', saveDocumentsToStorage))
  async createExpense(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateUserExpenseDTO,
    @Req() req,
  ): Promise<expense> {
    const data = { ...body, path: file?.filename };
    return this.expenseService.createExpense(req.user, data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'view expense by id' })
  async getExpenseById(@Param('id') id: number, @Req() req) {
    return await this.expenseService.getExpenseById(id, req.user);
  }

  @Get('')
  @ApiOperation({ summary: 'view all expense ' })
  async getAllExpense(@Req() req): Promise<GetExpenseDTO> {
    return await this.expenseService.getAllExpense(req.user);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'update expense by id' })
  @UseInterceptors(FileInterceptor('path', saveDocumentsToStorage))
  @ApiConsumes('multipart/form-data')
  updateExpense(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Body() body: UpdateUserExpenseDTO,
    @Req() req,
  ): Promise<expense> {
    const data = file ? { ...body, path: file.filename } : body;
    return this.expenseService.updateExpense(data, id, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete expense' })
  deleteDocument(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ): Promise<SuccessMessageDTO> {
    return this.expenseService.deleteExpense(id, req.user);
  }

  @Put(':id/approved')
  @ApiOperation({ summary: 'Expense Approved (Admin Only)' })
  @SetMetadata('permission', [PERMISSION.CAN_EXPENSE_APPROVED])
  @ApiBody({ type: approveExpenseDTO })
  async approvedExpense(
    @Req() req,
    @Param('id') id: number,
    @Body() body: approveExpenseDTO,
  ): Promise<SuccessMessageDTO> {
    return this.expenseService.approvedExpense(id, body, req.user);
  }

  @Put(':id/rejected')
  @ApiOperation({ summary: 'Expense rejected (Admin Only)' })
  @SetMetadata('permission', [PERMISSION.CAN_EXPENSE_REJECTED])
  @ApiBody({ type: rejectExpenseDTO })
  async rejectedExpense(
    @Req() req,
    @Param('id') id: number,
    @Body() reason: rejectExpenseDTO,
  ): Promise<SuccessMessageDTO> {
    return this.expenseService.rejectedExpense(id, reason, req.user);
  }

  @Put(':id/paid')
  @ApiOperation({ summary: 'Expense paid (Admin Only)' })
  @SetMetadata('permission', [PERMISSION.CAN_EXPENSE_PAID])
  async paidExpense(
    @Param('id') id: number,
    @Req() req,
  ): Promise<SuccessMessageDTO> {
    return this.expenseService.paidExpense(id, req.user);
  }
}
