import {
  IsArray,
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { clients, Client_Type } from '@prisma/client';
import { UpdateAddressDTO } from '../addresses/addresses.dto';

export class ClientsDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: clients[];
}

export class CreateClientsDTO {
  @ApiProperty()
  @IsString()
  client_name: string;

  @ApiProperty({ default: Client_Type.COMPANY, required: false })
  @IsEnum(Client_Type)
  client_type: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  work_email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contact_number: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  website: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  gstin: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  address: UpdateAddressDTO;
}

export class UpdateClientsDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  client_name: string;

  @ApiProperty({ default: Client_Type.COMPANY, required: false })
  @IsEnum(Client_Type)
  client_type: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contact_number: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  gstin: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  work_email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  website: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  address: UpdateAddressDTO;
}
