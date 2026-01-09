import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { getMockUserId } from 'src/auth.mock';
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
  async create(@Body() dto: CreateDraftListingDto): Promise<DraftListingDto> {
    const hostId = getMockUserId();
    const draft = await this.service.create(hostId, dto);
    return mapDraftListingToDto(draft);
  }

  @Post(':id/complete')
  async complete(@Param('id') id: string): Promise<ListingDto> {
    const listing = await this.service.complete(id.trim());
    return mapListingToDto(listing);
  }

  @Get()
  async findAll(): Promise<DraftListingDto[]> {
    const hostId = getMockUserId();
    const drafts = await this.service.findAll(hostId);

    return drafts.map((draft) => mapDraftListingToDto(draft));
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<DraftListingDto> {
    const hostId = getMockUserId();
    const draft = await this.service.find(hostId, id);

    return mapDraftListingToDto(draft);
  }
}
