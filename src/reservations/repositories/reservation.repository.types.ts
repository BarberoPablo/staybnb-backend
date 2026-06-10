import { Prisma } from '@prisma/client';

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
