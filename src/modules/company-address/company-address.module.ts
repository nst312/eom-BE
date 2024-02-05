import { Module } from '@nestjs/common';
import { CompanyAddressController } from './company-address.controller';
import { CompanyAddressService } from './company-address.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CompanyAddressController],
  providers: [CompanyAddressService, PrismaService],
})
export class CompanyAddressModule {}
