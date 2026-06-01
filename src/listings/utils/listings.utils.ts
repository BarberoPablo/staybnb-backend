import { Guests, Promotion } from '../types/listing.types';
import { differenceInCalendarDays, parse } from 'date-fns';

export function getTotalGuests(guests: Record<Guests, number>) {
  return Object.values(guests).reduce((total, count) => total + count, 0);
}

export function calculateNights(startDate: string, endDate: string) {
  const start = parse(startDate, 'yyyy-MM-dd', new Date());
  const end = parse(endDate, 'yyyy-MM-dd', new Date());

  return differenceInCalendarDays(end, start);
}

export function getListingPromotionDB(
  promotions: Promotion[],
  nights: number,
): Promotion | null {
  const sortedPromotions = [...promotions].sort(
    (a, b) => a.minNights - b.minNights,
  );
  const promos = sortedPromotions?.filter((promo) => promo.minNights <= nights);
  return promos.length > 0 ? promos[promos.length - 1] : null;
}

export function twoDecimals(data: number): number {
  return Number(data.toFixed(2));
}

export const ALLOWED_SEARCH_INCLUDES = new Set(['host', 'amenities', '_count']);
