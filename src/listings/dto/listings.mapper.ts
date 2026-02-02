import {
  parseLocationFromDBToResponse,
  parsePromotionsFromDBToResponse,
} from 'src/host/draft-listings/draft-listings.mapper';
import { ListingResponseDto } from './listing-response.dto';
import { ListingWithAmenities } from './listing.types';

export function mapListingToResponse(
  listing: ListingWithAmenities,
): ListingResponseDto {
  const location = parseLocationFromDBToResponse(listing.location);
  const promotions = parsePromotionsFromDBToResponse(listing.promotions);

  return {
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

    amenities: listing.amenities.map((amenity) => amenity.amenityId),

    status: listing.status,

    createdAt: listing.createdAt,
    updatedAt: listing.updatedAt,
  };
}
