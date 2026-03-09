import { ApiProperty } from '@nestjs/swagger';
import type { PrivacyType, PropertyType } from '../types/listing.types';

export class FeaturedListingLocationDto {
  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  country: string;
}

export class FeaturedListingDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  nightPrice: number;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty()
  ratingAvg: number;

  @ApiProperty()
  propertyType: PropertyType;

  @ApiProperty()
  privacyType: PrivacyType;

  @ApiProperty({ type: FeaturedListingLocationDto })
  location: FeaturedListingLocationDto;
}
