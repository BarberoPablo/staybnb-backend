import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class ReservationGuestsDto {
  @ApiProperty()
  adults: number;

  @ApiProperty()
  children: number;

  @ApiProperty()
  infant: number;

  @ApiProperty()
  pets: number;
}

export class CreateReservationDto {
  @ApiProperty({
    example: '2026-05-20',
  })
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  startDate: string;

  @ApiProperty({
    example: '2026-05-25',
  })
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  endDate: string;

  @ApiProperty({ type: ReservationGuestsDto })
  @IsNotEmpty()
  guests: ReservationGuestsDto;
}
