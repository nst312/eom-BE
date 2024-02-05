// @ts-ignore

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkDTO, UpdateWorkDTO } from './works.dto';
import { works } from '@prisma/client';
import { userInfo } from 'os';
import { CommonHelpers } from '../../shared/helpers/common.helpers';
import path from 'path';

@Injectable()
export class WorksService {
  constructor(private prisma: PrismaService) {}

  async getAllWork() {
    return await this.prisma.works.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        description: true,
        path: true,
      },
    });
  }

  async getWorkById(workId) {
    return await this.prisma.works.findUnique({
      where: {
        id: Number(workId),
      },
    });
  }

  async getWork(where) {
    return await this.prisma.works.findMany({
      where,
      include: {
        uploadedBy: {
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

  async createWork(data, user, empId): Promise<works> {
    console.log('data', data);
    return await this.prisma.works.create({
      data: {
        title: data.title,
        description: data.description,
        path: data.path,
        uploadedById: Number(user.id),
        employeeId: Number(empId),
      },
      include: {
        uploadedBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async updateWork(data, user, workId) {
    return await this.prisma.works.update({
      where: {
        id: Number(workId),
      },
      data,
    });
  }

  async deleteWork(id: number) {
    return await this.prisma.works.update({
      where: {
        id: Number(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async downloadWork(id, res): Promise<any> {
    const data = await this.prisma.works.findUnique({
      where: {
        id: Number(id),
      },
    });
    const filePath = data?.path;
    console.log(filePath);
  }
}
