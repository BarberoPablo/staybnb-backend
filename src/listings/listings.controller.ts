import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@src/auth/public.decorator';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingResponseDto } from '@src/listings/dto/listing-response.dto';
import { mapListingToResponse } from '@src/listings/dto/listings.mapper';
import { ListingsService } from '@src/listings/listings.service';

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

  @Get(':id')
  async getListingById(
    @Param('id') id: string,
    @Query() query: GetListingsQueryDto,
  ): Promise<ListingResponseDto> {
    const listing = await this.service.findById(id, query);
    return mapListingToResponse(listing);
  }
}
