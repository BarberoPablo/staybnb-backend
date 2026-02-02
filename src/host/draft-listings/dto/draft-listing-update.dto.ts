import { PrivacyType, PropertyType } from '@prisma/client';
import { IsInt, IsObject, Min } from 'class-validator';
import {
  DraftListingStructure,
  GuestLimits,
  ListingLocation,
  Promotion,
} from 'src/listings/dto/listing.types';

export class UpdateDraftListingDto {
  amenities?: string[];
  images?: string[];
  title?: string;
  description?: string;
  nightPrice?: number;
  checkInTime?: string;
  checkOutTime?: string;
  minCancelDays?: number;
  currentStep?: number;
  visitedSteps?: number[];
  propertyType?: PropertyType;
  privacyType?: PrivacyType;
  promotions?: Promotion[];
  location?: ListingLocation;
  structure?: DraftListingStructure;
  guestLimits?: GuestLimits;
}

export class PatchDraftListingBodyDto {
  @IsInt()
  @Min(0)
  step: number;

  @IsObject()
  data: UpdateDraftListingDto;
}
