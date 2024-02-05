import { Module } from '@nestjs/common';
import { CompaniesService } from '../companies/companies.service';
import { PrismaService } from '../prisma/prisma.service';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService, PrismaService, UserService],
})
export class AddressesModule {}
