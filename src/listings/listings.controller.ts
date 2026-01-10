import { Controller, Get, Param } from '@nestjs/common';
import type { AuthUser } from 'src/auth/auth-user';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ListingDto } from './dto/listing.dto';
import { mapListingToDto } from './dto/listings.mapper';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private readonly service: ListingsService) {}

  @Get()
  async findAll(@CurrentUser() user: AuthUser): Promise<ListingDto[]> {
    const hostId = user.id;
    const listings = await this.service.findByHostId(hostId);

    return listings.map((listing) => mapListingToDto(listing));
  }

  @Get(':id')
  async find(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ): Promise<ListingDto> {
    const hostId = user.id;
    const listing = await this.service.findById(hostId, id);

    return mapListingToDto(listing);
  }
}
