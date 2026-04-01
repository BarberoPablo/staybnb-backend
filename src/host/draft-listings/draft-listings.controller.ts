import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { AuthUser } from '@src/auth/auth-user';
import { CurrentUser } from '@src/auth/current-user.decorator';
import { DraftListingsService } from './draft-listings.service';
import {
  DraftListingPublishResponseDto,
  DraftListingResponseDto,
  SuccessResponseDto,
} from './dto/draft-listing-response.dto';
import { PatchDraftListingBodyDto } from './dto/draft-listing-update.dto';
import { mapDraftListingDbToResponse } from './mappers/draft-listings.mappers';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Host / Draft Listings')
@Controller('host/draft-listings')
export class DraftListingsController {
  constructor(private readonly service: DraftListingsService) {}

  @ApiOkResponse({ type: DraftListingResponseDto, isArray: true })
  @Get()
  async findAll(
    @CurrentUser() user: AuthUser,
  ): Promise<DraftListingResponseDto[]> {
    const hostId = user.id;
    const drafts = await this.service.findAll(hostId);

    return drafts.map((draft) => mapDraftListingDbToResponse(draft));
  }

  @ApiOkResponse({ type: DraftListingResponseDto })
  @Get(':id')
  async find(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ): Promise<DraftListingResponseDto> {
    const hostId = user.id;
    const draft = await this.service.find(hostId, id);

    return mapDraftListingDbToResponse(draft);
  }

  @ApiOkResponse({ type: DraftListingResponseDto })
  @Post()
  async create(
    @CurrentUser() user: AuthUser,
  ): Promise<DraftListingResponseDto> {
    const hostId = user.id;
    const draft = await this.service.create(hostId);
    return mapDraftListingDbToResponse(draft);
  }

  @ApiOkResponse({ type: DraftListingPublishResponseDto })
  @Post(':id/publish')
  async complete(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
  ): Promise<DraftListingPublishResponseDto> {
    const { listingId } = await this.service.complete(user.id, id.trim());
    return { success: true, listingId };
  }

  @ApiOkResponse({ type: SuccessResponseDto })
  @Patch(':id')
  async update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() body: PatchDraftListingBodyDto,
  ): Promise<SuccessResponseDto> {
    await this.service.update(user.id, id, body.step, body.data);
    return { success: true };
  }

  @ApiOkResponse({ type: SuccessResponseDto })
  @Patch(':id/auto-complete')
  async autoCompleteListing(
    @Param('id') listingId: string,
    @CurrentUser() user: AuthUser,
  ): Promise<SuccessResponseDto> {
    await this.service.autoComplete(listingId, user.id);
    return { success: true };
  }

  @ApiOkResponse({ type: SuccessResponseDto })
  @Delete(':id')
  async remove(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ): Promise<SuccessResponseDto> {
    await this.service.remove(user.id, id);
    return { success: true };
  }
}
