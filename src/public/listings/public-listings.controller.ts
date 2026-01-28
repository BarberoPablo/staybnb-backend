import { Controller, Get, Param } from '@nestjs/common';
import { ListingDto } from 'src/listings/dto/listing.dto';
import { mapListingToDto } from 'src/listings/dto/listings.mapper';
import { PublicListingsService } from './public-listings.service';

@Controller('public/listings')
export class PublicListingsController {
  constructor(private readonly service: PublicListingsService) {}

  @Get()
  async findAll(): Promise<ListingDto[]> {
    const listings = await this.service.findAll();
    return listings.map(mapListingToDto);
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<ListingDto> {
    const listing = await this.service.findById(id);
    return mapListingToDto(listing);
  }
}
