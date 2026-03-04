import { Guests } from '@src/listings/types/listing.types';

export interface ReservationEmailData {
  // User information
  userEmail: string;
  userName: string;

  // Reservation details
  reservationId: string;
  startDate: Date;
  endDate: Date;
  guests: ReservationGuests;
  totalNights: number;
  totalPrice: number;
  nightPrice: number;
  discount?: number;
  discountPercentage?: number | null;

  // Listing information
  listingId: string;
  listingTitle: string;
  listingImages: string[];
  listingAddress: string;
  checkInTime: string;
  checkOutTime: string;

  // Host information
  hostName: string;
  hostEmail?: string;
  hostAvatarUrl?: string | null;

  frontendUrl?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export type ReservationGuests = Partial<Record<Guests, number>>;
