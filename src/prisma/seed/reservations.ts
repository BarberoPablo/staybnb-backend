import { faker } from '@faker-js/faker';
import { Prisma, ReservationStatus } from '@prisma/client';
import { Guests, Promotion } from '@src/listings/types/listing.types';
import 'dotenv/config';
import { createPrismaClient } from './prisma.factory';

// Type definitions for script-specific data
interface ReservationPattern {
  startDate: Date;
  endDate: Date;
  guests: Record<Guests, number>;
}

// Set seed for consistent results during development
faker.seed(101112);

// Helper function to create UTC date at midnight
function createUTCDate(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month, day));
}

function generateReservationStatus(endDate: Date): ReservationStatus {
  const now = new Date();
  // Set now to midnight UTC for comparison with endDate
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );

  // If endDate is in the past or today (since endDate is exclusive), it's completed (unless canceled)
  if (endDate <= today) {
    // Check if it was canceled (8% chance for past reservations)
    if (Math.random() < 0.08) {
      return faker.helpers.arrayElement([
        ReservationStatus.CANCELED,
        ReservationStatus.CANCELED_BY_HOST,
      ]);
    }
    return ReservationStatus.COMPLETED;
  }

  // If endDate is in the future, it's upcoming (unless canceled)
  if (endDate > today) {
    // Check if it was canceled (8% chance for future reservations)
    if (Math.random() < 0.08) {
      return faker.helpers.arrayElement([
        ReservationStatus.CANCELED,
        ReservationStatus.CANCELED_BY_HOST,
      ]);
    }
    return ReservationStatus.UPCOMING;
  }

  return ReservationStatus.COMPLETED;
}

function generateGuestCombination(
  maxGuests: number,
  guestLimits: Record<Guests, { min: number; max: number }>,
): Record<Guests, number> {
  // Generate random total guests (1 to maxGuests)
  const totalGuests = faker.number.int({ min: 1, max: maxGuests });

  // Parse guest limits
  const adultsMin = guestLimits?.adults?.min || 1;
  const adultsMax = guestLimits?.adults?.max || totalGuests;
  const childrenMin = guestLimits?.children?.min || 0;
  const childrenMax =
    guestLimits?.children?.max || Math.max(0, totalGuests - 1);
  const infantMin = guestLimits?.infant?.min || 0;
  const infantMax = guestLimits?.infant?.max || Math.max(0, totalGuests - 1);
  const petsMin = guestLimits?.pets?.min || 0;
  const petsMax = guestLimits?.pets?.max || Math.max(0, totalGuests - 1);

  // Generate adults (must be at least 1)
  const adults = faker.number.int({
    min: Math.max(1, adultsMin),
    max: Math.min(adultsMax, totalGuests),
  });

  const remainingGuests = totalGuests - adults;

  // Generate children (0 to remaining guests)
  const children = faker.number.int({
    min: childrenMin,
    max: Math.min(childrenMax, remainingGuests),
  });

  const remainingAfterChildren = remainingGuests - children;

  // Generate infants (0 to remaining guests after children)
  const infant = faker.number.int({
    min: infantMin,
    max: Math.min(infantMax, remainingAfterChildren),
  });

  const remainingAfterInfants = remainingAfterChildren - infant;

  // Generate pets (0 to remaining guests after infants)
  const pets = faker.number.int({
    min: petsMin,
    max: Math.min(petsMax, remainingAfterInfants),
  });

  // Verify total doesn't exceed maxGuests
  const total = adults + children + infant + pets;
  if (total > maxGuests) {
    // Adjust if we exceeded
    const excess = total - maxGuests;
    if (pets >= excess) {
      return { adults, children, infant, pets: pets - excess };
    } else if (infant >= excess) {
      return { adults, children, infant: infant - excess, pets };
    } else if (children >= excess) {
      return { adults, children: children - excess, infant, pets };
    } else {
      return { adults: adults - excess, children, infant, pets };
    }
  }

  return { adults, children, infant, pets };
}

