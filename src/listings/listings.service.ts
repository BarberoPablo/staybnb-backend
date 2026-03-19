import { BadRequestException, Injectable } from '@nestjs/common';
import { CitiesService } from '@src/cities/cities.service';
import { GetFeaturedListingsQueryDto } from '@src/listings/dto/get-featured-listings-query.dto';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingWithOptionalRelations } from '@src/listings/types/listing.types';
import { buildListingsWhere } from './builders/build-listings-where';
import { GetListingsByIdQueryDto } from './dto/get-listings-by-id-query.dto';
import { ListingCardDto } from './dto/listing-card.dto';
import {
  FindListingByIdOptions,
  SearchListingsOptions,
} from './repositories/listing.repository.types';
import { ListingRepository } from './repositories/listings.repository';
import {
  ALLOWED_SINGLE_LISTING_INCLUDES,
  buildSearchInclude,
} from './utils/listings.utils';

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

  async findById(
    id: string,
    query: GetListingsByIdQueryDto,
  ): Promise<ListingWithOptionalRelations> {
    const includeParams = buildSearchInclude(query.include);

    const options: FindListingByIdOptions = {};

    for (const includeParam of includeParams) {
      if (!includeParam) continue;

      if (!ALLOWED_SINGLE_LISTING_INCLUDES.has(includeParam)) {
        throw new BadRequestException(
          `Include '${includeParam}' is not allowed in GET /listings/:id endpoint`,
        );
      }

      if (includeParam === 'host') options.includeHost = true;
      if (includeParam === 'amenities') options.includeAmenities = true;
      if (includeParam === 'reservations') options.includeReservations = true;
      if (includeParam === 'reviews') options.includeReviews = true;
      if (includeParam === '_count') options.includeCount = true;
    }

    return this.listingRepository.findById(id, options);
  }
}
