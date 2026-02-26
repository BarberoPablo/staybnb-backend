import { Injectable } from '@nestjs/common';
import { ListingStatus, Prisma } from '@prisma/client';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingWithAmenities } from '@src/listings/dto/listing.types';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async search(query: GetListingsQueryDto): Promise<ListingWithAmenities[]> {
    const limit = query.limit ?? 20;
    const offset = query.offset ?? 0;

    const where: Prisma.ListingWhereInput = { status: ListingStatus.PUBLISHED };

    if (query.city?.trim()) {
      where.city = query.city?.trim();
    }

    if (query.country?.trim()) {
      where.country = query.country?.trim();
    }

    return this.prisma.listing.findMany({
      where,
      include: {
        amenities: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }
}