function calculateReservationPricing(
  nightPrice: number,
  nights: number,
  promotions: Promotion[],
): {
  totalPrice: number;
  discount: number | null;
  discountPercentage: number | null;
  finalNightPrice: number;
} {
  // Find applicable promotion
  let applicablePromotion: Promotion | null = null;
  if (promotions && Array.isArray(promotions)) {
    applicablePromotion = promotions
      .filter((promo) => nights >= promo.minNights)
      .sort((a, b) => b.minNights - a.minNights)[0]; // Get the best applicable promotion
  }

  let discount: number | null = null;
  let discountPercentage: number | null = null;
  let finalNightPrice = nightPrice;

  if (applicablePromotion) {
    discountPercentage = applicablePromotion.discountPercentage;
    discount = (nightPrice * nights * discountPercentage) / 100;
    finalNightPrice = nightPrice * (1 - discountPercentage / 100);
  }

  const totalPrice = finalNightPrice * nights;

  return {
    totalPrice: Math.round(totalPrice * 100) / 100, // Round to 2 decimal places
    discount,
    discountPercentage,
    finalNightPrice: Math.round(finalNightPrice * 100) / 100,
  };
}

// Helper function to check if two date ranges overlap
function datesOverlap(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date,
): boolean {
  return start1 < end2 && start2 < end1;
}

