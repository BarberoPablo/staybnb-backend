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

    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing authorization token');
    }

    const token = authHeader.split(' ')[1];

    const { supabaseId } = await this.authService.validateToken(token);

    const profile = await this.authService.findProfileBySupabaseId(supabaseId);

    if (!profile) {
      this.logger.warn(`Profile not found for Supabase ID: ${supabaseId}`);
      throw new ForbiddenException(
        'Profile not provisioned. Complete onboarding first.',
      );
    }

    request.user = {
      id: profile.id,
      supabaseId: profile.supabaseId,
      role: profile.role,
    };

    return true;
  }
}
