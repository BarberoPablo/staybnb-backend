import { ApiProperty } from '@nestjs/swagger';
import type { PrivacyType, PropertyType } from '../types/listing.types';
import { privacyTypes, propertyTypes } from '../types/listing.types';

export class HomeListingLocationDto {
  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  country: string;
}

export class HomeListingDto {
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

  @ApiProperty({ enum: propertyTypes })
  propertyType: PropertyType;

  @ApiProperty({ enum: privacyTypes })
  privacyType: PrivacyType;

  @ApiProperty({ type: HomeListingLocationDto })
  location: HomeListingLocationDto;
}
