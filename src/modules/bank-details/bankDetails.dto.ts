import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Account_Type } from '@prisma/client';

export class BankDetailsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  bankName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  accountTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ifsc: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  branch: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ enum: Account_Type })
  @IsNotEmpty()
  @IsEnum(Account_Type)
  accountType: Account_Type;
}

export class UpdateBankDetailsDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  bankName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  accountTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ifsc: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  branch: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ enum: Account_Type })
  @IsNotEmpty()
  @IsEnum(Account_Type)
  accountType: Account_Type;
}
