import { Listing, ListingStatus, Prisma } from '@prisma/client';
import { GetListingsQueryDto } from './get-listings-query.dto';
import { Guests, Promotion } from './listing.types';

export function buildListingsWhere(
  query: GetListingsQueryDto,
): Prisma.ListingWhereInput {
  const where: Prisma.ListingWhereInput = {
    status: ListingStatus.PUBLISHED,
  };

  const city = query.city?.trim();
  if (city) {
    where.city = city;
  }

  const country = query.country?.trim();
  if (country) {
    where.country = country;
  }

  return where;
}

export function getTotalGuests(guests: Record<Guests, number>) {
  return Object.values(guests).reduce((total, count) => total + count, 0);
}

export function calculateNights(startDate: Date, endDate: Date) {
  return Math.max(
    1,
    Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    ),
  );
}

export function getListingPromotionDB(
  listing: Listing,
  nights: number,
): Promotion | null {
  const sortedPromotions = [...(listing.promotions as Promotion[])].sort(
    (a, b) => a.minNights - b.minNights,
  );
  const promos = sortedPromotions?.filter((promo) => promo.minNights <= nights);
  return promos.length > 0 ? promos[promos.length - 1] : null;
}

export function twoDecimals(data: number): number {
  return Number(data.toFixed(2));
}
