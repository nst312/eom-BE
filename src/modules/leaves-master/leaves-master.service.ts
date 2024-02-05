import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  leave_history,
  Leave_Status,
  Leave_Type,
  leaves,
  users,
} from '@prisma/client';
import * as moment from 'moment';
import { EmployeeLeavesDTO, LeavesDTO } from './leaves-master.dto';
import { SendgridService } from '../../mail/sendgrid.service';
import * as fs from 'fs';
import * as paths from 'path';
import Handlebars from 'handlebars';
import { SuccessMessageDTO } from '../posts/post.dto';
import { orderBy } from 'lodash';
import { EMP_LEAVE_TYPES } from '../../shared/constants/global.constants';

@Injectable()
export class LeavesMasterService {
  constructor(
    private prisma: PrismaService,
    private sendgridService: SendgridService,
  ) {}

  async createLeave(body, user): Promise<leaves> {
    // get employee using userId
    const emp = await this.prisma.employees.findUnique({
      where: {
        userId: user.id,
      },
    });
    const fromDate = moment(body.start).format('DD/MM/YYYY');
    const toDate = moment(body.end).format('DD/MM/YYYY');
    const appliedLeaves = await this.prisma.leaves.findMany({
      where: {
        employeeId: Number(emp.id),
      },
    });

    //checking leave is already applied or not
    if (appliedLeaves.length > 0) {
      for (let i = 0; i < appliedLeaves.length; i++) {
        const startDate = moment(appliedLeaves[i].start).format('DD/MM/YYYY');
        const endDate = moment(appliedLeaves[i].end).format('DD/MM/YYYY');
        if (
          fromDate == startDate ||
          fromDate == endDate ||
          toDate == startDate ||
          toDate == endDate ||
          (startDate > fromDate && endDate < toDate)
        ) {
          throw new BadRequestException(
            'leave is already applied for this date',
          );
        }
      }
    }

    const getLeaveType = () => {
      if (Leave_Type.SICK_LEAVE === body.leaveType) {
        return Leave_Type.SICK_LEAVE;
      } else if (Leave_Type.PAID_LEAVE === body.leaveType) {
        return Leave_Type.PAID_LEAVE;
      } else {
        return Leave_Type.UN_PAID_LEAVE;
      }
    };

    const checkDate =
      moment(new Date()).format('DD/MM/YYYY') <= fromDate &&
      moment(new Date()).format('DD/MM/YYYY') < toDate;
    if (!checkDate) {
      throw new BadRequestException({
        message: 'please enter valid date.',
      });
    } else {
      const data = {
        leaveType: getLeaveType(),
        start: body.start,
        end: body.end,
        durationCount: body.durationCount,
        description: body.description,
        status: Leave_Status.APPLIED,
        reason: '',
        employeeId: Number(emp.id),
      };

      const response = await this.prisma.leaves.create({
        data,
      });

      await this.prisma.leave_history.create({
        data: {
          leaveId: response.id,
          status: 'CREATED',
          reason: response.reason,
          userId: user.id,
        },
      });

      return response;
    }
  }

  async getEmpLeaveList(user): Promise<leaves[]> {
    return this.prisma.leaves.findMany({
      where: { employeeId: user.employee_id },
    });
  }

  //Get Current Employee Leave Count
  async getEmpLeaveCount(employeeId, m, y): Promise<{ leaveCount: number }> {
    const firstDay = new Date(y, m - 1, 1);
    const lastDay = new Date(y, m, 0);
    try {
      const leaveCountSum = await this.prisma.leaves.groupBy({
        by: ['employeeId'],
        where: {
          employeeId,
          updatedAt: {
            gte: firstDay,
            lt: lastDay,
          },
          deletedAt: null,
        },
        _sum: {
          durationCount: true,
        },
      });
      const leaveCount = leaveCountSum[0]._sum.durationCount;
      return { leaveCount };
    } catch (err) {
      return { leaveCount: 0 };
    }
  }

