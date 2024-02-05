import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  attendance,
  employees,
  job_position,
  Role,
  users,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeeDTO } from './employees.dto';
import { SuccessMessageDTO } from '../posts/post.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async getEmployees(
    searchKey: string,
    page: number,
    perPage: number,
    user: users & { company_id: number },
  ): Promise<EmployeeDTO> {
    const company_id = user.company_id;
    const count = await this.prisma.employees.count({
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
    });
    // if (searchKey) {
    //   searchKey = `*${searchKey}*`;
    //   const data = await this.prisma.employees.findMany({
    //     skip: perPage * (page - 1),
    //     take: perPage,
    //     where: {
    //       deletedAt: null,
    //       OR: {
    //         work_email: {
    //           search: `${searchKey}`,
    //         },
    //         personal_email: {
    //           search: `${searchKey}`,
    //         },
    //         phone: {
    //           search: `${searchKey}`,
    //         },
    //         users: {
    //           // role: 'EMPLOYEE',
    //           companies: {
    //             every: {
    //               id: company_id,
    //             },
    //           },
    //           OR: {
    //             firstName: {
    //               search: searchKey,
    //             },
    //             lastName: {
    //               search: searchKey,
    //             },
    //             middleName: {
    //               search: searchKey,
    //             },
    //             displayName: {
    //               search: searchKey,
    //             },
    //             email: {
    //               search: searchKey,
    //             },
    //           },
    //         },
    //       },
    //     },
    //     select: {
    //       id: true,
    //       userId: true,
    //       users: {
    //         select: {
    //           firstName: true,
    //           lastName: true,
    //           middleName: true,
    //           displayName: true,
    //           avatar_url: true,
    //         },
    //       },
    //       jobPosition: {
    //         select: {
    //           id: true,
    //           jobPosition: true,
    //           companyDepartmentId: true,
    //           company_department: true,
    //         },
    //       },
    //       attendanceRules: {
    //         select: {
    //           attendance: {
    //             select: {
    //               id: true,
    //               shiftInTime: true,
    //               shiftOutTime: true,
    //               durationCount: true,
    //             },
    //           },
    //         },
    //       },
    //       personal_email: true,
    //       phone: true,
    //       work_email: true,
    //       employee_code: true,
    //       joining_date: true,
    //       createdAt: true,
    //     },
    //     orderBy: {
    //       createdAt: 'desc',
    //     },
    //   });
    //   return { count, data };
    // }
    // else {
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
        jobPosition: {
          select: {
            id: true,
            jobPosition: true,
            companyDepartmentId: true,
            company_department: true,
          },
        },
        attendanceRules: {
          select: {
            attendance: {
              select: {
                id: true,
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
    // }
  }

  async getEmployee(
    where,
    user: users & { company_id: number },
  ): Promise<employees> {
    try {
      const company_id = user.company_id;
      const response = await this.prisma.employees.findUnique({
        where,
        include: {
          jobPosition: {
            select: {
              id: true,
              jobPosition: true,
              companyDepartmentId: true,
              company_department: true,
            },
          },
          users: {
            select: {
              firstName: true,
              lastName: true,
              middleName: true,
              displayName: true,
              avatar_url: true,
              companies: {
                select: {
                  id: true,
                },
              },
            },
          },
          addresses: {
            where: {
              deletedAt: null,
            },
            orderBy: {
              id: 'asc',
            },
          },
          bank_details: {
            where: {
              employeeId: user.id,
            },
          },
        },
      });
      // console.log(response);
      delete response.deletedAt;
      if (response.users.companies[0].id !== company_id) {
        throw new NotFoundException('Employee not found.');
      }
      if (user.role === Role.CEO) {
        return response;
      } else if (user.role === Role.EMPLOYEE && user.id === response.userId) {
        return response;
      } else {
        throw new ForbiddenException('No permission!');
      }
    } catch (err) {
      throw new NotFoundException('Employee not found.');
    }
  }

  async updateEmployee(where, user, data): Promise<employees> {
    console.log('data-----', data);
    await this.getEmployee(where, user);
    const response = await this.prisma.employees.update({
      where,
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true,
            middleName: true,
          },
        },
        jobPosition: {
          select: {
            id: true,
            companyDepartmentId: true,
            jobPosition: true,
            company_department: true,
          },
        },
      },
      data,
    });
    delete response.deletedAt;
    return response;
  }

  async deleteEmployee(where): Promise<SuccessMessageDTO> {
    const getEmployees = await this.prisma.employees.findMany({
      where: {
        id: {
          in: where,
        },
        deletedAt: null,
      },
    });

    const userIds = [];

    getEmployees.forEach((el) => {
      userIds.push(el.userId);
    });

    const response = await this.prisma.employees.updateMany({
      where: {
        id: {
          in: where,
        },
      },
      data: { deletedAt: new Date() },
    });

    const response1 = await this.prisma.users.updateMany({
      where: {
        id: {
          in: userIds,
        },
      },
      data: { deletedAt: new Date() },
    });

    if (!response) {
      throw new BadRequestException('Something went wrong!');
    }
    if (!response1) {
      throw new BadRequestException('Something went wrong!');
    }
    return { message: 'Employee successfully deleted' };
  }

  // async deleteEmployee(where, user): Promise<SuccessMessageDTO> {
  //   await this.getEmployee(where, user);
  //   await this.prisma.employees.update({
  //     where,
  //     data: {
  //       deletedAt: new Date(),
  //     },
  //   });
  //   return { message: 'Employee Successfully Deleted.' };
  // }
}
