import 'dotenv/config';
import { createPrismaClient } from './prisma.factory';

const { prisma, disconnect } = createPrismaClient();

async function main() {
  const listings = await prisma.listing.findMany({
    where: { status: 'PUBLISHED' },
    select: {
      id: true,
      title: true,
      propertyType: true,
      nightPrice: true,
      promotions: true,
      beds: true,
      bedrooms: true,
      bathrooms: true,
      maxAdults: true,
      maxChildren: true,
      maxInfants: true,
      maxPets: true,
      hostId: true,
      checkInTime: true,
      checkOutTime: true,
      city: true,
      country: true,
      lat: true,
      lng: true,
      location: true,
    },
  });
  console.log({ listings });
}

main().catch(console.error).finally(disconnect);
