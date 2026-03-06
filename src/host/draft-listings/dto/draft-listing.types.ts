import { DraftListing as PrismaDraftListing } from '@prisma/client';
import { ListingLocationResponse } from '@src/listings/types/listing.types';

export type DraftListing = Omit<PrismaDraftListing, 'location'> & {
  location: ListingLocationResponse;
};
