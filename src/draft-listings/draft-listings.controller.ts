import { Body, Controller, Param, Post } from '@nestjs/common';
import { DraftListingsService } from './draft-listings.service';
import { CreateDraftListingDto } from './dto/create-draft-listing.dto';

@Controller('draft-listings')
export class DraftListingsController {
  constructor(private readonly service: DraftListingsService) {}

  @Post()
  create(@Body() dto: CreateDraftListingDto) {
    const FAKE_USER_ID = '0013b1f';
    return this.service.create(FAKE_USER_ID, dto);
  }

  @Post(':id/complete')
  complete(@Param('id') id: string) {
    console.log('ID RAW:', JSON.stringify(id));
    return this.service.complete(id.trim());
  }
}
