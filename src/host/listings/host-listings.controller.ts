import { Controller, Get, Param, Post } from '@nestjs/common';
import type { AuthUser } from 'src/auth/auth-user';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ListingResponseDto } from '../../listings/dto/listing-response.dto';
import { mapListingToResponse } from '../../listings/dto/listings.mapper';
import { HostListingsService } from './host-listings.service';

@Controller('host/listings')
export class HostListingsController {
  constructor(private readonly service: HostListingsService) {}

  @Get()
  async findAll(@CurrentUser() user: AuthUser): Promise<ListingResponseDto[]> {
    const hostId = user.id;
    const listings = await this.service.findByHostId(hostId);

    return listings.map((listing) => mapListingToResponse(listing));
  }

  @Get(':id')
  async find(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ): Promise<ListingResponseDto> {
    const hostId = user.id;
    const listing = await this.service.findById(hostId, id);

    return mapListingToResponse(listing);
  }

  @Post(':id/resubmit')
  resubmitListing(
    @Param('id') listingId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.service.resubmit(listingId, user.id);
  }
}
