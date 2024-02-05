import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { RoleService } from './role.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, RoleService],
  exports: [UserService],
})
export class UserModule {}
