import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import type { AuthUser } from 'src/auth/auth-user';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ListingDto } from 'src/listings/dto/listing.dto';
import { mapListingToDto } from 'src/listings/dto/listings.mapper';
import { mapDraftListingDbToResponse } from './draft-listings.mapper';
import { DraftListingsService } from './draft-listings.service';
import { DraftListingResponseDto } from './dto/draft-listing-response.dto';

@UseGuards(AuthGuard)
@Controller('host/draft-listings')
export class DraftListingsController {
  constructor(private readonly service: DraftListingsService) {}

  @Post()
  async create(
    @CurrentUser() user: AuthUser,
  ): Promise<DraftListingResponseDto> {
    const hostId = user.id;
    const draft = await this.service.create(hostId);
    return mapDraftListingDbToResponse(draft);
  }

  @Post(':id/publish')
  async complete(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
  ): Promise<ListingDto> {
    const listing = await this.service.complete(id.trim(), user.id);
    return mapListingToDto(listing);
  }

  @Get()
  async findAll(
    @CurrentUser() user: AuthUser,
  ): Promise<DraftListingResponseDto[]> {
    const hostId = user.id;
    const drafts = await this.service.findAll(hostId);

    return drafts.map((draft) => mapDraftListingDbToResponse(draft));
  }

  @Get(':id')
  async find(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ): Promise<DraftListingResponseDto> {
    const hostId = user.id;
    const draft = await this.service.find(hostId, id);

    return mapDraftListingDbToResponse(draft);
  }
}
