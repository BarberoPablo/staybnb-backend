import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ListingStatus, Profile } from '@prisma/client';
import { AuthUser } from '@src/auth/auth-user';
import { EmailService } from '@src/email/email.service';
import { ReservationEmailData, ReservationGuests } from '@src/email/types';
import { ListingRepository } from '@src/listings/repositories/listings.repository';
import { ListingLocationFromDB } from '@src/listings/types/listing.types';
import {
  calculateNights,
  getListingPromotionDB,
  getTotalGuests,
  twoDecimals,
} from '@src/listings/utils/listings.utils';
import { ProfilesRepository } from '@src/profiles/repositories/profiles.repository';
import { formatInTimeZone } from 'date-fns-tz';
import {
  ReservationResponseDto,
  SuccessReservationResponseDto,
} from './dto/reservation-response.dto';
import {
  CreateReservationDto,
  ReservationGuestsDto,
} from './dto/reservations-create.dto';
import { ListingUnavailableDatesDto } from './dto/reservations-unavailable-dates.dto';
import { addDays } from './mappers/reservations.mapper';
import { ReservationRepository } from './repositories/reservation.repository';

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);

  constructor(
    private readonly repository: ReservationRepository,
    private readonly listingRepository: ListingRepository,
    private readonly profileRepository: ProfilesRepository,
    private readonly emailService: EmailService,
  ) {}

  async getUnavailableDates(
    listingId: string,
  ): Promise<ListingUnavailableDatesDto> {
    const reservations =
      await this.repository.findUpcomingByListingId(listingId);

    const unavailableCheckInDates = new Set<string>();
    const unavailableCheckOutDates = new Set<string>();

    for (const reservation of reservations) {
      const { startDate, endDate } = reservation;

      unavailableCheckInDates.add(startDate);
      unavailableCheckOutDates.add(endDate);

      let current = addDays(startDate, 1);
      const last = addDays(endDate, -1);

      while (current <= last) {
        unavailableCheckInDates.add(current);
        unavailableCheckOutDates.add(current);
        current = addDays(current, 1);
      }
    }

    return {
      unavailableCheckInDates: Array.from(unavailableCheckInDates).sort(),
      unavailableCheckOutDates: Array.from(unavailableCheckOutDates).sort(),
    };
  }

  async create(
    listingId: string,
    data: CreateReservationDto,
    user: AuthUser,
  ): Promise<SuccessReservationResponseDto> {
    const { startDate, endDate, guests } = data;

    if (endDate <= startDate) {
      throw new BadRequestException('End date must be after start date');
    }

    // We still need to find the listing for price calculation and guest limits validation
    const listing =
      await this.listingRepository.findListingForReservation(listingId);

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.status !== ListingStatus.PUBLISHED) {
      throw new BadRequestException('Listing is not available for booking');
    }

    if (listing.hostId === user.id) {
      throw new ForbiddenException('You cannot book your own listing');
    }

    const today = formatInTimeZone(
      new Date(),
      listing.location?.timezone,
      'yyyy-MM-dd',
    );

    if (startDate < today) {
      throw new BadRequestException('Start date must be in the future');
    }

    this._validateGuests(
      guests,
      listing.maxAdults,
      listing.maxChildren,
      listing.maxInfants,
      listing.maxPets,
      listing.maxGuests,
    );

    const conflictingReservations =
      await this.repository.findConflictingReservations({
        listingId,
        newStartDate: startDate,
        newEndDate: endDate,
      });

    if (conflictingReservations.length > 0) {
      throw new BadRequestException('Selected dates are not available');
    }

    const nights = calculateNights(startDate, endDate);
    const promotion = getListingPromotionDB(listing.promotions, nights);

    const discountPercentage = promotion?.discountPercentage || 0;
    const basePrice = listing.nightPrice * nights;
    const discount =
      discountPercentage > 0 ? (basePrice * discountPercentage) / 100 : 0;
    const totalPrice = twoDecimals(basePrice - discount);

    const reservation = await this.repository.create({
      userId: user.id,
      listingId: listingId,
      startDate,
      endDate,
      // Prisma expects a plain JSON-serializable object, not a DTO class instance
      guests: { ...guests },
      totalPrice,
      totalNights: nights,
      nightPrice: listing.nightPrice,
      discount: discount > 0 ? twoDecimals(discount) : null,
      discountPercentage: discountPercentage > 0 ? discountPercentage : null,
    });

    // We need the guest profile for the email
    const guestProfile = await this.profileRepository.findById(user.id);

    if (guestProfile) {
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
    }

    return { success: true, reservationId: reservation.id };
  }

  private _validateGuests(
    guests: ReservationGuestsDto,
    maxAdults: number,
    maxChildren: number,
    maxInfants: number,
    maxPets: number,
    maxGuests: number,
  ): void {
    if (guests.adults > maxAdults) {
      throw new BadRequestException(
        `Invalid number of adults: max is ${maxAdults}`,
      );
    }
    if (guests.children > maxChildren) {
      throw new BadRequestException(
        `Invalid number of children: max is ${maxChildren}`,
      );
    }
    if (guests.infant > maxInfants) {
      throw new BadRequestException(
        `Invalid number of infants: max is ${maxInfants}`,
      );
    }
    if (guests.pets > maxPets) {
      throw new BadRequestException(
        `Invalid number of pets: max is ${maxPets}`,
      );
    }

    const totalGuests = getTotalGuests(guests);
    if (totalGuests > maxGuests) {
      throw new BadRequestException(
        `Total guests (${totalGuests}) exceeds maximum capacity (${maxGuests})`,
      );
    }
  }

  private async _sendConfirmationEmail(
    reservation: ReservationResponseDto,
    guestProfile: Profile,
    listing: EmailListing,
    email: string,
  ): Promise<void> {
    try {
      const emailData: ReservationEmailData = {
        userEmail: email,
        userName: `${guestProfile.firstName} ${guestProfile.lastName}`,
        reservationId: reservation.id,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        guests: reservation.guests as unknown as ReservationGuests,
        totalNights: reservation.totalNights,
        totalPrice: reservation.totalPrice,
        nightPrice: reservation.nightPrice,
        discount: reservation.discount ?? undefined,
        discountPercentage: reservation.discountPercentage,
        listingId: listing.id,
        listingTitle: listing.title,
        listingImages: listing.images,
        listingAddress: (listing.location as unknown as ListingLocationFromDB)
          .formatted,
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
type EmailListing = {
  id: string;
  title: string;
  images: string[];
  location: {
    formatted: string;
  };
  checkInTime: string;
  checkOutTime: string;
  host: {
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
};
