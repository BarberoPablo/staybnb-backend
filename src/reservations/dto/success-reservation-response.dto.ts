import { ApiProperty } from '@nestjs/swagger';

export class SuccessReservationResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  reservationId: string;
}
