import {
  Listing,
  ListingAmenity,
  Prisma,
  Profile,
  Reservation,
  Review,
} from '@prisma/client';

export type ListingLocation = {
  formatted: string;
  housenumber: string;
  street: string;
  state: string;
  postcode: string;
  timezone: string;
};

export type ListingLocationResponse = {
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

export const guests = ['adults', 'children', 'infant', 'pets'] as const;
export type Guests = (typeof guests)[number];

export type ListingWithOptionalRelations = Omit<Listing, 'location'> & {
  location: Prisma.JsonValue;
  amenities?: ListingAmenity[];
  host?: Profile;
  reservations?: Reservation[];
  reviews?: Review[];
  _count?: {
    reservations?: number;
    favorites?: number;
  };
};

export type PrismaFeaturedListing = Prisma.ListingGetPayload<{
  select: {
    id: true;
    title: true;
    nightPrice: true;
    images: true;
    ratingAvg: true;
    propertyType: true;
    privacyType: true;
    city: true;
    country: true;
    location: true;
  };
}>;

export type HomeListingLocation = {
  city: string;
  state: string;
  country: string;
};
