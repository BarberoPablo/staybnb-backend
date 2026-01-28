import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import type { AuthUser } from 'src/auth/auth-user';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ListingDto } from '../../listings/dto/listing.dto';
import { mapListingToDto } from '../../listings/dto/listings.mapper';
import { HostListingsService } from './host-listings.service';

@UseGuards(AuthGuard)
@Controller('listings')
export class HostListingsController {
  constructor(private readonly service: HostListingsService) {}

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

  @Post(':id/resubmit')
  resubmitListing(
    @Param('id') listingId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.service.resubmit(listingId, user.id);
  }
}
