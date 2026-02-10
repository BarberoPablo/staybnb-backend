import {
  Body,
  ConflictException,
  Controller,
  Logger,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('onboard')
  async onboardProfile(
    @Req() req: Request,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new ConflictException('Authorization token required');
    }

    const token = authHeader.split(' ')[1];

    const { supabaseId } = await this.authService.validateToken(token);

    const existingProfile =
      await this.authService.findProfileBySupabaseId(supabaseId);

    if (existingProfile) {
      throw new ConflictException('Profile already exists');
    }

    return this.authService.createProfile(supabaseId, createProfileDto);
  }
}
