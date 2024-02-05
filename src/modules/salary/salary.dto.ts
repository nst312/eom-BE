import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsEmail } from 'class-validator';
import { salaries, salary_history } from '@prisma/client';

export class SalaryDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: salaries[];
}

export class SalaryHistoryDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: salary_history[];
}

export class CreateSalaryDTO {
  @ApiProperty()
  @IsNotEmpty()
  month: string;

  @ApiProperty()
  @IsNotEmpty()
  hra: number;

  @ApiProperty()
  @IsNotEmpty()
  specialAllowance: number;

  @ApiProperty()
  @IsNotEmpty()
  basic: number;

  @ApiProperty()
  @IsNotEmpty()
  conveyance: number;

  @ApiProperty()
  @IsNotEmpty()
  medical: number;

  @ApiProperty()
  @IsNotEmpty()
  gross: number;

  @ApiProperty()
  @IsNotEmpty()
  professionalTax: number;

  @ApiProperty()
  @IsNotEmpty()
  tds: number;

  @ApiProperty()
  @IsNotEmpty()
  leave: number;
}

export class SalarySlipDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
