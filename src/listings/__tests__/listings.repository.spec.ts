import { Test, TestingModule } from '@nestjs/testing';
import { ListingStatus } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
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
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([mockPrismaListing as any]);

      const result = await repository.findFeatured({ take: 10, skip: 0 });

      expect(findManySpy).toHaveBeenCalledWith({
        where: {
          status: ListingStatus.PUBLISHED,
          ratingAvg: { gte: 4 },
        },
        select: expect.any(Object),
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

      jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([rawListing as any]);

      const result = await repository.findFeatured({ take: 1, skip: 0 });

      expect(result[0].location).toEqual({
        city: 'Miami',
        country: 'USA',
        state: 'Florida',
      });
    });
  });
});
