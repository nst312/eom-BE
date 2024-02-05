import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  permission: string[];

  constructor(private reflector: Reflector) {
    super(reflector);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.permission = this.reflector.get<string[]>(
      'permission',
      context.getHandler(),
    );
    return super.canActivate(context);
  }

  handleRequest(err: Error, user): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    if (!this.permission) {
      return user;
    }

    const hasPermission = user?.permissions?.some(
      (el) => el === this.permission.toString(),
    );
    if (!hasPermission) {
      throw new ForbiddenException();
    }

    return user;
  }
}
