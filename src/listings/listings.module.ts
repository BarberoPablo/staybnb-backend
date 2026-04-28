import { Module } from '@nestjs/common';
import { CitiesModule } from '@src/cities/cities.module';
import { ListingsController } from '@src/listings/listings.controller';
import { ListingsService } from '@src/listings/listings.service';
import { ListingRepository } from '@src/listings/repositories/listings.repository';

@Module({
  imports: [CitiesModule],
  controllers: [ListingsController],
  providers: [ListingsService, ListingRepository],
  exports: [ListingRepository],
})
export class ListingsModule {}
