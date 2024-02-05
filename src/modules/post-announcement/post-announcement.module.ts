import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostAnnouncementController } from './post-announcement.controller';
import { PostAnnouncementService } from './post-announcement.service';

@Module({
  controllers: [PostAnnouncementController],
  providers: [PostAnnouncementService, PrismaService],
})
export class PostAnnouncementModule {}
