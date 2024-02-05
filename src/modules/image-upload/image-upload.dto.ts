import { ApiProperty } from '@nestjs/swagger';

export class ImageUploadDto {
  @ApiProperty()
  fileName: string;

  @ApiProperty()
  fileType: string;
}
