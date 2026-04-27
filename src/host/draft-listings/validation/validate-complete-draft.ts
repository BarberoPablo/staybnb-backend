import { BadRequestException } from '@nestjs/common';
import { DraftListing } from '@prisma/client';
import { completeDraftListingSchema } from './complete-draft.schema';

/**
 * Structural validation of a draft listing for completion
 */
export function validateDraftStructureForCompletion(draft: DraftListing): void {
  const result = completeDraftListingSchema.safeParse({
    ...draft,
    location: draft.location,
  });

  if (!result.success) {
    throw new BadRequestException('Draft listing is incomplete');
  }
}
