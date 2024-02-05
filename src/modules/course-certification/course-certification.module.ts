import { Module } from '@nestjs/common';
import { CourseCertificationService } from './course-certification.service';
import { PrismaService } from '../prisma/prisma.service';
import { CourseCertificationController } from './course-certification.controller';
import { EmployeesService } from '../employees/employees.service';

@Module({
  providers: [CourseCertificationService, PrismaService, EmployeesService],
  controllers: [CourseCertificationController],
})
export class CourseCertificationModule {}
