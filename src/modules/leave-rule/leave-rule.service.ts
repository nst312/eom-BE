import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { leave_rules, users } from '@prisma/client';
import { UserService } from '../user/user.service';
import { GetLeaveRuleDto } from './leave-rule.dto';
import { SuccessMessageDTO } from '../posts/post.dto';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class LeaveRuleService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private employeesService: EmployeesService,
  ) {}

  //assign leave rule
  async createLeaveRule(body, user): Promise<leave_rules> {
    await this.userService.findById({ id: user.id });
    return await this.prisma.leave_rules.create({
      data: {
        ...body,
        company_id: user.company_id,
      },
    });
  }

  async getAllLeaveRule(user): Promise<GetLeaveRuleDto> {
    await this.userService.findById({ id: user.id });
    const count = await this.prisma.leave_rules.count({
      where: {
        deletedAt: null,
        company_id: user.company_id,
      },
    });
    const data = await this.prisma.leave_rules.findMany({
      where: {
        deletedAt: null,
        company_id: user.company_id,
      },
      orderBy: { createdAt: 'desc' },
    });
    return { count, data };
  }

  async getLeave_ruleById(id, user): Promise<leave_rules> {
    await this.userService.findById({ id: user.id });
    const result = await this.prisma.leave_rules.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (result.deletedAt !== null) {
      throw new NotFoundException('Leave_Rule not found.');
    }
    return result;
  }

  async updateLeave_rule(id, body, user): Promise<leave_rules> {
    await this.getLeave_ruleById(id, user);
    return await this.prisma.leave_rules.update({
      where: {
        id: Number(id),
      },
      data: {
        ...body,
      },
    });
  }

  async deleteLeave_rule(id, user): Promise<SuccessMessageDTO> {
    await this.userService.findById({ id: user.id });
    const checkLeaveRuleId = await this.prisma.aasignLeaveRule.findMany({
      where: {
        leave_rulesId: Number(id),
        deletedAt: null,
      },
    });
    console.log('checkLeaveRuleId', checkLeaveRuleId);
    if (checkLeaveRuleId.length > 0) {
      throw new BadRequestException('leave Rule is already in use');
    } else {
      await this.prisma.leave_rules.update({
        where: {
          id: Number(id),
        },
        data: {
          deletedAt: new Date(),
        },
      });
      return { message: 'leave Rule deleted successfully' };
    }
  }

  async getCompanyEmployee(id, user): Promise<any> {
    await this.userService.findById({ id: user.id });
    return await this.prisma.companies.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true,
            employees: {
              select: {
                aasignLeaveRule: {
                  where: {
                    deletedAt: null,
                  },
                  select: {
                    leave_rules: {
                      select: {
                        id: true,
                        name: true,
                        description: true,
                      },
                    },
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
                id: true,
                empType: true,
                jobPosition: {
                  select: {
                    company_department: {
                      select: {
                        department_name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async assignLeaveRule(body, user): Promise<SuccessMessageDTO> {
    await this.userService.findById({ id: user.id });
    //check rule already assigned or not
    for (let e = 0; e < body.employeeId.length; e++) {
      const data = await this.getAssignLeaveRule(user, body.employeeId[e]);
      const lr = data.map((el) => el.leave_rulesId);
      const found = body.leave_rulesId.some((r) => lr.includes(r));
      if (found === true) {
        throw new InternalServerErrorException('leave rule already assigned');
      }
    }

    //assign leave rule
    try {
      for (let i = 0; i < body.leave_rulesId.length; i++) {
        for (let e = 0; e < body.employeeId.length; e++) {
          await this.prisma.aasignLeaveRule.create({
            data: {
              leave_rulesId: body.leave_rulesId[i],
              employeeId: body.employeeId[e],
            },
          });
        }
      }
      return { message: 'leave rule assigned successfully' };
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async getAssignLeaveRule(user, empId) {
    await this.employeesService.getEmployee({ id: Number(empId) }, user);
    return await this.prisma.aasignLeaveRule.findMany({
      where: {
        employeeId: Number(empId),
        deletedAt: null,
      },
      include: {
        leave_rules: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async removeAssignLeaveRule(
    user,
    empId,
    leaveRuleId,
  ): Promise<SuccessMessageDTO> {
    await this.userService.findById({ id: user.id });
    await this.prisma.aasignLeaveRule.updateMany({
      where: {
        leave_rulesId: Number(leaveRuleId),
        employeeId: Number(empId),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return { message: ' assigned leave rule removed' };
  }

  async multipleLeave(data, user): Promise<leave_rules[]> {
    const items = data.map((el) => {
      return {
        ...el,
        company_id: user.company_id,
        maxLeavesAllowedInMonth: parseInt(el.maxLeavesAllowedInMonth),
        continuousLeavesAllowed: parseInt(el.continuousLeavesAllowed),
        leavesAllowedInYear: parseInt(el.leavesAllowedInYear),
      };
    });
    const response = await this.prisma.leave_rules.createMany({
      data: items,
    });
    let leaveRules = [];
    if (response) {
      leaveRules = await this.prisma.leave_rules.findMany({
        where: { company_id: data.company_id },
      });
    }
    return leaveRules;
  }
}
