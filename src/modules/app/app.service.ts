import { Injectable, Request } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import * as pdf from 'html-pdf';
import * as moment from 'moment';
import * as fs from 'fs';
import * as paths from 'path';
import Handlebars from 'handlebars';
import { SalaryService } from '../salary/salary.service';
import { SendgridService } from '../../mail/sendgrid.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private salariesService: SalaryService,
    private sendgridService: SendgridService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  // convert html to pdf
  htmlToPdfBuffer(pathname, params) {
    const templateStr = fs
      .readFileSync(
        paths.resolve(__dirname, '../../../../templates/salarySlip.hbs'),
      )
      .toString('utf8');
    const template = Handlebars.compile(templateStr, { noEscape: true });
    const html = template(params);
    return new Promise((resolve, reject) => {
      // get previous month
      pdf
        .create(html)
        .toFile(
          `./templates/salary-slip/${params.currentMonth}-${params.currentYear}/${params.employeeId}.pdf`,
          (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res.filename);
            }
          },
        );
    });
  }

  // get employee salary and save pdf in salary slip folder [cron job function]
  async salaryToPdf(req): Promise<any> {
    const employees = await this.prisma.employees.findMany({
      where: { deletedAt: null },
    });
    await employees.map(async (emp) => {
      const where = { employee_id: Number(emp.id) };
      const monthName = moment().subtract(1, 'month').format('MMM');
      const currantMonth = moment().subtract(1, 'month').format('M');
      const salary = await this.salariesService.getEmpSalarySlip(
        where,
        req,
        monthName,
        currantMonth,
      );
      if (salary === null) return;
      const filePath = await this.htmlToPdfBuffer(
        '../../../templates/salaryCert.hbs',
        salary,
      );
    });
  }

  // send mails
  async salaryMailCronJob(): Promise<any> {
    const response = await this.prisma.employees.findMany({
      where: { deletedAt: null },
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true,
            companies: {
              select: {
                company_name: true,
              },
            },
          },
        },
      },
    });
    response.map(async (emp) => {
      const { firstName, lastName } = emp.users;
      const { company_name } = emp.users.companies[0];
      await this.sendgridService.mailSend(
        emp.id,
        emp.work_email,
        firstName,
        lastName,
        company_name,
      );
    });
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // 0 8 1 */1 *          // send mail
  // 0 0 1 */1 *          // salary to pdf
  // @Timeout(1000)
  // async handleCron() {
  //   await this.salaryMailCronJob();
  // }

  // Get Current Employees Salaries to Convert Pdf Cron Job
  @Cron('0 0 1 */1 *') // send mail month first date 12:00 am
  async handleSalaryCronJob(@Request() req) {
    await this.salaryToPdf(req);
  }
  //
  // // Get Employees find salary file and send mail Cron Job
  @Cron('0 8 1 */1 *') // send mail month first date 8:00 am
  async handleMailCronJob() {
    await this.salaryMailCronJob();
  }
}
