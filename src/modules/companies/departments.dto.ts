import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { company_departments } from '@prisma/client';

export class DepartmentsDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: company_departments[];
}

export class CreateDepartmentDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  department_name: string;
}

export class UpdateDepartmentDTO {
  @ApiProperty()
  department_name: string;
}
