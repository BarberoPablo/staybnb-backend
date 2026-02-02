import { privacyTypes, propertyTypes } from 'src/listings/dto/listing.types';

export const completedDraftListingTemplate = {
  title: 'My Awesome Listing',
  description: 'A wonderful place to stay.',
  nightPrice: 100,
  images: ['https://example.com/default-image.jpg'],
  amenities: ['1', '2', '3'],
  currentStep: 3,
  visitedSteps: [1, 2],
  promotions: [],
  beds: 3,
  bedrooms: 1,
  bathrooms: 1,

  maxAdults: 3,
  maxChildren: 2,
  maxInfants: 1,
  maxPets: 1,
  maxGuests: 3,

  location: {
    city: 'Buenos Aires',
    country: 'Argentina',
    lat: -34.590681,
    lng: -58.401528,
    state: 'Autonomous City of Buenos Aires',
    street: 'Anchorena, Tomas Manuel De, Dr.',
    postcode: 'CF C1119ACO',
    timezone: 'America/Argentina/Buenos_Aires',
    formatted:
      '1753, Anchorena, Tomas Manuel De, Dr., Buenos Aires, Autonomous City of Buenos Aires, CF C1119ACO, Argentina',
    housenumber: '1753',
  },
  checkInTime: '15:00',
  checkOutTime: '11:00',
  minCancelDays: 3,
  privacyType: privacyTypes[0],
  propertyType: propertyTypes[0],
};
