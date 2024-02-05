import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { expense_category } from '@prisma/client';

export class ExpenseDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: expense_category[];
}

export class CreateExpenseDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;
}

export class UpdateExpenseDTO {
  @ApiProperty()
  category: string;
}
