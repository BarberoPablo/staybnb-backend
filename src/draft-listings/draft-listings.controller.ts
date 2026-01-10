import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { AuthUser } from 'src/auth/auth-user';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ListingDto } from 'src/listings/dto/listing.dto';
import { mapListingToDto } from 'src/listings/dto/listings.mapper';
import { mapDraftListingToDto } from './draft-listings.mapper';
import { DraftListingsService } from './draft-listings.service';
import { CreateDraftListingDto } from './dto/create-draft-listing.dto';
import { DraftListingDto } from './dto/draft-listing.dto';

@Controller('draft-listings')
export class DraftListingsController {
  constructor(private readonly service: DraftListingsService) {}

  @Post()
  async create(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateDraftListingDto,
  ): Promise<DraftListingDto> {
    const hostId = user.id;
    const draft = await this.service.create(hostId, dto);
    return mapDraftListingToDto(draft);
  }

  @Post(':id/complete')
  async complete(@Param('id') id: string): Promise<ListingDto> {
    const listing = await this.service.complete(id.trim());
    return mapListingToDto(listing);
  }

  @Get()
  async findAll(@CurrentUser() user: AuthUser): Promise<DraftListingDto[]> {
    const hostId = user.id;
    const drafts = await this.service.findAll(hostId);

    return drafts.map((draft) => mapDraftListingToDto(draft));
  }

  @Get(':id')
  async find(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ): Promise<DraftListingDto> {
    const hostId = user.id;
    const draft = await this.service.find(hostId, id);

    return mapDraftListingToDto(draft);
  }
}
