import { ApiProperty } from '@nestjs/swagger';
import type { PropertyType } from '../types/listing.types';

export class ListingCheckoutResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  ratingAvg: number;

  @ApiProperty()
  ratingCount: number;

  @ApiProperty()
  formattedLocation: string;

  @ApiProperty()
  propertyType: PropertyType;

  @ApiProperty()
  bedrooms: number;

  @ApiProperty()
  beds: number;

  @ApiProperty()
  bathrooms: number;

  @ApiProperty()
  maxGuests: number;

  @ApiProperty()
  minCancelDays: number;

  @ApiProperty()
  nightPrice: number;
}
