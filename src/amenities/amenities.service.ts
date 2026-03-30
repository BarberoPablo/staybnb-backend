import { Injectable } from '@nestjs/common';
import { AmenitiesRepository } from './repositories/amenities.repository';
import { AmenityResponseDto } from './dto/amenities-response-dto';
import { mapAmenities } from './mappers/amenities.mapper';

@Injectable()
export class AmenitiesService {
  constructor(private readonly amenitiesRepository: AmenitiesRepository) {}

  async getAmenities(): Promise<AmenityResponseDto[]> {
    const amenities = await this.amenitiesRepository.getAmenities();
    return mapAmenities(amenities);
  }
}
