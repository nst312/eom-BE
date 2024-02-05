import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { PrismaService } from '../prisma/prisma.service';
import { SendgridService } from '../../mail/sendgrid.service';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, PrismaService, SendgridService],
})
export class InvoicesModule {}
