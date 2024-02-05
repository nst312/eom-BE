import { Module } from '@nestjs/common';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [StatesController],
  providers: [StatesService, PrismaService],
})
export class StatesModule {}
