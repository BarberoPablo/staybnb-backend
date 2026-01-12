import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import type { AuthUser } from 'src/auth/auth-user';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ListingDto } from 'src/listings/dto/listing.dto';
import { mapListingToDto } from 'src/listings/dto/listings.mapper';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { AdminListingsService } from './admin-listings.service';
import { RejectListingDto } from './dto/reject-listings.dto';

@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin/listings')
export class AdminListingsController {
  constructor(private readonly service: AdminListingsService) {}

  @Get()
  async findPendings(): Promise<ListingDto[]> {
    const listings = await this.service.findPending();
    return listings.map(mapListingToDto);
  }

  @Post(':id/approve')
  async approve(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
  ): Promise<ListingDto> {
    const listing = await this.service.approve(id, user.id);
    return mapListingToDto(listing);
  }

  @Post(':id/reject')
  async reject(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
    @Body() body: RejectListingDto,
  ): Promise<ListingDto> {
    const listing = await this.service.reject(id, user.id, body.reason);
    return mapListingToDto(listing);
  }
}
