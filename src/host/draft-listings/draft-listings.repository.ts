import { Injectable, NotFoundException } from '@nestjs/common';
import { DraftListing as PrismaDraftListing } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { DraftListing } from './dto/draft-listing.types';
import {
  mapDraftToListing,
  sanitizeDraftListing,
} from './mappers/draft-listings.mappers';

@Injectable()
export class DraftListingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findDraftOrThrow(
    hostId: string,
    draftId: string,
  ): Promise<DraftListing> {
    const draft = await this.prisma.draftListing.findUnique({
      where: { id: draftId, hostId },
    });

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    return sanitizeDraftListing(draft);
  }

  async publishDraft(draft: DraftListing): Promise<{ listingId: string }> {
    return this.prisma.$transaction(async (tx) => {
      const listing = await tx.listing.create({
        data: mapDraftToListing(draft),
      });

      if (draft.amenities?.length) {
        await tx.listingAmenity.createMany({
          data: draft.amenities.map((amenityId) => ({
            listingId: listing.id,
            amenityId,
          })),
        });
      }

      await tx.draftListing.delete({
        where: { id: draft.id },
      });

      return { listingId: listing.id };
    });
  }
}
