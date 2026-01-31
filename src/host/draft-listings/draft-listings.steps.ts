import { UpdateDraftListingDto } from './dto/draft-listing-update.dto';

export const DRAFT_LISTING_STEP_FIELDS: Record<
  number,
  (keyof UpdateDraftListingDto)[]
> = {
  0: ['propertyType'],
  1: ['privacyType'],
  2: ['location'],
  3: ['structure'],
  4: ['guestLimits'],
  5: ['amenities'],
  6: ['images'],
  7: ['title'],
  8: ['description'],
  9: ['nightPrice'],
  10: ['promotions'],
  11: ['checkInTime', 'checkOutTime'],
};
