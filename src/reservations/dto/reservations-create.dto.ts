import { Guests } from '@src/listings/dto/listing.types';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsObject } from 'class-validator';

export type ReservationGuestsDto = Record<Guests, number>;

export class CreateReservationDto {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsObject()
  @IsNotEmpty()
  guests: ReservationGuestsDto;
}
