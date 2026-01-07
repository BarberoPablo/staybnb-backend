import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    const FAKE_USER_ID = '0013b1f';
    const draft = await this.service.create(FAKE_USER_ID, dto);
    return mapDraftListingToDto(draft);
  }

  @Post(':id/complete')
  async complete(@Param('id') id: string): Promise<ListingDto> {
    console.log('ID RAW:', JSON.stringify(id));
    const listing = await this.service.complete(id.trim());
    return mapListingToDto(listing);
  }

  @Get()
  async findAll(): Promise<DraftListingDto[]> {
    const FAKE_USER_ID = '0013b1f';
    const drafts = await this.service.findAll(FAKE_USER_ID);

    return drafts.map((draft) => mapDraftListingToDto(draft));
  }
}
