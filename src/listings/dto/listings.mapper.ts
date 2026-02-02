import { ListingResponseDto } from './listing-response.dto';
import {
  ListingLocation,
  ListingWithAmenities,
  Promotion,
} from './listing.types';

export function mapListingToResponse(
  listing: ListingWithAmenities,
): ListingResponseDto {
  return {
    id: listing.id,
    title: listing.title,
    description: listing.description,
    nightPrice: listing.nightPrice,

    propertyType: listing.propertyType,
    privacyType: listing.privacyType,

    location: {
      city: listing.city,
      country: listing.country,
      lat: listing.lat,
      lng: listing.lng,
      ...(listing.location as Omit<
        ListingLocation,
        'city' | 'country' | 'lat' | 'lng'
      >),
    },

    images: listing.images,
    promotions: listing.promotions as Promotion[],

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

    amenities: listing.amenities.map((amenity) => amenity.amenityId),

    status: listing.status,

    createdAt: listing.createdAt,
    updatedAt: listing.updatedAt,
  };
}
