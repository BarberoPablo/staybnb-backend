import { parsePromotionsFromDBToResponse } from '@src/listings/mappers/listings.mapper';
import { ListingLocationFromDB } from '@src/listings/types/listing.types';
import {
  HostListingDetailsResponseDto,
  HostListingResponseDto,
} from '../dto/host-listings.dto';
import {
  PrismaHostListing,
  PrismaHostListingDetails,
} from '../types/host-listing.types';

export function mapHostListingToResponse(
  listing: PrismaHostListing,
): HostListingResponseDto {
  return {
    id: listing.id,
    status: listing.status,
    images: listing.images,
    title: listing.title,
    description: listing.description,
    location: {
      city: listing.city,
      country: listing.country,
    },
    nightPrice: listing.nightPrice,
    propertyType: listing.propertyType,
    privacyType: listing.privacyType,
  };
}

export function mapHostListingDetailsToResponse(
  listing: PrismaHostListingDetails,
): HostListingDetailsResponseDto {
  const location = listing.location as ListingLocationFromDB;

  const promotions = parsePromotionsFromDBToResponse(listing.promotions);

  const structure = {
    beds: listing.beds,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    guests: listing.maxGuests,
  };

  const guestLimits = {
    adults: { min: 1, max: listing.maxAdults },
    children: { min: 0, max: listing.maxChildren },
    infant: { min: 0, max: listing.maxInfants },
    pets: { min: 0, max: listing.maxPets },
  };

  const amenities = listing.amenities.map((amenity) => amenity.amenityId);

  return {
    id: listing.id,
    title: listing.title,
    description: listing.description,
    nightPrice: listing.nightPrice,
    propertyType: listing.propertyType,
    privacyType: listing.privacyType,
    checkInTime: listing.checkInTime,
    checkOutTime: listing.checkOutTime,
    minCancelDays: listing.minCancelDays,
    promotions,
    images: listing.images,
    structure,
    guestLimits,
    location: {
      lat: listing.lat,
      lng: listing.lng,
      city: listing.city,
      country: listing.country,
      state: location.state,
      street: location.street,
      postcode: location.postcode,
      timezone: location.timezone,
      formatted: location.formatted,
      housenumber: location.housenumber,
    },
    amenities,
  };
}
