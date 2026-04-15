import { Injectable } from '@nestjs/common';
import { Listing, ListingStatus } from '@prisma/client';
import { mapHostListingToResponse } from '@src/host/listings/mappers/host-listings.mapper';
import { PrismaService } from '@src/prisma/prisma.service';
import { HostListingResponseDto } from '../dto/host-listings.dto';

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

  /*   async findHostListing(
    hostId: string,
    id: string,
  ): Promise<ListingResponseDto > { //CHANGE TYPE
    const listing = await this.prisma.listing.findFirst({
      where: { hostId, id },
      include: {
        amenities: true,
      },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return mapHostListingToResponse(listing);
  } */

  async findRawById(id: string): Promise<Listing | null> {
    return this.prisma.listing.findUnique({
      where: { id },
    });
  }

  async updateStatus(id: string, status: ListingStatus): Promise<void> {
    await this.prisma.listing.update({
      where: { id },
      data: { status },
    });
  }
}
