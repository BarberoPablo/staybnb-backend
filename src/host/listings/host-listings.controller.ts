import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { AuthUser } from '@src/auth/auth-user';
import { CurrentUser } from '@src/auth/current-user.decorator';
import { HostListingsService } from '@src/host/listings/host-listings.service';
import { SuccessResponseDto } from '@src/shared/dto/success-response.dto';
import {
  HostListingDetailsResponseDto,
  HostListingResponseDto,
} from './dto/host-listings.dto';
import { PartialUpdateListingDto } from './dto/update-listing.dto';

@ApiTags('Host Listings')
@Controller('host/listings')
export class HostListingsController {
  constructor(private readonly service: HostListingsService) {}

  @ApiOkResponse({ type: HostListingResponseDto, isArray: true })
  @Get()
  async findAll(
    @CurrentUser() user: AuthUser,
  ): Promise<HostListingResponseDto[]> {
    return this.service.findHostListings(user.id);
  }

  @ApiOkResponse({ type: HostListingDetailsResponseDto })
  @ApiNotFoundResponse({ description: 'Listing not found' })
  @Get(':id')
  async find(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ): Promise<HostListingDetailsResponseDto> {
    return this.service.findHostListing(user.id, id);
  }

  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiNotFoundResponse({ description: 'Listing not found' })
  @ApiForbiddenResponse({ description: 'You do not own this listing' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
    @Body() updateDto: PartialUpdateListingDto,
  ): Promise<SuccessResponseDto> {
    return this.service.updateListing(id, user.id, updateDto);
  }

  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiNotFoundResponse({ description: 'Listing not found' })
  @ApiForbiddenResponse({ description: 'You do not own this listing' })
  @ApiBadRequestResponse({
    description: 'Only rejected listings can be resubmitted',
  })
  @Post(':id/resubmit')
  async resubmitListing(
    @Param('id') listingId: string,
    @CurrentUser() user: AuthUser,
  ): Promise<SuccessResponseDto> {
    return this.service.resubmit(listingId, user.id);
  }

  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiNotFoundResponse({ description: 'Listing not found' })
  @ApiForbiddenResponse({ description: 'You do not own this listing' })
  @ApiBadRequestResponse({
    description: 'Only published listings can be paused',
  })
  @Post(':id/pause')
  async pauseListing(
    @Param('id') listingId: string,
    @CurrentUser() user: AuthUser,
  ): Promise<SuccessResponseDto> {
    return this.service.pause(listingId, user.id);
  }
}
