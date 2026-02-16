import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();
    const controller = context.getClass();

    const isPublic =
      this.reflector.get<boolean>(IS_PUBLIC_KEY, handler) ?? //checks if handler is public
      this.reflector.get<boolean>(IS_PUBLIC_KEY, controller); //checks if the whole controller is public

    const request = context.switchToHttp().getRequest();

    const token = this.extractToken(request);

    if (!token) {
      if (isPublic) {
        return true;
      }
      throw new UnauthorizedException('Authentication token not found');
    }

    const { supabaseId } = await this.authService.validateToken(token);

    request.auth = { supabaseId };

    if (isPublic) {
      return true;
    }

    const profile = await this.authService.findProfileBySupabaseId(supabaseId);

    if (!profile) {
      throw new ForbiddenException(
        'Profile not provisioned. Complete onboarding first.',
      );
    }

    request.user = {
      id: profile.id,
      role: profile.role,
    };

    return true;
  }

  private extractToken(request: any): string | null {
    const cookieHeader: string | undefined = request.headers.cookie;

    if (cookieHeader) {
      const match = cookieHeader.match(/sb-.*?-auth-token=([^;]+)/);

      if (match) {
        try {
          const raw = match[1];

          if (!raw.startsWith('base64-')) {
            return null;
          }
          const base64Payload = raw.replace('base64-', '');

          const decoded = JSON.parse(
            Buffer.from(base64Payload, 'base64').toString('utf8'),
          );

          if (decoded?.access_token) {
            return decoded.access_token;
          }
        } catch (err) {
          this.logger.warn('Failed to parse Supabase auth cookie (guard)');
        }
      }
    }

    // Authorization header (fallback for tools like ECHOAPI)
    const authHeader = request.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }

    return null;
  }
}
