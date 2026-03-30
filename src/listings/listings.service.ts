import { Injectable } from '@nestjs/common';
import { CitiesService } from '@src/cities/cities.service';
import { GetFeaturedListingsQueryDto } from '@src/listings/dto/get-featured-listings-query.dto';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingWithOptionalRelations } from '@src/listings/types/listing.types';
import { buildListingsWhere } from './builders/build-listings-where';
import { ListingCardDto } from './dto/listing-card.dto';
import { ListingDetailsResponseDto } from './dto/listing-details-response.dto';
import { mapListingDetailsToResponse } from './mappers/listing-details.mapper';
import { SearchListingsOptions } from './repositories/listing.repository.types';
import { ListingRepository } from './repositories/listings.repository';

@Injectable()
export class ListingsService {
  constructor(
    private readonly listingRepository: ListingRepository,
    private readonly citiesService: CitiesService,
  ) {}

  async getFeaturedListings(
    query: GetFeaturedListingsQueryDto,
  ): Promise<ListingCardDto[]> {
    const limit = query.limit;
    const offset = query.offset;

    return this.listingRepository.findFeatured({
      take: limit,
      skip: offset,
    });
  }

  async getPopularListings(
    query: GetFeaturedListingsQueryDto,
  ): Promise<ListingCardDto[]> {
    const limit = query.limit;
    const offset = query.offset;

    return this.listingRepository.findPopular({
      take: limit,
      skip: offset,
    });
  }

  async search(query: GetListingsQueryDto): Promise<{
    listings: ListingCardDto[];
    cityCenter?: { lat: number; lng: number } | null;
  }> {
    const limit = query.limit;
    const offset = query.offset;

    if (!query.city) {
      return { listings: [], cityCenter: null };
    }

    let cityCenter: { lat: number; lng: number } | null = null;

    const hasMapCoordinates =
      query.neLat !== undefined &&
      query.neLng !== undefined &&
      query.swLat !== undefined &&
      query.swLng !== undefined;

    if (!hasMapCoordinates && query.city) {
      const matchingCities = await this.citiesService.search(query.city);
      if (matchingCities.length === 0) {
        return { listings: [], cityCenter: null };
      }

      const city = matchingCities[0];
      cityCenter = {
        lat: city.lat,
        lng: city.lng,
      };

      query.city = city.name;
    }

    const where = buildListingsWhere(query);

    const options: SearchListingsOptions = {
      where,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      take: limit,
      skip: offset,
    };

    const listings = await this.listingRepository.search(options);

    return { listings, cityCenter };
  }

  async getListingDetails(id: string): Promise<ListingDetailsResponseDto> {
    const listings = await this.listingRepository.findWithDetails({ id });
    return mapListingDetailsToResponse(listings);
  }

  async getListingCheckout(id: string): Promise<ListingWithOptionalRelations> {
    return this.listingRepository.findForCheckout({ id });
  }
}
