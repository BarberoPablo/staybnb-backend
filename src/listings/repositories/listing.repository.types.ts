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
