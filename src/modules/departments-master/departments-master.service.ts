import { BadRequestException, Injectable } from '@nestjs/common';
import { department_master } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SuccessMessageDTO } from '../posts/post.dto';

@Injectable()
export class DepartmentsMasterService {
  constructor(private prisma: PrismaService) {}

  async createDepartment_Master(data): Promise<department_master> {
    const response = await this.prisma.department_master.create({
      data,
    });
    delete response.deletedAt;
    return response;
  }

  async getAllDepartments_Master(): Promise<department_master[]> {
    return await this.prisma.department_master.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async updateDepartment(where, data): Promise<department_master> {
    const response = await this.prisma.department_master.update({
      where,
      data,
    });
    delete response.deletedAt;
    return response;
  }

  async deleteDepartment(
    where,
  ): Promise<SuccessMessageDTO | department_master> {
    await this.findDepartment(where);
    await this.prisma.department_master.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
    return { message: 'Department successfully Deleted' };
  }

  async findDepartment(where): Promise<department_master> {
    try {
      const response = await this.prisma.department_master.findUnique({
        where,
      });
      if (response.deletedAt)
        throw new BadRequestException('Department not found.');
      return response;
    } catch (e) {
      throw new BadRequestException('Department not found.');
    }
  }
}
