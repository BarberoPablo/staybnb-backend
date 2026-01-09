import { Controller, Get } from '@nestjs/common';
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
}
