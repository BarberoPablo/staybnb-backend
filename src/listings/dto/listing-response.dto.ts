import {
  ListingStatus,
  PrivacyType,
  Profile,
  PropertyType,
  Reservation,
  Review,
} from '@prisma/client';
import { ListingLocation, Promotion } from '../types/listing.types';

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

  status: ListingStatus;
  ratingAvg: number;
  ratingCount: number;

  createdAt: Date;
  updatedAt: Date;

  amenities?: string[];
  host?: Profile;
  reservations?: Reservation[];
  reviews?: Review[];
  counts?: ListingCountsDto;
}

export class ListingCountsDto {
  reservations?: number;
  favorites?: number;
}
