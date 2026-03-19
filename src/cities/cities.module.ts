import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CitiesRepository } from './repositories/cities.repository';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService, CitiesRepository],
  exports: [CitiesService],
})
export class CitiesModule {}
