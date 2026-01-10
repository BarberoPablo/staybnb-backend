import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthUser } from './auth-user';

// This is a filter that gets executed before entering the controller
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Temporary hardcoded user until real authentication
    const user: AuthUser = {
      id: '0013b1f',
      role: 'USER',
    };

    request.user = user;

    return true;
  }
}