  //Update Leave
  async updateLeave(body, where, user): Promise<leaves> {
    await this.prisma.leaves.findUnique({ where });

    const getLeaveType = () => {
      if (Leave_Type.SICK_LEAVE === body.leaveType) {
        return Leave_Type.SICK_LEAVE;
      } else if (Leave_Type.PAID_LEAVE === body.leaveType) {
        return Leave_Type.PAID_LEAVE;
      } else {
        return Leave_Type.UN_PAID_LEAVE;
      }
    };
    // check from date
    const fromDate = moment(body.start).format('DD/MM/YYYY');
    const toDate = moment(body.end).format('DD/MM/YYYY');
    const checkFromDate = body.start
      ? moment(new Date()).format('DD/MM/YYYY') <= fromDate
      : true;
    const checkToDate = body.end
      ? moment(new Date()).format('DD/MM/YYYY') <= toDate
      : true;
    if (!checkFromDate || !checkToDate) {
      throw new BadRequestException({
        message: 'please enter valid date.',
      });
    } else {
      const data = {
        ...body,
        leaveType: getLeaveType(),
        // status: Leave_Status.APPROVED,
      };
      const response = await this.prisma.leaves.update({
        where,
        data,
      });
      delete response.deletedAt;

      await this.prisma.leave_history.create({
        data: {
          leaveId: response.id,
          status: 'EDITED',
          reason: response.reason,
          userId: user.id,
        },
      });

      return response;
    }
  }

