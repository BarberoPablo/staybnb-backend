import { Prisma, DraftListing as PrismaDraftListing } from '@prisma/client';
import { parsePromotionsFromDBToResponse } from '@src/listings/mappers/listings.mapper';
import {
  ListingLocation,
  ListingLocationResponse,
} from '@src/listings/types/listing.types';
import { DraftListingResponseDto } from '../dto/draft-listing-response.dto';
import { DraftListing } from '../dto/draft-listing.types';

export function mapDraftListingDbToResponse(
  draft: PrismaDraftListing,
): DraftListingResponseDto {
  const promotionsResponse = parsePromotionsFromDBToResponse(draft.promotions);

  const structure = {
    beds: draft.beds,
    bedrooms: draft.bedrooms,
    bathrooms: draft.bathrooms,
    guests: draft.maxGuests,
  };
  const guestLimits = {
    adults: { min: 1, max: draft.maxAdults },
    children: { min: 0, max: draft.maxChildren },
    infant: { min: 0, max: draft.maxInfants },
    pets: { min: 0, max: draft.maxPets },
  };

  return {
    id: draft.id,
    hostId: draft.hostId,
    propertyType: draft.propertyType,
    privacyType: draft.privacyType,
    location: draft.location as ListingLocationResponse,
    checkInTime: draft.checkInTime,
    checkOutTime: draft.checkOutTime,
    title: draft.title,
    description: draft.description,
    nightPrice: draft.nightPrice,
    promotions: promotionsResponse,
    structure,
    guestLimits,
    amenities: draft.amenities,
    images: draft.images,
    minCancelDays: draft.minCancelDays,
    currentStep: draft.currentStep,
    visitedSteps: draft.visitedSteps,
    createdAt: draft.createdAt,
    updatedAt: draft.updatedAt,
  };
}

export function sanitizeDraftListing(
  listing: Prisma.DraftListingGetPayload<any>,
): DraftListing {
  assertDraftListingLocation(listing.location);

  return {
    ...listing,
    location: listing.location,
  };
}

export function assertDraftListingLocation(
  location: unknown,
): asserts location is ListingLocationResponse {
  if (!location || typeof location !== 'object')
    throw new Error('Invalid draft listing location shape');

  const loc = location as Record<string, unknown>;

  if (
    !(
      typeof loc.country === 'string' &&
      typeof loc.city === 'string' &&
      typeof loc.lat === 'number' &&
      typeof loc.lng === 'number' &&
      typeof loc.formatted === 'string' &&
      typeof loc.housenumber === 'string' &&
      typeof loc.street === 'string' &&
      typeof loc.state === 'string' &&
      typeof loc.postcode === 'string' &&
      typeof loc.timezone === 'string'
    )
  )
    throw new Error('Invalid draft listing location shape');
}

/**
 * Runtime guard between Prisma JsonValue and the API response.
 */
export function parseLocationFromDBToResponse(
  location: unknown,
  country: string,
  city: string,
  lat: number,
  lng: number,
): ListingLocationResponse {
  if (!location || typeof location !== 'object') {
    throw new Error('Invalid location');
  }

  const loc = location as ListingLocation;

  return {
    country,
    city,
    lat,
    lng,
    formatted: loc.formatted,
    housenumber: loc.housenumber,
    street: loc.street,
    state: loc.state,
    postcode: loc.postcode,
    timezone: loc.timezone,
  };
}

export function mapDraftToListing(
  draft: DraftListing,
): Prisma.ListingCreateInput {
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

    city: draft.location.city,
    country: draft.location.country,
    lat: draft.location.lat,
    lng: draft.location.lng,

    location: {
      formatted: draft.location.formatted,
      housenumber: draft.location.housenumber,
      street: draft.location.street,
      state: draft.location.state,
      postcode: draft.location.postcode,
      timezone: draft.location.timezone,
    },
    promotions,

    checkInTime: draft.checkInTime,
    checkOutTime: draft.checkOutTime,
    minCancelDays: draft.minCancelDays,

    propertyType: draft.propertyType,
    privacyType: draft.privacyType,
  };
}
