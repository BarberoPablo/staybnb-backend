import { Module } from '@nestjs/common';
import { AmenitiesModule } from '@src/amenities/amenities.module';
import { DraftListingsController } from './draft-listings.controller';
import { DraftListingsService } from './draft-listings.service';
import { DraftListingsRepository } from './repositories/draft-listings.repository';

@Module({
  imports: [AmenitiesModule],
  controllers: [DraftListingsController],
  providers: [DraftListingsService, DraftListingsRepository],
})
export class DraftListingsModule {}
