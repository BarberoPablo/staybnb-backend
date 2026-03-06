import { BadRequestException, Injectable } from '@nestjs/common';
import { GetFeaturedListingsQueryDto } from '@src/listings/dto/get-featured-listings-query.dto';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingWithOptionalRelations } from '@src/listings/types/listing.types';
import { buildListingsWhere } from './builders/build-listings-where';
import {
  FindListingByIdOptions,
  SearchListingsOptions,
} from './repositories/listing.repository.types';
import { ListingRepository } from './repositories/listings.repository';
import {
  ALLOWED_SEARCH_INCLUDES,
  ALLOWED_SINGLE_LISTING_INCLUDES,
  buildSearchInclude,
} from './utils/listings.utils';

@Injectable()
export class ListingsService {
  constructor(private readonly listingRepository: ListingRepository) {}

  async getFeaturedListings(
    query: GetFeaturedListingsQueryDto,
  ): Promise<ListingWithOptionalRelations[]> {
    const limit = query.limit ?? 12;
    const offset = query.offset ?? 0;

    return this.listingRepository.findFeatured({
      take: limit,
      skip: offset,
    });
  }

  async getPopularListings(
    query: GetFeaturedListingsQueryDto,
  ): Promise<ListingWithOptionalRelations[]> {
    const limit = query.limit ?? 12;
    const offset = query.offset ?? 0;

    return this.listingRepository.findPopular({
      take: limit,
      skip: offset,
    });
  }

  async search(
    query: GetListingsQueryDto,
  ): Promise<ListingWithOptionalRelations[]> {
    const limit = query.limit ?? 20;
    const offset = query.offset ?? 0;

    const where = buildListingsWhere(query);

    const includeParams = buildSearchInclude(query.include);

    const options: SearchListingsOptions = {
      where,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      take: limit,
      skip: offset,
    };

    for (const includeParam of includeParams) {
      if (!ALLOWED_SEARCH_INCLUDES.has(includeParam)) {
        throw new BadRequestException(
          `Include '${includeParam}' is not allowed in GET /listings search endpoint`,
        );
      }

      if (includeParam === 'host') {
        options.includeHost = true;
      }

      if (includeParam === 'amenities') {
        options.includeAmenities = true;
      }

      if (includeParam === '_count') {
        options.includeCount = true;
      }
    }

    return this.listingRepository.search(options);
  }

  async findById(
    id: string,
    query: GetListingsQueryDto,
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
