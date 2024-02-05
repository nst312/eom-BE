import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeesService } from '../employees/employees.service';

@Module({
  providers: [DocumentsService, PrismaService, EmployeesService],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
