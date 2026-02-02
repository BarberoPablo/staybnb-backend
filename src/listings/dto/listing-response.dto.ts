import { ListingStatus, PrivacyType, PropertyType } from '@prisma/client';
import { ListingLocation, Promotion } from './listing.types';

export class ListingResponseDto {
  id: string;
  title: string;
  description: string;
  nightPrice: number;

  propertyType: PropertyType;
  privacyType: PrivacyType;

  location: ListingLocation;

  images: string[];
  promotions: Promotion[];

  structure: {
    bedrooms: number;
    beds: number;
    bathrooms: number;
    guests: number;
  };

  guestLimits: {
    adults: { min: number; max: number };
    children: { min: number; max: number };
    infant: { min: number; max: number };
    pets: { min: number; max: number };
  };

  amenities: string[];

  status: ListingStatus;

  createdAt: Date;
  updatedAt: Date;
}
