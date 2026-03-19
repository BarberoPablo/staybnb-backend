import { ListingStatus, Prisma, ReservationStatus } from '@prisma/client';
import { GetListingsQueryDto } from '../dto/get-listings-query.dto';

export function buildListingsWhere(
  query: GetListingsQueryDto,
): Prisma.ListingWhereInput {
  const where: Prisma.ListingWhereInput = {
    status: ListingStatus.PUBLISHED,
  };

  const AND: Prisma.ListingWhereInput[] = [];

  // City and Country
  const city = query.city?.trim();
  if (city) {
    AND.push({
      city: {
        contains: city,
        mode: 'insensitive',
      },
    });
  }

  // Map Coordinates
  if (
    query.neLat !== undefined &&
    query.neLng !== undefined &&
    query.swLat !== undefined &&
    query.swLng !== undefined
  ) {
    AND.push({
      lat: {
        gte: query.swLat,
        lte: query.neLat,
      },
    });
    AND.push({
      lng: {
        gte: query.swLng,
        lte: query.neLng,
      },
    });
  }

  // Price
  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    where.nightPrice = {
      ...(query.minPrice !== undefined ? { gte: query.minPrice } : {}),
      ...(query.maxPrice !== undefined ? { lte: query.maxPrice } : {}),
    };
  }

  // Structure
  if (query.bedrooms !== undefined) {
    where.bedrooms = { gte: query.bedrooms };
  }
  if (query.beds !== undefined) {
    where.beds = { gte: query.beds };
  }
  if (query.bathrooms !== undefined) {
    where.bathrooms = { gte: query.bathrooms };
  }

  // Guest limits and Total Guests
  const adults = query.adults ?? 0;
  const children = query.children ?? 0;
  const infants = query.infants ?? 0;
  const pets = query.pets ?? 0;
  const totalGuests = adults + children + infants + pets;

  if (adults > 0) {
    where.maxAdults = { gte: adults };
  }
  if (children > 0) {
    where.maxChildren = { gte: children };
  }
  if (infants > 0) {
    where.maxInfants = { gte: infants };
  }
  if (pets > 0) {
    where.maxPets = { gte: pets };
  }

  const effectiveMaxGuests = totalGuests > 0 ? totalGuests : query.guests;
  if (effectiveMaxGuests !== undefined && effectiveMaxGuests > 0) {
    where.maxGuests = { gte: effectiveMaxGuests };
  }

  // Amenities
  if (query.amenities) {
    const amenityIds = query.amenities
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id);

    if (amenityIds.length > 0) {
      amenityIds.forEach((id) => {
        AND.push({
          amenities: {
            some: {
              amenityId: id,
            },
          },
        });
      });
    }
  }

  // Dates (Availability)
  if (query.startDate && query.endDate) {
    const startDay = toUtcMidnight(new Date(query.startDate));
    const endDay = toUtcMidnight(new Date(query.endDate));
    const startDayPlus1 = new Date(startDay.getTime() + 24 * 60 * 60 * 1000);

    where.NOT = {
      reservations: {
        some: {
          status: ReservationStatus.UPCOMING,
          AND: [
            { startDate: { lt: endDay.toISOString() } },
            { endDate: { gt: startDayPlus1.toISOString() } },
          ],
        },
      },
    };
  }

  if (AND.length > 0) {
    where.AND = AND;
  }

  return where;
}

function toUtcMidnight(d: Date): Date {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
}
