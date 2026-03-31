/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { City, ListingStatus } from '@prisma/client';
import { CitiesService } from '@src/cities/cities.service';
import { GetFeaturedListingsQueryDto } from '@src/listings/dto/get-featured-listings-query.dto';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingsService } from '@src/listings/listings.service';
import { ListingRepository } from '@src/listings/repositories/listings.repository';
import { ListingCardDto } from '../dto/listing-card.dto';
import { SortBy, SortOrder } from '../repositories/listing.repository.types';
import {
  ListingDetails,
  ListingWithOptionalRelations,
} from '../types/listing.types';

describe('ListingsService', () => {
  let service: ListingsService;
  let repository: ListingRepository;
  let citiesService: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListingsService,
        {
          provide: ListingRepository,
          useValue: {
            search: jest.fn(),
            findFeatured: jest.fn(),
            findPopular: jest.fn(),
            findWithDetails: jest.fn(),
            findForCheckout: jest.fn(),
          },
        },
        {
          provide: CitiesService,
          useValue: {
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ListingsService>(ListingsService);
    repository = module.get<ListingRepository>(ListingRepository);
    citiesService = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFeaturedListings', () => {
    it('should return the result from repository', async () => {
      const mockResult: ListingCardDto[] = [{ id: '1' } as ListingCardDto];

      jest.spyOn(repository, 'findFeatured').mockResolvedValue(mockResult);

      const query: GetFeaturedListingsQueryDto = { limit: 10, offset: 0 };
      const result = await service.getFeaturedListings(query);

      expect(repository.findFeatured).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
      });
      expect(result).toBe(mockResult);
    });
  });

  describe('search', () => {
    it('should return empty results and NOT call repository when city is missing', async () => {
      const searchSpy = jest.spyOn(repository, 'search');

      const query = new GetListingsQueryDto();
      const result = await service.search(query);

      expect(result.listings).toEqual([]);
      expect(result.cityCenter).toBeNull();
      expect(searchSpy).not.toHaveBeenCalled();
    });

    it('should return empty results even if map coordinates are present but city is missing', async () => {
      const searchSpy = jest.spyOn(repository, 'search');

      const query = new GetListingsQueryDto();
      query.neLat = 40;
      query.neLng = 10;
      query.swLat = 30;
      query.swLng = 0;

      const result = await service.search(query);

      expect(result.listings).toEqual([]);
      expect(searchSpy).not.toHaveBeenCalled();
    });

    it('should search for city center and update city name when city is provided without map coordinates', async () => {
      const mockCity: City = {
        id: 'id',
        name: 'Paris',
        lat: 48.8566,
        lng: 2.3522,
        createdAt: new Date(0),
        state: null,
        country: null,
      };

      const citiesSearchSpy = jest
        .spyOn(citiesService, 'search')
        .mockResolvedValue([mockCity]);

      const mockListings: ListingCardDto[] = [];

      const searchSpy = jest
        .spyOn(repository, 'search')
        .mockResolvedValue(mockListings);

      const query = new GetListingsQueryDto();
      query.city = 'paris';
      const result = await service.search(query);

      expect(citiesSearchSpy).toHaveBeenCalledWith('paris');
      expect(result.cityCenter).toEqual({ lat: 48.8566, lng: 2.3522 });
      expect(searchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            AND: expect.arrayContaining([
              {
                city: {
                  contains: 'Paris',
                  mode: 'insensitive',
                },
              },
            ]),
          }),
        }),
      );
    });

    it('should return empty listings and null cityCenter when no city matches', async () => {
      const mockEmptyCities: City[] = [];

      jest.spyOn(citiesService, 'search').mockResolvedValue(mockEmptyCities);

      const query = new GetListingsQueryDto();
      query.city = 'UnknownCity';
      const result = await service.search(query);

      expect(result.listings).toEqual([]);
      expect(result.cityCenter).toBeNull();
    });

    it('should filter by map coordinates when BOTH city and coordinates are provided and NOT call citiesService', async () => {
      const mockListings: ListingCardDto[] = [];

      const searchSpy = jest
        .spyOn(repository, 'search')
        .mockResolvedValue(mockListings);

      const citiesSearchSpy = jest.spyOn(citiesService, 'search');

      const query = new GetListingsQueryDto();
      query.city = 'Paris'; // City must be provided to pass early return
      query.neLat = 40;
      query.neLng = 10;
      query.swLat = 30;
      query.swLng = 0;
      await service.search(query);

      expect(citiesSearchSpy).not.toHaveBeenCalled();
      expect(searchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            AND: expect.arrayContaining([
              { lat: { gte: 30, lte: 40 } },
              { lng: { gte: 0, lte: 10 } },
              { city: { contains: 'Paris', mode: 'insensitive' } },
            ]),
          }),
        }),
      );
    });

    it('should apply all filters correctly (price, structure, guests, amenities, dates) if city is provided', async () => {
      const mockCity: City = {
        id: 'id',
        name: 'London',
        lat: 51.5074,
        lng: -0.1278,
        createdAt: new Date(0),
        state: null,
        country: null,
      };

      jest.spyOn(citiesService, 'search').mockResolvedValue([mockCity]);

      const mockListings: ListingCardDto[] = [];

      const searchSpy = jest
        .spyOn(repository, 'search')
        .mockResolvedValue(mockListings);

      const query = new GetListingsQueryDto();
      query.city = 'London';
      query.minPrice = 100;
      query.maxPrice = 500;
      query.bedrooms = 2;
      query.beds = 3;
      query.bathrooms = 1;
      query.adults = 2;
      query.children = 1;
      query.amenities = 'amenity-1, amenity-2';
      query.startDate = '2024-06-01';
      query.endDate = '2024-06-10';

      await service.search(query);

      expect(searchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            nightPrice: { gte: 100, lte: 500 },
            bedrooms: { gte: 2 },
            beds: { gte: 3 },
            bathrooms: { gte: 1 },
            maxAdults: { gte: 2 },
            maxChildren: { gte: 1 },
            maxGuests: { gte: 3 }, // adults + children
            AND: expect.arrayContaining([
              { city: { contains: 'London', mode: 'insensitive' } },
              { amenities: { some: { amenityId: 'amenity-1' } } },
              { amenities: { some: { amenityId: 'amenity-2' } } },
            ]),
            NOT: expect.objectContaining({
              reservations: {
                some: expect.objectContaining({
                  status: 'UPCOMING',
                }),
              },
            }),
          }),
        }),
      );
    });

    it('should apply sorting when sortBy and sortOrder are provided and city is provided', async () => {
      const mockCity: City = {
        id: 'id',
        name: 'Madrid',
        lat: 40.4168,
        lng: -3.7038,
        createdAt: new Date(0),
        state: null,
        country: null,
      };

      jest.spyOn(citiesService, 'search').mockResolvedValue([mockCity]);

      const mockListings: ListingCardDto[] = [];

      const searchSpy = jest
        .spyOn(repository, 'search')
        .mockResolvedValue(mockListings);

      const query = new GetListingsQueryDto();
      query.city = 'Madrid';
      query.sortBy = SortBy.NIGHT_PRICE;
      query.sortOrder = SortOrder.ASC;
      await service.search(query);

      expect(searchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: ListingStatus.PUBLISHED,
          }),
          sortBy: 'nightPrice',
          sortOrder: 'asc',
        }),
      );
    });
  });

  describe('getListingDetails', () => {
    const mockListing: ListingDetails = {
      id: '1',
      hostId: 'hostId',
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
      lat: 48.8566,
      lng: 2.3522,
      checkInTime: '15:00',
      checkOutTime: '10:00',
      minCancelDays: 4,
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
      promotions: [],
      amenities: [{ amenityId: '1' }],
      host: { id: 'h1', firstName: 'John', avatarUrl: 'avatar.jpg' },
      reviews: [
        {
          id: 'r1',
          score: 5,
          message: 'Great',
          profile: { id: 'p1', avatarUrl: 'p-avatar.jpg' },
        },
      ],
      reservations: [
        {
          id: 'res1',
          startDate: new Date(),
          endDate: new Date(),
        },
      ],
    };

    it('should return mapped listing details from repository', async () => {
      jest.spyOn(repository, 'findWithDetails').mockResolvedValue(mockListing);

      const result = await service.getListingDetails('1');

      expect(repository.findWithDetails).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual({
        id: '1',
        title: 'Title',
        description: 'Description',
        nightPrice: 100,
        images: ['img.jpg'],
        location: {
          city: 'City',
          country: 'Country',
          lat: 48.8566,
          lng: 2.3522,
          formatted: 'Formatted',
          housenumber: '1',
          street: 'Street',
          state: 'State',
          postcode: '123',
          timezone: 'Timezone',
        },
        structure: {
          bedrooms: 2,
          beds: 2,
          bathrooms: 1,
          guests: 4,
        },
        guestLimits: {
          adults: { min: 1, max: 4 },
          children: { min: 0, max: 2 },
          infant: { min: 0, max: 1 },
          pets: { min: 0, max: 1 },
        },
        propertyType: 'HOUSE',
        privacyType: 'ENTIRE',
        status: 'PUBLISHED',
        ratingAvg: 4.5,
        ratingCount: 10,
        createdAt: mockListing.createdAt,
        updatedAt: mockListing.updatedAt,
        promotions: [],
        amenities: ['1'],
        host: {
          id: 'h1',
          firstName: 'John',
          avatarUrl: 'avatar.jpg',
        },
        reviews: [
          {
            id: 'r1',
            userId: 'p1',
            score: 5,
            message: 'Great',
            imageUrl: 'p-avatar.jpg',
          },
        ],
        reservations: [
          {
            id: 'res1',
            startDate: mockListing.reservations[0].startDate,
            endDate: mockListing.reservations[0].endDate,
          },
        ],
      });
    });

    it('should throw if the repository throws (e.g. not found or not published)', async () => {
      jest
        .spyOn(repository, 'findWithDetails')
        .mockRejectedValue(new Error('Not Found'));

      await expect(service.getListingDetails('1')).rejects.toThrow('Not Found');
    });
  });

  describe('getListingCheckout', () => {
    it('should return result from repository', async () => {
      const mockResult = { id: '1' } as unknown as ListingWithOptionalRelations;
      jest.spyOn(repository, 'findForCheckout').mockResolvedValue(mockResult);

      const result = await service.getListingCheckout('1');

      expect(repository.findForCheckout).toHaveBeenCalledWith({ id: '1' });
      expect(result).toBe(mockResult);
    });
  });
});
