import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Profile, UserRole } from '@prisma/client';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(profileId: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { id: profileId },
    });
  }

  async findBySupabaseId(supabaseId: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { supabaseId },
    });
  }

  async createProfile(data: {
    supabaseId: string;
    role: UserRole;
  }): Promise<Profile> {
    return this.prisma.profile.create({
      data,
    });
  }
}
