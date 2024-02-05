import { Module } from '@nestjs/common';
import { InvitationsController } from './invitations.controller';
import { InvitationsService } from './invitations.service';
import { PrismaService } from '../prisma/prisma.service';
import { CompaniesService } from '../companies/companies.service';
import { SendgridService } from '../../mail/sendgrid.service';

@Module({
  imports: [],
  controllers: [InvitationsController],
  providers: [
    InvitationsService,
    PrismaService,
    CompaniesService,
    SendgridService,
  ],
})
export class InvitationsModule {}
