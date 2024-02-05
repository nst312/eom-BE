import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../logger/logger.module';
import { GLOBAL_CONFIG } from '../../configs/global.config';
import { ConfigModule } from '@nestjs/config';
import { CompaniesModule } from '../companies/companies.module';
import { DepartmentsMasterModule } from '../departments-master/departments-master.module';
import { AddressesModule } from '../addresses/addresses.module';
import { InvitationsModule } from '../invitations/invitations.module';
import { CleanEnvironmentModule } from '../clean-environment.module';
import { EmployeesModule } from '../employees/employees.module';
import { SalaryModule } from '../salary/salary.module';
import { CountriesModule } from '../countries/countries.module';
import { StatesModule } from '../states/states.module';
import { CitiesModule } from '../cities/cities.module';
import { JobPositionModule } from '../job-position/job-position.module';
import { LeavesMasterModule } from '../leaves-master/leaves-master.module';
import { ImageUploadModule } from '../image-upload/image-upload.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { SalaryService } from '../salary/salary.service';
import { SendgridService } from '../../mail/sendgrid.service';
import { ClientsModule } from '../clients/clients.module';
import { BankDetailsModule } from '../bank-details/bankDetails.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { ResumeMasterModule } from '../resume-master/resume-master.module';
import { DocumentsModule } from '../documents/documents.module';
import { CourseCertificationModule } from '../course-certification/course-certification.module';
import { CompanyPolicyModule } from '../company-policy/company-policy.module';
import { CompanyAddressModule } from '../company-address/company-address.module';
import { WorksModule } from '../works/works.module';
import { PostAnnouncementModule } from '../post-announcement/post-announcement.module';
import { ExpenseCategoryModule } from '../expense-category/expense-category.module';
import { ExpenseModule } from '../expense/expense.module';
import { LeavesRuleModule } from '../leave-rule/leave-rule.module';
import { PermissionModule } from '../permission/permission.module';
import { EmployeeManagerModule } from '../employee-manager/employee-manager.module';
import { AttendanceShiftModule } from '../attendance-shift/attendance-shift.module';

const envFilePath = process.env.NODE_ENV === 'test' ? '.env.test' : undefined;

@Module({
  imports: [
    ScheduleModule.forRoot(),
    LoggerModule,
    PrismaModule,
    AuthModule,
    UserModule,
    PostsModule,
    CompaniesModule,
    DepartmentsMasterModule,
    AddressesModule,
    EmployeesModule,
    InvitationsModule,
    SalaryModule,
    CountriesModule,
    StatesModule,
    CitiesModule,
    JobPositionModule,
    LeavesMasterModule,
    ImageUploadModule,
    ClientsModule,
    InvoicesModule,
    BankDetailsModule,
    ResumeMasterModule,
    CompanyAddressModule,
    DocumentsModule,
    CourseCertificationModule,
    WorksModule,
    CompanyPolicyModule,
    PostAnnouncementModule,
    ExpenseCategoryModule,
    ExpenseModule,
    LeavesRuleModule,
    PermissionModule,
    EmployeeManagerModule,
    AttendanceShiftModule,
    CleanEnvironmentModule.forPredicate(
      envFilePath,
      () => process.env.NODE_ENV === 'test',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => GLOBAL_CONFIG],
      envFilePath: envFilePath,
      cache: true,
      ignoreEnvVars: process.env.NODE_ENV === 'test',
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, SalaryService, SendgridService],
  exports: [],
})
export class AppModule {}
