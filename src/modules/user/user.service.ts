import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { companies, employees, Prisma, Role, users } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { DeleteUserDTO, UpdateUserDTO, UserDTO, UsersDTO } from './user.dto';
import { AuthHelpers } from 'src/shared/helpers/auth.helpers';
import { SuccessMessageDTO } from '../posts/post.dto';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService, // private employeesService: EmployeesService,
  ) {}

  async getAllUsers(page, perPage, user): Promise<UsersDTO> {
    const query = {
      where: {
        // companies: {
        //   every: {
        //     id: user.company_id,
        //   },
        // },
        role: { not: Role.SUPER_ADMIN },
        deletedAt: null,
      },
    };
    const userCount = await this.prisma.users.count(query);
    const response = await this.prisma.users.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      ...query,
    });

    const updateResponse = response.map((user) => {
      delete user.password, delete user.deletedAt;
      return user;
    });
    return { count: userCount, data: updateResponse };
  }

  async getEmployeeUsers(
    user: users & { company_id: number },
  ): Promise<users[]> {
    // await this.employeesService.find
    return await this.prisma.users.findMany({
      take: 10,
      where: {
        deletedAt: null,
        role: 'EMPLOYEE',
        companies: {
          every: {
            id: user.company_id,
          },
        },
      },
      orderBy: {
        totalRating: 'desc',
      },
    });
  }

  async findById(where): Promise<UserDTO> {
    const user = await this.findUser(where);
    delete user.deletedAt;
    delete user.password;
    return user;
  }

  async updateUser(where, fileName, data: UpdateUserDTO): Promise<UserDTO> {
    const payload = {
      ...data,
      avatar_url: fileName,
    };

    const user = await this.prisma.users.update({
      where,
      data: payload,
      include: {
        companies: true,
      },
    });
    delete user.deletedAt;
    delete user.password;
    return user;
  }

  // update Password
  async updatePassword(where, passwordBody): Promise<SuccessMessageDTO> {
    const user = await this.findUser(where);
    const isMatch = await AuthHelpers.verify(
      passwordBody.password,
      user.password,
    );
    if (!isMatch)
      throw new BadRequestException('Current password is incorrect');
    const password = await AuthHelpers.hash(passwordBody.newPassword);
    await this.prisma.users.update({
      where,
      data: {
        password,
      },
    });
    return { message: 'Password successfully updated.' };
  }

  async deleteUser(where): Promise<SuccessMessageDTO> {
    // check client exist or not
    const response = await this.prisma.users.updateMany({
      where: {
        id: {
          in: where,
        },
      },
      data: { deletedAt: new Date() },
    });

    if (!response) {
      throw new BadRequestException('Something went wrong!');
    }

    return { message: 'User deleted successfully.' };
  }

  //Abstract Methods------------------------------------------------------------------>>>>
  async createUser(data): Promise<users & { companies: companies[] }> {
    const response = await this.prisma.users.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        displayName: data.displayName,
        email: data.email,
        password: data.password,
        role: Role.CEO,
        token: null,
        companies: {
          create: [
            {
              company_name: data.company_name,
            },
          ],
        },
      },
      include: { companies: true },
    });
    return response;
  }

  async findUser(
    where: Prisma.usersWhereUniqueInput,
  ): Promise<users & { companies: companies[]; employees: employees }> {
    try {
      const user = await this.prisma.users.findUnique({
        where,
        include: {
          companies: true,
          employees: {
            include: {
              attendanceRules: {
                select: {
                  attendance: {
                    select: {
                      shiftOutTime: true,
                      shiftInTime: true,
                      durationCount: true,
                    },
                  },
                },
                where: {
                  deletedAt: null,
                },
              },
            },
          },
        },
      });
      if (user.deletedAt !== null)
        throw new NotFoundException('User not found.');
      return user;
    } catch (err) {
      throw new NotFoundException('User not found.');
    }
  }
}
