import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeesService } from '../employees/employees.service';
import {
  createEmpManagerDto,
  updateEmpManagerDto,
} from './employee-manager.dto';

@Injectable()
export class EmployeesManagerService {
  constructor(
    private prisma: PrismaService,
    private employeesService: EmployeesService,
  ) {}

  async createEmpManager(body, user): Promise<createEmpManagerDto> {
    await this.employeesService.getEmployee(
      { id: Number(body.employeeId) },
      user,
    );
    const data = await this.prisma.employeeManager.findMany({
      where: {
        employeeId: Number(body.employeeId),
      },
    });
    if (data.length > 0) {
      throw new BadRequestException({
        error: "employee's manager already assigned",
      });
    }
    return this.prisma.employeeManager.create({
      data: {
        ...body,
        company_id: user.company_id,
      },
    });
  }

  async getAllEmpManager(user): Promise<any> {
    const mydata = await this.prisma.employeeManager.findMany({
      where: {
        deletedAt: null,
        company_id: user.company_id,
      },
      select: {
        employees: {
          select: {
            users: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
              },
            },
          },
        },
        managerBy: {
          select: {
            users: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
              },
            },
          },
        },
      },
    });
    const arr = [];
    for (let i = 0; i < mydata.length; i++) {
      const empId = mydata[i].employees.users.id;
      const empName = `${mydata[i].employees.users.firstName} ${mydata[i].employees.users.lastName}`;
      const empRole = mydata[i].employees.users.role;
      const parentId = mydata[i].managerBy.users.id;
      const managerName = `${mydata[i].managerBy.users.firstName} ${mydata[i].managerBy.users.lastName}`;
      const managerRole = mydata[i].managerBy.users.role;
      arr.push({
        empId,
        name: empName,
        nameRole: empRole,
        parentId,
        parent: managerName,
        parentRole: managerRole,
      });
    }

    arr.push({
      empId: user.id,
      name: user.firstName,
      nameRole: user.role,
      parentId: null,
      parent: '',
      parentRole: '',
    });

    return arr;
  }

  async getEmpManager(user, empId) {
    await this.employeesService.getEmployee({ id: Number(empId) }, user);
    return await this.prisma.employeeManager.findMany({
      where: {
        deletedAt: null,
        employeeId: Number(empId),
        company_id: user.company_id,
      },
      select: {
        id: true,
        managerId: true,
        employeeId: true,
        employees: {
          select: {
            users: {
              select: {
                firstName: true,
                lastName: true,
                role: true,
              },
            },
          },
        },
        managerBy: {
          select: {
            users: {
              select: {
                firstName: true,
                lastName: true,
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async updateEmpManager(id, data): Promise<updateEmpManagerDto> {
    return this.prisma.employeeManager.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async getEmployeeOfManager(user, manId): Promise<any> {
    await this.employeesService.getEmployee({ id: Number(manId) }, user);
    const count = await this.prisma.employeeManager.count({
      where: {
        deletedAt: null,
        managerId: Number(manId),
      },
    });
    if (count === 0) {
      return [];
    }
    const manager = await this.prisma.employeeManager.findFirst({
      where: {
        deletedAt: null,
        managerId: Number(manId),
      },
      select: {
        managerBy: {
          select: {
            users: {
              select: {
                firstName: true,
                lastName: true,
                displayName: true,
                role: true,
              },
            },
          },
        },
      },
    });

    const data = await this.prisma.employeeManager.findMany({
      where: {
        deletedAt: null,
        managerId: Number(manId),
      },
      select: {
        employees: {
          select: {
            users: {
              select: {
                firstName: true,
                lastName: true,
                role: true,
                displayName: true,
              },
            },
          },
        },
      },
    });
    return { count, manager, data };
  }
}
