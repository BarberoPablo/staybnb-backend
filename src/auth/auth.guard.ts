import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
      role: profile.role,
    };

    return true;
  }
}
