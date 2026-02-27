import {
  parseLocationFromDBToResponse,
  parsePromotionsFromDBToResponse,
} from '@src/host/draft-listings/draft-listings.mapper';
import { ListingResponseDto } from './listing-response.dto';
import { ListingWithOptionalRelations } from './listing.types';

export function mapListingToResponse(
  listing: ListingWithOptionalRelations,
): ListingResponseDto {
  const location = parseLocationFromDBToResponse(listing.location);
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

  if (listing._count && typeof listing._count.reservations === 'number') {
    response.counts = {
      reservations: listing._count.reservations,
    };
  }

  return response;
}
