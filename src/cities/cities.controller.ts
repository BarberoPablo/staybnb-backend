import { Controller, Get, Header, Query } from '@nestjs/common';
import { Public } from '@src/auth/public.decorator';
import { CitiesService } from './cities.service';
import { GetCitiesQueryDto } from './dto/get-cities-query.dto';
import { PopularDestinationResponseDto } from './dto/popular-destination-response.dto';

@Public()
@Controller('cities')
export class CitiesController {
  constructor(private readonly service: CitiesService) {}

  @Get('popular')
  @Header(
    'Cache-Control',
    'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
  )
  async getPopularCities(
    @Query() query: GetCitiesQueryDto,
  ): Promise<PopularDestinationResponseDto[]> {
    return this.service.getPopularCities(query);
  }
}
