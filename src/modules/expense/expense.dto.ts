import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';
import { expense } from '@prisma/client';
import { createCourseDto } from '../course-certification/course-certification.dto';

export class GetExpenseDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: expense[];
}

export class CreateUserExpenseDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  expenseDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty()
  @IsNotEmpty()
  submittedAmount: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  path: Express.Multer.File;
}

export class UpdateUserExpenseDTO extends PartialType(CreateUserExpenseDTO) {}

export class approveExpenseDTO {
  @ApiProperty()
  @IsNotEmpty()
  approvedAmount: number;
}

export class rejectExpenseDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rejectReason: string;
}
