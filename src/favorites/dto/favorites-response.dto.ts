import { ApiProperty } from '@nestjs/swagger';

export class IsFavoriteResponseDto {
  @ApiProperty()
  isFavorite: boolean;
}

export class FavoriteListingLocationDto {
  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}

export class FavoriteListingDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty()
  nightPrice: number;

  @ApiProperty({ type: FavoriteListingLocationDto })
  location: FavoriteListingLocationDto;

  @ApiProperty()
  ratingAvg: number;

  @ApiProperty()
  ratingCount: number;
}

export class FavoriteListingResponseDto {
  @ApiProperty({ type: FavoriteListingDto })
  listing: FavoriteListingDto;
}
