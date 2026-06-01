/* File dedicated to Domain, independant and response Types. Service types */
import {
  Listing,
  ListingAmenity,
  ListingStatus,
  Prisma,
  Profile,
  Reservation,
  Review,
} from '@prisma/client';

export type ListingLocationFromDB = {
  state: string;
  street: string;
  postcode: string;
  timezone: string;
  formatted: string;
  housenumber: string;
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
  reviews?: Array<Review & { profile: Profile; imageUrl?: string }>;
  _count?: {
    reservations?: number;
    favorites?: number;
  };
};

export type ListingDetails = Omit<Listing, 'location'> & {
  location: Prisma.JsonValue;
  amenities: {
    amenityId: string;
  }[];
  host: {
    id: string;
    firstName: string;
    avatarUrl: string | null;
  };
  reviews: {
    id: string;
    profile: {
      id: string;
      avatarUrl: string | null;
    };
    score: number;
    message: string;
  }[];
  reservations: {
    id: string;
    startDate: Date;
    endDate: Date;
  }[];
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
    lat: true;
    lng: true;
    location: true;
  };
}>;

export type HomeListingLocation = {
  city: string;
  state: string;
  country: string;
};

export type ListingForCreatingReservation = {
  id: string;
  title: string;
  images: string[];
  checkInTime: string;
  checkOutTime: string;
  status: ListingStatus;
  hostId: string;
  nightPrice: number;
  maxAdults: number;
  maxChildren: number;
  maxInfants: number;
  maxPets: number;
  maxGuests: number;
  promotions: Promotion[];
  location: {
    timezone: string;
    formatted: string;
  };
  host: {
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
};
