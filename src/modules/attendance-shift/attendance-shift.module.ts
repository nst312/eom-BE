import { Module } from '@nestjs/common';
import { AttendanceShiftController } from './attendance-shift.controller';
import { AttendanceShiftService } from './attendance-shift.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { EmployeesService } from '../employees/employees.service';

@Module({
  controllers: [AttendanceShiftController],
  providers: [
    AttendanceShiftService,
    PrismaService,
    UserService,
    EmployeesService,
  ],
})
export class AttendanceShiftModule {}
