import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { employeeManager } from '@prisma/client';

export class allEmpManagerDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: employeeManager[];
}

export class createEmpManagerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  managerId: number;
}

export class updateEmpManagerDto extends PartialType(createEmpManagerDto) {}
