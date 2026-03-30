import { Controller, Get, Header, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@src/auth/public.decorator';
import { GetFeaturedListingsQueryDto } from '@src/listings/dto/get-featured-listings-query.dto';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingResponseDto } from '@src/listings/dto/listing-response.dto';
import { ListingsService } from '@src/listings/listings.service';
import { mapListingToResponse } from '@src/listings/mappers/listings.mapper';
import { GetListingsByIdQueryDto } from './dto/get-listings-by-id-query.dto';
import {
  ListingCardDto,
  SearchListingsResponseDto,
} from './dto/listing-card.dto';

@Public()
@ApiTags('Listings')
@Controller('listings')
export class ListingsController {
  constructor(private readonly service: ListingsService) {}

  @ApiOkResponse({ type: SearchListingsResponseDto })
  @Get()
  async getListings(
    @Query() query: GetListingsQueryDto,
  ): Promise<SearchListingsResponseDto> {
    const { listings, cityCenter } = await this.service.search(query);
    return {
      listings,
      cityCenter,
    };
  }

  @ApiOkResponse({ type: ListingCardDto, isArray: true })
  @Get('featured')
  @Header(
    'Cache-Control',
    'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
  )
  async getFeaturedListings(
    @Query() query: GetFeaturedListingsQueryDto,
  ): Promise<ListingCardDto[]> {
    return this.service.getFeaturedListings(query);
  }

  @ApiOkResponse({ type: ListingCardDto, isArray: true })
  @Get('popular')
  @Header(
    'Cache-Control',
    'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
  )
  async getPopularListings(
    @Query() query: GetFeaturedListingsQueryDto,
  ): Promise<ListingCardDto[]> {
    return this.service.getPopularListings(query);
  }

  @Get(':id')
  async getListingById(
    @Param('id') id: string,
    @Query() query: GetListingsByIdQueryDto,
  ): Promise<ListingResponseDto> {
    const listing = await this.service.findById(id, query);
    return mapListingToResponse(listing);
  }
}
