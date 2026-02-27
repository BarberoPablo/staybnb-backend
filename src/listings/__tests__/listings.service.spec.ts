import { Test, TestingModule } from '@nestjs/testing';
import { Listing, ListingStatus } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingsService } from '@src/listings/listings.service';

describe('ListingsService', () => {
  let service: ListingsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListingsService,
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

    service = module.get<ListingsService>(ListingsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search', () => {
    it('should call findMany with default values when query is empty', async () => {
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([]);

      const query: GetListingsQueryDto = {};
      await service.search(query);

      expect(findManySpy).toHaveBeenCalledWith({
        where: { status: ListingStatus.PUBLISHED },
        include: { amenities: true },
        orderBy: { createdAt: 'desc' },
        take: 20,
        skip: 0,
      });
    });

    it('should call findMany with custom pagination (limit and offset)', async () => {
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([]);

      const query: GetListingsQueryDto = { limit: 50, offset: 10 };
      await service.search(query);

      expect(findManySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 50,
          skip: 10,
        }),
      );
    });

    it('should filter by city when only city is provided', async () => {
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([]);

      const query: GetListingsQueryDto = { city: 'Paris' };
      await service.search(query);

      expect(findManySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            status: ListingStatus.PUBLISHED,
            city: {
              equals: 'Paris',
              mode: 'insensitive',
            },
          },
        }),
      );
    });

    it('should filter by country when only country is provided', async () => {
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([]);

      const query: GetListingsQueryDto = { country: 'France' };
      await service.search(query);

      expect(findManySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            status: ListingStatus.PUBLISHED,
            country: {
              equals: 'France',
              mode: 'insensitive',
            },
          },
        }),
      );
    });

    it('should return empty array when no listings match Paris/France', async () => {
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([]);

      const query: GetListingsQueryDto = { city: 'Paris', country: 'France' };
      const result = await service.search(query);

      expect(result).toEqual([]);
      expect(findManySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            status: ListingStatus.PUBLISHED,
            city: {
              equals: 'Paris',
              mode: 'insensitive',
            },
            country: {
              equals: 'France',
              mode: 'insensitive',
            },
          },
        }),
      );
    });

    it('should return listings for San Francisco/United States', async () => {
      const mockListing = { id: '1', title: 'SF Loft' } as Listing;
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([mockListing]);

      const query: GetListingsQueryDto = {
        city: 'San Francisco',
        country: 'United States',
      };
      const result = await service.search(query);

      expect(result).toEqual([mockListing]);
      expect(findManySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            status: ListingStatus.PUBLISHED,
            city: {
              equals: 'San Francisco',
              mode: 'insensitive',
            },
            country: {
              equals: 'United States',
              mode: 'insensitive',
            },
          },
        }),
      );
    });

    it('should call findMany with default values when limit and offset are null', async () => {
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([]);

      const query: GetListingsQueryDto = {
        limit: undefined,
        offset: undefined,
      };
      await service.search(query);

      expect(findManySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 20,
          skip: 0,
        }),
      );
    });

    it('should call findMany with default values when limit and offset are undefined', async () => {
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([]);

      const query: GetListingsQueryDto = {
        limit: undefined,
        offset: undefined,
      };
      await service.search(query);

      expect(findManySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 20,
          skip: 0,
        }),
      );
    });

    it('should not add city or country to where clause if they are empty strings', async () => {
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([]);

      const query: GetListingsQueryDto = { city: '', country: '' };
      await service.search(query);

      expect(findManySpy).toHaveBeenCalledWith({
        where: { status: ListingStatus.PUBLISHED },
        include: { amenities: true },
        orderBy: { createdAt: 'desc' },
        take: 20,
        skip: 0,
      });
    });

    it('should trim city and country in the where clause', async () => {
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([]);

      const query: GetListingsQueryDto = {
        city: ' Paris ',
        country: ' France ',
      };
      await service.search(query);

      expect(findManySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            status: ListingStatus.PUBLISHED,
            city: {
              equals: 'Paris',
              mode: 'insensitive',
            },
            country: {
              equals: 'France',
              mode: 'insensitive',
            },
          },
        }),
      );
    });

    it('should apply sorting when sortBy and sortOrder are provided', async () => {
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([]);

      const query: GetListingsQueryDto = {
        sortBy: 'nightPrice',
        sortOrder: 'asc',
      };
      await service.search(query);

      expect(findManySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { nightPrice: 'asc' },
        }),
      );
    });

    it('should default sortOrder to desc when only sortBy is provided', async () => {
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([]);

      const query: GetListingsQueryDto = {
        sortBy: 'nightPrice',
      };
      await service.search(query);

      expect(findManySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { nightPrice: 'desc' },
        }),
      );
    });
  });
});
