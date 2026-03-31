/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from '../favorites.service';
import { FavoritesRepository } from '../repositories/favorites.repository';
import { FavoriteWithListing } from '../repositories/favorites.repository.types';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let repository: FavoritesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: FavoritesRepository,
          useValue: {
            isFavorite: jest.fn(),
            addFavorite: jest.fn(),
            deleteFavorite: jest.fn(),
            getFavorites: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    repository = module.get<FavoritesRepository>(FavoritesRepository);
  });

  it('should call repository.getFavorites and map results', async () => {
    const mockFavorites: FavoriteWithListing[] = [
      {
        listing: {
          id: 'l1',
          title: 'Title',
          images: ['img1.jpg'],
          nightPrice: 100,
          location: { state: 'State' },
          city: 'City',
          ratingAvg: 5,
          ratingCount: 1,
        },
      },
    ];
    jest.spyOn(repository, 'getFavorites').mockResolvedValue(mockFavorites);

    const result = await service.getFavorites('u1');

    expect(repository.getFavorites).toHaveBeenCalledWith('u1');
    expect(result).toHaveLength(1);
    expect(result[0].listing.id).toBe('l1');
    expect(result[0].listing.images).toEqual(['img1.jpg']);
  });

  it('should handle listing with no images', async () => {
    const mockFavorites: FavoriteWithListing[] = [
      {
        listing: {
          id: 'l1',
          title: 'Title',
          images: [],
          nightPrice: 100,
          location: { state: 'State' },
          city: 'City',
          ratingAvg: 5,
          ratingCount: 1,
        },
      },
    ];
    jest.spyOn(repository, 'getFavorites').mockResolvedValue(mockFavorites);

    const result = await service.getFavorites('u1');

    expect(result[0].listing.images).toEqual([]);
  });

  it('should return empty array if repository returns empty favorites', async () => {
    jest.spyOn(repository, 'getFavorites').mockResolvedValue([]);

    const result = await service.getFavorites('u1');

    expect(result).toEqual([]);
  });

  it('should throw Error if listing has invalid location', async () => {
    const mockFavorites: FavoriteWithListing[] = [
      {
        listing: {
          id: 'l1',
          title: 'Title',
          images: [],
          nightPrice: 100,
          location: null as any,
          city: 'City',
          ratingAvg: 5,
          ratingCount: 1,
        },
      },
    ];
    jest.spyOn(repository, 'getFavorites').mockResolvedValue(mockFavorites);

    await expect(service.getFavorites('u1')).rejects.toThrow(
      'Invalid location',
    );
  });

  it('should call repository.isFavorite', async () => {
    jest.spyOn(repository, 'isFavorite').mockResolvedValue(true);
    const result = await service.isFavorite('u1', 'l1');
    expect(result).toBe(true);
    expect(repository.isFavorite).toHaveBeenCalledWith('u1', 'l1');
  });

  it('should call repository.addFavorite', async () => {
    await service.addFavorite('u1', 'l1');
    expect(repository.addFavorite).toHaveBeenCalledWith('u1', 'l1');
  });

  it('should call repository.deleteFavorite', async () => {
    await service.deleteFavorite('u1', 'l1');
    expect(repository.deleteFavorite).toHaveBeenCalledWith('u1', 'l1');
  });
});
