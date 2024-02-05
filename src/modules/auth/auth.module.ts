import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { JWT_SECRET } from '../../shared/constants/global.constants';
import { SendgridService } from '../../mail/sendgrid.service';
import { PermissionService } from '../permission/permission.service';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    JwtStrategy,
    PrismaService,
    SendgridService,
    PermissionService,
  ],
})
export class AuthModule {}
