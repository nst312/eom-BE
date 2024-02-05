import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorksController } from './works.controller';
import { WorksService } from './works.service';

@Module({
  controllers: [WorksController],
  providers: [WorksService, PrismaService],
  exports: [WorksService],
})
export class WorksModule {}
