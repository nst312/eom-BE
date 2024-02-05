import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { job_position, users } from '@prisma/client';
import { SuccessMessageDTO } from '../posts/post.dto';
import { JobPositionDTO } from './job-position.dto';

@Injectable()
export class JobPositionService {
  constructor(private prisma: PrismaService) {}

  async createJobPosition(body): Promise<job_position> {
    const findJobPosition = await this.prisma.job_position.findMany({
      where: {
        jobPosition: body.jobPosition,
        companyDepartmentId: body.companyDepartmentId,
        deletedAt: null,
      },
    });

    if (findJobPosition.length > 0) {
      throw new BadRequestException({
        message: 'Job position already exists.',
      });
    }

    const response = await this.prisma.job_position.create({
      data: {
        jobPosition: body.jobPosition,
        companyDepartmentId: body.companyDepartmentId,
      },
    });
    return response;
  }

  async getAllJobPosition(
    where,
    searchKey: string,
    page,
    perPage,
    user: users & { company_id: number },
  ): Promise<JobPositionDTO> {
    const company_id = user.company_id;

    if (searchKey) {
      const count = await this.prisma.job_position.count({
        where: {
          OR: [
            {
              jobPosition: { contains: `${searchKey}`, mode: 'insensitive' },
            },
          ],
          company_department: {
            company_id: company_id,
          },
          deletedAt: null,
        },
      });
      const data = await this.prisma.job_position.findMany({
        skip: perPage * (page - 1),
        take: perPage,
        where: {
          OR: [
            {
              jobPosition: { contains: `${searchKey}`, mode: 'insensitive' },
            },
          ],
          company_department: {
            company_id: company_id,
          },
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { count, data };
    } else {
      const count = await this.prisma.job_position.count({
        where: {
          company_department: {
            company_id: company_id,
          },
          deletedAt: null,
        },
      });
      const data = await this.prisma.job_position.findMany({
        skip: perPage * (page - 1),
        take: perPage,
        where: {
          company_department: {
            company_id: company_id,
          },
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          company_department: {
            select: {
              department_name: true,
              company_id: true,
            },
          },
        },
      });
      return { count, data };
    }
  }

  async updateJobPosition(where, data): Promise<job_position> {
    const findJobPosition = await this.prisma.job_position.findMany({
      where: {
        jobPosition: data.jobPosition,
        companyDepartmentId: data.companyDepartmentId,
        deletedAt: null,
      },
    });

    if (findJobPosition.length > 0) {
      throw new BadRequestException({
        message: 'Job position already exists.',
      });
    }

    const response = await this.prisma.job_position.update({
      where,
      data,
    });

    delete response.deletedAt;
    return response;
  }

  async deleteJobPosition(where): Promise<SuccessMessageDTO | job_position> {
    await this.findJobPosition(where);
    const data = await this.prisma.job_position.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
    {
      message: 'Job Position successfully Deleted.';
    }
    return data;
  }

  async findJobPosition(where): Promise<job_position> {
    try {
      const response = await this.prisma.job_position.findUnique({
        where,
      });
      if (response.deletedAt)
        throw new BadRequestException('Job Position not found.');
      return response;
    } catch (e) {
      throw new BadRequestException('Job Position not found.');
    }
  }

  async getJobPosition(where): Promise<job_position> {
    await this.findJobPosition(where);
    return await this.prisma.job_position.findUnique({
      where,
      include: {
        company_department: {
          select: {
            department_name: true,
            company_id: true,
          },
        },
      },
    });
  }
}
