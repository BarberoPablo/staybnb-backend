import { Module } from '@nestjs/common';
import { AmenitiesController } from './amenities.controller';
import { AmenitiesService } from './amenities.service';
import { AmenitiesRepository } from './repositories/amenities.repository';

@Module({
  controllers: [AmenitiesController],
  providers: [AmenitiesService, AmenitiesRepository],
  exports: [AmenitiesRepository],
})
export class AmenitiesModule {}
