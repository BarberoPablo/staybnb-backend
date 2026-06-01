import { Injectable } from '@nestjs/common';
import { Reservation } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { ReservationResponseDto } from '../dto/reservation-response.dto';
import { ReservationsMapper, toUtcDate } from '../mappers/reservations.mapper';
import {
  ConflictingReservationsInput,
  CreateReservationInput,
} from '../types/reservations.types';

@Injectable()
export class ReservationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findConflictingReservations({
    listingId,
    newStartDate,
    newEndDate,
  }: ConflictingReservationsInput): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      where: {
        listingId,
        status: 'UPCOMING',
        AND: [
          {
            startDate: {
              lt: toUtcDate(newEndDate), // existing.startDate < newEndDate
            },
          },
          {
            endDate: {
              gt: toUtcDate(newStartDate), // existing.endDate > newStartDate
            },
          },
        ],
      },
    });
  }

  async findUpcomingByListingId(
    listingId: string,
  ): Promise<{ startDate: string; endDate: string }[]> {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const reservations = await this.prisma.reservation.findMany({
      where: {
        listingId,
        status: 'UPCOMING',
        endDate: { gte: today },
      },
      select: {
        startDate: true,
        endDate: true,
      },
    });

    return reservations.map((reservation) =>
      ReservationsMapper.mapReservationDatesToString(reservation),
    );
  }

  async create(data: CreateReservationInput): Promise<ReservationResponseDto> {
    const reservation = await this.prisma.reservation.create({
      data: {
        userId: data.userId,
        listingId: data.listingId,
        startDate: toUtcDate(data.startDate),
        endDate: toUtcDate(data.endDate),
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
