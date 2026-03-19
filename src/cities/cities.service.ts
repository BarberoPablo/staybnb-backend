import { Injectable } from '@nestjs/common';
import { City } from '@prisma/client';
import { GetCitiesQueryDto } from './dto/get-cities-query.dto';
import { PopularDestinationDto } from './dto/popular-destination-response.dto';
import { mapToPopularDestinationDto } from './mappers/cities.mapper';
import { CitiesRepository } from './repositories/cities.repository';

@Injectable()
export class CitiesService {
  constructor(private readonly repository: CitiesRepository) {}

  async getPopularCities(
    query: GetCitiesQueryDto,
  ): Promise<PopularDestinationDto[]> {
    const limit = query.limit;
    const offset = query.offset;

    const rawCities = await this.repository.findPopular({
      take: limit,
      skip: offset,
    });

    return rawCities.map(mapToPopularDestinationDto);
  }

  async search(name: string): Promise<City[]> {
    return this.repository.search(name);
  }
}
