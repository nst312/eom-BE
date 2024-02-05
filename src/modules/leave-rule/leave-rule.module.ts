import { Module, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LeaveRuleController } from './leave-rule.controller';
import { LeaveRuleService } from './leave-rule.service';
import { UserService } from '../user/user.service';
import { EmployeesService } from '../employees/employees.service';

@Module({
  providers: [LeaveRuleService, PrismaService, UserService, EmployeesService],
  controllers: [LeaveRuleController],
})
export class LeavesRuleModule {}
