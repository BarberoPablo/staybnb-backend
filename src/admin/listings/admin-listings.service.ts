import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Listing, ListingStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminListingsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all listings pending approval
   */
  findPending(): Promise<Listing[]> {
    return this.prisma.listing.findMany({
      where: {
        status: ListingStatus.PENDING,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  /**
   * Approve a pending listing
   */
  async approve(listingId: string, adminId: string): Promise<Listing> {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.status !== ListingStatus.PENDING) {
      throw new BadRequestException('Only pending listings can be approved');
    }

    const [updatedListing] = await this.prisma.$transaction([
      this.prisma.listing.update({
        where: { id: listingId },
        data: { status: 'PUBLISHED' },
      }),
      this.prisma.listingModeration.create({
        data: {
          listingId,
          adminId,
          action: 'APPROVED',
        },
      }),
    ]);

    return updatedListing;
  }

  /**
   * Reject a pending listing
   */
  async reject(
    listingId: string,
    adminId: string,
    reason: string,
  ): Promise<Listing> {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing || listing.status !== 'PENDING') {
      throw new BadRequestException('Listing cannot be rejected');
    }

    const [updatedListing] = await this.prisma.$transaction([
      this.prisma.listing.update({
        where: { id: listingId },
        data: { status: 'REJECTED' },
      }),
      this.prisma.listingModeration.create({
        data: {
          listingId,
          adminId,
          action: 'REJECTED',
          reason,
        },
      }),
    ]);

    return updatedListing;
  }
}
