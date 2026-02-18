import {
  Body,
  ConflictException,
  Controller,
  Logger,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthContext } from './dto/auth.types';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Public } from './public.decorator';

/**
 * AuthController handles authentication lifecycle and identity transitions.
 *
 * This is the ONLY controller allowed to:
 * - read Authorization headers
 * - parse and validate JWTs
 * - extract identity data directly from tokens
 *
 * All other controllers must rely on the global AuthGuard and the resolved
 * request.user context. Token handling outside this controller is forbidden.
 */

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('onboard')
  async onboardProfile(
    @Req() req: Request & { auth: AuthContext },
    @Body() createProfileDto: CreateProfileDto,
  ) {
    if (!req.auth.supabaseId) {
      throw new UnauthorizedException('Authentication context missing');
    }
    const supabaseId = req.auth.supabaseId;

    const existingProfile =
      await this.authService.findProfileBySupabaseId(supabaseId);

    if (existingProfile) {
      throw new ConflictException('Profile already exists');
    }

    return this.authService.createProfile(createProfileDto, supabaseId);
  }
}
