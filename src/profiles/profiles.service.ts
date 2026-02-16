import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

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
}
