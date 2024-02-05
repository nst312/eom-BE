import { Module } from '@nestjs/common';
import { ImageUploadController } from './image-upload.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ImageUploadController],
  providers: [PrismaService],
})
export class ImageUploadModule {}
