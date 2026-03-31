import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { FavoriteWithListing } from './favorites.repository.types';

@Injectable()
export class FavoritesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getFavorites(userId: string): Promise<FavoriteWithListing[]> {
    return this.prisma.favorite.findMany({
      where: { userId },
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async isFavorite(userId: string, listingId: string): Promise<boolean> {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        userId_listingId: {
          userId,
          listingId,
        },
      },
    });

    return !!favorite;
  }

  async addFavorite(userId: string, listingId: string): Promise<void> {
    await this.prisma.favorite.upsert({
      where: {
        userId_listingId: {
          userId,
          listingId,
        },
      },
      create: {
        userId,
        listingId,
      },
      update: {},
    });
  }

  async deleteFavorite(userId: string, listingId: string): Promise<void> {
    try {
      await this.prisma.favorite.delete({
        where: {
          userId_listingId: {
            userId,
            listingId,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return;
      }
      throw error;
    }
  }
}
