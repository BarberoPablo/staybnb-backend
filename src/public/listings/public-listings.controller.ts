import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '@src/auth/public.decorator';
import { ListingResponseDto } from 'src/listings/dto/listing-response.dto';
import { mapListingToResponse } from 'src/listings/dto/listings.mapper';
import { PublicListingsService } from './public-listings.service';

@Public()
@Controller('public/listings')
export class PublicListingsController {
  constructor(private readonly service: PublicListingsService) {}

  @Get()
  async findAll(): Promise<ListingResponseDto[]> {
    const listings = await this.service.findAll();
    return listings.map(mapListingToResponse);
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<ListingResponseDto> {
    const listing = await this.service.findById(id);
    return mapListingToResponse(listing);
  }
}
