import { Prisma } from '@prisma/client';

export type CreateReservationInput = {
  userId: string;
  listingId: string;
  startDate: Date;
  endDate: Date;
  guests: Prisma.InputJsonValue;
  totalPrice: number;
  totalNights: number;
  nightPrice: number;
  discount?: number | null;
  discountPercentage?: number | null;
};

export type ConflictingReservationsInput = {
  listingId: string;
  startDate: Date;
  endDate: Date;
};
