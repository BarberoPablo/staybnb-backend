import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { AuthUser } from '@src/auth/auth-user';
import { CurrentUser } from '@src/auth/current-user.decorator';
import { SuccessResponseDto } from '@src/shared/dto/success-response.dto';
import {
  FavoriteListingResponseDto,
  IsFavoriteResponseDto,
} from './dto/favorites-response.dto';
import { FavoritesService } from './favorites.service';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly service: FavoritesService) {}

  @ApiOkResponse({ type: FavoriteListingResponseDto, isArray: true })
  @Get()
  async getFavorites(
    @CurrentUser() user: AuthUser,
  ): Promise<FavoriteListingResponseDto[]> {
    return this.service.getFavorites(user.id);
  }

  @ApiOkResponse({ type: IsFavoriteResponseDto })
  @Get(':listingId/check')
  async isFavorite(
    @CurrentUser() user: AuthUser,
    @Param('listingId') listingId: string,
  ): Promise<IsFavoriteResponseDto> {
    const isFavorite = await this.service.isFavorite(user.id, listingId);
    return { isFavorite };
  }

  @ApiOkResponse({ type: SuccessResponseDto })
  @Post(':listingId')
  async addFavorite(
    @CurrentUser() user: AuthUser,
    @Param('listingId') listingId: string,
  ): Promise<SuccessResponseDto> {
    await this.service.addFavorite(user.id, listingId);
    return { success: true };
  }

  @ApiOkResponse({ type: SuccessResponseDto })
  @Delete(':listingId')
  async deleteFavorite(
    @CurrentUser() user: AuthUser,
    @Param('listingId') listingId: string,
  ): Promise<SuccessResponseDto> {
    await this.service.deleteFavorite(user.id, listingId);
    return { success: true };
  }
}
