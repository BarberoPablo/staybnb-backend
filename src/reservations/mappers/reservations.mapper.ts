import { Reservation } from '@prisma/client';
import { ReservationResponseDto } from '@src/reservations/dto/reservation-response.dto';
import { ReservationGuestsDto } from '@src/reservations/dto/reservations-create.dto';

export class ReservationsMapper {
  static mapToResponseDto(reservation: Reservation): ReservationResponseDto {
    return {
      id: reservation.id,
      listingId: reservation.listingId,
      startDate: toDateString(reservation.startDate),
      endDate: toDateString(reservation.endDate),
      guests: reservation.guests as unknown as ReservationGuestsDto,
      totalPrice: reservation.totalPrice.toNumber(),
      totalNights: reservation.totalNights,
      nightPrice: reservation.nightPrice.toNumber(),
      discount: reservation.discount ? reservation.discount.toNumber() : null,
      discountPercentage: reservation.discountPercentage,
      status: reservation.status,
      createdAt: reservation.createdAt,
    };
  }

  static mapReservationDatesToString(reservation: {
    startDate: Date;
    endDate: Date;
  }) {
    return {
      startDate: toDateString(new Date(reservation.startDate)),
      endDate: toDateString(new Date(reservation.endDate)),
    };
  }
}

/* Only to be used inside Reservations Repository to calculate lt and gt dates */
export function toUtcDate(date: string): Date {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/* Parses Date into string */
export function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/* Add days to a date in string format */
export function addDays(date: string, days: number): string {
  const [y, m, d] = date.split('-').map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d));
  utc.setUTCDate(utc.getUTCDate() + days);
  return toDateString(utc);
}
