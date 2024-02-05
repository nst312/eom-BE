import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, users } from '@prisma/client';
import { GLOBAL_CONFIG } from '../../configs/global.config';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { SuccessMessageDTO } from '../posts/post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import * as fs from 'fs';
import * as paths from 'path';
import Handlebars from 'handlebars';
import {
  AuthResponseDTO,
  LoginUserDTO,
  RegisterUserDTO,
  ForgotPasswordDTO,
} from './auth.dto';
import * as moment from 'moment';
import { SendgridService } from '../../mail/sendgrid.service';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
    private sendgridService: SendgridService,
    private permissionService: PermissionService,
  ) {}

  public async register(user: RegisterUserDTO): Promise<AuthResponseDTO> {
    const newUser = await this.userService.createUser(user);
    await this.prisma.employees.create({
      data: {
        work_email: newUser.email,
        userId: newUser.id,
      },
    });
    const payload = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      displayName: newUser.displayName,
      company_name: newUser.companies[0].company_name,
      email: newUser.email,
      role: Role.CEO,
      company_id:
        newUser.role !== 'SUPER_ADMIN' ? newUser.companies[0].id : null,
    };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });

    const permissions = await this.permissionService.getAllPermissions(
      payload.role,
      true,
    );

    return {
      user: payload,
      permissions: permissions.map((el) => el.permission),
      accessToken: accessToken,
    };
  }

  async validateToken(userId: number): Promise<AuthResponseDTO> {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
      include: { companies: true, employees: true },
    });

    let employee;

    if (user.role !== 'SUPER_ADMIN') {
      console.log(user);
      employee = await this.prisma.employees.findUnique({
        where: {
          id: user.employees.id,
        },
        include: { jobPosition: true },
      });
    }

    if (!user) throw new ForbiddenException('Access Denied');

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      company_name: user.companies[0]?.company_name,
      email: user.email,
      role: user.role,
      password: null,
      deletedAt: user.deletedAt,
      company_id: user.role !== 'SUPER_ADMIN' ? user.companies[0]?.id : null,
      employee_id: user.role !== 'SUPER_ADMIN' ? user.employees.id : null,
      avatar_url: user.avatar_url ? user.avatar_url : null,
      jobPosition: user.role === 'EMPLOYEE' ? employee.jobPosition : null,
    };

    const permissions = await this.permissionService.getAllPermissions(
      payload.role,
      true,
    );

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });

    return {
      user: payload,
      permissions: permissions.map((el) => el.permission),
      accessToken: accessToken,
    };
  }

  public async login(loginUserDTO: LoginUserDTO): Promise<AuthResponseDTO> {
    const userData = await this.userService.findUser({
      email: loginUserDTO.email,
    });

    const isMatch = await AuthHelpers.verify(
      loginUserDTO.password,
      userData.password,
    );

    if (!isMatch) {
      throw new BadRequestException('password is incorrect');
    }

    let employee;

    // if (userData.role === 'EMPLOYEE') {
    //   employee = await this.prisma.employees.findUnique({
    //     where: {
    //       id: userData.employees.id,
    //     },
    //     include: { jobPosition: true },
    //   });
    // }
    // console.log(userData)

    const payload = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      displayName: userData.displayName,
      company_name: userData.companies[0]?.company_name,
      email: userData.email,
      role: userData.role,
      password: null,
      company_id:
        userData.role !== 'SUPER_ADMIN' ? userData.companies[0]?.id : null,
      employee_id:
        userData.role !== 'SUPER_ADMIN' ? userData.employees?.id : null,
      jobPosition:
        userData.role !== 'SUPER_ADMIN' ? employee?.jobPosition : null,
      avatar_url: userData.avatar_url ? userData.avatar_url : null,
    };

    const permissions = await this.permissionService.getAllPermissions(
      payload.role,
      true,
    );

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });
    return {
      user: payload,
      permissions: permissions.map((el) => el.permission),
      accessToken: accessToken,
    };
  }

  async forgotPassword(data): Promise<ForgotPasswordDTO> {
    const userData = await this.userService.findUser({
      email: data.email,
    });
    const token = AuthHelpers.tokenHash();
    const response = await this.prisma.users.update({
      where: { id: userData.id },
      data: {
        token: token,
      },
    });
    const username = response.firstName + ' ' + response.lastName;
    const link =
      process.env.FRONT_END + 'apps/forgot-password/validate-token/' + token;

    const payload = {
      name: username,
      forgotPasswordLink: link,
    };

    const templateStr = fs
      .readFileSync(
        paths.resolve(__dirname, '../../../../templates/forgotPassword.hbs'),
      )
      .toString('utf8');
    const template = Handlebars.compile(templateStr, { noEscape: true });
    const html = template(payload);

    const mail = {
      to: response.email,
      subject: 'Welcome to EOM',
      from: process.env.SENDGRID_EMAIL_ADDRESS,
      html: html,
    };
    await this.sendgridService.sendMail(mail);
    return response;
  }

  validatePasswordToken(users: users): boolean {
    const startTime = moment(users.updatedAt);
    const endTime = moment(new Date());
    const hoursDiff = endTime.diff(startTime, 'hours');

    if (hoursDiff >= 24) {
      return false;
    } else {
      return true;
    }
  }

  async validateForgotPasswordToken(where): Promise<SuccessMessageDTO | users> {
    try {
      const response = await this.prisma.users.findFirst({ where });

      if (response.deletedAt !== null) {
        throw new BadRequestException(
          'Forgot Password has already been generated please check your email',
        );
      }
      const isTokenValid = this.validatePasswordToken(response);
      if (!isTokenValid) {
        throw new BadRequestException('Token is expired please try again.');
      } else {
        return response;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateUserPassword(where, data): Promise<users | SuccessMessageDTO> {
    try {
      const response = await this.prisma.users.findFirst({ where });
      if (response.deletedAt !== null) {
        throw new BadRequestException(
          'Forgot Password has not been generated please try again',
        );
      }
      const isTokenValid = this.validatePasswordToken(response);

      if (!isTokenValid) {
        throw new BadRequestException('Token is expired please try again.');
      }
      const password = await AuthHelpers.hash(data.newPassword);
      await this.prisma.users.update({
        where: {
          id: response.id,
        },
        data: {
          password,
          token: null,
        },
      });
      return { message: 'Password successfully updated.' };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
