import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReservationStatus } from '@prisma/client';

export class UserReservationGuestsDto {
  @ApiPropertyOptional()
  adults?: number;

  @ApiPropertyOptional()
  children?: number;

  @ApiPropertyOptional()
  infant?: number;

  @ApiPropertyOptional()
  pets?: number;
}

export class UserReservationListingLocationDto {
  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;

  @ApiProperty()
  formatted: string;
}

export class UserReviewDto {
  @ApiProperty()
  score: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  userId: string;
}

export class UserReservationListingScoreDto {
  @ApiProperty()
  value: number;

  @ApiProperty({ type: UserReviewDto, nullable: true })
  userReview: UserReviewDto | null;
}

export class UserReservationListingDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty({ type: UserReservationListingLocationDto })
  location: UserReservationListingLocationDto;

  @ApiProperty()
  nightPrice: number;

  @ApiProperty()
  propertyType: string;

  @ApiProperty()
  privacyType: string;

  @ApiProperty()
  checkInTime: string;

  @ApiProperty()
  checkOutTime: string;

  @ApiProperty({ type: UserReservationListingScoreDto })
  score: UserReservationListingScoreDto;
}

export class UserReservationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  listingId: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty({ type: UserReservationGuestsDto })
  guests: UserReservationGuestsDto;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  totalNights: number;

  @ApiProperty()
  nightPrice: number;

  @ApiPropertyOptional({ nullable: true })
  discount: number | null;

  @ApiPropertyOptional({ nullable: true })
  discountPercentage: number | null;

  @ApiProperty({ enum: ReservationStatus, enumName: 'ReservationStatus' })
  status: ReservationStatus;

  @ApiProperty({ type: UserReservationListingDto })
  listing: UserReservationListingDto;
}
