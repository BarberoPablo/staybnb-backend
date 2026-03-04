import { Controller, Get, Header, Param, Query } from '@nestjs/common';
import { Public } from '@src/auth/public.decorator';
import { GetFeaturedListingsQueryDto } from '@src/listings/dto/get-featured-listings-query.dto';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingResponseDto } from '@src/listings/dto/listing-response.dto';
import { ListingsService } from '@src/listings/listings.service';
import { mapListingToResponse } from '@src/listings/mappers/listings.mapper';

@Public()
@Controller('listings')
export class ListingsController {
  constructor(private readonly service: ListingsService) {}

  @Get()
  async getListings(
    @Query() query: GetListingsQueryDto,
  ): Promise<ListingResponseDto[]> {
    const listings = await this.service.search(query);
    return listings.map(mapListingToResponse);
  }

  @Get('featured')
  @Header(
    'Cache-Control',
    'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
  )
  async getFeaturedListings(
    @Query() query: GetFeaturedListingsQueryDto,
  ): Promise<ListingResponseDto[]> {
    const listings = await this.service.getFeaturedListings(query);
    return listings.map(mapListingToResponse);
  }

  @Get('popular')
  @Header(
    'Cache-Control',
    'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
  )
  async getPopularListings(
    @Query() query: GetFeaturedListingsQueryDto,
  ): Promise<ListingResponseDto[]> {
    const listings = await this.service.getPopularListings(query);
    return listings.map(mapListingToResponse);
  }

  @Get(':id')
  async getListingById(
    @Param('id') id: string,
    @Query() query: GetListingsQueryDto,
  ): Promise<ListingResponseDto> {
    const listing = await this.service.findById(id, query);
    return mapListingToResponse(listing);
  }
}
