import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from '../cities.service';
import { GetCitiesQueryDto } from '../dto/get-cities-query.dto';
import { PopularDestinationDto } from '../dto/popular-destination-response.dto';
import { CitiesRepository } from '../repositories/cities.repository';

describe('CitiesService', () => {
  let service: CitiesService;
  let repository: CitiesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        {
          provide: CitiesRepository,
          useValue: {
            findPopular: jest.fn(),
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
    repository = module.get<CitiesRepository>(CitiesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPopularCities', () => {
    it('should return mapped cities from repository', async () => {
      const findPopularSpy = jest
        .spyOn(repository, 'findPopular')
        .mockResolvedValue([
          {
            name: 'Paris',
            country: 'France',
            lat: 48.8566,
            lng: 2.3522,
            listingCount: 10,
            imageUrl: 'paris.jpg',
          },
        ]);

      const query = new GetCitiesQueryDto();
      query.limit = 10;
      query.offset = 5;

      const result = await service.getPopularCities(query);

      expect(findPopularSpy).toHaveBeenCalledWith({
        take: 10,
        skip: 5,
      });

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Paris');
      expect(result[0].id).toBe('Paris-France');
    });
  });

  describe('search', () => {
    it('should call repository.search with name', async () => {
      const mockCities = [{ name: 'Paris', lat: 48.8566, lng: 2.3522 }];
      const searchSpy = jest
        .spyOn(repository, 'search')
        .mockResolvedValue(mockCities as any);

      const result = await service.search('Paris');

      expect(searchSpy).toHaveBeenCalledWith('Paris');
      expect(result).toBe(mockCities);
    });
  });
});
