import { Controller, Get, NotFoundException } from '@nestjs/common';
import type { Profile } from '@prisma/client';
import { CurrentUser } from '../auth/current-user.decorator';
import { ProfilesService } from './profiles.service';

@Controller('users')
export class UsersController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  async getMe(@CurrentUser() profile: Profile): Promise<Profile | null> {
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return this.profilesService.getMe(profile.id);
  }
}
