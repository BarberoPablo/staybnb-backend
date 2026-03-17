import { Injectable } from '@nestjs/common';
import { ListingStatus, Prisma, ReservationStatus } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { FeaturedListingDto } from '../dto/featured-listing.dto';
import {
  assertListingLocation,
  mapToFeaturedListingDto,
} from '../mappers/listings.mapper';
import { ListingWithOptionalRelations } from '../types/listing.types';
import {
  FeaturedListingsOptions,
  FindListingByIdOptions,
  PopularListingsOptions,
  SearchListingsOptions,
} from './listing.repository.types';

@Injectable()
export class ListingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findFeatured(
    options: FeaturedListingsOptions,
  ): Promise<FeaturedListingDto[]> {
    const listings = await this.prisma.listing.findMany({
      where: {
        status: ListingStatus.PUBLISHED,
        ratingAvg: {
          gte: 4,
        },
      },
      select: {
        id: true,
        title: true,
        nightPrice: true,
        images: true,
        ratingAvg: true,
        propertyType: true,
        privacyType: true,
        city: true,
        country: true,
        location: true,
      },
      orderBy: [
        { ratingAvg: 'desc' },
        { ratingCount: 'desc' },
        { createdAt: 'desc' },
      ],
      take: options.take,
      skip: options.skip,
    });

    return listings.map(mapToFeaturedListingDto);
  }

  async findPopular(
    options: PopularListingsOptions,
  ): Promise<ListingWithOptionalRelations[]> {
    const now = new Date();
    const lastMonth = new Date(now);
    lastMonth.setDate(now.getDate() - 30);

    const listings = await this.prisma.listing.findMany({
      where: {
        status: ListingStatus.PUBLISHED,
      },
      include: {
        _count: {
          select: {
            reservations: {
              where: {
                createdAt: {
                  gte: lastMonth,
                },
              },
            },
            favorites: true,
          },
        },
      },
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

    return listings.map((listing) => this.sanitizeListing(listing));
  }

  async search(
    options: SearchListingsOptions,
  ): Promise<ListingWithOptionalRelations[]> {
    const include: Prisma.ListingInclude = {};

    if (options.includeHost) include.host = true;
    if (options.includeAmenities) include.amenities = true;
    if (options.includeCount) include._count = true;

    const orderBy: Prisma.ListingOrderByWithRelationInput = options.sortBy
      ? ({
          [options.sortBy]: options.sortOrder ?? 'desc',
        } as Prisma.ListingOrderByWithRelationInput)
      : { createdAt: 'desc' };

    const listings = await this.prisma.listing.findMany({
      where: options.where,
      include,
      orderBy,
      take: options.take,
      skip: options.skip,
    });

    return listings.map((listing) => this.sanitizeListing(listing));
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
