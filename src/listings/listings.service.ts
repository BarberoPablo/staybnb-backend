import { Injectable } from '@nestjs/common';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingWithAmenities } from '@src/listings/dto/listing.types';
import { buildListingsWhere } from '@src/listings/dto/listings.utils';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async search(query: GetListingsQueryDto): Promise<ListingWithAmenities[]> {
    const limit = query.limit ?? 20;
    const offset = query.offset ?? 0;

    const where = buildListingsWhere(query);

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
