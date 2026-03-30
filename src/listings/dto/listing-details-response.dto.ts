import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ListingStatus, PrivacyType, PropertyType } from '@prisma/client';
import { ListingCardLocationDto } from './listing-card.dto';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

class ListingPromotionDto {
  @ApiProperty()
  minNights: number;

  @ApiProperty()
  discountPercentage: number;

  @ApiProperty()
  description: string;
}

class ListingStructureDto {
  @ApiProperty()
  bedrooms: number;

  @ApiProperty()
  beds: number;

  @ApiProperty()
  bathrooms: number;

  @ApiProperty()
  guests: number;
}

class GuestLimitDto {
  @ApiProperty()
  min: number;

  @ApiProperty()
  max: number;
}

class ListingGuestLimitsDto {
  @ApiProperty({ type: GuestLimitDto })
  adults: GuestLimitDto;

  @ApiProperty({ type: GuestLimitDto })
  children: GuestLimitDto;

  @ApiProperty({ type: GuestLimitDto })
  infant: GuestLimitDto;

  @ApiProperty({ type: GuestLimitDto })
  pets: GuestLimitDto;
}

class ListingDetailsHostDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiPropertyOptional()
  avatarUrl?: string;
}

class ListingDetailsReservationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endDate: Date;
}

export class ListingDetailsReviewDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  score: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  imageUrl?: string;
}

export class ListingDetailsResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  nightPrice: number;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty({ type: ListingCardLocationDto })
  location: ListingCardLocationDto;

  @ApiProperty({ type: ListingStructureDto })
  structure: ListingStructureDto;

  @ApiProperty({ type: ListingGuestLimitsDto })
  guestLimits: ListingGuestLimitsDto;

  @ApiProperty({ enum: PropertyType })
  propertyType: PropertyType;

  @ApiProperty({ enum: PrivacyType })
  privacyType: PrivacyType;

  @ApiPropertyOptional({ type: ListingDetailsHostDto })
  host: ListingDetailsHostDto;

  @ApiPropertyOptional({ type: [String] })
  amenities: string[];

  @ApiPropertyOptional({ type: [ListingDetailsReviewDto] })
  reviews: ListingDetailsReviewDto[];

  @ApiProperty({ type: [ListingPromotionDto] })
  promotions: ListingPromotionDto[];

  @ApiPropertyOptional({ type: [ListingDetailsReservationDto] })
  reservations: ListingDetailsReservationDto[];

  @ApiProperty()
  ratingAvg: number;

  @ApiProperty()
  ratingCount: number;

  @ApiProperty({ enum: ListingStatus })
  status: ListingStatus;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
