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
  async approve(id: string): Promise<Listing> {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.status !== ListingStatus.PENDING) {
      throw new BadRequestException('Only pending listings can be approved');
    }

    return this.prisma.listing.update({
      where: { id },
      data: {
        status: ListingStatus.PUBLISHED,
      },
    });
  }
}
