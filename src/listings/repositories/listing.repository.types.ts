/* File dedicated to Prisma related types */
import { Prisma } from '@prisma/client';

export const LISTING_CARD_SELECT: Prisma.ListingSelect = {
  id: true,
  title: true,
  nightPrice: true,
  images: true,
  ratingAvg: true,
  propertyType: true,
  privacyType: true,
  city: true,
  country: true,
  lat: true,
  lng: true,
  location: true,
};

export enum SortBy {
  CREATED_AT = 'createdAt',
  NIGHT_PRICE = 'nightPrice',
  RATING_AVG = 'ratingAvg',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface FindWithDetailsOptions {
  id: string;
}

export interface FindForCheckoutOptions {
  id: string;
}

export interface SearchListingsOptions {
  where: Prisma.ListingWhereInput;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  take?: number;
  skip?: number;
}

export interface FeaturedListingsOptions {
  take?: number;
  skip?: number;
}

export interface PopularListingsOptions {
  take?: number;
  skip?: number;
}

/* Listing Checkout */

export const LISTING_CHECKOUT_SELECT = {
  id: true,
  title: true,
  status: true,
  ratingAvg: true,
  ratingCount: true,
  location: true,
  propertyType: true,
  privacyType: true,
  images: true,
  checkInTime: true,
  checkOutTime: true,
  promotions: true,
  minCancelDays: true,
  nightPrice: true,
} satisfies Prisma.ListingSelect;

export type ListingCheckout = Prisma.ListingGetPayload<{
  select: typeof LISTING_CHECKOUT_SELECT;
}>;
