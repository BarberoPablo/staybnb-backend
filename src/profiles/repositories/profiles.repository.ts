import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class ProfilesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { id },
    });
  }

  async findBySupabaseId(supabaseId: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { supabaseId },
    });
  }
}
