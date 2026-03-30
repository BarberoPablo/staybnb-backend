import { Test, TestingModule } from '@nestjs/testing';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingsController } from '@src/listings/listings.controller';
import { ListingsService } from '@src/listings/listings.service';

const mockListingsService = {
  search: jest.fn(),
  getListingDetails: jest.fn(),
  getListingCheckout: jest.fn(),
};

describe('ListingsController', () => {
  let controller: ListingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListingsController],
      providers: [
        {
          provide: ListingsService,
          useValue: mockListingsService,
        },
      ],
    }).compile();

    controller = module.get<ListingsController>(ListingsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getListings', () => {
    it('should call service search with query and map results', async () => {
      const mockListing: any = {
        id: 'listing-id',
        title: 'Title',
        description: 'Desc',
        nightPrice: 100,
        images: [],
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        maxAdults: 2,
        maxChildren: 0,
        maxInfants: 0,
        maxPets: 0,
        location: {
          country: 'Country',
          city: 'City',
          lat: 0,
          lng: 0,
          formatted: 'Formatted',
          housenumber: '1',
          street: 'Street',
          state: 'State',
          postcode: '123',
          timezone: 'Timezone',
        },
        promotions: [],
        propertyType: 'HOUSE',
        privacyType: 'ENTIRE',
        amenities: [],
        status: 'PUBLISHED',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockListingsService.search.mockResolvedValue({
        listings: [mockListing],
        cityCenter: { lat: 0, lng: 0 },
      });

      const query: GetListingsQueryDto = { limit: 10, offset: 0 };
      const result = await controller.getListings(query);

      expect(mockListingsService.search).toHaveBeenCalledWith(query);
      expect(result.listings).toHaveLength(1);
      expect(result.listings[0].id).toBe('listing-id');
      expect(result.cityCenter).toEqual({ lat: 0, lng: 0 });
    });

    it('should call service search with city filter', async () => {
      mockListingsService.search.mockResolvedValue({
        listings: [],
        cityCenter: null,
      });

      const query: GetListingsQueryDto = { city: 'Paris' };
      await controller.getListings(query);

      expect(mockListingsService.search).toHaveBeenCalledWith(query);
    });
  });

  describe('findOne', () => {
    it('should return listing details', async () => {
      const mockListing: any = {
        id: '1',
        title: 'Title',
        description: 'Desc',
        nightPrice: 100,
        images: [],
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        maxAdults: 2,
        maxChildren: 0,
        maxInfants: 0,
        maxPets: 0,
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
        propertyType: 'HOUSE',
        privacyType: 'ENTIRE',
        amenities: [],
        status: 'PUBLISHED',
        createdAt: new Date(),
        updatedAt: new Date(),
        ratingAvg: 5,
        ratingCount: 1,
      };

      mockListingsService.getListingDetails.mockResolvedValue(mockListing);

      const result = await controller.findOne('1');

      expect(mockListingsService.getListingDetails).toHaveBeenCalledWith('1');
      expect(result.id).toBe('1');
    });
  });

  describe('getCheckoutInfo', () => {
    it('should return listing checkout info', async () => {
      const mockListing: any = {
        id: '1',
        title: 'Title',
        ratingAvg: 5,
        ratingCount: 1,
        city: 'City',
        country: 'Country',
        propertyType: 'HOUSE',
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        minCancelDays: 3,
        nightPrice: 100,
        location: {
          formatted: 'Formatted',
          housenumber: '1',
          street: 'Street',
          state: 'State',
          postcode: '123',
          timezone: 'Timezone',
        },
      };

      mockListingsService.getListingCheckout.mockResolvedValue(mockListing);

      const result = await controller.getCheckoutInfo('1');

      expect(mockListingsService.getListingCheckout).toHaveBeenCalledWith('1');
      expect(result.id).toBe('1');
      expect(result.formattedLocation).toBe('City, Country');
    });
  });
});
