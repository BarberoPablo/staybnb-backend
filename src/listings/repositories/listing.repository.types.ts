import { Prisma } from '@prisma/client';

export interface FindListingByIdOptions {
  includeHost?: boolean;
  includeAmenities?: boolean;
  includeReservations?: boolean;
  includeReviews?: boolean;
  includeCount?: boolean;
}

export interface SearchListingsOptions {
  where: Prisma.ListingWhereInput;
  includeHost?: boolean;
  includeAmenities?: boolean;
  includeCount?: boolean;
  sortBy?: string;
  sortOrder?: Prisma.SortOrder;
  take: number;
  skip: number;
}

export interface FeaturedListingsOptions {
  take: number;
  skip: number;
}

export interface PopularListingsOptions {
  take: number;
  skip: number;
}
