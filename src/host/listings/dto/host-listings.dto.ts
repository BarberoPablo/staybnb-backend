import { ApiProperty } from '@nestjs/swagger';
import { ListingStatus, PrivacyType, PropertyType } from '@prisma/client';
import {
  ListingGuestLimitsDto,
  ListingPromotionDto,
  ListingStructureDto,
} from '@src/listings/dto/listing-response.dto';

export class HostListingLocationDto {
  @ApiProperty()
  country: string;

  @ApiProperty()
  city: string;
}

export class HostListingDetailsLocationDto {
  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;

  @ApiProperty()
  country: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  housenumber: string;

  @ApiProperty()
  postcode: string;

  @ApiProperty()
  formatted: string;

  @ApiProperty()
  timezone: string;
}

export class HostListingResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: ListingStatus })
  status: ListingStatus;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: HostListingLocationDto })
  location: HostListingLocationDto;

  @ApiProperty()
  nightPrice: number;

  @ApiProperty({ enum: PropertyType })
  propertyType: PropertyType;

  @ApiProperty({ enum: PrivacyType })
  privacyType: PrivacyType;
}

export class HostListingDetailsResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  nightPrice: number;

  @ApiProperty({ enum: PropertyType })
  propertyType: PropertyType;

  @ApiProperty({ enum: PrivacyType })
  privacyType: PrivacyType;

  @ApiProperty()
  checkInTime: string;

  @ApiProperty()
  checkOutTime: string;

  @ApiProperty()
  minCancelDays: number;

  @ApiProperty({ type: [ListingPromotionDto] })
  promotions: ListingPromotionDto[];

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty({ type: ListingStructureDto })
  structure: ListingStructureDto;

  @ApiProperty({ type: ListingGuestLimitsDto })
  guestLimits: ListingGuestLimitsDto;

  @ApiProperty({ type: HostListingDetailsLocationDto })
  location: HostListingDetailsLocationDto;

  @ApiProperty({ type: [String] })
  amenities: string[];
}
