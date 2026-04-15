import { Module } from '@nestjs/common';
import { HostListingsController } from '@src/host/listings/host-listings.controller';
import { HostListingsService } from '@src/host/listings/host-listings.service';
import { HostListingRepository } from '@src/host/listings/repositories/host-listing.repository';

@Module({
  imports: [],
  controllers: [HostListingsController],
  providers: [HostListingsService, HostListingRepository],
})
export class HostListingsModule {}
