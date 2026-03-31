/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { Favorite, Prisma } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { FavoritesRepository } from '../repositories/favorites.repository';
import { FavoriteWithListing } from '../repositories/favorites.repository.types';

const PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;

describe('FavoritesRepository', () => {
  let repository: FavoritesRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesRepository,
        {
          provide: PrismaService,
          useValue: {
            favorite: {
              findUnique: jest.fn(),
              upsert: jest.fn(),
              delete: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<FavoritesRepository>(FavoritesRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('isFavorite', () => {
    it('should return true if favorite exists', async () => {
      jest.spyOn(prisma.favorite, 'findUnique').mockResolvedValue({
        userId: 'u1',
        listingId: 'l1',
        createdAt: new Date(),
      } as Favorite);
      const result = await repository.isFavorite('u1', 'l1');
      expect(result).toBe(true);
      expect(prisma.favorite.findUnique).toHaveBeenCalledWith({
        where: { userId_listingId: { userId: 'u1', listingId: 'l1' } },
      });
    });

    it('should return false if favorite does not exist', async () => {
      jest.spyOn(prisma.favorite, 'findUnique').mockResolvedValue(null);
      const result = await repository.isFavorite('u1', 'l1');
      expect(result).toBe(false);
    });
  });

  describe('addFavorite', () => {
    it('should call upsert with correct parameters', async () => {
      await repository.addFavorite('u1', 'l1');
      expect(prisma.favorite.upsert).toHaveBeenCalledWith({
        where: { userId_listingId: { userId: 'u1', listingId: 'l1' } },
        create: { userId: 'u1', listingId: 'l1' },
        update: {},
      });
    });
  });

  describe('deleteFavorite', () => {
    it('should call delete with correct parameters', async () => {
      await repository.deleteFavorite('u1', 'l1');
      expect(prisma.favorite.delete).toHaveBeenCalledWith({
        where: { userId_listingId: { userId: 'u1', listingId: 'l1' } },
      });
    });

    it('should not throw if favorite does not exist (P2025)', async () => {
      const error = new PrismaClientKnownRequestError('Record not found', {
        code: 'P2025',
        clientVersion: 'mock',
      });
      jest.spyOn(prisma.favorite, 'delete').mockRejectedValue(error);

      await expect(
        repository.deleteFavorite('u1', 'l1'),
      ).resolves.not.toThrow();
    });

    it('should throw other prisma errors', async () => {
      const error = new Error('Some other error');
      jest.spyOn(prisma.favorite, 'delete').mockRejectedValue(error);

      await expect(repository.deleteFavorite('u1', 'l1')).rejects.toThrow(
        'Some other error',
      );
    });
  });

  describe('getFavorites', () => {
    it('should call findMany with correct parameters', async () => {
      const mockResult: FavoriteWithListing[] = [
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
      jest
        .spyOn(prisma.favorite, 'findMany')
        .mockResolvedValue(mockResult as any);

      const result = await repository.getFavorites('u1');

      expect(prisma.favorite.findMany).toHaveBeenCalledWith({
        where: { userId: 'u1' },
        select: {
          listing: {
            select: {
              id: true,
              title: true,
              images: true,
              nightPrice: true,
              location: true,
              city: true,
              ratingAvg: true,
              ratingCount: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toBe(mockResult);
    });
  });
});
