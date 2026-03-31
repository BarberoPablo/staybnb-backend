import { Injectable } from '@nestjs/common';
import { FavoriteListingResponseDto } from './dto/favorites-response.dto';
import { mapFavoriteListingToFavoriteListingResponseDto } from './mappers/favorites.mapper';
import { FavoritesRepository } from './repositories/favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoriteRepository: FavoritesRepository) {}

  async getFavorites(userId: string): Promise<FavoriteListingResponseDto[]> {
    const favorites = await this.favoriteRepository.getFavorites(userId);
    return favorites.map(mapFavoriteListingToFavoriteListingResponseDto);
  }

  async isFavorite(userId: string, listingId: string): Promise<boolean> {
    return this.favoriteRepository.isFavorite(userId, listingId);
  }

  async addFavorite(userId: string, listingId: string): Promise<void> {
    await this.favoriteRepository.addFavorite(userId, listingId);
  }

  async deleteFavorite(userId: string, listingId: string): Promise<void> {
    await this.favoriteRepository.deleteFavorite(userId, listingId);
  }
}
