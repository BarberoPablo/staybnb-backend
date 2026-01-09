import { Listing } from '@prisma/client';
import { ListingDto } from './listing.dto';

export function mapListingToDto(listing: Listing): ListingDto {
  return {
    id: listing.id,
    title: listing.title,
    description: listing.description,
    pricePerNight: listing.pricePerNight.toNumber(),
    status: listing.status,
    createdAt: listing.createdAt,
    updatedAt: listing.updatedAt,
  };
}
