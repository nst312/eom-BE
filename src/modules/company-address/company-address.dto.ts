import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SuccessResponse } from '../../shared/types/SuccessResponse';

export class CreateCompanyAddressDTO {
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

export class UpdateCompanyAddressDTO {
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

export class AddressCompanyResponseDTO extends SuccessResponse {
  data?: CreateCompanyAddressDTO;
}
