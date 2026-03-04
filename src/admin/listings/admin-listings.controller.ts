import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { mapListingToResponse } from '@src/listings/mappers/listings.mapper';
import type { AuthUser } from 'src/auth/auth-user';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ListingResponseDto } from 'src/listings/dto/listing-response.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { AdminListingsService } from './admin-listings.service';
import { ListingModerationDto } from './dto/listing-moderation.dto';
import { mapModerationToDto } from './dto/listing-moderation.mapper';
import { RejectListingDto } from './dto/reject-listings.dto';

@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin/listings')
export class AdminListingsController {
  constructor(private readonly service: AdminListingsService) {}

  @Get()
  async findPendings(): Promise<ListingResponseDto[]> {
    const listings = await this.service.findPending();
    return listings.map(mapListingToResponse);
  }

  @Get(':id/moderation-history')
  async getModerationHistory(
    @Param('id') listingId: string,
  ): Promise<ListingModerationDto[]> {
    const history = await this.service.getModerationHistory(listingId);
    return history.map(mapModerationToDto);
  }

  @Post(':id/approve')
  async approve(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    await this.service.approve(id, user.id);
    return { success: true };
  }

  @Post(':id/reject')
  async reject(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
    @Body() body: RejectListingDto,
  ) {
    await this.service.reject(id, user.id, body.reason);
    return { success: true };
  }
}
