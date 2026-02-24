import { Controller, Get, NotFoundException } from '@nestjs/common';
import type { AuthUser } from '@src/auth/auth-user';
import { CurrentUser } from '../auth/current-user.decorator';
import { MeResponseDto } from './dto/profiles-me.dto';
import { mapProfileToMeDto } from './dto/profiles.mapper';
import { ProfilesService } from './profiles.service';

@Controller('users')
export class UsersController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  async getMe(@CurrentUser() user: AuthUser): Promise<MeResponseDto> {
    const profile = await this.profilesService.getMe(user.id);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return mapProfileToMeDto(profile, user.email);
  }
}
