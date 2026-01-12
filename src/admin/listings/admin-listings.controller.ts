import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { ListingDto } from 'src/listings/dto/listing.dto';
import { mapListingToDto } from 'src/listings/dto/listings.mapper';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { AdminListingsService } from './admin-listings.service';

@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin/listings')
export class AdminListingsController {
  constructor(private readonly service: AdminListingsService) {}

  @Get()
  async findPending(): Promise<ListingDto[]> {
    console.log('Flag 1');
    const listings = await this.service.findPending();
    return listings.map(mapListingToDto);
  }

  @Post(':id/approve')
  async approve(@Param('id') id: string): Promise<ListingDto> {
    const listing = await this.service.approve(id);
    return mapListingToDto(listing);
  }
}
