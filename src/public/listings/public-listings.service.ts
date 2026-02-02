import { Injectable, NotFoundException } from '@nestjs/common';
import { Listing, ListingStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicListingsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.listing.findMany({
      where: { status: ListingStatus.PUBLISHED },
      include: {
        amenities: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const listing = await this.prisma.listing.findFirst({
      where: {
        id,
        status: ListingStatus.PUBLISHED,
      },
      include: {
        amenities: true,
      },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return listing;
  }
}
