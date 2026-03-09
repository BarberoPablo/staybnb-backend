import { Injectable } from '@nestjs/common';
import { AmenitiesRepository } from './repositories/amenities.repository';

@Injectable()
export class AmenitiesService {
  constructor(private readonly amenitiesRepository: AmenitiesRepository) {}
}
