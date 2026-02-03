import { privacyTypes, propertyTypes } from 'src/listings/dto/listing.types';
import { z } from 'zod';

export const completeDraftListingSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  nightPrice: z.number().min(0),

  images: z.array(z.string()).min(3),
  amenities: z.array(z.string()),
  promotions: z
    .array(
      z.object({
        minNights: z.number().min(0),
        discountPercentage: z.number().min(1),
        description: z.string().min(5),
      }),
    )
    .optional(),

  beds: z.number().min(0),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),

  maxAdults: z.number().min(1),
  maxChildren: z.number().min(0),
  maxInfants: z.number().min(0),
  maxPets: z.number().min(0),
  maxGuests: z.number().min(1),

  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    city: z.string().min(1),
    state: z.string().min(1),
    street: z.string().min(1),
    country: z.string().min(1),
    postcode: z.string().min(1),
    timezone: z.string().min(1),
    formatted: z.string().min(1),
    housenumber: z.string().min(1),
  }),

  checkInTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  checkOutTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  minCancelDays: z.number().min(0),

  privacyType: z.enum(privacyTypes),
  propertyType: z.enum(propertyTypes),
});
