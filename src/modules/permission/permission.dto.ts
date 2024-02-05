import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class PermissionDTO {
  @ApiProperty()
  role: Role;

  @ApiProperty()
  permissions: any[];
}

export class UpdatePermissionDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  permission: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isPermission: boolean;
}
