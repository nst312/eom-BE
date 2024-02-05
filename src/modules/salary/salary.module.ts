import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';
import { SendgridService } from '../../mail/sendgrid.service';
import { LeavesMasterService } from '../leaves-master/leaves-master.service';

@Module({
  controllers: [SalaryController],
  providers: [
    SalaryService,
    LeavesMasterService,
    PrismaService,
    SendgridService,
  ],
})
export class SalaryModule {}
