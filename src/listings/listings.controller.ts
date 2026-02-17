import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '@src/auth/public.decorator';
import { ListingResponseDto } from 'src/listings/dto/listing-response.dto';
import { mapListingToResponse } from 'src/listings/dto/listings.mapper';
import { ListingsService } from './listings.service';

@Public()
@Controller('listings')
export class ListingsController {
  constructor(private readonly service: ListingsService) {}

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
