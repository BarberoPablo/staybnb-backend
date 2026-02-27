import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingResponseDto } from '@src/listings/dto/listing-response.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { mapListingToResponse } from '@src/listings/dto/listings.mapper';
import { buildListingsWhere } from './builders/build-listings-where';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async search(query: GetListingsQueryDto) {
    const limit = query.limit ?? 20;
    const offset = query.offset ?? 0;

    const where = buildListingsWhere(query);

    const include: Prisma.ListingInclude = {};

    const includeParams = query.include
      ? query.include.split(',').map((value) => value.trim())
      : [];

    for (const includeParam of includeParams) {
      if (!includeParam) continue;

      if (includeParam === 'host') {
        include.host = true;
      }

      if (includeParam === 'amenities') {
        include.amenities = true;
      }

      if (includeParam === 'reservations') {
        include.reservations = true;
      }

      if (includeParam === '_count') {
        include._count = true;
      }
    }

    const orderBy: Prisma.ListingOrderByWithRelationInput = query.sortBy
      ? { [query.sortBy]: query.sortOrder ?? 'desc' }
      : { createdAt: 'desc' };

    const listings = await this.prisma.listing.findMany({
      where,
      include,
      orderBy,
      take: limit,
      skip: offset,
    });

    return listings;
  }
}
