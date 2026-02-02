import { Prisma, DraftListing as PrismaDraftListing } from '@prisma/client';
import {
  DraftListingLocationDB,
  ListingLocation,
  Promotion,
} from 'src/listings/dto/listing.types';
import { DraftListingResponseDto } from './dto/draft-listing-response.dto';

export function mapDraftListingDbToResponse(
  draft: PrismaDraftListing,
): DraftListingResponseDto {
  const locationDB = parseLocation(draft.location);
  const promotionsDB = parsePromotion(draft.promotions);

  const location: ListingLocation = {
    formatted: locationDB.formatted,
    housenumber: locationDB.housenumber,
    street: locationDB.street,
    state: locationDB.state,
    postcode: locationDB.postcode,
    timezone: locationDB.timezone,
    city: draft.city,
    country: draft.country,
    lat: draft.lat,
    lng: draft.lng,
  };
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
    location,
    checkInTime: draft.checkInTime,
    checkOutTime: draft.checkOutTime,
    title: draft.title,
    description: draft.description,
    nightPrice: draft.nightPrice,
    promotions: promotionsDB,
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

function parseLocation(location: Prisma.JsonValue): DraftListingLocationDB {
  if (!location || typeof location !== 'object') {
    throw new Error('Invalid location');
  }
  return location as DraftListingLocationDB;
}

function parsePromotion(promotion: Prisma.JsonValue): Promotion[] {
  if (!promotion || !Array.isArray(promotion)) {
    throw new Error('Invalid promotion');
  }
  return promotion as Promotion[];
}
