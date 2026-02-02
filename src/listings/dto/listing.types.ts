import { Prisma } from '@prisma/client';

export type DraftListingLocation = {
  country: string;
  city: string;
  lat: number;
  lng: number;
  state: string;
  street: string;
  postcode: string;
  timezone: string;
  formatted: string;
  housenumber: string;
};

export type ListingLocation = {
  country: string;
  city: string;
  lat: number;
  lng: number;
  formatted: string;
  housenumber: string;
  street: string;
  state: string;
  postcode: string;
  timezone: string;
};

export const propertyTypes = ['HOUSE', 'APARTMENT', 'CABIN', 'BOAT'] as const;
export type PropertyType = (typeof propertyTypes)[number];

export const privacyTypes = ['ENTIRE', 'PRIVATE', 'SHARED'] as const;
export type PrivacyType = (typeof privacyTypes)[number];

export type Promotion = {
  minNights: number;
  discountPercentage: number;
  description: string;
};

export type DraftListingStructure = {
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
};

export type GuestLimits = {
  adults: { min: number; max: number };
  children: { min: number; max: number };
  infant: { min: number; max: number };
  pets: { min: number; max: number };
};

export type ListingWithAmenities = Prisma.ListingGetPayload<{
  include: {
    amenities: true;
  };
}>;
