import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { document, Role } from '@prisma/client';
import { EmployeeDocDTO } from './documents.dto';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class DocumentsService {
  constructor(
    private prisma: PrismaService,
    private empService: EmployeesService,
  ) {}

  async createDocument(body, empId, user): Promise<document> {
    // check employee exist or not
    await this.empService.getEmployee({ id: Number(empId) }, user);
    const verification = user.role === Role.CEO;
    const data = {
      ...body,
      uploadedById: Number(user.id),
      employeeId: Number(empId),
      verification,
    };
    return this.prisma.document.create({ data });
  }

  async getDocumentById(documentId) {
    return await this.prisma.document.findUnique({
      where: {
        id: Number(documentId),
      },
    });
  }

  async getDocuments(empId, user): Promise<EmployeeDocDTO> {
    await this.empService.getEmployee({ id: Number(empId) }, user);
    const count = await this.prisma.document.count({
      where: {
        deletedAt: null,
        employeeId: Number(empId),
      },
    });
    const data = await this.prisma.document.findMany({
      where: {
        deletedAt: null,
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { count, data };
  }

  async updateDocument(data, docId) {
    return await this.prisma.document.update({
      where: {
        id: Number(docId),
      },
      data,
    });
  }

  async deleteDocument(id: number) {
    return await this.prisma.document.update({
      where: {
        id: Number(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async verificationDocuments(docId) {
    return await this.prisma.document.update({
      where: {
        id: Number(docId),
      },
      data: {
        verification: false ? true : true,
      },
    });
  }
}
