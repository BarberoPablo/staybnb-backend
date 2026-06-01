import { Prisma } from '@prisma/client';
import { Guests } from '@src/listings/types/listing.types';

export type CreateReservationInput = {
  userId: string;
  listingId: string;
  startDate: string;
  endDate: string;
  guests: Prisma.InputJsonValue;
  totalPrice: number;
  totalNights: number;
  nightPrice: number;
  discount?: number | null;
  discountPercentage?: number | null;
};

export type ConflictingReservationsInput = {
  listingId: string;
  newStartDate: string;
  newEndDate: string;
};

export type ReservationGuests = Record<Guests, number>;
