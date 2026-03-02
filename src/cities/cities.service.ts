import { Injectable } from '@nestjs/common';
import { GetFeaturedListingsQueryDto } from '@src/listings/dto/get-featured-listings-query.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { PopularDestinationResponseDto } from './dto/popular-destination-response.dto';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async getPopularCities(
    query: GetFeaturedListingsQueryDto,
  ): Promise<PopularDestinationResponseDto[]> {
    const limit = query.limit ?? 12;
    const offset = query.offset ?? 0;

    const result = await this.prisma.$queryRaw<PopularDestinationResponseDto[]>`
      SELECT 
        city as name,
        NULL as state,
        country,
        AVG(lat)::float as lat,
        AVG(lng)::float as lng,
        COUNT(*)::int as listingCount,
        (array_agg(images[1]))[1] as imageUrl
      FROM "Listing"
      WHERE status = 'PUBLISHED'
        AND city IS NOT NULL
        AND array_length(images, 1) > 0
      GROUP BY city, country
      ORDER BY listingCount DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    return result.map((row) => ({
      // Synthetic id derived from location; this is not a persisted City entity id
      id: `${row.name}-${row.country ?? ''}`,
      name: row.name,
      state: row.state,
      country: row.country,
      lat: row.lat,
      lng: row.lng,
      listingCount: row.listingCount,
      imageUrl: row.imageUrl || undefined,
      // synthetic field for UI compatibility — not persisted
      createdAt: new Date(0),
    }));
  }
}
