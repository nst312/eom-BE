import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { companies } from '@prisma/client';
import { CreateAddressDTO } from '../addresses/addresses.dto';

export class CompaniesDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: companies[];
}

export class CreateCompanyDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(15)
  gstin: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  website: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  company_registry: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  address: CreateAddressDTO;
}

export class UpdateCompanyDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  company_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(15)
  gstin: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  website: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  company_registry: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  company_logo: string;
}
