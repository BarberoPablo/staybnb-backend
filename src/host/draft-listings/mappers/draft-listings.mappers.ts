import { Prisma } from '@prisma/client';
import { DraftListing } from '../dto/draft-listing.types';
import { ListingLocationResponse } from '@src/listings/types/listing.types';

export function sanitizeDraftListing(
  listing: Prisma.DraftListingGetPayload<any>,
): DraftListing {
  assertDraftListingLocation(listing.location);

  return {
    ...listing,
    location: listing.location,
  };
}

export function assertDraftListingLocation(
  location: unknown,
): asserts location is ListingLocationResponse {
  if (!location || typeof location !== 'object')
    throw new Error('Invalid draft listing location shape');

  const loc = location as Record<string, unknown>;

  if (
    !(
      typeof loc.country === 'string' &&
      typeof loc.city === 'string' &&
      typeof loc.lat === 'number' &&
      typeof loc.lng === 'number' &&
      typeof loc.formatted === 'string' &&
      typeof loc.housenumber === 'string' &&
      typeof loc.street === 'string' &&
      typeof loc.state === 'string' &&
      typeof loc.postcode === 'string' &&
      typeof loc.timezone === 'string'
    )
  )
    throw new Error('Invalid draft listing location shape');
}
