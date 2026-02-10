import { Module } from '@nestjs/common';
import { HostListingsController } from './host-listings.controller';
import { HostListingsService } from './host-listings.service';

@Module({
  imports: [],
  controllers: [HostListingsController],
  providers: [HostListingsService],
})
export class HostListingsModule {}
