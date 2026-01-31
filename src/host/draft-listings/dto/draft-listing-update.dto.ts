import { PrivacyType, PropertyType } from '@prisma/client';
import { IsInt, IsObject, Min } from 'class-validator';
import {
  DraftListingLocation,
  DraftListingStructure,
  GuestLimits,
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
  location?: DraftListingLocation;
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
