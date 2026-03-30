import { Prisma } from '@prisma/client';

export type PrismaAmenity = Prisma.AmenityGetPayload<{
  select: {
    id: true;
    category: true;
    name: true;
  };
}>;
