import { HostListingResponseDto } from '../dto/host-listings.dto';
import {
  HostListingLocation,
  PrismaHostListing,
} from '../types/host-listing.types';

export function mapHostListingToResponse(
  listing: PrismaHostListing,
): HostListingResponseDto {
  const location = listing.location as HostListingLocation;

  return {
    id: listing.id,
    status: listing.status,
    images: listing.images,
    title: listing.title,
    description: listing.description,
    location: {
      city: location.city,
      country: location.country,
    },
    nightPrice: listing.nightPrice,
    propertyType: listing.propertyType,
    privacyType: listing.privacyType,
  };
}
