import { Module } from '@nestjs/common';
import { ListingsController } from '@src/listings/listings.controller';
import { ListingsService } from '@src/listings/listings.service';
import { ListingRepository } from '@src/listings/repositories/listings.repository';

@Module({
  controllers: [ListingsController],
  providers: [ListingsService, ListingRepository],
})
export class ListingsModule {}
