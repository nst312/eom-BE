import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { users, role_permission } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { JWT_SECRET } from '../../shared/constants/global.constants';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    private permissionService: PermissionService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: process.env.NODE_ENV === 'dev',
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: users): Promise<any> {
    const email = payload.email;
    const userData = await this.prisma.users.findUnique({
      where: { email },
      include: { companies: true, employees: true },
    });

    const userPermission = await this.permissionService.getAllPermissions(
      userData.role,
      true,
    );

    if (!userData) {
      throw new UnauthorizedException();
    }

    const user = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      displayName: userData.displayName,
      email: userData.email,
      role: userData.role,
      company_id:
        userData.role !== 'SUPER_ADMIN' ? userData.companies[0]?.id : null,
      employee_id:
        userData.role !== 'SUPER_ADMIN' ? userData.employees.id : null,
      permissions: userPermission.map((el) => el.permission),
    };

    return user;
  }
}
