import { ApiProperty } from '@nestjs/swagger';
import { ListingStatus, PrivacyType, PropertyType } from '@prisma/client';
import { ListingPromotionDto } from './listing-response.dto';

export class ListingCheckoutResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  status: ListingStatus;

  @ApiProperty()
  ratingAvg: number;

  @ApiProperty()
  ratingCount: number;

  @ApiProperty()
  formattedLocation: string;

  @ApiProperty({ enum: PropertyType })
  propertyType: PropertyType;

  @ApiProperty({ enum: PrivacyType })
  privacyType: PrivacyType;

  @ApiProperty()
  image: string;

  @ApiProperty()
  checkInTime: string;

  @ApiProperty()
  checkOutTime: string;

  @ApiProperty({ type: [ListingPromotionDto] })
  promotions: ListingPromotionDto[];

  @ApiProperty()
  minCancelDays: number;

  @ApiProperty()
  nightPrice: number;
}
