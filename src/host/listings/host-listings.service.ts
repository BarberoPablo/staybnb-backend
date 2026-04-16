import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListingStatus } from '@prisma/client';
import { ResubmitResponseDto } from '@src/host/listings/dto/resubmit-response.dto';
import { HostListingRepository } from '@src/host/listings/repositories/host-listing.repository';
import { HostListingResponseDto } from './dto/host-listings.dto';

@Injectable()
export class HostListingsService {
  constructor(private readonly repository: HostListingRepository) {}

  async findHostListings(hostId: string): Promise<HostListingResponseDto[]> {
    return this.repository.findHostListings(hostId);
  }

  /* async findHostListing(
    hostId: string,
    id: string,
  ): Promise<ListingResponseDto> { //CHANGE
    return this.repository.findHostListing(hostId, id);
  } */

  async resubmit(
    listingId: string,
    hostId: string,
  ): Promise<ResubmitResponseDto> {
    const listing = await this.repository.findRawById(listingId);

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.hostId !== hostId) {
      throw new ForbiddenException('You do not own this listing');
    }

    if (listing.status !== ListingStatus.REJECTED) {
      throw new BadRequestException(
        'Only rejected listings can be resubmitted',
      );
    }

    try {
      await this.repository.updateStatus(listingId, ListingStatus.PENDING);
    } catch {
      throw new BadRequestException('Failed to resubmit listing');
    }

    return { success: true };
  }

  async pause(listingId: string, hostId: string): Promise<ResubmitResponseDto> {
    const listing = await this.repository.findRawById(listingId);

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.hostId !== hostId) {
      throw new ForbiddenException('You do not own this listing');
    }

    if (listing.status !== ListingStatus.PUBLISHED) {
      throw new BadRequestException('Only published listings can be paused');
    }

    try {
      await this.repository.updateStatus(listingId, ListingStatus.PAUSED);
    } catch {
      throw new BadRequestException('Failed to pause listing');
    }

    return { success: true };
  }
}
