import {
  FavoriteListingLocationDto,
  FavoriteListingResponseDto,
} from '../dto/favorites-response.dto';
import { FavoriteWithListing } from '../repositories/favorites.repository.types';

export function mapFavoriteListingToFavoriteListingResponseDto(
  favorite: FavoriteWithListing,
): FavoriteListingResponseDto {
  const listing = favorite.listing;
  const listingLocation = parseLocationFromDBToResponse(
    listing.location,
    listing.city,
  );

  const images = listing.images.length > 0 ? [listing.images[0]] : [];

  return {
    listing: {
      id: listing.id,
      title: listing.title,
      images: images,
      nightPrice: listing.nightPrice,
      location: listingLocation,
      ratingAvg: listing.ratingAvg,
      ratingCount: listing.ratingCount,
    },
  };
}

export function parseLocationFromDBToResponse(
  location: unknown,
  city: string,
): FavoriteListingLocationDto {
  if (!location || typeof location !== 'object') {
    throw new Error('Invalid location');
  }

  const loc = location as FavoriteListingLocationDto;

  return {
    city: city,
    state: loc.state,
  };
}
