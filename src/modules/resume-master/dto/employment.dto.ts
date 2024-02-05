import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { IsYearValidation } from './custom-validation.dto';

export class EmploymentDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  position: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  employer: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  startMonth: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  startYear: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  endMonth: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Validate(IsYearValidation, ['startYear'])
  endYear: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
