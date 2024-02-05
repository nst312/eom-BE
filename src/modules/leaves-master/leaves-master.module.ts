import { Module } from '@nestjs/common';
import { LeavesMasterController } from './leaves-master.controller';
import { LeavesMasterService } from './leaves-master.service';
import { PrismaService } from '../prisma/prisma.service';
import { SendgridService } from '../../mail/sendgrid.service';

@Module({
  controllers: [LeavesMasterController],
  providers: [LeavesMasterService, PrismaService, SendgridService],
  exports: [LeavesMasterService],
})
export class LeavesMasterModule {}
