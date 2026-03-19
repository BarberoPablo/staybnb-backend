import {
  parseLocationFromDBToResponse,
  parsePromotionsFromDBToResponse,
} from '@src/host/draft-listings/mappers/draft-listings.mappers';
import { ListingCardDto } from '../dto/listing-card.dto';
import { ListingResponseDto } from '../dto/listing-response.dto';
import {
  HomeListingLocation,
  ListingLocation,
  ListingWithOptionalRelations,
  PrismaFeaturedListing,
} from '../types/listing.types';

export function mapListingToResponse(
  listing: ListingWithOptionalRelations,
): ListingResponseDto {
  const location = parseLocationFromDBToResponse(
    listing.location,
    listing.country,
    listing.city,
    listing.lat,
    listing.lng,
  );
  const promotions = parsePromotionsFromDBToResponse(listing.promotions);

  const response: ListingResponseDto = {
    id: listing.id,
    title: listing.title,
    description: listing.description,
    nightPrice: listing.nightPrice,
    images: listing.images,

    structure: {
      bedrooms: listing.bedrooms,
      beds: listing.beds,
      bathrooms: listing.bathrooms,
      guests: listing.maxGuests,
    },

    guestLimits: {
      adults: { min: 1, max: listing.maxAdults },
      children: { min: 0, max: listing.maxChildren },
      infant: { min: 0, max: listing.maxInfants },
      pets: { min: 0, max: listing.maxPets },
    },

    location,
    promotions,

    propertyType: listing.propertyType,
    privacyType: listing.privacyType,

    status: listing.status,
    ratingAvg: listing.ratingAvg,
    ratingCount: listing.ratingCount,

    createdAt: listing.createdAt,
    updatedAt: listing.updatedAt,
  };

  if (listing.amenities) {
    response.amenities = listing.amenities.map((amenity) => amenity.amenityId);
  }

  if (listing.host) {
    response.host = listing.host;
  }

  if (listing.reservations) {
    response.reservations = listing.reservations;
  }

  if (listing.reviews) {
    response.reviews = listing.reviews;
  }

  if (listing._count) {
    const counts: ListingResponseDto['counts'] = {};

    if (typeof listing._count.reservations === 'number') {
      counts.reservations = listing._count.reservations;
    }

    if (typeof listing._count.favorites === 'number') {
      counts.favorites = listing._count.favorites;
    }

    if (Object.keys(counts).length > 0) {
      response.counts = counts;
    }
  }

  return response;
}

/**
 * Runtime type guard (REAL validation, not a cast)
 */
export function assertListingLocation(
  location: unknown,
): asserts location is ListingLocation {
  if (!location || typeof location !== 'object')
    throw new Error('Invalid listing location shape');

  const loc = location as Record<string, unknown>;

  if (
    !(
      typeof loc.formatted === 'string' &&
      typeof loc.housenumber === 'string' &&
      typeof loc.street === 'string' &&
      typeof loc.state === 'string' &&
      typeof loc.postcode === 'string' &&
      typeof loc.timezone === 'string'
    )
  )
    throw new Error('Invalid listing location shape');
}

export function mapToListingCardDto(
  listing: PrismaFeaturedListing,
): ListingCardDto {
  const location = listing.location as HomeListingLocation;

  return {
    id: listing.id,
    title: listing.title,
    nightPrice: listing.nightPrice,
    images: listing.images,
    ratingAvg: listing.ratingAvg,
    propertyType: listing.propertyType,
    privacyType: listing.privacyType,
    location: {
      city: listing.city,
      country: listing.country,
      state: location.state,
      lat: listing.lat,
      lng: listing.lng,
    },
  };
}
