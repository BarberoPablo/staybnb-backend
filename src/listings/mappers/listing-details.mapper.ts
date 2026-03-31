import { parseLocationFromDBToResponse } from '@src/host/draft-listings/mappers/draft-listings.mappers';
import { ListingDetailsResponseDto } from '../dto/listing-details-response.dto';
import { ListingDetails } from '../types/listing.types';
import { parsePromotionsFromDBToResponse } from './listings.mapper';

export function mapListingDetailsToResponse(
  listing: ListingDetails,
): ListingDetailsResponseDto {
  const location = parseLocationFromDBToResponse(
    listing.location,
    listing.country,
    listing.city,
    listing.lat,
    listing.lng,
  );

  const promotions = parsePromotionsFromDBToResponse(listing.promotions);

  const response: ListingDetailsResponseDto = {
    id: listing.id,
    title: listing.title,
    description: listing.description,
    nightPrice: listing.nightPrice,
    images: listing.images,
    location,
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
    propertyType: listing.propertyType,
    privacyType: listing.privacyType,
    promotions,
    status: listing.status,
    ratingAvg: listing.ratingAvg,
    ratingCount: listing.ratingCount,
    createdAt: listing.createdAt,
    updatedAt: listing.updatedAt,
    amenities: listing.amenities.map((amenity) => amenity.amenityId),
    host: {
      id: listing.host.id,
      firstName: listing.host.firstName,
      avatarUrl: listing.host.avatarUrl ?? undefined,
    },
    reviews: listing.reviews.map((review) => ({
      id: review.id,
      userId: review.profile.id,
      score: review.score,
      message: review.message,
      imageUrl: review.profile.avatarUrl ?? undefined,
    })),
    reservations: listing.reservations.map((res) => ({
      id: res.id,
      startDate: res.startDate,
      endDate: res.endDate,
    })),
  };

  return response;
}
