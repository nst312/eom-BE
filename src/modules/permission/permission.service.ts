import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionDTO } from './permission.dto';
import { SuccessMessageDTO } from '../posts/post.dto';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async findPermission(role): Promise<PermissionDTO> {
    const response = await this.getAllPermissions(role, undefined);
    return {
      role,
      permissions: response,
    };
  }

  async updatePermission(role, body): Promise<SuccessMessageDTO> {
    body.map(async (el) => {
      await this.prisma.role_permission.updateMany({
        where: {
          role: role,
          permission: {
            in: el.permission,
          },
        },
        data: {
          isPermission: el.isPermission,
        },
      });
    });
    return { message: 'Permission successfully updated' };
  }

  async getAllPermissions(role, isPermission) {
    return this.prisma.role_permission.findMany({
      where: { role, isPermission },
      select: {
        permission: true,
        isPermission: true,
        label: true,
        module: true,
      },
    });
  }
}
