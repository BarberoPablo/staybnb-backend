/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthUser } from '@src/auth/auth-user';
import { FavoriteListingResponseDto } from '../dto/favorites-response.dto';
import { FavoritesController } from '../favorites.controller';
import { FavoritesService } from '../favorites.service';

describe('FavoritesController', () => {
  let controller: FavoritesController;
  let service: FavoritesService;

  const mockUser: AuthUser = {
    id: 'u1',
    supabaseId: 's1',
    role: 'USER',
    email: 'test@example.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        {
          provide: FavoritesService,
          useValue: {
            isFavorite: jest.fn(),
            addFavorite: jest.fn(),
            deleteFavorite: jest.fn(),
            getFavorites: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
    service = module.get<FavoritesService>(FavoritesService);
  });

  describe('getFavorites', () => {
    it('should return favorites from service', async () => {
      const mockResult: FavoriteListingResponseDto[] = [
        {
          listing: {
            id: 'l1',
            title: 'Title',
            images: ['img1.jpg'],
            nightPrice: 100,
            location: {
              city: 'City',
              state: 'State',
            },
            ratingAvg: 5,
            ratingCount: 1,
          },
        },
      ];
      jest.spyOn(service, 'getFavorites').mockResolvedValue(mockResult);

      const result = await controller.getFavorites(mockUser);

      expect(result).toBe(mockResult);
      expect(service.getFavorites).toHaveBeenCalledWith('u1');
    });
  });

  describe('isFavorite', () => {
    it('should return result from service', async () => {
      jest.spyOn(service, 'isFavorite').mockResolvedValue(true);
      const result = await controller.isFavorite(mockUser, 'l1');
      expect(result).toEqual({ isFavorite: true });
      expect(service.isFavorite).toHaveBeenCalledWith('u1', 'l1');
    });
  });

  describe('addFavorite', () => {
    it('should call service and return success', async () => {
      const result = await controller.addFavorite(mockUser, 'l1');
      expect(result).toEqual({ success: true });
      expect(service.addFavorite).toHaveBeenCalledWith('u1', 'l1');
    });
  });

  describe('deleteFavorite', () => {
    it('should call service and return success', async () => {
      const result = await controller.deleteFavorite(mockUser, 'l1');
      expect(result).toEqual({ success: true });
      expect(service.deleteFavorite).toHaveBeenCalledWith('u1', 'l1');
    });
  });
});
