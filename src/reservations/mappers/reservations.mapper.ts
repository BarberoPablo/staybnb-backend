import { Reservation } from '@prisma/client';
import { ReservationResponseDto } from '@src/reservations/dto/reservation-response.dto';
import { ReservationGuestsDto } from '@src/reservations/dto/reservations-create.dto';

export class ReservationsMapper {
  static mapToResponseDto(reservation: Reservation): ReservationResponseDto {
    return {
      id: reservation.id,
      listingId: reservation.listingId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
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
}
