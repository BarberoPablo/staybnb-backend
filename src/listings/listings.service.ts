import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Listing, ListingStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  findByHostId(hostId: string): Promise<Listing[]> {
    return this.prisma.listing.findMany({
      where: { hostId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findById(hostId: string, id: string): Promise<Listing> {
    const listing = await this.prisma.listing.findFirst({
      where: { hostId, id },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return listing;
  }

  async resubmit(listingId: string, hostId: string): Promise<Listing> {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

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

    return this.prisma.listing.update({
      where: { id: listingId },
      data: {
        status: ListingStatus.PENDING,
      },
    });
  }
}
