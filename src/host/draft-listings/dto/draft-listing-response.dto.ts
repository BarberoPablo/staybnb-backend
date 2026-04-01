import { ApiProperty } from '@nestjs/swagger';
import { PrivacyType, PropertyType } from '@prisma/client';
import {
  ListingGuestLimitsDto,
  ListingLocationDto,
  ListingPromotionDto,
  ListingStructureDto,
} from '@src/listings/dto/listing-response.dto';

export class DraftListingResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  hostId: string;

  @ApiProperty({ enum: PropertyType })
  propertyType: PropertyType;

  @ApiProperty({ enum: PrivacyType })
  privacyType: PrivacyType;

  @ApiProperty({ type: ListingLocationDto })
  location: ListingLocationDto;

  @ApiProperty()
  checkInTime: string;

  @ApiProperty()
  checkOutTime: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  nightPrice: number;

  @ApiProperty({ type: [ListingPromotionDto] })
  promotions: ListingPromotionDto[];

  @ApiProperty({ type: ListingStructureDto })
  structure: ListingStructureDto;

  @ApiProperty({ type: ListingGuestLimitsDto })
  guestLimits: ListingGuestLimitsDto;

  @ApiProperty({ type: [String] })
  amenities: string[];

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty()
  minCancelDays: number;

  @ApiProperty()
  currentStep: number;

  @ApiProperty({ type: [Number] })
  visitedSteps: number[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class SuccessResponseDto {
  @ApiProperty()
  success: boolean;
}

export class DraftListingPublishResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  listingId: string;
}
