import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
import { IsInt, IsObject, Min } from 'class-validator';

//Domain dto
export class UpdateDraftListingDto {
  @ApiPropertyOptional({ type: [String] })
  amenities?: string[];

  @ApiPropertyOptional({ type: [String] })
  images?: string[];

  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  nightPrice?: number;

  @ApiPropertyOptional()
  checkInTime?: string;

  @ApiPropertyOptional()
  checkOutTime?: string;

  @ApiPropertyOptional()
  minCancelDays?: number;

  @ApiPropertyOptional()
  currentStep?: number;

  @ApiPropertyOptional({ type: [Number] })
  visitedSteps?: number[];

  @ApiPropertyOptional({ enum: PropertyType })
  propertyType?: PropertyType;

  @ApiPropertyOptional({ enum: PrivacyType })
  privacyType?: PrivacyType;

  /**
   * We use Swagger Classes for API documentation and Validation,
   * but use Interfaces for the property types to remain compatible
   * with Prisma's JSON field requirements (Plain Objects vs Classes).
   */

  @ApiPropertyOptional({ type: [ListingPromotionDto] })
  promotions?: Promotion[];

  @ApiPropertyOptional({ type: ListingLocationDto })
  location?: ListingLocationResponse;

  @ApiPropertyOptional({ type: ListingStructureDto })
  structure?: DraftListingStructure;

  @ApiPropertyOptional({ type: ListingGuestLimitsDto })
  guestLimits?: GuestLimits;
}

//DTO for handler (Boundary DTO, Input DTO)
export class PatchDraftListingBodyDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  step: number;

  @ApiProperty({ type: UpdateDraftListingDto })
  @IsObject()
  data: UpdateDraftListingDto;
}
