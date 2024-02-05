import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { attendance } from '@prisma/client';
import { SuccessMessageDTO } from '../posts/post.dto';
import { UserService } from '../user/user.service';
import { EmployeesService } from '../employees/employees.service';
import * as moment from 'moment';

@Injectable()
export class AttendanceShiftService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private employeesService: EmployeesService,
  ) {}

  async addAttendanceShift(id, data): Promise<attendance> {
    const startTime = moment(data.shiftInTime).format('HH:mm:ss a');
    const endTimess = moment(data.shiftOutTime).add(1, 'days');
    const ms = moment(endTimess, 'HH:mm:ss').diff(
      moment(startTime, 'HH:mm:ss'),
    );
    const d = moment.duration(ms);
    const hrs = d.hours();
    return this.prisma.attendance.create({
      data: {
        ...data,
        durationCount: hrs,
        company_id: id,
      },
    });
  }

  async getAllAttendanceShift(user): Promise<attendance[]> {
    return await this.prisma.attendance.findMany({
      where: {
        deletedAt: null,
        company_id: user.company_id,
      },
    });
  }

  async assignAttendanceRule(body, user): Promise<SuccessMessageDTO> {
    await this.userService.findById({ id: user.id });
    //check rule already assigned or not
    for (let e = 0; e < body.employee_id.length; e++) {
      const data = await this.getAssignAttendanceRule(
        user,
        body.employee_id[e],
      );
      const lr = data.map((el) => el.attendance_id);
      const found = body.attendance_id.some((r) => lr.includes(r));
      if (found === true) {
        throw new InternalServerErrorException(
          'Attendance rule already assigned',
        );
      }
    }
    //assign attendance rule
    try {
      for (let i = 0; i < body.attendance_id.length; i++) {
        for (let e = 0; e < body.employee_id.length; e++) {
          await this.prisma.attendanceRules.create({
            data: {
              attendance_id: body.attendance_id[i],
              employee_id: body.employee_id[e],
              company_id: user.company_id,
            },
          });
        }
      }
      return { message: 'Attendance rule assigned successfully' };
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async getAssignAttendanceRule(user, empId) {
    await this.employeesService.getEmployee({ id: Number(empId) }, user);
    return await this.prisma.attendanceRules.findMany({
      where: {
        employee_id: Number(empId),
        deletedAt: null,
      },
      include: {
        attendance: {
          select: {
            id: true,
            ruleName: true,
            Description: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async removeAssignAttendanceRule(
    user,
    empId,
    attendance_id,
  ): Promise<SuccessMessageDTO> {
    await this.userService.findById({ id: user.id });
    await this.prisma.attendanceRules.updateMany({
      where: {
        attendance_id: Number(attendance_id),
        employee_id: Number(empId),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return { message: ' assigned leave rule removed' };
  }

  async getCompanyEmployee(
    page: number,
    perPage: number,
    id,
    user,
  ): Promise<any> {
    const company_id = user.company_id;
    const count = await this.prisma.employees.count({
      where: {
        deletedAt: null,
        users: {
          // role: 'EMPLOYEE',
          companies: {
            every: {
              id: company_id,
            },
          },
        },
      },
    });
    await this.userService.findById({ id: user.id });
    const data = await this.prisma.employees.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      where: {
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
      select: {
        id: true,
        userId: true,
        users: {
          select: {
            firstName: true,
            lastName: true,
            middleName: true,
            displayName: true,
            avatar_url: true,
          },
        },
        empType: true,
        jobPosition: {
          select: {
            id: true,
            jobPosition: true,
            companyDepartmentId: true,
            company_department: true,
          },
        },
        employeeData: {
          select: {
            managerBy: {
              select: {
                users: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
        attendanceRules: {
          where: {
            deletedAt: null,
          },
          select: {
            attendance: {
              select: {
                id: true,
                ruleName: true,
                shiftInTime: true,
                shiftOutTime: true,
                durationCount: true,
              },
            },
          },
        },
        personal_email: true,
        phone: true,
        work_email: true,
        employee_code: true,
        joining_date: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { count, data };
  }

  async deleteAttendanceRule(id, user): Promise<SuccessMessageDTO> {
    await this.userService.findById({ id: user.id });
    const checkAttendanceRuleId = await this.prisma.attendanceRules.findMany({
      where: {
        attendance_id: Number(id),
        deletedAt: null,
      },
    });
    if (checkAttendanceRuleId.length > 0) {
      throw new BadRequestException('Attendance Rule is already in use');
    } else {
      await this.prisma.attendance.update({
        where: {
          id: Number(id),
        },
        data: {
          deletedAt: new Date(),
        },
      });
      return { message: 'Attendance Rule deleted successfully' };
    }
  }

  async updateAttendanceRule(where, data): Promise<attendance> {
    return await this.prisma.attendance.update({
      where: {
        id: where,
      },
      data,
    });
  }
}
