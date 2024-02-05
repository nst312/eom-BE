import { Module } from '@nestjs/common';
import { BankDetailsController } from './bankDetails.controller';
import { BankDetailsService } from './bankDetails.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BankDetailsController],
  providers: [PrismaService, BankDetailsService],
})
export class BankDetailsModule {}
