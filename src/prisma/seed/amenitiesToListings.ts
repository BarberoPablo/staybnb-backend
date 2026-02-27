import 'dotenv/config';
import { createPrismaClient } from './prisma.factory';

const { prisma, disconnect } = createPrismaClient();

const MIN_AMENITIES = 4;
const MAX_AMENITIES = 10;

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomIds(ids: string[], count: number): string[] {
  const shuffled = [...ids].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function main() {
  console.log('🔎 Fetching listings and amenities...');

  const [listings, amenities] = await Promise.all([
    prisma.listing.findMany({ select: { id: true } }),
    prisma.amenity.findMany({ select: { id: true } }),
  ]);

  if (amenities.length === 0) {
    throw new Error('No amenities found. Seed amenities first.');
  }

  console.log(
    `📊 Found ${listings.length} listings and ${amenities.length} amenities`,
  );

  const listingAmenitiesData: { listingId: string; amenityId: string }[] = [];

  for (const listing of listings) {
    const amount = getRandomInt(MIN_AMENITIES, MAX_AMENITIES);
    const pickedAmenities = pickRandomIds(
      amenities.map((a) => a.id),
      amount,
    );

    for (const amenityId of pickedAmenities) {
      listingAmenitiesData.push({
        listingId: listing.id,
        amenityId,
      });
    }
  }

  console.log('🚀 Inserting listing amenities...');

  const CHUNK_SIZE = 1000;

  for (let i = 0; i < listingAmenitiesData.length; i += CHUNK_SIZE) {
    const chunk = listingAmenitiesData.slice(i, i + CHUNK_SIZE);

    await prisma.listingAmenity.createMany({
      data: chunk,
      skipDuplicates: true,
    });
  }

  console.log('✅ Listing amenities seeded successfully');
}

main()
  .catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(disconnect);
