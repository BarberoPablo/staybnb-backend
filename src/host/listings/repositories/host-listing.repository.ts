import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingStatus, Prisma } from '@prisma/client';
import {
  mapHostListingDetailsToResponse,
  mapHostListingToResponse,
} from '@src/host/listings/mappers/host-listings.mapper';
import { PrismaService } from '@src/prisma/prisma.service';
import {
  HostListingDetailsResponseDto,
  HostListingResponseDto,
} from '../dto/host-listings.dto';
import { PartialUpdateListingDto } from '../dto/update-listing.dto';
import { RawHostListing } from '../types/host-listing.types';

@Injectable()
export class HostListingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findHostListings(hostId: string): Promise<HostListingResponseDto[]> {
    const listings = await this.prisma.listing.findMany({
      where: { hostId },
      select: {
        id: true,
        status: true,
        images: true,
        title: true,
        description: true,
        city: true,
        country: true,
        nightPrice: true,
        propertyType: true,
        privacyType: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return listings.map((listing) => mapHostListingToResponse(listing));
  }

  async findHostListing(
    hostId: string,
    id: string,
  ): Promise<HostListingDetailsResponseDto> {
    const listing = await this.prisma.listing.findFirst({
      where: { hostId, id },
      include: { amenities: true },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return mapHostListingDetailsToResponse(listing);
  }

  async findRawById(id: string): Promise<RawHostListing | null> {
    return this.prisma.listing.findUnique({
      where: { id },
      select: {
        id: true,
        hostId: true,
        status: true,
      },
    });
  }

  async updateStatus(id: string, status: ListingStatus): Promise<void> {
    await this.prisma.listing.update({
      where: { id },
      data: { status },
    });
  }

  async update(id: string, dto: PartialUpdateListingDto): Promise<void> {
    const { amenities, location, structure, guestLimits, promotions, ...rest } =
      dto;

    const updateData: Prisma.ListingUpdateInput = {
      ...rest,
      status: ListingStatus.PENDING,
    };

    if (structure) {
      if (structure.bedrooms !== undefined)
        updateData.bedrooms = structure.bedrooms;
      if (structure.beds !== undefined) updateData.beds = structure.beds;
      if (structure.bathrooms !== undefined)
        updateData.bathrooms = structure.bathrooms;
      if (structure.guests !== undefined)
        updateData.maxGuests = structure.guests;
    }

    if (guestLimits) {
      if (guestLimits.adults?.max !== undefined)
        updateData.maxAdults = guestLimits.adults.max;
      if (guestLimits.children?.max !== undefined)
        updateData.maxChildren = guestLimits.children.max;
      if (guestLimits.infant?.max !== undefined)
        updateData.maxInfants = guestLimits.infant.max;
      if (guestLimits.pets?.max !== undefined)
        updateData.maxPets = guestLimits.pets.max;
    }

    if (location) {
      updateData.city = location.city;
      updateData.country = location.country;
      updateData.lat = location.lat;
      updateData.lng = location.lng;
      updateData.location = {
        formatted: location.formatted,
        housenumber: location.housenumber,
        street: location.street,
        state: location.state,
        postcode: location.postcode,
        timezone: location.timezone,
      };
    }

    if (promotions && promotions.length > 0) {
      updateData.promotions = promotions.map((promotion) => ({
        minNights: promotion.minNights,
        description: promotion.description,
        discountPercentage: promotion.discountPercentage,
      }));
    }

    await this.prisma.$transaction(async (tx) => {
      if (amenities) {
        await tx.listingAmenity.deleteMany({
          where: { listingId: id },
        });

        if (amenities.length > 0) {
          await tx.listingAmenity.createMany({
            data: amenities.map((amenityId) => ({
              listingId: id,
              amenityId,
            })),
          });
        }
      }

      await tx.listing.update({
        where: { id },
        data: updateData,
        include: { amenities: true },
      });
    });
  }
}
