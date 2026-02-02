import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DraftListing } from '@prisma/client';
import { ListingLocation } from 'src/listings/dto/listing.types';
import { PrismaService } from 'src/prisma/prisma.service';
import { completedDraftListingTemplate } from './draft-listing.utils';
import { DRAFT_LISTING_STEP_FIELDS } from './draft-listings.steps';
import { UpdateDraftListingDto } from './dto/draft-listing-update.dto';
import {
  parseLocationFromDBToResponse,
  parsePromotionsFromDBToResponse,
} from './draft-listings.mapper';

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

    this.assertDraftIsComplete(draft);

    return this.prisma.$transaction(async (tx) => {
      const listing = await tx.listing.create({
        data: this.mapDraftToListing(draft),
      });

      if (
        draft.amenities &&
        Array.isArray(draft.amenities) &&
        draft.amenities.length > 0
      ) {
        await tx.listingAmenity.createMany({
          data: draft.amenities.map((amenityId) => ({
            listingId: listing.id,
            amenityId: amenityId,
          })),
        });
      }

      await tx.draftListing.delete({
        where: { id: draft.id },
      });

      return { listingId: listing.id };
    });
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

  private assertDraftIsComplete(draft: DraftListing) {
    const requiredFields: (keyof DraftListing)[] = [
      'title',
      'description',
      'nightPrice',
      'images',
      'beds',
      'bedrooms',
      'bathrooms',
      'maxGuests',
      'maxAdults',
      'maxChildren',
      'maxInfants',
      'maxPets',
      'location',
      'checkInTime',
      'checkOutTime',
      'minCancelDays',
      'privacyType',
      'propertyType',
    ];
    const requiredLocationFields: (keyof ListingLocation)[] = [
      'lat',
      'lng',
      'city',
      'state',
      'street',
      'country',
      'postcode',
      'timezone',
      'formatted',
      'housenumber',
    ];

    for (const field of requiredFields) {
      if (
        draft[field] === null ||
        draft[field] === undefined ||
        (Array.isArray(draft[field]) && draft[field].length === 0)
      ) {
        throw new BadRequestException(
          `Draft listing is incomplete. Missing: ${field}`,
        );
      }
    }

    for (const field of requiredLocationFields) {
      if (
        draft.location == null ||
        draft.location == undefined ||
        draft.location[field] === null ||
        draft.location[field] === undefined ||
        (Array.isArray(draft.location[field]) &&
          draft.location[field].length === 0)
      ) {
        throw new BadRequestException(
          `Draft listing location is incomplete. Missing: ${field}`,
        );
      }
    }
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
