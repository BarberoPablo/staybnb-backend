import { Prisma } from '@prisma/client';

export type FavoriteWithListing = {
  listing: FavoriteListing;
};

export type FavoriteListing = {
  id: string;
  title: string;
  images: string[];
  nightPrice: number;
  location: Prisma.JsonValue;
  city: string;
  ratingAvg: number;
  ratingCount: number;
};
