import { faker } from '@faker-js/faker';
import { ReservationStatus } from '@prisma/client';
import 'dotenv/config';
import { createPrismaClient } from './prisma.factory';

const { prisma, disconnect } = createPrismaClient();

// reproducible
faker.seed(131415);

// 70% dejan review
const REVIEW_RATE = 0.7;

// distribución realista
const SCORE_DISTRIBUTION: Record<number, number> = {
  5: 0.45,
  4: 0.35,
  3: 0.15,
  2: 0.04,
  1: 0.01,
};

function generateReviewScore(): number {
  const r = Math.random();
  let acc = 0;

  for (const [score, prob] of Object.entries(SCORE_DISTRIBUTION)) {
    acc += prob;
    if (r <= acc) return Number(score);
  }

  return 5;
}

function generateComment(score: number): string {
  if (score >= 4) {
    return faker.lorem.sentence();
  }
  if (score === 3) {
    return faker.lorem.sentences(2);
  }
  return faker.lorem.sentences(3);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

async function main() {
  console.log('⭐ Generating reviews from completed reservations...\n');

  // 🔥 fuente de verdad
  const listings = await prisma.listing.findMany({
    select: {
      id: true,
      reservations: {
        where: {
          status: ReservationStatus.COMPLETED,
        },
        select: {
          id: true,
          userId: true,
        },
      },
    },
  });

  let totalReviews = 0;
  let listingsUpdated = 0;

  for (const listing of listings) {
    if (listing.reservations.length === 0) continue;

    const reviewsToCreate: {
      userId: string;
      listingId: string;
      score: number;
      message: string;
    }[] = [];

    for (const reservation of listing.reservations) {
      if (Math.random() > REVIEW_RATE) continue;

      const score = generateReviewScore();

      if (reservation.userId) {
        reviewsToCreate.push({
          userId: reservation.userId,
          listingId: listing.id,
          score,
          message: generateComment(score),
        });
      }
    }

    if (reviewsToCreate.length === 0) continue;

    // ✅ crear reviews
    await prisma.review.createMany({
      data: reviewsToCreate,
      skipDuplicates: true,
    });

    // ✅ calcular agregados
    const avg =
      reviewsToCreate.reduce((sum, r) => sum + r.score, 0) /
      reviewsToCreate.length;

    await prisma.listing.update({
      where: { id: listing.id },
      data: {
        ratingAvg: round2(avg),
        ratingCount: reviewsToCreate.length,
      },
    });

    totalReviews += reviewsToCreate.length;
    listingsUpdated++;

    console.log(
      `✅ Listing ${listing.id}: +${reviewsToCreate.length} reviews (avg ${round2(
        avg,
      )})`,
    );
  }

  console.log('\n🎉 Done');
  console.log(`Listings updated: ${listingsUpdated}`);
  console.log(`Reviews created: ${totalReviews}`);
}

main().catch(console.error).finally(disconnect);
