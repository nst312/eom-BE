import { Module } from '@nestjs/common';
import { ResumeMasterController } from './resume-master.controller';
import { ResumeMasterService } from './resume-master.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ResumeMasterController],
  providers: [ResumeMasterService, PrismaService],
})
export class ResumeMasterModule {}
