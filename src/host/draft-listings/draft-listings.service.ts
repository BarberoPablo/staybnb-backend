import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, DraftListing as PrismaDraftListing } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { completedDraftListingTemplate } from './draft-listing.utils';
import {
  parseLocationFromDBToResponse,
  parsePromotionsFromDBToResponse,
} from './draft-listings.mapper';
import { DRAFT_LISTING_STEP_FIELDS } from './draft-listings.steps';
import { UpdateDraftListingDto } from './dto/draft-listing-update.dto';
import { DraftListing } from './dto/draft-listing.types';
import { sanitizeDraftListing } from './mappers/draft-listings.mappers';
import { validateDraftForCompletion } from './validation/validate-complete-draft';

@Injectable()
export class DraftListingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(hostId: string): Promise<PrismaDraftListing> {
    return this.prisma.draftListing.create({
      data: { hostId },
    });
  }

  async complete(hostId: string, draftId: string) {
    const draft = await this.prisma.draftListing.findUnique({
      where: { id: draftId, hostId },
    });

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    validateDraftForCompletion(draft);
    const verifiedDraft = sanitizeDraftListing(draft);

    try {
      return await this.prisma.$transaction(async (tx) => {
        const listing = await tx.listing.create({
          data: this.mapDraftToListing(verifiedDraft),
        });

        if (verifiedDraft.amenities?.length) {
          const count = await tx.amenity.count({
            where: { id: { in: verifiedDraft.amenities } },
          });

          if (count !== verifiedDraft.amenities.length) {
            throw new BadRequestException('Invalid amenities');
          }

          await tx.listingAmenity.createMany({
            data: verifiedDraft.amenities.map((amenityId) => ({
              listingId: listing.id,
              amenityId,
            })),
          });
        }

        await tx.draftListing.delete({
          where: { id: verifiedDraft.id },
        });

        return { listingId: listing.id };
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException('Invalid amenities');
      }
      throw error;
    }
  }

  findAll(hostId: string): Promise<PrismaDraftListing[]> {
    return this.prisma.draftListing.findMany({
      where: { hostId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async find(hostId: string, id: string): Promise<PrismaDraftListing> {
    const draft = await this.prisma.draftListing.findFirst({
      where: { id, hostId },
    });

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    return draft;
  }

  async update(
    hostId: string,
    draftId: string,
    step: number,
    dto: UpdateDraftListingDto,
  ): Promise<void> {
    const allowedFields = DRAFT_LISTING_STEP_FIELDS[step];

    if (!allowedFields) {
      throw new BadRequestException('Invalid step');
    }

    const draft = await this.prisma.draftListing.findFirst({
      where: { id: draftId, hostId },
      select: { visitedSteps: true },
    });

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    const visitedSteps = draft.visitedSteps.includes(step)
      ? draft.visitedSteps
      : [...draft.visitedSteps, step];

    await this.prisma.draftListing.update({
      where: { id: draftId, hostId },
      data: {
        ...dto,
        currentStep: step,
        visitedSteps: {
          set: visitedSteps,
        },
      },
    });
  }

  /**
   * Maps a PrismaDraftListing to a Listing creation object. We can safely assume
   * that the draft is complete if we called `validateDraftForCompletion` before.
   * @param draft The draft listing to map
   */
  private mapDraftToListing(draft: DraftListing) {
    const location = parseLocationFromDBToResponse(
      draft.location,
      draft.location.country,
      draft.location.city,
      draft.location.lat,
      draft.location.lng,
    );
    const promotions = parsePromotionsFromDBToResponse(draft.promotions);
    return {
      host: {
        connect: { id: draft.hostId },
      },

      title: draft.title,
      description: draft.description,
      nightPrice: draft.nightPrice,
      images: draft.images,

      beds: draft.beds,
      bedrooms: draft.bedrooms,
      bathrooms: draft.bathrooms,

      maxGuests: draft.maxGuests,
      maxAdults: draft.maxAdults,
      maxChildren: draft.maxChildren,
      maxInfants: draft.maxInfants,
      maxPets: draft.maxPets,

      city: location.city,
      country: location.country,
      lat: location.lat,
      lng: location.lng,

      location: {
        formatted: location.formatted,
        housenumber: location.housenumber,
        street: location.street,
        state: location.state,
        postcode: location.postcode,
        timezone: location.timezone,
      },
      promotions,

      checkInTime: draft.checkInTime,
      checkOutTime: draft.checkOutTime,
      minCancelDays: draft.minCancelDays,

      propertyType: draft.propertyType,
      privacyType: draft.privacyType,
    };
  }

  async autoComplete(draftId: string, hostId: string) {
    const draft = await this.prisma.draftListing.findFirst({
      where: { id: draftId, hostId },
    });

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    await this.prisma.draftListing.update({
      where: { id: draftId, hostId },
      data: {
        ...completedDraftListingTemplate,
      },
    });

    return { success: true };
  }

  async remove(hostId: string, draftId: string): Promise<void> {
    const draft = await this.prisma.draftListing.findFirst({
      where: { id: draftId, hostId },
    });

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    await this.prisma.draftListing.delete({
      where: { id: draftId },
    });
  }
}
