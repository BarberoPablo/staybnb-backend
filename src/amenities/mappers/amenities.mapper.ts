import { AmenityResponseDto } from '../dto/amenities-response-dto';
import { PrismaAmenity } from '../types/amenities.types';

export function mapAmenities(amenities: PrismaAmenity[]): AmenityResponseDto[] {
  return amenities.map((amenity) => ({
    id: amenity.id,
    name: amenity.name,
    category: amenity.category,
  }));
}
