import { ListingStatus } from '@prisma/client';
import { GetListingsQueryDto } from '../../dto/get-listings-query.dto';
import { buildListingsWhere } from '../build-listings-where';

describe('buildListingsWhere', () => {
  it('should return default where clause when query is empty', () => {
    const query: GetListingsQueryDto = {};
    const result = buildListingsWhere(query);

    expect(result).toEqual({
      status: ListingStatus.PUBLISHED,
    });
  });

  it('should include city when provided and not empty', () => {
    const query: GetListingsQueryDto = { city: 'Buenos Aires' };
    const result = buildListingsWhere(query);

    expect(result).toEqual({
      status: ListingStatus.PUBLISHED,
      city: {
        equals: 'Buenos Aires',
        mode: 'insensitive',
      },
    });
  });

  it('should include country when provided and not empty', () => {
    const query: GetListingsQueryDto = { country: 'Argentina' };
    const result = buildListingsWhere(query);

    expect(result).toEqual({
      status: ListingStatus.PUBLISHED,
      country: {
        equals: 'Argentina',
        mode: 'insensitive',
      },
    });
  });

  it('should include both city and country when provided', () => {
    const query: GetListingsQueryDto = {
      city: 'Buenos Aires',
      country: 'Argentina',
    };
    const result = buildListingsWhere(query);

    expect(result).toEqual({
      status: ListingStatus.PUBLISHED,
      city: {
        equals: 'Buenos Aires',
        mode: 'insensitive',
      },
      country: {
        equals: 'Argentina',
        mode: 'insensitive',
      },
    });
  });

  it('should trim city and country strings', () => {
    const query: GetListingsQueryDto = {
      city: '  Buenos Aires  ',
      country: '  Argentina  ',
    };
    const result = buildListingsWhere(query);

    expect(result).toEqual({
      status: ListingStatus.PUBLISHED,
      city: {
        equals: 'Buenos Aires',
        mode: 'insensitive',
      },
      country: {
        equals: 'Argentina',
        mode: 'insensitive',
      },
    });
  });

  it('should not include city or country if they are only whitespace', () => {
    const query: GetListingsQueryDto = {
      city: '   ',
      country: '  ',
    };
    const result = buildListingsWhere(query);

    expect(result).toEqual({
      status: ListingStatus.PUBLISHED,
    });
  });

  it('should not include city or country if they are undefined or null', () => {
    const query = {
      city: undefined,
      country: null,
    } as unknown as GetListingsQueryDto;
    const result = buildListingsWhere(query);

    expect(result).toEqual({
      status: ListingStatus.PUBLISHED,
    });
  });
});
