import { ListingStatus, Prisma } from '@prisma/client';
import { GetListingsQueryDto } from '../dto/get-listings-query.dto';

export function buildListingsWhere(
  query: GetListingsQueryDto,
): Prisma.ListingWhereInput {
  const where: Prisma.ListingWhereInput = {
    status: ListingStatus.PUBLISHED,
  };

  const city = query.city?.trim();
  if (city) {
    where.city = {
      equals: city,
      mode: 'insensitive',
    };
  }

  const country = query.country?.trim();
  if (country) {
    where.country = {
      equals: country,
      mode: 'insensitive',
    };
  }

  return where;
}
