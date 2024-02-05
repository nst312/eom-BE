import { BadRequestException, Injectable } from '@nestjs/common';
import {
  salaries,
  users,
  salary_history,
  department_master,
  clients,
} from '@prisma/client';
import * as moment from 'moment';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SalaryDTO, SalaryHistoryDTO } from './salary.dto';
import * as converter from 'number-to-words';
import { SendgridService } from '../../mail/sendgrid.service';
import * as fs from 'fs';
import * as paths from 'path';
import Handlebars from 'handlebars';
import * as pdf from 'html-pdf';
import { CommonHelpers } from '../../shared/helpers/common.helpers';
import { v4 as uuidv4 } from 'uuid';
import { PathLike } from 'fs';
import { startCase } from 'lodash';
import { LeavesMasterService } from '../leaves-master/leaves-master.service';
import { find } from 'rxjs/operators';

type StringFilter = {
  search: SearchFilter | string | number;
};

type SearchFilter = {
  query: string;
  mode: SearchFilterMode;
};

enum SearchFilterMode {
  NATURAL,
  BOOLEAN,
}

@Injectable()
export class SalaryService {
  constructor(
    private prisma: PrismaService,
    private sendgridService: SendgridService,
    private leaveService: LeavesMasterService,
  ) {}

  async createSalary(
    id,
    salaries,
    user: users & { company_id: number },
  ): Promise<salaries> {
    try {
      const company_id = user.company_id;

      await this.prisma.employees.findFirst({
        where: {
          id: id.id,
          deletedAt: null,
          users: {
            role: 'EMPLOYEE',
            companies: {
              every: {
                id: company_id,
              },
            },
          },
        },
      });
      return await this.prisma.salaries.create({
        data: {
          ...salaries,
          employee_id: id.id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getSalary(
    page: number,
    perPage: number,
    user: users & { company_id: number },
  ): Promise<SalaryDTO> {
    const company_id = user.company_id;
    const count = await this.prisma.salaries.count({
      where: {
        deletedAt: null,
        employees: {
          users: {
            role: 'EMPLOYEE',
            companies: {
              every: {
                id: company_id,
              },
            },
          },
        },
      },
    });
    const data = await this.prisma.salaries.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      where: {
        deletedAt: null,
        employees: {
          users: {
            companies: {
              every: {
                id: company_id,
              },
            },
          },
        },
      },
      include: {
        employees: {
          select: {
            users: {
              select: {
                firstName: true,
                lastName: true,
                id: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { count, data };
  }

  async getSalaryById(
    id,
    page: number,
    perPage: number,
    user: users & { company_id: number },
  ): Promise<SalaryDTO> {
    try {
      const company_id = user.company_id;
      await this.prisma.employees.findFirst({
        where: {
          id: id.id,
          deletedAt: null,
          users: {
            role: 'EMPLOYEE',
            companies: {
              every: {
                id: company_id,
              },
            },
          },
        },
      });
      const count = await this.prisma.salaries.count({
        where: {
          employee_id: id.id,
          deletedAt: null,
          employees: {
            users: {
              role: 'EMPLOYEE',
              companies: {
                every: {
                  id: company_id,
                },
              },
            },
          },
        },
      });
      const data = await this.prisma.salaries.findMany({
        skip: perPage * (page - 1),
        take: perPage,
        where: {
          deletedAt: null,
          employee_id: id.id,
          employees: {
            users: {
              companies: {
                every: {
                  id: company_id,
                },
              },
            },
          },
        },
        include: {
          employees: {
            select: {
              users: {
                select: {
                  firstName: true,
                  lastName: true,
                  id: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { count, data };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateSalaryDetails(
    id,
    salaries,
    user: users & { company_id: number },
  ): Promise<SuccessMessageDTO> {
    try {
      const company_id = user.company_id;
      const findSalaryData = await this.prisma.salaries.findFirst({
        where: {
          id: id.id,
          deletedAt: null,
          employees: {
            users: {
              companies: {
                every: {
                  id: company_id,
                },
              },
            },
          },
        },
        include: {
          employees: {
            select: {
              users: {
                select: {
                  companies: true,
                },
              },
            },
          },
        },
      });
      if (findSalaryData) {
        const createdDate = moment(findSalaryData.createdAt).format(
          'MM/DD/YYYY',
        );
        const newDate = moment(new Date()).format('MM/DD/YYYY');
        const compare = moment(createdDate).isSame(newDate, 'month');
        if (compare) {
          await this.prisma.salaries.update({
            where: id,
            data: salaries,
          });
          return { message: 'Salary details successfully updated' };
        } else {
          throw new BadRequestException(
            "You cannot update previous month's salary details",
          );
        }
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  htmlToPdfBuffer(html) {
    const options = {
      format: 'A4',
      type: 'pdf',
      orientation: 'portrait',
    };
    return new Promise((resolve, reject) => {
      // get previous month
      pdf
        .create(html, options)
        .toFile(`./templates/salary-slip/other/${uuidv4()}.pdf`, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.filename);
          }
        });
    });
  }

  async salaryHistory(result) {
    await this.prisma.salary_history.create({
      data: {
        salaryId: result.salaryId,
        employeeId: result.employeeId,
        name: result.name,
        type: result.empType,
        empCode: result.employee_code,
        company_logo: result.companyLogo,
        company_name: result.companyName,
        currentMonth: result.currentMonth,
        currentYear: result.currentYear,
        designation: result.jobPosition.jobPosition,
        department: result.jobPosition.company_department.department_name,
        bankName: result.bankName,
        IFSC: result.ifsc,
        totalDaysOfMonth: result.totalDaysOfMonth,
        joinDate: result.joining_date,
        netPayWord: result.netPayInWord,
        accNum: Number(result.accountNumber),
        panNum: result.pan,
        totalDeduction: result.totalDeduction,
        hra: result.hra,
        specialAllowance: result.specialAllowance,
        basic: result.basic,
        conveyance: result.conveyance,
        medical: result.medical,
        gross: result.gross,
        professionalTax: result.professionalTax,
        tds: result.tds,
        paidLeave: result.paidLeave,
        sickLeave: result.sickLeave,
        unPaidLeave: result.unPaidLeave,
        totalLeave: result.leaveCount,
        attendance: result.attendance,
        netPay: Number(result.finalSalary),
      },
    });
  }

  async getSalaryHistory(
    employeeId,
    searchKey: string,
    page: number,
    perPage: number,
    user,
    req,
  ): Promise<SalaryHistoryDTO> {
    const company_id = user.company_id;
    const search = !searchKey ? '' : searchKey;
    const count = await this.prisma.salary_history.count({
      where: {
        OR: [
          {
            name: { contains: `${search}` },
          },
          {
            department: { contains: `${search}` },
          },
          {
            designation: { contains: `${search}` },
          },
        ],
        employeeId,
        deletedAt: null,
        employees: {
          users: {
            role: 'EMPLOYEE',
            companies: {
              every: {
                id: company_id,
              },
            },
          },
        },
      },
    });
    const data = await this.prisma.salary_history.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      where: {
        employeeId,
        deletedAt: null,
        OR: [
          {
            name: { contains: `${search}` },
          },
          {
            department: { contains: `${search}` },
          },
          {
            designation: { contains: `${search}` },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { count, data };
  }

  async sendSalarySlip(
    salaryId,
    req,
    // user: users & { company_id: number },
  ): Promise<SuccessMessageDTO> {
    try {
      const result = await this.getEmpSalarySlip({ id: Number(salaryId) }, req);

      const templateStr = fs
        .readFileSync(
          paths.resolve(__dirname, '../../../../templates/salaryCert.hbs'),
        )
        .toString('utf8');
      const template = Handlebars.compile(templateStr, { noEscape: true });
      const html = template(result);

      // html to pdf
      const filePath = await this.htmlToPdfBuffer(html);

      // pdf convert to base 64
      const data_base64 = CommonHelpers.base64_encode(filePath);

      //greeting html
      const greetingTemplateStr = fs
        .readFileSync(
          paths.resolve(__dirname, '../../../../templates/greetings.hbs'),
        )
        .toString('utf8');
      const greetingTemplate = Handlebars.compile(greetingTemplateStr, {
        noEscape: true,
      });
      const greetingHtml = greetingTemplate(result.salaryGreetings);

      const mail = {
        to: result.email,
        subject: 'SalarySlip',
        from: process.env.SENDGRID_EMAIL_ADDRESS,
        html: greetingHtml,
        attachments: [
          {
            filename: `SalarySlip.pdf`,
            content: data_base64,
            type: 'application/pdf',
            disposition: 'attachment',
          },
        ],
      };
      await this.sendgridService.sendMail(mail);
      fs.unlinkSync(<PathLike>filePath);
      return { message: 'Salary slip successfully sent.' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  // Download Salary Certificate
  async downloadSalarySlip(salaryId, req): Promise<{ pdf: string }> {
    const data = await this.getEmpSalarySlip({ id: Number(salaryId) }, req);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data)

    const templateStr = fs
      .readFileSync(
        paths.resolve(__dirname, '../../../../templates/salaryCert.hbs'),
      )
      .toString('utf8');
    const template = Handlebars.compile(templateStr, { noEscape: true });
    const html = template(data);
    // html to pdf
    const filePath = await this.htmlToPdfBuffer(html);
    // pdf convert to base 64
    const data_base64 = CommonHelpers.base64_encode(filePath);
    return { pdf: data_base64 };
  }

  //Download Salary History
  async downloadSalaryHistory(historyId, req): Promise<{ pdf: string }> {
    const data = await this.getSalaryHistoryDetails(
      { id: Number(historyId) },
      req,
    );
    console.log("????????????????????????????????????????????????????????????????????", data)
    //
    // const data = await this.prisma.salary_history.findUnique({
    //   where: {
    //     id: Number(historyId),
    //   },
    // });

    const templateStr = fs
      .readFileSync(
        paths.resolve(__dirname, '../../../../templates/salarySlip.hbs'),
      )
      .toString('utf8');
    const template = Handlebars.compile(templateStr, { noEscape: true });
    const html = template(data);
    // html to pdf
    const filePath = await this.htmlToPdfBuffer(html);
    // pdf convert to base 64
    const data_base64 = CommonHelpers.base64_encode(filePath);
    return { pdf: data_base64 };
  }

  async getEmpSalarySlip(
    where,
    req,
    monthName = moment().format('MMM'),
    currantMonth = moment().format('M'),
  ): Promise<any> {
    try {
      const salaryResponse = await this.prisma.salaries.findFirst({
        where,
        include: {
          employees: {
            select: {
              empType: true,
              employee_code: true,
              joining_date: true,
              jobPosition: {
                select: {
                  jobPosition: true,
                  company_department: {
                    select: {
                      department_name: true,
                    },
                  },
                },
              },
              users: {
                select: {
                  firstName: true,
                  lastName: true,
                  createdAt: true,
                  email: true,
                  companies: true,
                  addresses: true,
                },
              },
              bank_details: {
                select: {
                  bankName: true,
                  accountNumber: true,
                  ifsc: true,
                  branch: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      if (!salaryResponse) {
        throw new BadRequestException('something went wrong');
      }

      const {
         professionalTax,
        hra,
        gross,
        tds,
        basic,
        conveyance,
        medical,
        specialAllowance,
        employee_id,
        createdAt,
        leave,
          month

      } = salaryResponse;
      const basicSalary = {
        professionalTax,
        hra,
        gross,
        tds,
        basic,
        conveyance,
        medical,
        specialAllowance,
        employee_id,
      };

      const { firstName, lastName, email, companies, addresses } =
        salaryResponse?.employees?.users;

      const { empType, employee_code, joining_date, jobPosition } =
        salaryResponse?.employees;

      const { bankName, accountNumber, ifsc, branch } =
        salaryResponse?.employees?.bank_details[0];

      const grossEarning =
        hra + specialAllowance + basic + conveyance + medical;

      const netSalary = (grossEarning * tds) / 100 ;
      // const live = grossEarning / 30 * this.leave

      const netTotal = grossEarning - netSalary - professionalTax;




      const displayName = `${firstName} ${lastName}`;
      const date = moment(salaryResponse.createdAt);
      // const start = moment(startDate).format('ll');
      const currantYear = date.format('YYYY');
      const currantMonthDays = date.daysInMonth();
      const joiningDate = moment(joining_date).format('DD-MM-YYYY');
      const companyName = companies[0]?.company_name;
      const companyLogo = companies[0]?.company_logo;
      const companyLogoPathUrl =
        req.protocol + '://' + req.get('host') + '/api/salaries/companyLogo/';
      const companyTagLine = companies[0]?.tag_line;
      const companyDepartment =
        jobPosition?.company_department?.department_name;

      const logoUrl =
        'https://ghanshyamdigital.com/static/6de43a8df9b3489401ee486860c09788/ff907/2cb1c28491ac235daedcdf5ba25e6f54.png';
      const companyAddresses =
        addresses.length >= 1
          ? `${addresses[0]?.street1}, 
          ${addresses[0]?.street2}, 
          ${addresses[0]?.city}, 
          ${addresses[0]?.zip}, 
          ${addresses[0]?.state}, 
          ${addresses[0]?.country}.`
          : '';

      // Leave Concept
      const { leaveCount } = await this.leaveService.getEmpLeaveCount(
        Number(employee_id),
        currantMonth,
        currantYear,
      );

      const data = await this.leaveService.getDynamicLeave({
        employeeId: Number(employee_id),
      });

      const paidLeave = data.paidLeave || 0;
      const sickLeave = data.sickLeave || 0;
      const unPaidLeave = data.unPaidLeave || 0;
      let paidAndSickLeave = 0;
      let attendance = currantMonthDays;
      paidAndSickLeave = paidLeave + sickLeave;
      const totalLeaveCount = leaveCount + data.unPaidLeave;
      // unPaidLeave =
      //   totalLeaveCount >= paidAndSickLeave
      //     ? totalLeaveCount - paidAndSickLeave
      //     : totalLeaveCount;
      attendance = attendance - unPaidLeave;

      const perDaySalary = grossEarning / 30;
      // const unPaidSalary = perDaySalary * unPaidLeave;
      const leaveAmount = Math.round( perDaySalary * leave);
      const finalSalaryData = netTotal - leaveAmount;
      const tdsAmount = (grossEarning *tds)/100

      const finalSalary = (finalSalaryData.toFixed(0));
      const totalDeduction = Math.round( professionalTax + tdsAmount +leaveAmount);
      const netSalaryCertificate = converter
          ?.toWords(finalSalary)
          .replace(/[^a-zA-Z ]/g, ' ');
      const totalDaysOfMonth = 30-leave

      const netPayInWord = converter
        ?.toWords(finalSalary)
        .replace(/[^a-zA-Z ]/g, ' ');

      // greetings
      const salaryGreetings = {
        companyName: companyName,
        currentMonth: currantMonth,
        month: month,
        currentYear: currantYear,
      };
      const payload = {
        email,
        companyName,
        salaryId: where.id,
        logoUrl,
        paidAndSickLeave,
        companyLogo,
        companyLogoPathUrl,
        name: displayName,
        employeeId: employee_id,
        companyAddresses,
        netSalaryCertificate,
        empType,
        month,
        employee_code,
        jobPosition,
        companyDepartment,
        companyTagLine,
        currentMonth: currantMonth,
        currentYear: currantYear,
        totalDays: currantMonthDays,
        joiningDate,
        ...basicSalary,
        grossEarning,
        finalSalary,
        totalDeduction,
        netTotal,
        netPayInWord,
        createdAt,
        bankName,
        accountNumber,
        ifsc,
        branch,
        leave,totalDaysOfMonth,
        leaveAmount,
        paidLeave,
        sickLeave,
        unPaidLeave,
        leaveCount: totalLeaveCount,
        attendance,
        joining_date,
        salaryGreetings,
      };
      await this.salaryHistory(payload);
      return payload;
    } catch (err) {
      console.log(err)
      throw new BadRequestException(
        'Please ensure the employee\'s details, including address and bank information, are filled before proceeding.',
      );
    }
  }

  async getSalaryHistoryDetails(where, req): Promise<any> {
    try {
      const response = await this.prisma.salary_history.findUnique({
        where,
      });
      const updateResponse = {
        ...response,
        company_logo:
          req.protocol +
          '://' +
          req.get('host') +
          '/api/salaries/companyLogo/' +
          response.company_logo,
        joinDate: moment(response.joinDate).format('L'),
      };
      return updateResponse;
    } catch (err) {
      throw new BadRequestException('Salary not found.');
    }
  }
}
