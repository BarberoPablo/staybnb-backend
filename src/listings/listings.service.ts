import { Injectable } from '@nestjs/common';
import { Listing } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  findByHostId(hostId: string): Promise<Listing[]> {
    return this.prisma.listing.findMany({
      where: { hostId },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