// Generate reservations for a specific month
function generateReservationsForMonth(
  year: number,
  month: number, // 0-11 (JavaScript month format)
  maxGuests: number,
  guestLimits: Record<Guests, { min: number; max: number }>,
  existingReservations: ReservationPattern[] = [],
): ReservationPattern[] {
  const reservations: ReservationPattern[] = [];

  // Calculate month boundaries
  const monthStart = createUTCDate(year, month, 1);
  const monthEnd = createUTCDate(year, month + 1, 0);
  const daysInMonth = monthEnd.getUTCDate();

  // Generate 1-6 reservations for this month to ensure gaps and variety
  const targetReservationCount = faker.number.int({ min: 1, max: 6 });

  console.log(
    `   📅 Target: ${targetReservationCount} reservations for ${monthStart.toLocaleString('default', { month: 'long', year: 'numeric', timeZone: 'UTC' })}`,
  );

  // Track occupied days to avoid overlaps
  const occupiedRanges: Array<{ start: Date; end: Date }> = [
    ...existingReservations.map((r) => ({
      start: r.startDate,
      end: r.endDate,
    })),
  ];

  let attempts = 0;
  const maxAttempts = 150; // Increased attempts to find better variety

  while (
    reservations.length < targetReservationCount &&
    attempts < maxAttempts
  ) {
    attempts++;

    // Pick a random day in the month
    const day = faker.number.int({ min: 1, max: daysInMonth });

    // Generate reservation length (1-7 days, but don't exceed month end)
    // We also want to leave at least 1 day gap occasionally, but the overlap check handles it.
    const maxLength = Math.min(7, daysInMonth - day + 1);
    const nights = faker.number.int({ min: 1, max: maxLength });

    // Create start date at UTC midnight
    const startDate = createUTCDate(year, month, day);

    // Create end date at UTC midnight (exclusive)
    const endDate = createUTCDate(year, month, day + nights);

    // Check if this reservation overlaps with existing ones
    // To ensure gaps, we can check if it overlaps with [start-1, end+1]
    // but the requirement is just "leave some gaps", which random placement naturally does.
    const overlaps = occupiedRanges.some((range) =>
      datesOverlap(startDate, endDate, range.start, range.end),
    );

    if (!overlaps) {
      // Generate guests for this reservation
      const guests = generateGuestCombination(maxGuests, guestLimits);

      // Add the reservation
      reservations.push({ startDate, endDate, guests });
      occupiedRanges.push({ start: startDate, end: endDate });

      console.log(
        `     ✅ Added: ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]} (${nights} nights)`,
      );
    }
  }

  if (reservations.length < targetReservationCount) {
    console.log(
      `     ⚠️  Only generated ${reservations.length}/${targetReservationCount} reservations (density limit reached)`,
    );
  }

  return reservations;
}
async function generateReservationsForMonthParam() {
  try {
    const targetYear = 2026;
    const targetMonth = 4; // May (0-indexed)

    console.log(
      `🚀 Starting reservations generation for ${new Date(Date.UTC(targetYear, targetMonth)).toLocaleString('default', { month: 'long', year: 'numeric', timeZone: 'UTC' })}...`,
    );

    // Get all published listings
    const listings = await prisma.listing.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        id: true,
        title: true,
        propertyType: true,
        nightPrice: true,
        promotions: true,
        maxAdults: true,
        maxChildren: true,
        maxInfants: true,
        maxPets: true,
        maxGuests: true,
        hostId: true,
      },
    });

    console.log(`📊 Found ${listings.length} published listings`);

    if (listings.length === 0) {
      throw new Error(
        'No published listings found. Please run the listings generation script first.',
      );
    }

    // Get all users
    const users = await prisma.profile.findMany({
      select: { id: true, firstName: true, lastName: true },
    });

    console.log(`📊 Found ${users.length} users for guest selection`);

    if (users.length === 0) {
      throw new Error(
        'No users found. Please run the user generation script first.',
      );
    }

    // Get existing reservations for the target month to avoid overlaps
    const monthStart = createUTCDate(targetYear, targetMonth, 1);
    const monthEnd = createUTCDate(targetYear, targetMonth + 1, 0);

    const existingReservations = await prisma.reservation.findMany({
      where: {
        startDate: {
          lte: monthEnd,
        },
        endDate: {
          gte: monthStart,
        },
      },
      select: {
        listingId: true,
        startDate: true,
        endDate: true,
      },
    });

    console.log(
      `📊 Found ${existingReservations.length} existing reservations in the target month`,
    );

    // Generate reservations for each listing
    const reservationsData: Prisma.ReservationCreateManyInput[] = [];
    let totalReservations = 0;

    for (const listing of listings) {
      const maxGuests = listing.maxGuests;

      // Parse guest limits
      const guestLimits: Record<Guests, { min: number; max: number }> = {
        adults: { min: 1, max: listing.maxAdults },
        children: { min: 0, max: listing.maxChildren },
        infant: { min: 0, max: listing.maxInfants },
        pets: { min: 0, max: listing.maxPets },
      };

      console.log(
        `\n🏠 Generating reservations for "${listing.title}" (${listing.propertyType})`,
      );

      // Get existing reservations for this listing
      const listingExistingReservations = existingReservations
        .filter((r) => r.listingId === listing.id)
        .map((r) => ({
          startDate: r.startDate,
          endDate: r.endDate,
          guests: {} as Record<Guests, number>,
        }));

      // Generate reservations for the target month
      const reservationPattern = generateReservationsForMonth(
        targetYear,
        targetMonth,
        maxGuests,
        guestLimits,
        listingExistingReservations,
      );

      for (const { startDate, endDate, guests } of reservationPattern) {
        const nights = Math.round(
          (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
        );

        // Calculate pricing
        const pricing = calculateReservationPricing(
          Number(listing.nightPrice),
          nights,
          listing.promotions as Promotion[],
        );

        // Select random guest
        const availableGuests = users.filter(
          (user) => user.id !== listing.hostId,
        );
        if (availableGuests.length === 0) continue;
        const guest = faker.helpers.arrayElement(availableGuests);

        // Determine status
        const status = generateReservationStatus(endDate);

        const reservationData: Prisma.ReservationCreateManyInput = {
          userId: guest.id,
          listingId: listing.id,
          startDate: startDate,
          endDate: endDate,
          guests: guests,
          totalPrice: new Prisma.Decimal(pricing.totalPrice),
          totalNights: nights,
          nightPrice: new Prisma.Decimal(pricing.finalNightPrice),
          discount: new Prisma.Decimal(pricing.discount || 0),
          discountPercentage: pricing.discountPercentage,
          status: status,
          createdAt: faker.date.between({
            from: new Date(startDate.getTime() - 30 * 24 * 60 * 60 * 1000),
            to: startDate,
          }),
          canceledAt:
            status === ReservationStatus.CANCELED ||
            status === ReservationStatus.CANCELED_BY_HOST
              ? faker.date.between({
                  from: new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000),
                  to: startDate,
                })
              : null,
        };

        reservationsData.push(reservationData);
        totalReservations++;
      }
    }

    console.log(`\n🚀 Creating ${totalReservations} reservations in bulk...`);

    const createdReservations = await prisma.reservation.createMany({
      data: reservationsData,
    });

    console.log(
      `✅ Successfully created ${createdReservations.count} reservations!`,
    );

    console.log('\n🎉 Reservations generation completed successfully!');
  } catch (error) {
    console.error('❌ Error generating reservations:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
const { prisma, disconnect } = createPrismaClient();

async function main() {
  await generateReservationsForMonthParam();
}

main().catch(console.error).finally(disconnect);
