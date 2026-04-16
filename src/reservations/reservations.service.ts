import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ListingStatus, Prisma, Profile, Reservation } from '@prisma/client';
import { AuthUser } from '@src/auth/auth-user';
import { EmailService } from '@src/email/email.service';
import { ReservationEmailData, ReservationGuests } from '@src/email/types';
import { ListingLocationFromDB } from '@src/listings/types/listing.types';
import {
  calculateNights,
  getListingPromotionDB,
  getTotalGuests,
  twoDecimals,
} from '@src/listings/utils/listings.utils';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateReservationDto } from './dto/reservations-create.dto';

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

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
      include: {
        host: true,
      },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.status !== ListingStatus.PUBLISHED) {
      throw new BadRequestException('Listing is not available for booking');
    }

    const guestProfile = await this.prisma.profile.findUnique({
      where: { id: user.id },
    });

    if (!guestProfile) {
      // This should theoretically not happen if the user passed the AuthGuard
      throw new ForbiddenException('Guest profile not found.');
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

    // Send email asynchronously without blocking the response
    this._sendConfirmationEmail(
      reservation,
      guestProfile,
      listing,
      user.email,
    ).catch((err) => {
      this.logger.error(
        `Failed to send confirmation email for reservation ${reservation.id}`,
        err,
      );
    });

    return reservation;
  }

  private async _sendConfirmationEmail(
    reservation: Reservation,
    guestProfile: Profile,
    listing: Prisma.ListingGetPayload<{ include: { host: true } }>,
    email: string,
  ) {
    try {
      const emailData: ReservationEmailData = {
        userEmail: email,
        userName: `${guestProfile.firstName} ${guestProfile.lastName}`,
        reservationId: reservation.id,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        guests: reservation.guests as ReservationGuests,
        totalNights: reservation.totalNights,
        totalPrice: reservation.totalPrice.toNumber(),
        nightPrice: reservation.nightPrice.toNumber(),
        discount: reservation.discount?.toNumber(),
        discountPercentage: reservation?.discountPercentage,
        listingId: listing.id,
        listingTitle: listing.title,
        listingImages: listing.images,
        listingAddress: (listing.location as ListingLocationFromDB).formatted,
        checkInTime: listing.checkInTime,
        checkOutTime: listing.checkOutTime,
        hostName: `${listing.host.firstName} ${listing.host.lastName}`,
        hostAvatarUrl: listing.host.avatarUrl,
      };

      await this.emailService.sendReservationConfirmationEmail(emailData);
    } catch (err) {
      this.logger.error(
        `Error preparing or sending email for reservation ${reservation.id}`,
        err,
      );
    }
  }
}
