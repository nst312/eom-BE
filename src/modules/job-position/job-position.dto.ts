import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { job_position } from '@prisma/client';

export class CreateJobPositionDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  jobPosition: string;

  @IsNotEmpty()
  companyDepartmentId: number;
}

export class JobPositionDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: job_position[];
}
