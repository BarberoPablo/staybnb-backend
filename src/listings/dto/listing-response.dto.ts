import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ListingStatus, PrivacyType, PropertyType } from '@prisma/client';

export class ListingLocationDto {
  @ApiProperty()
  country: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;

  @ApiProperty()
  formatted: string;

  @ApiProperty()
  housenumber: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  postcode: string;

  @ApiProperty()
  timezone: string;
}

export class ListingPromotionDto {
  @ApiProperty()
  minNights: number;

  @ApiProperty()
  discountPercentage: number;

  @ApiProperty()
  description: string;
}

export class ListingStructureDto {
  @ApiProperty()
  bedrooms: number;

  @ApiProperty()
  beds: number;

  @ApiProperty()
  bathrooms: number;

  @ApiProperty()
  guests: number;
}

export class GuestLimitDto {
  @ApiProperty()
  min: number;

  @ApiProperty()
  max: number;
}

export class ListingGuestLimitsDto {
  @ApiProperty({ type: GuestLimitDto })
  adults: GuestLimitDto;

  @ApiProperty({ type: GuestLimitDto })
  children: GuestLimitDto;

  @ApiProperty({ type: GuestLimitDto })
  infant: GuestLimitDto;

  @ApiProperty({ type: GuestLimitDto })
  pets: GuestLimitDto;
}

export class ListingHostDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiPropertyOptional()
  avatarUrl?: string;

  @ApiPropertyOptional()
  bio?: string;
}

export class ListingReservationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;
}

export class ListingReviewDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  score: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: ListingHostDto })
  profile: ListingHostDto;
}

export class ListingCountsDto {
  @ApiPropertyOptional()
  reservations?: number;

  @ApiPropertyOptional()
  favorites?: number;

  @ApiPropertyOptional()
  reviews?: number;
}

export class ListingResponseDto {
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

  @ApiProperty({ type: ListingLocationDto })
  location: ListingLocationDto;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty({ type: [ListingPromotionDto] })
  promotions: ListingPromotionDto[];

  @ApiProperty({ type: ListingStructureDto })
  structure: ListingStructureDto;

  @ApiProperty({ type: ListingGuestLimitsDto })
  guestLimits: ListingGuestLimitsDto;

  @ApiProperty({ enum: ListingStatus })
  status: ListingStatus;

  @ApiProperty()
  ratingAvg: number;

  @ApiProperty()
  ratingCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional({ type: [String] })
  amenities?: string[];

  @ApiPropertyOptional({ type: ListingHostDto })
  host?: ListingHostDto;

  @ApiPropertyOptional({ type: [ListingReservationDto] })
  reservations?: ListingReservationDto[];

  @ApiPropertyOptional({ type: [ListingReviewDto] })
  reviews?: ListingReviewDto[];

  @ApiPropertyOptional({ type: ListingCountsDto })
  counts?: ListingCountsDto;
}
