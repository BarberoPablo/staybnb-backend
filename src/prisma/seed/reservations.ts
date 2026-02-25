import { faker } from '@faker-js/faker';
import { Prisma, ReservationStatus } from '@prisma/client';
import {
  Guests,
  ListingLocation,
  Promotion,
} from '@src/listings/dto/listing.types';
import { fromZonedTime } from 'date-fns-tz';
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

// Helper function to create UTC date with proper check-in/check-out times
function createUTCDateWithTime(
  date: Date,
  time: string,
  timezone: string,
): Date {
  const dateString = date.toISOString().substring(0, 10); // Get YYYY-MM-DD format
  const dateTimeString = `${dateString}T${time}:00`;
  return fromZonedTime(dateTimeString, timezone);
}

function generateReservationStatus(endDate: Date): ReservationStatus {
  const now = new Date();

  // If endDate is in the past, it's completed (unless canceled)
  if (endDate < now) {
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
  if (endDate >= now) {
    // Check if it was canceled (8% chance for future reservations)
    if (Math.random() < 0.08) {
      return faker.helpers.arrayElement([
        ReservationStatus.CANCELED,
        ReservationStatus.CANCELED_BY_HOST,
      ]);
    }
    return ReservationStatus.UPCOMING;
  }

  // Fallback (shouldn't happen)
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

  // ✅ Return the correct format: just the numbers, not objects with min/max
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
  checkInTime: string,
  checkOutTime: string,
  timezone: string,
  existingReservations: ReservationPattern[] = [],
): ReservationPattern[] {
  const reservations: ReservationPattern[] = [];

  // Calculate month boundaries
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);
  const daysInMonth = monthEnd.getDate();

  // Generate 2-5 reservations for this month
  const reservationCount = faker.number.int({ min: 2, max: 5 });

  console.log(
    `   📅 Generating ${reservationCount} reservations for ${monthStart.toLocaleString('default', { month: 'long', year: 'numeric' })}`,
  );

  // Track occupied days to avoid overlaps
  const occupiedRanges: Array<{ start: Date; end: Date }> = [
    ...existingReservations.map((r) => ({
      start: r.startDate,
      end: r.endDate,
    })),
  ];

  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loops

  while (reservations.length < reservationCount && attempts < maxAttempts) {
    attempts++;

    // Pick a random day in the month
    const day = faker.number.int({ min: 1, max: daysInMonth });
    const startDayDate = new Date(year, month, day);

    // Generate reservation length (1-7 days, but don't exceed month end)
    const maxLength = Math.min(7, daysInMonth - day + 1);
    const nights = faker.number.int({ min: 1, max: maxLength });

    // Create start date with proper check-in time
    const startDate = createUTCDateWithTime(
      startDayDate,
      checkInTime,
      timezone,
    );

    // Create end date with proper check-out time
    const endDateDay = new Date(
      startDayDate.getTime() + nights * 24 * 60 * 60 * 1000,
    );
    const endDate = createUTCDateWithTime(endDateDay, checkOutTime, timezone);

    // Ensure end date doesn't exceed month end
    if (endDate > monthEnd) {
      endDate.setTime(monthEnd.getTime());
    }

    // Check if this reservation overlaps with existing ones
    const overlaps = occupiedRanges.some((range) =>
      datesOverlap(startDate, endDate, range.start, range.end),
    );

    if (!overlaps) {
      // Generate guests for this reservation
      const guests = generateGuestCombination(maxGuests, guestLimits);

      // Add the reservation
      reservations.push({ startDate, endDate, guests });
      occupiedRanges.push({ start: startDate, end: endDate });

      const actualNights = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
      );
      console.log(
        `     ✅ Added reservation: ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]} (${actualNights} nights)`,
      );
    }
  }

  if (reservations.length < reservationCount) {
    console.log(
      `     ⚠️  Only generated ${reservations.length} reservations (could not find ${reservationCount} non-overlapping dates)`,
    );
  }

  return reservations;
}

