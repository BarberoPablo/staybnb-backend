import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthUser } from '@src/auth/auth-user';
import { MeResponseDto } from './dto/profiles-me.dto';
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
}
