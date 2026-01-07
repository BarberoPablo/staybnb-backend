import { Listing } from '@prisma/client';
import { ListingDto } from './listing.dto';

export function mapListingToDto(listing: Listing): ListingDto {
  return {
    id: listing.id,
    title: listing.title ?? undefined,
    description: listing.description ?? undefined,
    pricePerNight: listing.pricePerNight?.toNumber(),
    createdAt: listing.createdAt,
    updatedAt: listing.updatedAt,
  };
}
