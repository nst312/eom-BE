import { Module } from '@nestjs/common';
import { CompanyPolicyService } from './company-policy.service';
import { PrismaService } from '../prisma/prisma.service';
import { CompanyPolicyController } from './company-policy.controller';

@Module({
  controllers: [CompanyPolicyController],
  providers: [CompanyPolicyService, PrismaService],
})
export class CompanyPolicyModule {}
