import { Injectable } from '@nestjs/common';
import { ListingStatus, Prisma, ReservationStatus } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { ListingCardDto } from '../dto/listing-card.dto';
import {
  mapListingForCreatingReservation,
  mapToListingCardDto,
} from '../mappers/listings.mapper';
import {
  ListingDetails,
  ListingForCreatingReservation,
} from '../types/listing.types';
import {
  FeaturedListingsOptions,
  FindForCheckoutOptions,
  FindWithDetailsOptions,
  LISTING_CARD_SELECT,
  LISTING_CHECKOUT_SELECT,
  LISTING_FOR_CREATING_RESERVATION,
  ListingCheckout,
  PopularListingsOptions,
  SearchListingsOptions,
} from './listing.repository.types';

@Injectable()
export class ListingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findListingForReservation(
    id: string,
  ): Promise<ListingForCreatingReservation | null> {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      select: LISTING_FOR_CREATING_RESERVATION,
    });

    if (!listing) return null;

    return mapListingForCreatingReservation(listing);
  }

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

  async findWithDetails(
    options: FindWithDetailsOptions,
  ): Promise<ListingDetails> {
    const upcomingReservationFilter = {
      status: ReservationStatus.UPCOMING,
      endDate: { gte: new Date() },
    };

    const listing = await this.prisma.listing.findUniqueOrThrow({
      where: {
        id: options.id,
        status: ListingStatus.PUBLISHED,
      },
      include: {
        host: {
          select: {
            id: true,
            firstName: true,
            avatarUrl: true,
          },
        },
        amenities: {
          select: {
            amenityId: true,
          },
        },
        reviews: {
          select: {
            id: true,
            score: true,
            message: true,
            profile: {
              select: {
                id: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 3,
        },
        reservations: {
          where: upcomingReservationFilter,
          select: {
            id: true,
            startDate: true,
            endDate: true,
          },
          orderBy: { startDate: 'asc' },
        },
      },
    });

    return listing;
  }

  async findForCheckout(
    options: FindForCheckoutOptions,
  ): Promise<ListingCheckout> {
    const listing = await this.prisma.listing.findUniqueOrThrow({
      where: {
        id: options.id,
        status: ListingStatus.PUBLISHED,
      },
      select: LISTING_CHECKOUT_SELECT,
    });

    return listing;
  }
}
