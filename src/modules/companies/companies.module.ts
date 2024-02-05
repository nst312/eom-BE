import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { PrismaService } from '../prisma/prisma.service';
import { DepartmentsService } from './departments.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, PrismaService, DepartmentsService],
})
export class CompaniesModule {}
