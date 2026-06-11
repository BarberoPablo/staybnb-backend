import { Prisma, ReservationStatus } from '@prisma/client';

export const RESERVATION_WITH_LISTING_INCLUDE = {
  listing: {
    select: {
      id: true,
      title: true,
      images: true,
      city: true,
      country: true,
      lat: true,
      lng: true,
      location: true,
      nightPrice: true,
      propertyType: true,
      privacyType: true,
      checkInTime: true,
      checkOutTime: true,
      ratingAvg: true,
      reviews: {
        select: {
          userId: true,
          score: true,
          message: true,
        },
      },
    },
  },
} satisfies Prisma.ReservationInclude;

export type ReservationWithListing = Prisma.ReservationGetPayload<{
  include: typeof RESERVATION_WITH_LISTING_INCLUDE;
}>;

export type ReservationResponseDto = {
  id: string;
  listingId: string;
  startDate: string;
  endDate: string;
  guests: {
    adults: number;
    children: number;
    infant: number;
    pets: number;
  };
  totalPrice: number;
  totalNights: number;
  nightPrice: number;
  discount: number | null;
  discountPercentage: number | null;
  status: ReservationStatus;
  createdAt: Date;
};
