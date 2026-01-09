import { Controller, Get, Param } from '@nestjs/common';
import { getMockUserId } from 'src/auth.mock';
import { ListingDto } from './dto/listing.dto';
import { mapListingToDto } from './dto/listings.mapper';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private readonly service: ListingsService) {}

  @Get()
  async findAll(): Promise<ListingDto[]> {
    const hostId = getMockUserId();
    const listings = await this.service.findByHostId(hostId);

    return listings.map((listing) => mapListingToDto(listing));
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<ListingDto> {
    const hostId = getMockUserId();
    const listing = await this.service.findById(hostId, id);

    return mapListingToDto(listing);
  }

  /* 
  @Get(':id')
    async find(@Param('id') id: string): Promise<DraftListingDto> {
      const hostId = getMockUserId();
      const draft = await this.service.find(hostId, id);
  
      return mapDraftListingToDto(draft);
    }
  */
}
