import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { buildListingsWhere } from './builders/build-listings-where';
import { ALLOWED_SEARCH_INCLUDES } from './utils/listings.utils';

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

      if (!ALLOWED_SEARCH_INCLUDES.has(includeParam)) {
        throw new BadRequestException(
          `Include '${includeParam}' is not allowed in GET /listings search endpoint`,
        );
      }

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
