import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProfileDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
