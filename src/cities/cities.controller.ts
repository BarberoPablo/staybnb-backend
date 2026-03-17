import { Controller, Get, Header, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Public } from '@src/auth/public.decorator';
import { CitiesService } from './cities.service';
import { GetCitiesQueryDto } from './dto/get-cities-query.dto';
import { PopularDestinationDto } from './dto/popular-destination-response.dto';

@Public()
@Controller('cities')
export class CitiesController {
  constructor(private readonly service: CitiesService) {}

  @ApiOkResponse({ type: PopularDestinationDto, isArray: true })
  @Get('popular')
  @Header(
    'Cache-Control',
    'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
  )
  async getPopularCities(
    @Query() query: GetCitiesQueryDto,
  ): Promise<PopularDestinationDto[]> {
    return this.service.getPopularCities(query);
  }
}
