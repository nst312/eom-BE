import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class postAnnounceDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsArray()
  data: postAnnouncementsDto[];
}

export class postAnnouncementsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  createdAt: Date;
}

export class createPostAnnouncementsDto {
  @ApiProperty()
  message: string;
}
