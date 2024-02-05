import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DepartmentsMasterController } from './departments-master.controller';
import { DepartmentsMasterService } from './departments-master.service';

@Module({
  controllers: [DepartmentsMasterController],
  providers: [PrismaService, DepartmentsMasterService],
})
export class DepartmentsMasterModule {}
