import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeeManagerController } from './employee-manager.controller';
import { EmployeesManagerService } from './employee-manager.service';
import { EmployeesService } from '../employees/employees.service';

@Module({
  controllers: [EmployeeManagerController],
  providers: [EmployeesManagerService, PrismaService, EmployeesService],
  exports: [EmployeesManagerService],
})
export class EmployeeManagerModule {}
