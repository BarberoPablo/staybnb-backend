import { Injectable } from '@nestjs/common';
import { Reservation } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { ReservationResponseDto } from '../dto/reservation-response.dto';
import { ReservationsMapper } from '../mappers/reservations.mapper';
import {
  ConflictingReservationsInput,
  CreateReservationInput,
} from '../types/reservations.types';

@Injectable()
export class ReservationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findConflictingReservations({
    listingId,
    startDate,
    endDate,
  }: ConflictingReservationsInput): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      where: {
        listingId,
        status: 'UPCOMING',
        OR: [
          {
            AND: [
              { startDate: { lte: startDate } },
              { endDate: { gt: startDate } },
            ],
          },
          {
            AND: [
              { startDate: { lt: endDate } },
              { endDate: { gte: endDate } },
            ],
          },
          {
            AND: [
              { startDate: { gte: startDate } },
              { endDate: { lte: endDate } },
            ],
          },
        ],
      },
    });
  }

  async create(data: CreateReservationInput): Promise<ReservationResponseDto> {
    const reservation = await this.prisma.reservation.create({
      data: {
        userId: data.userId,
        listingId: data.listingId,
        startDate: data.startDate,
        endDate: data.endDate,
        guests: data.guests,
        totalPrice: data.totalPrice,
        totalNights: data.totalNights,
        nightPrice: data.nightPrice,
        discount: data.discount,
        discountPercentage: data.discountPercentage,
        status: 'UPCOMING',
      },
    });

    return ReservationsMapper.mapToResponseDto(reservation);
  }
}
