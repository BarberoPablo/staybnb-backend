import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';

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

  async update(id: string, data: UpdateProfileDto): Promise<Profile> {
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }
}
