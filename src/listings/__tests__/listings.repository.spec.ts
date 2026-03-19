/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { ListingStatus, Prisma } from '@prisma/client';
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
});
