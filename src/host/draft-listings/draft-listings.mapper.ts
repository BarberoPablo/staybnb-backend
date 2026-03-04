import { Prisma, DraftListing as PrismaDraftListing } from '@prisma/client';
import {
  ListingLocation,
  ListingLocationResponse,
  Promotion,
} from '@src/listings/types/listing.types';
import { DraftListingResponseDto } from './dto/draft-listing-response.dto';

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

/**
 * Runtime guard between Prisma JsonValue and the API response.
 *
 * DraftListing stores `location` as Json to allow flexible, step-based editing.
 * Prisma therefore returns it as `JsonValue`, which provides no type safety.
 *
 * This function exists to:
 * - centralize the cast in one place
 * - fail fast if the persisted data is missing or corrupted
 * - avoid unsafe `as DraftListingLocationDB` usage scattered across the codebase
 *
 * IMPORTANT:
 * This does NOT transform data. It only validates the minimal shape and asserts the contract expected by the API.
 */
export function parseLocationFromDBToResponse(
  location: ListingLocation,
  country: string,
  city: string,
  lat: number,
  lng: number,
): ListingLocationResponse {
  if (!location || typeof location !== 'object') {
    throw new Error('Invalid location');
  }
  return {
    country,
    city,
    lat,
    lng,
    formatted: location.formatted,
    housenumber: location.housenumber,
    street: location.street,
    state: location.state,
    postcode: location.postcode,
    timezone: location.timezone,
  };
}

/**
 * Runtime guard for promotions stored as Json in DraftListing.
 *
 * Promotions are persisted as Json to keep DraftListing flexible, but the API expects a strongly-typed `Promotion[]`.
 *
 * This function enforces that boundary and prevents leaking, invalid or malformed Json data into the response layer.
 */
export function parsePromotionsFromDBToResponse(
  promotion: Prisma.JsonValue,
): Promotion[] {
  if (!promotion || !Array.isArray(promotion)) {
    throw new Error('Invalid promotion');
  }
  return promotion as Promotion[];
}
