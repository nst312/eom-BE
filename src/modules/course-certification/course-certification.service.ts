import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeesService } from '../employees/employees.service';
import { Role, course } from '@prisma/client';
import { EmployeeDocDTO } from '../documents/documents.dto';
import { EmployeeCourseDTO } from './course-certification.dto';

@Injectable()
export class CourseCertificationService {
  constructor(
    private prisma: PrismaService,
    private empService: EmployeesService,
  ) {}

  async createCourse(body, empId, user): Promise<course> {
    // check employee exist or not
    await this.empService.getEmployee({ id: Number(empId) }, user);
    const verification = user.role === Role.CEO;
    const data = {
      ...body,
      uploadedById: Number(user.id),
      employeeId: Number(empId),
      verification,
    };
    return this.prisma.course.create({ data });
  }

  async getCourse(empId, user): Promise<EmployeeCourseDTO> {
    // check employee exist or not
    await this.empService.getEmployee({ id: Number(empId) }, user);

    const count = await this.prisma.course.count({
      where: {
        deletedAt: null,
        employeeId: Number(empId),
      },
    });
    const data = await this.prisma.course.findMany({
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

  async getCourseById(courseId) {
    return await this.prisma.course.findUnique({
      where: {
        id: Number(courseId),
      },
    });
  }

  async updateCourse(data, courseId) {
    return await this.prisma.course.update({
      where: {
        id: Number(courseId),
      },
      data,
    });
  }

  async deleteCourse(id: number) {
    return await this.prisma.course.update({
      where: {
        id: Number(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async verificationCourse(courseId) {
    return await this.prisma.course.update({
      where: {
        id: Number(courseId),
      },
      data: {
        verification: false ? true : true,
      },
    });
  }
}
