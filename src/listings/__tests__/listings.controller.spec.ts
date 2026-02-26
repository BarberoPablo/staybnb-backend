import { Test, TestingModule } from '@nestjs/testing';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingsController } from '@src/listings/listings.controller';
import { ListingsService } from '@src/listings/listings.service';

const mockListingsService = {
  search: jest.fn(),
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

      mockListingsService.search.mockResolvedValue([mockListing]);

      const query: GetListingsQueryDto = { limit: 10, offset: 0 };
      const result = await controller.getListings(query);

      expect(mockListingsService.search).toHaveBeenCalledWith(query);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('listing-id');
      expect(result[0].title).toBe('Title');
    });

    it('should call service search with city and country filter', async () => {
      mockListingsService.search.mockResolvedValue([]);

      const query: GetListingsQueryDto = { city: 'Paris', country: 'France' };
      await controller.getListings(query);

      expect(mockListingsService.search).toHaveBeenCalledWith(query);
    });
  });
});
