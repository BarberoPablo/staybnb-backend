import { Prisma } from '@prisma/client';
import { parseLocationFromDBToResponse } from '@src/host/draft-listings/mappers/draft-listings.mappers';
import { ListingCardDto } from '../dto/listing-card.dto';
import { ListingCheckoutResponseDto } from '../dto/listing-checkout-response.dto';
import {
  ListingCountsDto,
  ListingResponseDto,
} from '../dto/listing-response.dto';
import { ListingCheckout } from '../repositories/listing.repository.types';
import {
  ListingLocationFromDB,
  ListingWithOptionalRelations,
  PrismaFeaturedListing,
  Promotion,
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
    response.host = {
      id: listing.host.id,
      firstName: listing.host.firstName,
      lastName: listing.host.lastName,
      avatarUrl: listing.host.avatarUrl ?? undefined,
      bio: listing.host.bio ?? undefined,
    };
  }

  if (listing.reservations) {
    response.reservations = listing.reservations.map((res) => ({
      id: res.id,
      startDate: res.startDate,
      endDate: res.endDate,
    }));
  }

  if (listing.reviews) {
    response.reviews = listing.reviews.map((rev) => ({
      id: rev.id,
      score: rev.score,
      message: rev.message,
      createdAt: rev.createdAt,
      profile: {
        id: rev.profile.id,
        firstName: rev.profile.firstName,
        lastName: rev.profile.lastName,
        avatarUrl: rev.profile.avatarUrl ?? undefined,
        bio: rev.profile.bio ?? undefined,
      },
    }));
  }

  if (listing._count) {
    const counts: ListingCountsDto = {};

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

export function mapToListingCheckoutResponse(
  listing: ListingCheckout,
): ListingCheckoutResponseDto {
  const location = listing.location as { formatted: string };

  if (!location || typeof location !== 'object') {
    throw new Error('Invalid location');
  }

  return {
    id: listing.id,
    title: listing.title,
    status: listing.status,
    ratingAvg: listing.ratingAvg,
    ratingCount: listing.ratingCount,
    formattedLocation: location.formatted,
    propertyType: listing.propertyType,
    privacyType: listing.privacyType,
    image: listing.images[0],
    checkInTime: listing.checkInTime,
    checkOutTime: listing.checkOutTime,
    promotions: parsePromotionsFromDBToResponse(listing.promotions),
    minCancelDays: listing.minCancelDays,
    nightPrice: listing.nightPrice,
  };
}

/**
 * Runtime type guard (REAL validation, not a cast)
 */
export function assertListingLocation(
  location: unknown,
): asserts location is ListingLocationFromDB {
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
  const location = listing.location as ListingLocationFromDB;

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

/**
 * Runtime guard for promotions stored as Json in DraftListing.
 */
export function parsePromotionsFromDBToResponse(
  promotion: Prisma.JsonValue,
): Promotion[] {
  if (!promotion || !Array.isArray(promotion)) {
    throw new Error('Invalid promotion');
  }
  return promotion as Promotion[];
}
