import { document, Document_Type, invoices } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class EmployeeDocDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: document[];
}

export class createDocDTO {
  @ApiProperty({ enum: Document_Type })
  @IsNotEmpty()
  @IsEnum(Document_Type)
  type: Document_Type;

  @ApiProperty()
  @IsString()
  docNumber: String;

  @ApiProperty()
  @IsString()
  useFor: String;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  path: Express.Multer.File;
}
// export class updateDocDto extends PartialType(createDocDTO) {}

export class updateDocDto {
  @ApiProperty({ enum: Document_Type })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Document_Type)
  type: Document_Type;

  @ApiProperty()
  @IsOptional()
  @IsString()
  docNumber: String;

  @ApiProperty()
  @IsOptional()
  @IsString()
  useFor: String;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  path: Express.Multer.File;
}
