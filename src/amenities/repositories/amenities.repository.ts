import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class AmenitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async countByIds(ids: string[]): Promise<number> {
    const uniqueIds = [...new Set(ids)];

    return this.prisma.amenity.count({
      where: { id: { in: uniqueIds } },
    });
  }
}
