import { Injectable, NotFoundException } from '@nestjs/common';
import type { AuthUser } from '@src/auth/auth-user';
import { SuccessResponseDto } from '@src/shared/dto/success-response.dto';
import type { MeResponseDto } from './dto/profiles-me.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesMapper } from './mappers/profiles.mapper';
import { ProfilesRepository } from './repositories/profiles.repository';

@Injectable()
export class ProfilesService {
  constructor(private readonly repository: ProfilesRepository) {}

  async findMe(user: AuthUser): Promise<MeResponseDto> {
    const profile = await this.repository.findById(user.id);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return ProfilesMapper.mapToMeDto(profile, user.email);
  }

  async updateMe(
    user: AuthUser,
    dto: UpdateProfileDto,
  ): Promise<SuccessResponseDto> {
    const profile = await this.repository.findById(user.id);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    await this.repository.update(user.id, dto);

    return { success: true };
  }
}
