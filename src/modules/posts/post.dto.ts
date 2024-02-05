import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { posts } from '@prisma/client';

export class PostsDTO {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: posts[];
}

export class CreatePostDTO {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;
}

export class UpdateDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}

export class MakeRatingBodyDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  feedback?: string;
}

export class SuccessMessageDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
