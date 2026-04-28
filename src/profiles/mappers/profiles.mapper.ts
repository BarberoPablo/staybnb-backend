import { Profile } from '@prisma/client';
import { MeResponseDto } from '../dto/profiles-me.dto';

export class ProfilesMapper {
  static mapToMeDto(profile: Profile, email: string): MeResponseDto {
    return {
      id: profile.id,
      role: profile.role,
      email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      avatarUrl: profile.avatarUrl,
      bio: profile.bio,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}
