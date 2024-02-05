import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { leaves } from '@prisma/client';

export class LeavesDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: leaves[];
}

export class CreateLeave {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  leaveType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  end: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateLeave {
  @ApiProperty()
  @IsOptional()
  @IsString()
  leaveType: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  end: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  durationCount: number;
}

export class UpdateLeaveReason {
  @ApiProperty()
  @IsOptional()
  @IsString()
  reason: string;
}

export class LeaveRequestDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  message: string;
}

export class EmployeeLeavesDTO {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  paidLeave: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  unPaidLeave: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  sickLeave: number;
}
