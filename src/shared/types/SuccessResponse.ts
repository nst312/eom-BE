import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SuccessResponse {
  @ApiProperty()
  @IsNumber()
  statusCode: HttpStatus;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  data?: any;
}

export type ErrorResponse = {
  statusCode: typeof HttpStatus;
  error: string[];
  message: string;
};
