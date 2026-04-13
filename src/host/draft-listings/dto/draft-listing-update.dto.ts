import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PrivacyType, PropertyType } from '@prisma/client';
import {
  ListingGuestLimitsDto,
  ListingLocationDto,
  ListingPromotionDto,
  ListingStructureDto,
} from '@src/listings/dto/listing-response.dto';
import type {
  DraftListingStructure,
  GuestLimits,
  ListingLocationResponse,
  Promotion,
} from '@src/listings/types/listing.types';
import { IsInt, Min } from 'class-validator';

//Domain dto
export class UpdateDraftListingDto {
  @ApiProperty({ type: [String] })
  amenities: string[];

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  nightPrice: number;

  @ApiProperty()
  checkInTime: string;

  @ApiProperty()
  checkOutTime: string;

  @ApiProperty()
  minCancelDays: number;

  @ApiProperty({ type: [Number] })
  visitedSteps: number[];

  @ApiProperty({ enum: PropertyType })
  propertyType: PropertyType;

  @ApiProperty({ enum: PrivacyType })
  privacyType: PrivacyType;

  /**
   * We use Swagger Classes for API documentation and Validation,
   * but use Interfaces for the property types to remain compatible
   * with Prisma's JSON field requirements (Plain Objects vs Classes).
   */

  @ApiProperty({ type: [ListingPromotionDto] })
  promotions: Promotion[];

  @ApiProperty({ type: ListingLocationDto })
  location: ListingLocationResponse;

  @ApiProperty({ type: ListingStructureDto })
  structure: DraftListingStructure;

  @ApiProperty({ type: ListingGuestLimitsDto })
  guestLimits: GuestLimits;
}

// All props are optional except for currentStep. currentStep is inside the same structure, it is not a separated prop
export class PartialUpdateDraftListingDto extends PartialType(
  UpdateDraftListingDto,
) {
  @ApiProperty()
  @IsInt()
  @Min(0)
  currentStep: number;
}
