import { HostListingResponseDto } from '../dto/host-listings.dto';
import { PrismaHostListing } from '../types/host-listing.types';

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
