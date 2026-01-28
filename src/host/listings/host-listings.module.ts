import { Module } from '@nestjs/common';
import { HostListingsController } from './host-listings.controller';
import { HostListingsService } from './host-listings.service';

@Module({
  controllers: [HostListingsController],
  providers: [HostListingsService],
})
export class HostListingsModule {}
