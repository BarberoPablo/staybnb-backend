import { PopularDestinationDto } from '../dto/popular-destination-response.dto';
import { RawPopularCity } from '../repositories/cities.repository.types';

export function mapToPopularDestinationDto(
  row: RawPopularCity,
): PopularDestinationDto {
  return {
    // Synthetic id derived from location; this is not a persisted City entity id
    id: `${row.name}-${row.country ?? ''}`,
    name: row.name,
    country: row.country,
    lat: row.lat,
    lng: row.lng,
    listingCount: row.listingCount,
    imageUrl: row.imageUrl || undefined,
  };
}
