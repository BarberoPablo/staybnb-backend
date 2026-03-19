import { Test, TestingModule } from '@nestjs/testing';
import { Listing, ListingStatus } from '@prisma/client';
import { GetFeaturedListingsQueryDto } from '@src/listings/dto/get-featured-listings-query.dto';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingsService } from '@src/listings/listings.service';
import { ListingRepository } from '@src/listings/repositories/listings.repository';
import { ListingCardDto } from '../dto/home-listing.dto';

describe('ListingsService', () => {
  let service: ListingsService;
  let repository: ListingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListingsService,
        {
          provide: ListingRepository,
          useValue: {
            search: jest.fn(),
            findFeatured: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ListingsService>(ListingsService);
    repository = module.get<ListingRepository>(ListingRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFeaturedListings', () => {
    it('should return the result from repository', async () => {
      const mockResult = [{ id: '1' } as ListingCardDto];
      const findFeaturedSpy = jest
        .spyOn(repository, 'findFeatured')
        .mockResolvedValue(mockResult);

      const query = new GetFeaturedListingsQueryDto();
      query.limit = 10;
      query.offset = 5;

      const result = await service.getFeaturedListings(query);

      expect(findFeaturedSpy).toHaveBeenCalledWith({
        take: 10,
        skip: 5,
      });
      expect(result).toBe(mockResult);
    });
  });

  describe('search', () => {
    it('should call repository.search with default values when query is empty', async () => {
      const searchSpy = jest.spyOn(repository, 'search').mockResolvedValue([]);

      const query = new GetListingsQueryDto();
      await service.search(query);

      expect(searchSpy).toHaveBeenCalledWith({
        where: { status: ListingStatus.PUBLISHED },
        sortBy: undefined,
        sortOrder: undefined,
        take: 20,
        skip: 0,
      });
    });

    it('should call repository.search with custom pagination (limit and offset)', async () => {
      const searchSpy = jest.spyOn(repository, 'search').mockResolvedValue([]);

      const query = new GetListingsQueryDto();
      query.limit = 50;
      query.offset = 10;
      await service.search(query);

      expect(searchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 50,
          skip: 10,
        }),
      );
    });

    it('should filter by city when only city is provided', async () => {
      const searchSpy = jest.spyOn(repository, 'search').mockResolvedValue([]);

      const query = new GetListingsQueryDto();
      query.city = 'Paris';
      await service.search(query);

      expect(searchSpy).toHaveBeenCalledWith(
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
      const searchSpy = jest.spyOn(repository, 'search').mockResolvedValue([]);

      const query = new GetListingsQueryDto();
      query.country = 'France';
      await service.search(query);

      expect(searchSpy).toHaveBeenCalledWith(
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
      const searchSpy = jest.spyOn(repository, 'search').mockResolvedValue([]);

      const query = new GetListingsQueryDto();
      query.city = 'Paris';
      query.country = 'France';
      const result = await service.search(query);

      expect(result).toEqual([]);
      expect(searchSpy).toHaveBeenCalledWith(
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
      const mockListing = { id: '1', title: 'SF Loft' } as unknown as Listing;
      const searchSpy = jest
        .spyOn(repository, 'search')
        .mockResolvedValue([mockListing as any]);

      const query = new GetListingsQueryDto();
      query.city = 'San Francisco';
      query.country = 'United States';
      const result = await service.search(query);

      expect(result).toHaveLength(1);
      expect(searchSpy).toHaveBeenCalledWith(
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

    it('should call repository.search with explicit undefined when limit and offset are set to undefined', async () => {
      const searchSpy = jest.spyOn(repository, 'search').mockResolvedValue([]);

      const query = new GetListingsQueryDto();
      query.limit = undefined;
      query.offset = undefined;
      await service.search(query);

      expect(searchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          take: undefined,
          skip: undefined,
        }),
      );
    });

    it('should not add city or country to where clause if they are empty strings', async () => {
      const searchSpy = jest.spyOn(repository, 'search').mockResolvedValue([]);

      const query = new GetListingsQueryDto();
      query.city = '';
      query.country = '';
      await service.search(query);

      expect(searchSpy).toHaveBeenCalledWith({
        where: { status: ListingStatus.PUBLISHED },
        sortBy: undefined,
        sortOrder: undefined,
        take: 20,
        skip: 0,
      });
    });

    it('should trim city and country in the where clause', async () => {
      const searchSpy = jest.spyOn(repository, 'search').mockResolvedValue([]);

      const query = new GetListingsQueryDto();
      query.city = ' Paris ';
      query.country = ' France ';
      await service.search(query);

      expect(searchSpy).toHaveBeenCalledWith(
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
      const searchSpy = jest.spyOn(repository, 'search').mockResolvedValue([]);

      const query = new GetListingsQueryDto();
      query.sortBy = 'nightPrice';
      query.sortOrder = 'asc';
      await service.search(query);

      expect(searchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          sortBy: 'nightPrice',
          sortOrder: 'asc',
        }),
      );
    });

    it('should default sortOrder to undefined in options when only sortBy is provided', async () => {
      const searchSpy = jest.spyOn(repository, 'search').mockResolvedValue([]);

      const query = new GetListingsQueryDto();
      query.sortBy = 'nightPrice';
      await service.search(query);

      expect(searchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          sortBy: 'nightPrice',
          sortOrder: undefined,
        }),
      );
    });

    it('should set includeHost to true when include=host', async () => {
      const searchSpy = jest.spyOn(repository, 'search').mockResolvedValue([]);

      const query = new GetListingsQueryDto();
      query.include = 'host';
      await service.search(query);

      expect(searchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          includeHost: true,
        }),
      );
    });

    it('should set multiple include flags when include has multiple values', async () => {
      const searchSpy = jest.spyOn(repository, 'search').mockResolvedValue([]);

      const query = new GetListingsQueryDto();
      query.include = 'host,amenities,_count';
      await service.search(query);

      expect(searchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          includeHost: true,
          includeAmenities: true,
          includeCount: true,
        }),
      );
    });
  });
});
