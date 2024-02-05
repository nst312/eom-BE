import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';
import { SuccessResponse } from '../../shared/types/SuccessResponse';

export class CreateAddressDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  street1: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  street2: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  city_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  state_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  zip: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  country_id: number;
}

export class UpdateAddressDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  street1: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  street2: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  city_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  state_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  zip: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  country_id: number;
}

export class AddressResponseDTO extends SuccessResponse {
  data?: CreateAddressDTO;
}