async function generateReservationsForMonthParam() {
  try {
    // ✅ HARDCODED MONTH PARAMETER - Change this to the desired month
    // Format: year, month (0-11, where 0 = January, 11 = December)
    // Example: October 2025 = year: 2025, month: 9
    const targetYear = 2026;
    const targetMonth = 2; // December (0-indexed: 0=Jan, 1=Feb, ..., 9=Oct, 10=Nov, 11=Dec)

    console.log(
      `🚀 Starting reservations generation for ${new Date(targetYear, targetMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}...`,
    );

    // Get all published listings with their details
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
        maxGuests: true,
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

    console.log(`📊 Found ${listings.length} published listings`);

    if (listings.length === 0) {
      throw new Error(
        'No published listings found. Please run the listings generation script first.',
      );
    }

    // Get all users (for guest selection)
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
    const monthStart = new Date(targetYear, targetMonth, 1);
    const monthEnd = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59, 999);

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
      // Parse structure to get max guests
      const maxGuests = listing.maxGuests;

      // Parse guest limits
      const guestLimits: Record<Guests, { min: number; max: number }> = {
        adults: { min: 1, max: listing.maxAdults },
        children: { min: 0, max: listing.maxChildren },
        infant: { min: 0, max: listing.maxInfants },
        pets: { min: 0, max: listing.maxPets },
      };

      // Parse location to get timezone
      const location = listing.location as ListingLocation;
      const timezone = location?.timezone || 'UTC';

      console.log(
        `\n🏠 Generating reservations for "${listing.title}" (${listing.propertyType})`,
      );
      console.log(
        `   Max guests: ${maxGuests}, Night price: $${listing.nightPrice}`,
      );
      console.log(
        `   Check-in: ${listing.checkInTime}, Check-out: ${listing.checkOutTime}, Timezone: ${timezone}`,
      );

      // Get existing reservations for this listing in the target month
      const listingExistingReservations = existingReservations
        .filter((r) => r.listingId === listing.id)
        .map((r) => ({
          startDate: r.startDate,
          endDate: r.endDate,
          guests: {} as Record<Guests, number>, // We don't need guests for overlap checking
        }));

      // Generate reservations for the target month
      const reservationPattern = generateReservationsForMonth(
        targetYear,
        targetMonth,
        maxGuests,
        guestLimits,
        listing.checkInTime,
        listing.checkOutTime,
        timezone,
        listingExistingReservations,
      );

      console.log(`   📅 Generated ${reservationPattern.length} reservations`);

      for (const { startDate, endDate, guests } of reservationPattern) {
        const nights = Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
        );

        // Calculate pricing (only promotions affect price)
        const pricing = calculateReservationPricing(
          Number(listing.nightPrice),
          nights,
          listing.promotions as Promotion[],
        );

        // Select a random user as guest (not the host)
        const availableGuests = users.filter(
          (user) => user.id !== listing.hostId,
        );
        if (availableGuests.length === 0) {
          console.log(
            `   ⚠️  Skipping reservation - no available guests (all users are hosts)`,
          );
          continue;
        }
        const guest = faker.helpers.arrayElement(availableGuests);

        // Determine status based on dates
        const status = generateReservationStatus(endDate);

        // ✅ NO MANUAL ID GENERATION - Let Supabase handle it
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
            from: new Date(startDate.getTime() - 30 * 24 * 60 * 60 * 1000), // Created 30 days before start
            to: startDate,
          }),
          canceledAt:
            status === ReservationStatus.CANCELED ||
            status === ReservationStatus.CANCELED_BY_HOST
              ? faker.date.between({
                  from: new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000), // Canceled 7 days before start
                  to: startDate,
                })
              : null,
        };

        reservationsData.push(reservationData);
        totalReservations++;
      }
    }

    console.log(`\n🚀 Creating ${totalReservations} reservations in bulk...`);

    // Bulk create all reservations
    const createdReservations = await prisma.reservation.createMany({
      data: reservationsData,
    });

    console.log(
      `✅ Successfully created ${createdReservations.count} reservations!`,
    );

    // Verify the creation
    const totalReservationsInDb = await prisma.reservation.count();
    const monthReservations = await prisma.reservation.count({
      where: {
        startDate: {
          lte: monthEnd,
        },
        endDate: {
          gte: monthStart,
        },
      },
    });

    console.log('\n🎉 Reservations generation completed successfully!');
    console.log(`   Total reservations created: ${createdReservations.count}`);
    console.log(
      `   📊 Total reservations in database: ${totalReservationsInDb}`,
    );
    console.log(`   📅 Reservations in target month: ${monthReservations}`);

    // Show sample reservations
    console.log('\n📋 Sample created reservations:');
    const sampleReservations = await prisma.reservation.findMany({
      where: {
        startDate: {
          lte: monthEnd,
        },
        endDate: {
          gte: monthStart,
        },
      },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        listing: {
          select: { title: true, propertyType: true },
        },
        user: {
          select: { firstName: true },
        },
      },
    });

    sampleReservations.forEach((reservation, index) => {
      const guestName = reservation.user?.firstName;
      const listingTitle = reservation.listing.title;
      const startDate = reservation.startDate.toISOString().split('T')[0];
      const endDate = reservation.endDate.toISOString().split('T')[0];
      const discountText = reservation.discountPercentage
        ? ` (${reservation.discountPercentage}% off)`
        : '';
      const guests = reservation.guests as unknown as Record<Guests, number>;
      const guestText = `${guests.adults} adults${guests.children > 0 ? `, ${guests.children} children` : ''}${
        guests.infant > 0 ? `, ${guests.infant} infant` : ''
      }${guests.pets > 0 ? `, ${guests.pets} pets` : ''}`;

      console.log(`${index + 1}. ${guestName} → "${listingTitle}"`);
      console.log(
        `   ${startDate} to ${endDate} (${reservation.totalNights} nights)`,
      );
      console.log(
        `   ${guestText} - $${Number(reservation.totalPrice)}${discountText} - Status: ${reservation.status}`,
      );
    });

    console.log('\n✨ Database population completed successfully!');
    console.log(
      `📅 Reservations created for ${new Date(targetYear, targetMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}!`,
    );
    console.log('💰 Pricing calculated with promotions!');
    console.log(
      "👥 Guest combinations respect each listing's specific limits!",
    );
    console.log('📊 No overlapping reservations for the same listing!');
  } catch (error) {
    console.error('❌ Error generating reservations:', error);

    if (error instanceof Error) {
      console.error('Error message:', error.message);
      if (error.stack) {
        console.error('Stack trace:', error.stack);
      }
    }

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
