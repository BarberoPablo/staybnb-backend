import { Injectable } from '@nestjs/common';
import { ListingStatus } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import {
  PopularCitiesOptions,
  RawPopularCity,
} from './cities.repository.types';

@Injectable()
export class CitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPopular(options: PopularCitiesOptions): Promise<RawPopularCity[]> {
    return this.prisma.$queryRaw<RawPopularCity[]>`
      SELECT 
        city as "name",
        NULL as "state",
        country as "country",
        AVG(lat)::float as "lat",
        AVG(lng)::float as "lng",
        COUNT(*)::int as "listingCount",
        (array_agg(images[1]))[1] as "imageUrl"
      FROM "Listing"
      WHERE status = ${ListingStatus.PUBLISHED}
        AND city IS NOT NULL
        AND array_length(images, 1) > 0
      GROUP BY city, country
      ORDER BY "listingCount" DESC
      LIMIT ${options.take} OFFSET ${options.skip}
    `;
  }
}