  // Get All Leaves Record
  async getAllLeave(
    searchKey: string,
    page,
    perPage,
    user: users & { company_id: number },
  ): Promise<LeavesDTO> {
    const company_id = user.company_id;
    if (searchKey) {
      const leavesCount = await this.prisma.leaves.count({
        where: {
          OR: [
            {
              description: { contains: `${searchKey}` },
            },
            {
              reason: { contains: `${searchKey}` },
            },
            {
              employees: {
                users: {
                  displayName: { contains: `${searchKey}` },
                  role: 'EMPLOYEE',
                  companies: {
                    every: {
                      id: company_id,
                    },
                  },
                },
              },
            },
          ],
          deletedAt: null,
        },
      });
      const response = await this.prisma.leaves.findMany({
        skip: perPage * (page - 1),
        take: perPage,
        where: {
          OR: [
            {
              description: { contains: `${searchKey}` },
            },
            {
              reason: { contains: `${searchKey}` },
            },
            {
              employees: {
                users: {
                  displayName: { contains: `${searchKey}` },
                  role: 'EMPLOYEE',
                  companies: {
                    every: {
                      id: company_id,
                    },
                  },
                },
              },
            },
          ],
          deletedAt: null,
        },
        include: {
          employees: {
            select: {
              users: {
                select: {
                  displayName: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { count: leavesCount, data: response };
    } else {
      const leavesCount = await this.prisma.leaves.count({
        where: {
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
          deletedAt: null,
        },
      });
      const response = await this.prisma.leaves.findMany({
        skip: perPage * (page - 1),
        take: perPage,
        where: {
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
          deletedAt: null,
        },
        include: {
          employees: {
            select: {
              users: {
                select: {
                  displayName: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { count: leavesCount, data: response };
    }
  }

  // Approved Leave
  async changeLeaveStatus(where, status, reason, user): Promise<leaves> {
    await this.getByIdLeave(where);
    if (status === Leave_Status.APPROVED) {
      const response = await this.prisma.leaves.update({
        where,
        data: {
          status: Leave_Status.APPROVED,
          reason: reason,
        },
      });
      await this.prisma.leave_history.create({
        data: {
          leaveId: response.id,
          userId: user.id,
          status: 'APPROVED',
          reason: response.reason,
        },
      });
      return response;
    }
    if (status === Leave_Status.REJECT) {
      const response = await this.prisma.leaves.update({
        where,
        data: {
          status: Leave_Status.REJECT,
          reason: reason,
        },
      });
      await this.prisma.leave_history.create({
        data: {
          leaveId: response.id,
          userId: user.id,
          status: 'REJECTED',
          reason: response.reason,
        },
      });
      return response;
    }
  }

  //update leave mail

  async requestLeave(body, where): Promise<SuccessMessageDTO> {
    try {
      const leaveResponse = await this.prisma.leaves.findUnique({
        where,
        include: {
          employees: {
            select: {
              users: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      console.log('leaveResponse', leaveResponse);

      const userFirstName = leaveResponse.employees.users.firstName;
      const userLastName = leaveResponse.employees.users.lastName;
      const userEmail = leaveResponse.employees.users.email;

      // const username = firstName + ' ' + lastName;

      const payload = {
        userFirstName,
        userLastName,
        leaveType: leaveResponse.leaveType,
        startDate: moment(leaveResponse.start).format('LLL'),
        endDate: moment(leaveResponse.end).format('LLL'),
        duration: leaveResponse.durationCount,
        Description: leaveResponse.description,
        message: body.message,
      };

      const templateStr = fs
        .readFileSync(
          paths.resolve(__dirname, '../../../../templates/leaveRequest.hbs'),
        )
        .toString('utf8');
      console.log('templateStr', templateStr);
      const template = Handlebars.compile(templateStr, { noEscape: true });
      const html = template(payload);

      const mail = {
        to: userEmail,
        subject: 'Request to Change.',
        from: process.env.SENDGRID_EMAIL_ADDRESS,
        html: html,
      };
      await this.sendgridService.sendMail(mail);
      return { message: 'Request Send Successfully.' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  //get by id Leave
  async getByIdLeave(where): Promise<leaves> {
    try {
      const response = await this.prisma.leaves.findUnique({ where });
      if (response.deletedAt !== null)
        throw new NotFoundException('Leave Record not found.');
      delete response.deletedAt;
      return response;
    } catch (err) {
      throw new NotFoundException('Leave Record not found.');
    }
  }

  async deleteLeave(where, user): Promise<LeavesDTO | leaves> {
    await this.getByIdLeave(where);
    const data = await this.prisma.leaves.update({
      where,
      data: {
        deletedAt: new Date(),
        status: Leave_Status.CANCELLED,
      },
    });
    await this.prisma.leave_history.create({
      data: {
        leaveId: data.id,
        userId: user.id,
        status: 'CANCELLED',
        reason: data.reason,
      },
    });
    return data;
  }

  // Get All Leaves History Record
  async getLeaveHistory(where): Promise<leave_history[]> {
    return await this.prisma.leave_history.findMany({
      where,
      include: {
        users: {
          select: {
            firstName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  //Add dynamic leave
  async createEmployeeLeave(id, data): Promise<EmployeeLeavesDTO> {
    try {
      const response = await this.prisma.dynamic_leave.create({
        data: {
          ...data,
          employeeId: id.id,
        },
      });
      return response;
    } catch (err) {
      throw new NotFoundException('employee not found.');
    }
  }

  //Get dynamic leave
  async getDynamicLeave(where): Promise<EmployeeLeavesDTO> {
    console.log('empId', where);
    try {
      const response = await this.prisma.dynamic_leave.findFirst({
        where,
        orderBy: {
          updatedAt: 'desc',
        },
      });
      return response;
    } catch (err) {
      throw new NotFoundException('Employee not found.');
    }
  }

  //Update dynamic leave
  async updateDynamicLeave(where, data): Promise<EmployeeLeavesDTO> {
    const response = await this.prisma.dynamic_leave.update({
      where,
      data,
    });
    return response;
  }

  //Mail for admin
  async mailForAdmin(data) {
    const employ = await this.prisma.employees.findUnique({
      where: {
        id: data.employeeId,
      },
      include: {
        jobPosition: true,
        users: {
          select: {
            firstName: true,
            lastName: true,
            role: true,
            email: true,
            companies: {
              select: {
                company_name: true,
                email: true,
              },
            },
          },
        },
      },
    });
    // console.log(employ.users)
    const companyName = employ.users.companies[0].company_name;
    const companyEmail = employ.users.companies[0].email;
    const firstName = employ.users.firstName;
    const lastName = employ.users.lastName;
    const designation = employ.jobPosition.jobPosition;
    const leaveType = EMP_LEAVE_TYPES[data.leaveType];
    const strDate = moment(data.start).format('DD/MM/YYYY');
    const endDate = moment(data.end).format('DD/MM/YYYY');
    const leaveCount = data.durationCount;
    const description = data.description;
    const payload = {
      companyName,
      firstName,
      lastName,
      designation,
      leaveType,
      strDate,
      endDate,
      leaveCount,
      description,
    };

    const templateStr = fs
      .readFileSync(
        paths.resolve(__dirname, '../../../../templates/adminLeaveMail.hbs'),
      )
      .toString('utf8');

    const template = Handlebars.compile(templateStr, { noEscape: true });
    const html = template(payload);
    const mail = {
      to: companyEmail,
      subject: 'Request to Approve Leave.',
      from: process.env.SENDGRID_EMAIL_ADDRESS,
      html: html,
    };
    return this.sendgridService.sendMail(mail);
  }
}
