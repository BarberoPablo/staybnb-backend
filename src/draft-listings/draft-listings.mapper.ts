import { DraftListing } from '@prisma/client';
import { DraftListingDto } from './dto/draft-listing.dto';

export function mapDraftListingToDto(draft: DraftListing): DraftListingDto {
  return {
    id: draft.id,
    title: draft.title ?? undefined,
    description: draft.description ?? undefined,
    pricePerNight: draft.pricePerNight?.toNumber(),
    createdAt: draft.createdAt,
    updatedAt: draft.updatedAt,
  };
}
