import { Prisma } from '@prisma/client';

export type PrismaHostListing = Prisma.ListingGetPayload<{
  select: {
    id: true;
    status: true;
    images: true;
    title: true;
    description: true;
    city: true;
    country: true;
    nightPrice: true;
    propertyType: true;
    privacyType: true;
  };
}>;

export type HostListingLocation = {
  city: string;
  country: string;
};
