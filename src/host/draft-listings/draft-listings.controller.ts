import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import type { AuthUser } from 'src/auth/auth-user';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { mapDraftListingDbToResponse } from './draft-listings.mapper';
import { DraftListingsService } from './draft-listings.service';
import { DraftListingResponseDto } from './dto/draft-listing-response.dto';
import { PatchDraftListingBodyDto } from './dto/draft-listing-update.dto';

@UseGuards(AuthGuard)
@Controller('host/draft-listings')
export class DraftListingsController {
  constructor(private readonly service: DraftListingsService) {}

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

  @Post()
  async create(
    @CurrentUser() user: AuthUser,
  ): Promise<DraftListingResponseDto> {
    const hostId = user.id;
    const draft = await this.service.create(hostId);
    return mapDraftListingDbToResponse(draft);
  }

  @Post(':id/publish')
  complete(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
  ): Promise<{ listingId: string }> {
    return this.service.complete(user.id, id.trim());
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() body: PatchDraftListingBodyDto,
  ): Promise<{ success: true }> {
    await this.service.update(user.id, id, body.step, body.data);
    return { success: true };
  }

  @Patch(':id/auto-complete')
  async autoCompleteListing(
    @Param('id') listingId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.service.autoComplete(listingId, user.id);
  }
}
