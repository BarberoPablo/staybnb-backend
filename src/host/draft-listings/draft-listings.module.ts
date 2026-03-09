import { Module } from '@nestjs/common';
import { DraftListingsController } from './draft-listings.controller';
import { DraftListingsRepository } from './repositories/draft-listings.repository';
import { DraftListingsService } from './draft-listings.service';

@Module({
  controllers: [DraftListingsController],
  providers: [DraftListingsService, DraftListingsRepository],
})
export class DraftListingsModule {}
