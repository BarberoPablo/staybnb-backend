import { BadRequestException, Injectable } from '@nestjs/common';
import { ListingStatus, Prisma, ReservationStatus } from '@prisma/client';
import { GetFeaturedListingsQueryDto } from '@src/listings/dto/get-featured-listings-query.dto';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingWithOptionalRelations } from '@src/listings/dto/listing.types';
import { PrismaService } from '@src/prisma/prisma.service';
import { buildListingsWhere } from './builders/build-listings-where';
import {
  ALLOWED_SEARCH_INCLUDES,
  ALLOWED_SINGLE_LISTING_INCLUDES,
} from './utils/listings.utils';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getFeaturedListings(
    query: GetFeaturedListingsQueryDto,
  ): Promise<ListingWithOptionalRelations[]> {
    const limit = query.limit ?? 12;
    const offset = query.offset ?? 0;

    const listings = await this.prisma.listing.findMany({
      where: {
        status: ListingStatus.PUBLISHED,
        ratingAvg: {
          gte: 4,
        },
      },
      orderBy: [
        {
          ratingAvg: 'desc',
        },
        {
          ratingCount: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
      take: limit,
      skip: offset,
    });

    return listings;
  }

  async search(
    query: GetListingsQueryDto,
  ): Promise<ListingWithOptionalRelations[]> {
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

  async findById(
    id: string,
    query: GetListingsQueryDto,
  ): Promise<ListingWithOptionalRelations> {
    const include: Prisma.ListingInclude = {};

    const includeParams = query.include
      ? query.include.split(',').map((value) => value.trim())
      : [];

    let includeReservations = false;

    for (const includeParam of includeParams) {
      if (!includeParam) {
        continue;
      }

      if (!ALLOWED_SINGLE_LISTING_INCLUDES.has(includeParam)) {
        throw new BadRequestException(
          `Include '${includeParam}' is not allowed in GET /listings/:id endpoint`,
        );
      }

      if (includeParam === 'host') {
        include.host = true;
      }

      if (includeParam === 'amenities') {
        include.amenities = true;
      }

      if (includeParam === 'reservations') {
        includeReservations = true;

        include.reservations = {
          where: {
            status: ReservationStatus.UPCOMING,
            endDate: {
              gte: new Date(),
            },
          },
          orderBy: {
            startDate: 'asc',
          },
        };
      }

      if (includeParam === 'reviews') {
        include.reviews = true;
      }

      if (includeParam === '_count') {
        include._count = {
          select: {
            reservations: includeReservations
              ? {
                  where: {
                    status: ReservationStatus.UPCOMING,
                    endDate: {
                      gte: new Date(),
                    },
                  },
                }
              : true,
          },
        };
      }
    }

    const listing = await this.prisma.listing.findUniqueOrThrow({
      where: { id },
      include,
    });

    return listing;
  }
}
