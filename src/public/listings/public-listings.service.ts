import { Injectable, NotFoundException } from '@nestjs/common';
import { Listing, ListingStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicListingsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Listing[]> {
    return this.prisma.listing.findMany({
      where: { status: ListingStatus.PUBLISHED },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<Listing> {
    const listing = await this.prisma.listing.findFirst({
      where: {
        id,
        status: ListingStatus.PUBLISHED,
      },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return listing;
  }
}
