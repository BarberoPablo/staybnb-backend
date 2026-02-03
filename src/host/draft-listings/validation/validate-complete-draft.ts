import { BadRequestException } from '@nestjs/common';
import { DraftListing } from '@prisma/client';
import { completeDraftListingSchema } from './complete-draft.schema';

export function validateDraftForCompletion(draft: DraftListing) {
  const result = completeDraftListingSchema.safeParse({
    ...draft,
    location: draft.location,
  });

  if (!result.success) {
    throw new BadRequestException('Draft listing is incomplete');
  }

  return result.data;
}
