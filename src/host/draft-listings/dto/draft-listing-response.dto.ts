import {
  DraftListingStructure,
  GuestLimits,
  ListingLocationResponse,
  PrivacyType,
  Promotion,
  PropertyType,
} from '@src/listings/types/listing.types';

export class DraftListingResponseDto {
  id: string;
  hostId: string;
  propertyType: PropertyType;
  privacyType: PrivacyType;
  location: ListingLocationResponse;
  checkInTime: string;
  checkOutTime: string;
  title: string;
  description: string;
  nightPrice: number;
  promotions: Promotion[];
  structure: DraftListingStructure;
  guestLimits: GuestLimits;
  amenities: string[];
  images: string[];
  minCancelDays: number;
  currentStep: number;
  visitedSteps: number[];
  createdAt: Date;
  updatedAt: Date;
}
