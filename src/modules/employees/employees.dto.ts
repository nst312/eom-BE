import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { employees } from '@prisma/client';

export class EmployeeDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: EmployeesDTO[];
}

export class EmployeesDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  personal_email: string;

  @ApiProperty()
  createdAt: Date;
}

export class UpdateEmployeeDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  employee_code: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  middleName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  personal_email: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  work_email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone2: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birth_date: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  joining_date: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar_url: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  jobPositionId: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  resume: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  empType: string;
}
