/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { Listing, ListingStatus, Prisma } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import {
  LISTING_CARD_SELECT,
  SortBy,
  SortOrder,
} from '../repositories/listing.repository.types';
import { ListingRepository } from '../repositories/listings.repository';
import { PrismaFeaturedListing } from '../types/listing.types';

describe('ListingRepository', () => {
  let repository: ListingRepository;
  let prisma: PrismaService;

  const mockPrismaListing: PrismaFeaturedListing = {
    id: '1',
    title: 'Luxury Villa',
    nightPrice: 150,
    images: ['img1.jpg'],
    ratingAvg: 4.8,
    propertyType: 'HOUSE',
    privacyType: 'ENTIRE',
    city: 'San Francisco',
    country: 'United States',
    lat: 37.7749,
    lng: -122.4194,
    location: {
      state: 'California',
      street: 'Fay Spring',
      postcode: '18661-9941',
      timezone: 'America/Los_Angeles',
      formatted:
        '46010 Fay Spring, 18661-9941 San Francisco, California, United States',
      housenumber: '46010',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListingRepository,
        {
          provide: PrismaService,
          useValue: {
            listing: {
              findMany: jest.fn(),
              findUniqueOrThrow: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ListingRepository>(ListingRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findFeatured', () => {
    it('should return mapped FeaturedListingDto from prisma results', async () => {
      const mockListings = [
        mockPrismaListing,
      ] as unknown as Prisma.PrismaPromise<any>;

      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue(mockListings);

      const result = await repository.findFeatured({ take: 10, skip: 0 });

      expect(findManySpy).toHaveBeenCalledWith({
        where: {
          status: ListingStatus.PUBLISHED,
          ratingAvg: { gte: 4 },
        },
        select: LISTING_CARD_SELECT,
        orderBy: expect.any(Array),
        take: 10,
        skip: 0,
      });

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: '1',
        title: 'Luxury Villa',
        nightPrice: 150,
        images: ['img1.jpg'],
        ratingAvg: 4.8,
        propertyType: 'HOUSE',
        privacyType: 'ENTIRE',
        location: {
          city: 'San Francisco',
          country: 'United States',
          state: 'California',
          lat: 37.7749,
          lng: -122.4194,
        },
      });
    });

    it('should correctly map location from root city/country and JSON state', async () => {
      const rawListing = {
        ...mockPrismaListing,
        city: 'Miami',
        country: 'USA',
        location: {
          state: 'Florida',
        },
      };

      const mockListings = [rawListing] as unknown as Prisma.PrismaPromise<any>;

      jest.spyOn(prisma.listing, 'findMany').mockResolvedValue(mockListings);

      const result = await repository.findFeatured({ take: 1, skip: 0 });

      expect(result[0].location).toEqual({
        city: 'Miami',
        country: 'USA',
        state: 'Florida',
        lat: 37.7749,
        lng: -122.4194,
      });
    });
  });

  describe('search', () => {
    it('should call findMany with correct where, select, and pagination', async () => {
      const mockListings = [
        mockPrismaListing,
      ] as unknown as Prisma.PrismaPromise<any>;

      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue(mockListings);

      const where: Prisma.ListingWhereInput = {
        status: ListingStatus.PUBLISHED,
        city: { contains: 'San Francisco', mode: 'insensitive' },
      };

      const result = await repository.search({
        where,
        take: 10,
        skip: 0,
        sortBy: SortBy.NIGHT_PRICE,
        sortOrder: SortOrder.ASC,
      });

      expect(findManySpy).toHaveBeenCalledWith({
        where,
        select: LISTING_CARD_SELECT,
        orderBy: { nightPrice: 'asc' },
        take: 10,
        skip: 0,
      });

      expect(result).toHaveLength(1);
    });

    it('should default to orderBy createdAt desc if sortBy is not provided', async () => {
      const mockEmptyListings = [] as unknown as Prisma.PrismaPromise<any>;

      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue(mockEmptyListings);

      await repository.search({
        where: { status: ListingStatus.PUBLISHED },
      });

      expect(findManySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { createdAt: 'desc' },
        }),
      );
    });
  });

  describe('findWithDetails', () => {
    it('should return listing with details from prisma', async () => {
      const mockListing: any = {
        id: '1',
        location: {
          formatted: 'Formatted',
          housenumber: '1',
          street: 'Street',
          state: 'State',
          postcode: '123',
          timezone: 'Timezone',
        },
        city: 'City',
        country: 'Country',
        lat: 0,
        lng: 0,
        promotions: [],
        amenities: [{ amenityId: '1' }],
        host: { id: 'h1', firstName: 'John', avatarUrl: null },
        reviews: [],
        reservations: [],
      };

      const findUniqueSpy = jest
        .spyOn(prisma.listing, 'findUniqueOrThrow')
        .mockResolvedValue(mockListing);

      const result = await repository.findWithDetails({ id: '1' });

      expect(findUniqueSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: '1',
            status: ListingStatus.PUBLISHED,
          },
          include: expect.objectContaining({
            host: {
              select: {
                id: true,
                firstName: true,
                avatarUrl: true,
              },
            },
            amenities: {
              select: {
                amenityId: true,
              },
            },
            reviews: expect.objectContaining({
              select: {
                id: true,
                score: true,
                message: true,
                profile: {
                  select: {
                    id: true,
                    avatarUrl: true,
                  },
                },
              },
              take: 3,
              orderBy: { createdAt: 'desc' },
            }),
            reservations: expect.objectContaining({
              where: expect.objectContaining({
                status: 'UPCOMING',
                endDate: { gte: expect.any(Date) },
              }),
              select: {
                id: true,
                startDate: true,
                endDate: true,
              },
              orderBy: { startDate: 'asc' },
            }),
          }),
        }),
      );
      expect(result).toEqual(mockListing);
    });
  });

  describe('findForCheckout', () => {
    it('should return listing for checkout from prisma', async () => {
      const mockListing = {
        id: '1',
        title: 'Title',
        description: 'Description',
        nightPrice: 100,
        images: ['img.jpg'],
        location: {
          formatted: 'Formatted',
          housenumber: '1',
          street: 'Street',
          state: 'State',
          postcode: '123',
          timezone: 'Timezone',
        },
        city: 'City',
        country: 'Country',
        lat: 0,
        lng: 0,
        promotions: [],
        maxGuests: 4,
        maxAdults: 4,
        maxChildren: 2,
        maxInfants: 1,
        maxPets: 1,
        bedrooms: 2,
        beds: 2,
        bathrooms: 1,
        propertyType: 'HOUSE',
        privacyType: 'ENTIRE',
        status: 'PUBLISHED',
        ratingAvg: 4.5,
        ratingCount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        checkInTime: '15:00',
        checkOutTime: '11:00',
        minCancelDays: 3,
        hostId: 'h1',
      } as unknown as Listing;

      const findUniqueSpy = jest
        .spyOn(prisma.listing, 'findUniqueOrThrow')
        .mockResolvedValue(mockListing);

      const result = await repository.findForCheckout({ id: '1' });

      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: {
          id: '1',
          status: ListingStatus.PUBLISHED,
        },
      });
      expect(result.id).toBe('1');
    });
  });
});
