import { Controller } from '@nestjs/common';
import { Public } from '@src/auth/public.decorator';
import { AmenitiesService } from './amenities.service';

@Public()
@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly service: AmenitiesService) {}
}
