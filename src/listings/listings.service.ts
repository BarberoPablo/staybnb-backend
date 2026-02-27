import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingWithAmenities } from '@src/listings/dto/listing.types';
import { PrismaService } from '@src/prisma/prisma.service';
import { buildListingsWhere } from './builders/build-listings-where';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async search(query: GetListingsQueryDto): Promise<ListingWithAmenities[]> {
    const limit = query.limit ?? 20;
    const offset = query.offset ?? 0;

    const where = buildListingsWhere(query);

    const orderBy: Prisma.ListingOrderByWithRelationInput = query.sortBy
      ? { [query.sortBy]: query.sortOrder ?? 'desc' }
      : { createdAt: 'desc' };

    return this.prisma.listing.findMany({
      where,
      include: {
        amenities: true,
      },
      orderBy,
      take: limit,
      skip: offset,
    });
  }
}
