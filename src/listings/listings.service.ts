import { Injectable } from '@nestjs/common';
import { ListingStatus } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingWithAmenities } from '@src/listings/dto/listing.types';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async search(query: GetListingsQueryDto): Promise<ListingWithAmenities[]> {
    const limit = query.limit ?? 20;
    const offset = query.offset ?? 0;

    return this.prisma.listing.findMany({
      where: { status: ListingStatus.PUBLISHED },
      include: {
        amenities: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }
}
