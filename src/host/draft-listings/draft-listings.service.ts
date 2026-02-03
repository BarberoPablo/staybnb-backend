import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DraftListing, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { completedDraftListingTemplate } from './draft-listing.utils';
import {
  parseLocationFromDBToResponse,
  parsePromotionsFromDBToResponse,
} from './draft-listings.mapper';
import { DRAFT_LISTING_STEP_FIELDS } from './draft-listings.steps';
import { UpdateDraftListingDto } from './dto/draft-listing-update.dto';
import { validateDraftForCompletion } from './validation/validate-complete-draft';

@Injectable()
export class DraftListingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(hostId: string): Promise<DraftListing> {
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

    try {
      return await this.prisma.$transaction(async (tx) => {
        const listing = await tx.listing.create({
          data: this.mapDraftToListing(draft),
        });

        if (draft.amenities?.length) {
          const count = await tx.amenity.count({
            where: { id: { in: draft.amenities } },
          });

          if (count !== draft.amenities.length) {
            throw new BadRequestException('Invalid amenities');
          }

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

  findAll(hostId: string): Promise<DraftListing[]> {
    return this.prisma.draftListing.findMany({
      where: { hostId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async find(hostId: string, id: string): Promise<DraftListing> {
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

    const data = this.mapUpdateToDB(dto, allowedFields);

    await this.prisma.draftListing.update({
      where: { id: draftId, hostId },
      data: {
        ...data,
        currentStep: step,
        visitedSteps: {
          set: visitedSteps,
        },
      },
    });
  }

  private mapUpdateToDB(
    dto: UpdateDraftListingDto,
    allowedFields: (keyof UpdateDraftListingDto)[],
  ) {
    const data: any = {};

    for (const field of allowedFields) {
      if (dto[field] === undefined) continue;

      switch (field) {
        case 'location': {
          const loc = dto.location!;
          data.lat = loc.lat;
          data.lng = loc.lng;
          data.city = loc.city;
          data.country = loc.country;
          data.location = {
            state: loc.state,
            street: loc.street,
            postcode: loc.postcode,
            timezone: loc.timezone,
            formatted: loc.formatted,
            housenumber: loc.housenumber,
          };
          break;
        }

        case 'structure': {
          const s = dto.structure!;
          data.maxGuests = s.guests;
          data.bedrooms = s.bedrooms;
          data.beds = s.beds;
          data.bathrooms = s.bathrooms;
          break;
        }

        case 'guestLimits': {
          const g = dto.guestLimits!;
          data.maxAdults = g.adults.max;
          data.maxChildren = g.children.max;
          data.maxInfants = g.infant.max;
          data.maxPets = g.pets.max;
          break;
        }

        default:
          data[field] = dto[field];
      }
    }

    return data;
  }

  /**
   * Maps a DraftListing to a Listing creation object. We can safely assume
   * that the draft is complete if we called `assertDraftIsComplete` before.
   * @param draft The draft listing to map
   */
  private mapDraftToListing(draft: DraftListing) {
    const location = parseLocationFromDBToResponse(draft.location);
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

  async autoComplete(draftId, hostId: string) {
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
}
