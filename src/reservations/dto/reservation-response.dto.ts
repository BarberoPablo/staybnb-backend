import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from '@prisma/client';
import type { ReservationGuestsDto } from './reservations-create.dto';

export class ReservationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  listingId: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  guests: ReservationGuestsDto;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  totalNights: number;

  @ApiProperty()
  nightPrice: number;

  @ApiProperty({ nullable: true })
  discount: number | null;

  @ApiProperty({ nullable: true })
  discountPercentage: number | null;

  @ApiProperty({ enum: ReservationStatus })
  status: ReservationStatus;

  @ApiProperty()
  createdAt: Date;
}

export class SuccessReservationResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  reservationId: string;
}
