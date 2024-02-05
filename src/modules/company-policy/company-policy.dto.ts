import { ApiProperty, PartialType } from '@nestjs/swagger';
import { company_policy } from '@prisma/client';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class PolicyDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: company_policy[];
}

export class createPolicyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  path: Express.Multer.File;
}
export class updatePolicyDto extends PartialType(createPolicyDto) {}
