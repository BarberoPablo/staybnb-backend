import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { DraftListing } from '../dto/draft-listing.types';
import {
  mapDraftToListing,
  sanitizeDraftListing,
} from '../mappers/draft-listings.mappers';

@Injectable()
export class DraftListingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(hostId: string): Promise<{ listingId: string }> {
    const { id } = await this.prisma.draftListing.create({
      data: { hostId },
    });
    return { listingId: id };
  }

  async findAll(hostId: string): Promise<DraftListing[]> {
    const drafts = await this.prisma.draftListing.findMany({
      where: { hostId },
      orderBy: { updatedAt: 'desc' },
    });
    return drafts.map((draft) => sanitizeDraftListing(draft));
  }

  async findById(hostId: string, id: string): Promise<DraftListing | null> {
    const draft = await this.prisma.draftListing.findFirst({
      where: { id, hostId },
    });

    if (!draft) return null;

    return sanitizeDraftListing(draft);
  }

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

  async update(
    hostId: string,
    draftId: string,
    data: Prisma.DraftListingUpdateInput,
  ): Promise<void> {
    await this.prisma.draftListing.update({
      where: { id: draftId, hostId },
      data,
    });
  }

  async delete(hostId: string, draftId: string): Promise<void> {
    await this.prisma.draftListing.delete({
      where: { id: draftId, hostId },
    });
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
