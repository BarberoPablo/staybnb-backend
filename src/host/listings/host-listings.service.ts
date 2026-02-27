import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListingStatus } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class HostListingsService {
  constructor(private readonly prisma: PrismaService) {}

  findByHostId(hostId: string) {
    return this.prisma.listing.findMany({
      where: { hostId },
      include: {
        amenities: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findById(hostId: string, id: string) {
    const listing = await this.prisma.listing.findFirst({
      where: { hostId, id },
      include: {
        amenities: true,
      },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return listing;
  }

  async resubmit(listingId: string, hostId: string) {
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

    try {
      await this.prisma.listing.update({
        where: { id: listingId },
        data: {
          status: ListingStatus.PENDING,
        },
      });
    } catch {
      throw new BadRequestException('Failed to resubmit listing');
    }

    return { success: true };
  }
}
