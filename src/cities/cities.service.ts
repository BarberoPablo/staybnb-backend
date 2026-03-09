import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { GetCitiesQueryDto } from './dto/get-cities-query.dto';
import { PopularDestinationResponseDto } from './dto/popular-destination-response.dto';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async getPopularCities(
    query: GetCitiesQueryDto,
  ): Promise<PopularDestinationResponseDto[]> {
    const limit = query.limit;
    const offset = query.offset;

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
