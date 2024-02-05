import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { companies, company_departments, users } from '@prisma/client';
import { DepartmentsDTO } from './departments.dto';
import { SuccessMessageDTO } from '../posts/post.dto';
import { CompaniesService } from './companies.service';

@Injectable()
export class DepartmentsService {
  constructor(
    private prisma: PrismaService,
    private companyService: CompaniesService,
  ) {}

  async createDepartment(body, user: users): Promise<company_departments> {
    const userCompany: users = await this.companyService.userCompany({
      id: Number(user.id),
    });

    const company_id = userCompany['companies'][0].id;
    if (userCompany.id !== user.id)
      throw new ForbiddenException('No permission!');
    const query = await this.prisma.company_departments.findFirst({
      where: {
        company_id,
        department_name: body.department_name,
        deletedAt: null,
      },
      rejectOnNotFound: null,
    });
    if (query) {
      throw new BadRequestException({
        errors: { department_name: 'Department already exist.' },
      });
    }
    const response = await this.prisma.company_departments.create({
      data: {
        department_name: body.department_name,
        company_id,
      },
    });

    delete response.deletedAt;
    return response;
  }

  async getAllDepartments(
    user: users,
    searchKey: string,
    page: number,
    perPage: number,
  ): Promise<DepartmentsDTO> {
    const userCompany: users = await this.companyService.userCompany({
      id: Number(user?.id),
    });
    const company_id = userCompany['companies'][0]?.id;
    if (userCompany.id !== user?.id)
      throw new ForbiddenException('No permission!');
    const deptCount = await this.prisma.company_departments.count({
      where: {
        deletedAt: null,
        company_id,
      },
    });

    if (searchKey) {
      const deptCount = await this.prisma.company_departments.count({
        where: {
          deletedAt: null,
          company_id,
        },
      });
      const data = await this.prisma.company_departments.findMany({
        skip: perPage * (page - 1),
        take: perPage,
        where: {
          OR: [
            {
              department_name: {
                contains: `${searchKey}`,
                mode: 'insensitive',
              },
            },
          ],
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { count: deptCount, data };
    } else {
      const response = await this.prisma.company_departments.findMany({
        skip: perPage * (page - 1),
        take: perPage,
        where: {
          deletedAt: null,
          company_id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      response.forEach((el) => delete el.deletedAt);
      return {
        count: deptCount,
        data: response,
      };
    }
  }

  async getDepartment(dept_id, user: users): Promise<company_departments> {
    const userCompany: users = await this.companyService.userCompany({
      id: Number(user.id),
    });
    const company_id = userCompany['companies'][0].id;
    if (userCompany.id !== user.id)
      throw new ForbiddenException('No permission!');
    const response = await this.findDepartment({ id: dept_id });
    if (response.company_id !== company_id)
      throw new NotFoundException('Department not found.');
    delete response.deletedAt;
    return response;
  }

  //
  async updateDepartment(
    dept_id,
    user: users,
    body,
  ): Promise<company_departments> {
    const userCompany: users = await this.companyService.userCompany({
      id: Number(user.id),
    });
    const company_id = userCompany['companies'][0].id;

    const query = await this.prisma.company_departments.findFirst({
      where: {
        department_name: body.department_name,
        deletedAt: null,
      },
      rejectOnNotFound: null,
    });
    if (query) {
      throw new BadRequestException({
        errors: { department_name: 'Department already exist.' },
      });
    }

    if (userCompany.id !== user.id)
      throw new ForbiddenException('No permission!');
    const _department = await this.findDepartment({ id: dept_id });
    console.log(_department);
    if (_department.company_id !== company_id)
      throw new NotFoundException('Department not found.');
    const response = await this.prisma.company_departments.update({
      where: {
        id: dept_id,
      },
      data: {
        department_name: body.department_name,
      },
    });
    delete response.deletedAt;
    return response;
  }

  //
  async deleteDepartment(
    dept_id,
    user: users,
  ): Promise<SuccessMessageDTO | company_departments> {
    const userCompany: users = await this.companyService.userCompany({
      id: Number(user.id),
    });
    const company_id = userCompany['companies'][0].id;
    if (userCompany.id !== user.id)
      throw new ForbiddenException('No permission!');
    const _department = await this.findDepartment({ id: dept_id });
    if (_department.company_id !== company_id)
      throw new NotFoundException('Department not found.');
    await this.prisma.company_departments.update({
      where: {
        id: dept_id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return { message: 'Department successfully Deleted' };
  }

  async findDepartment(where): Promise<company_departments> {
    try {
      const response = await this.prisma.company_departments.findUnique({
        where,
      });
      if (!response || response.deletedAt)
        throw new NotFoundException('Department not found.');
      return response;
    } catch (e) {
      return e;
    }
  }
}
