import { ListingStatus, ReservationStatus } from '@prisma/client';
import { GetListingsQueryDto } from '../../dto/get-listings-query.dto';
import { buildListingsWhere } from '../build-listings-where';

describe('buildListingsWhere', () => {
  it('should return default where clause when query is empty', () => {
    const query: GetListingsQueryDto = {};
    const result = buildListingsWhere(query);

    expect(result).toEqual({
      status: ListingStatus.PUBLISHED,
    });
  });

  it('should include city with contains and insensitive mode', () => {
    const query: GetListingsQueryDto = { city: 'Buenos Aires' };
    const result = buildListingsWhere(query);

    expect(result).toEqual({
      status: ListingStatus.PUBLISHED,
      AND: [
        {
          city: {
            contains: 'Buenos Aires',
            mode: 'insensitive',
          },
        },
      ],
    });
  });

  it('should trim city', () => {
    const query: GetListingsQueryDto = {
      city: '  Buenos Aires  ',
    };
    const result = buildListingsWhere(query);

    expect(result.AND).toContainEqual({
      city: {
        contains: 'Buenos Aires',
        mode: 'insensitive',
      },
    });
  });

  it('should include map coordinates when all are provided', () => {
    const query: GetListingsQueryDto = {
      neLat: 10,
      neLng: 20,
      swLat: 5,
      swLng: 15,
    };
    const result = buildListingsWhere(query);

    expect(result.AND).toContainEqual({
      lat: { gte: 5, lte: 10 },
    });
    expect(result.AND).toContainEqual({
      lng: { gte: 15, lte: 20 },
    });
  });

  it('should include price range', () => {
    const query: GetListingsQueryDto = {
      minPrice: 100,
      maxPrice: 500,
    };
    const result = buildListingsWhere(query);

    expect(result.nightPrice).toEqual({
      gte: 100,
      lte: 500,
    });
  });

  it('should include partial price range', () => {
    const query: GetListingsQueryDto = {
      minPrice: 100,
    };
    const result = buildListingsWhere(query);

    expect(result.nightPrice).toEqual({
      gte: 100,
    });
  });

  it('should include structure filters', () => {
    const query: GetListingsQueryDto = {
      bedrooms: 2,
      beds: 3,
      bathrooms: 1,
    };
    const result = buildListingsWhere(query);

    expect(result.bedrooms).toEqual({ gte: 2 });
    expect(result.beds).toEqual({ gte: 3 });
    expect(result.bathrooms).toEqual({ gte: 1 });
  });

  it('should include guest limits', () => {
    const query: GetListingsQueryDto = {
      adults: 2,
      children: 1,
      infants: 1,
      pets: 1,
    };
    const result = buildListingsWhere(query);

    expect(result.maxAdults).toEqual({ gte: 2 });
    expect(result.maxChildren).toEqual({ gte: 1 });
    expect(result.maxInfants).toEqual({ gte: 1 });
    expect(result.maxPets).toEqual({ gte: 1 });
  });

  it('should calculate effective maxGuests from adults + children + infants + pets', () => {
    const query: GetListingsQueryDto = {
      adults: 2,
      children: 2,
    };
    const result = buildListingsWhere(query);

    expect(result.maxGuests).toEqual({ gte: 4 });
  });

  it('should use guests parameter if total individual guests is 0', () => {
    const query: GetListingsQueryDto = {
      guests: 5,
    };
    const result = buildListingsWhere(query);

    expect(result.maxGuests).toEqual({ gte: 5 });
  });

  it('should include amenities filters using AND for each amenity', () => {
    const query: GetListingsQueryDto = {
      amenities: 'uuid-1, uuid-2',
    };
    const result = buildListingsWhere(query);

    expect(result.AND).toContainEqual({
      amenities: { some: { amenityId: 'uuid-1' } },
    });
    expect(result.AND).toContainEqual({
      amenities: { some: { amenityId: 'uuid-2' } },
    });
  });

  it('should include date availability filter', () => {
    const startDate = new Date('2024-06-01');
    const endDate = new Date('2024-06-10');
    const query: GetListingsQueryDto = {
      startDate,
      endDate,
    };
    const result = buildListingsWhere(query);

    const startDay = new Date(Date.UTC(2024, 5, 1));
    const endDay = new Date(Date.UTC(2024, 5, 10));
    const startDayPlus1 = new Date(startDay.getTime() + 24 * 60 * 60 * 1000);

    expect(result.NOT).toEqual({
      reservations: {
        some: {
          status: ReservationStatus.UPCOMING,
          AND: [
            { startDate: { lt: endDay.toISOString() } },
            { endDate: { gt: startDayPlus1.toISOString() } },
          ],
        },
      },
    });
  });

  it('should combine multiple filters correctly', () => {
    const query: GetListingsQueryDto = {
      city: 'Paris',
      minPrice: 200,
      bedrooms: 1,
    };
    const result = buildListingsWhere(query);

    expect(result.status).toBe(ListingStatus.PUBLISHED);
    expect(result.nightPrice).toEqual({ gte: 200 });
    expect(result.bedrooms).toEqual({ gte: 1 });
    expect(result.AND).toContainEqual({
      city: { contains: 'Paris', mode: 'insensitive' },
    });
  });
});
