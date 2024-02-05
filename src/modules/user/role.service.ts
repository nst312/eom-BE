import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SuccessMessageDTO } from '../posts/post.dto';
import { UserService } from './user.service';
import { users } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async assignRole(userId, userRole): Promise<SuccessMessageDTO> {
    const where = { id: Number(userId) };
    await this.userService.findUser(where);
    await this.prisma.users.update({
      where,
      data: { role: userRole },
    });
    return { message: 'Role Updated.' };
  }

  async getUserWithoutAdmin(role, user): Promise<users[]> {
    return this.prisma.users.findMany({
      where: {
        companies: {
          every: {
            id: user.company_id,
          },
        },
        role: role,
        deletedAt: null,
      },
    });
  }
}
