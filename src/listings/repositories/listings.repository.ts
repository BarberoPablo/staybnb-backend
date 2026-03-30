import { Injectable } from '@nestjs/common';
import { ListingStatus, Prisma, ReservationStatus } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { ListingCardDto } from '../dto/listing-card.dto';
import {
  assertListingLocation,
  mapToListingCardDto,
} from '../mappers/listings.mapper';
import { ListingWithOptionalRelations } from '../types/listing.types';
import {
  FeaturedListingsOptions,
  FindListingByIdOptions,
  LISTING_CARD_SELECT,
  PopularListingsOptions,
  SearchListingsOptions,
} from './listing.repository.types';

@Injectable()
export class ListingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findFeatured(
    options: FeaturedListingsOptions,
  ): Promise<ListingCardDto[]> {
    const listings = await this.prisma.listing.findMany({
      where: {
        status: ListingStatus.PUBLISHED,
        ratingAvg: {
          gte: 4,
        },
      },
      select: LISTING_CARD_SELECT,
      orderBy: [
        { ratingAvg: 'desc' },
        { ratingCount: 'desc' },
        { createdAt: 'desc' },
      ],
      take: options.take,
      skip: options.skip,
    });

    return listings.map(mapToListingCardDto);
  }

  async findPopular(
    options: PopularListingsOptions,
  ): Promise<ListingCardDto[]> {
    const now = new Date();
    const lastMonth = new Date(now);
    lastMonth.setDate(now.getDate() - 30);

    const listings = await this.prisma.listing.findMany({
      where: {
        status: ListingStatus.PUBLISHED,
      },
      select: LISTING_CARD_SELECT,
      orderBy: [
        {
          reservations: {
            _count: 'desc',
          },
        },
        {
          createdAt: 'desc',
        },
      ],
      take: options.take,
      skip: options.skip,
    });

    return listings.map(mapToListingCardDto);
  }

  async search(options: SearchListingsOptions): Promise<ListingCardDto[]> {
    const orderBy: Prisma.ListingOrderByWithRelationInput = options.sortBy
      ? ({
          [options.sortBy]: options.sortOrder ?? 'desc',
        } as Prisma.ListingOrderByWithRelationInput)
      : { createdAt: 'desc' };

    const listings = await this.prisma.listing.findMany({
      where: options.where,
      select: LISTING_CARD_SELECT,
      orderBy,
      take: options.take,
      skip: options.skip,
    });

    return listings.map(mapToListingCardDto);
  }

  async findById(
    id: string,
    options: FindListingByIdOptions = {},
  ): Promise<ListingWithOptionalRelations> {
    const upcomingReservationFilter = {
      status: ReservationStatus.UPCOMING,
      endDate: { gte: new Date() },
    };

    const include: Prisma.ListingInclude = {};

    if (options.includeHost) include.host = true;
    if (options.includeAmenities) include.amenities = true;
    if (options.includeReviews) include.reviews = true;

    let includeReservations = false;

    if (options.includeReservations) {
      includeReservations = true;

      include.reservations = {
        where: upcomingReservationFilter,
        orderBy: { startDate: 'asc' },
      };
    }

    if (options.includeCount) {
      include._count = {
        select: {
          reservations: includeReservations
            ? { where: upcomingReservationFilter }
            : true,
        },
      };
    }

    const listing = await this.prisma.listing.findUniqueOrThrow({
      where: { id },
      include,
    });

    return this.sanitizeListing(listing);
  }

  private sanitizeListing(
    listing: Prisma.ListingGetPayload<any>,
  ): ListingWithOptionalRelations {
    assertListingLocation(listing.location);

    return {
      ...listing,
      location: listing.location,
    };
  }
}
