import { Module } from '@nestjs/common';
import { DraftListingsController } from './draft-listings.controller';
import { DraftListingsService } from './draft-listings.service';

@Module({
  controllers: [DraftListingsController],
  providers: [DraftListingsService]
})
export class DraftListingsModule {}
