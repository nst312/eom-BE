import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SkillDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  level: number;
}

export class LanguageDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  level: number;
}

export class HobbyDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  hobby: string;
}

export class CertificateDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  certificate: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  month: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  year: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
