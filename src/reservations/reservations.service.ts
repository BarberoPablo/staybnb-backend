import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListingStatus, Prisma } from '@prisma/client';
import { AuthUser } from '@src/auth/auth-user';
import {
  calculateNights,
  getListingPromotionDB,
  getTotalGuests,
  twoDecimals,
} from '@src/listings/dto/listings.utils';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateReservationDto } from './dto/reservations-create.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(listingId: string, data: CreateReservationDto, user: AuthUser) {
    const { startDate, endDate, guests } = data;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      throw new BadRequestException('Start date must be in the future');
    }

    if (endDate <= startDate) {
      throw new BadRequestException('End date must be after start date');
    }

    const listing = await this.prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.status !== ListingStatus.PUBLISHED) {
      throw new BadRequestException('Listing is not available for booking');
    }

    if (listing.hostId === user.id) {
      throw new ForbiddenException('You cannot book your own listing');
    }

    if (guests.adults > listing.maxAdults) {
      throw new BadRequestException(
        `Invalid number of adults: max is ${listing.maxAdults}`,
      );
    }
    if (guests.children > listing.maxChildren) {
      throw new BadRequestException(
        `Invalid number of children: max is ${listing.maxChildren}`,
      );
    }
    if (guests.infant > listing.maxInfants) {
      throw new BadRequestException(
        `Invalid number of infants: max is ${listing.maxInfants}`,
      );
    }
    if (guests.pets > listing.maxPets) {
      throw new BadRequestException(
        `Invalid number of pets: max is ${listing.maxPets}`,
      );
    }

    const totalGuests = getTotalGuests(guests);
    if (totalGuests > listing.maxGuests) {
      throw new BadRequestException(
        `Total guests (${totalGuests}) exceeds maximum capacity (${listing.maxGuests})`,
      );
    }

    const conflictingReservations = await this.prisma.reservation.findMany({
      where: {
        listingId: listingId,
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

    if (conflictingReservations.length > 0) {
      throw new BadRequestException('Selected dates are not available');
    }

    const nights = calculateNights(startDate, endDate);
    const promotion = getListingPromotionDB(listing, nights);

    const discountPercentage = promotion?.discountPercentage || 0;
    const basePrice = listing.nightPrice * nights;
    const discount =
      discountPercentage > 0 ? (basePrice * discountPercentage) / 100 : 0;
    const totalPrice = twoDecimals(basePrice - discount);

    const reservation = await this.prisma.reservation.create({
      data: {
        userId: user.id,
        listingId: listingId,
        startDate: startDate,
        endDate: endDate,
        guests: guests as Prisma.InputJsonValue,
        totalPrice: totalPrice,
        totalNights: nights,
        nightPrice: listing.nightPrice,
        discount: discount > 0 ? twoDecimals(discount) : null,
        discountPercentage: discountPercentage > 0 ? discountPercentage : null,
        status: 'UPCOMING',
      },
    });

    return reservation;
  }
}
