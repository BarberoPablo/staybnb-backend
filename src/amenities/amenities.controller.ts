import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@src/auth/public.decorator';
import { AmenitiesService } from './amenities.service';
import { AmenityResponseDto } from './dto/amenities-response-dto';

@Public()
@ApiTags('Amenities')
@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly service: AmenitiesService) {}

  @ApiOkResponse({ type: AmenityResponseDto })
  @Get()
  async getListings(): Promise<AmenityResponseDto[]> {
    return this.service.getAmenities();
  }
}
