import { privacyTypes, propertyTypes } from '@src/listings/types/listing.types';

export const completedDraftListingTemplate = {
  title: 'My Awesome Listing',
  description: 'A wonderful place to stay.',
  nightPrice: 100,
  images: [
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/518574398.jpg?k=b1c360ad141d067e25868253d31da1f244dde2bdb9c6412149ffc32a346ca040&o=',
    'https://ferienwohnung-bodensdorf.at/wp-content/uploads/2022/10/New-Stift-Ossiach-Appartment-nahled.jpg',
    'https://ferienwohnung-bodensdorf.at/wp-content/uploads/2022/10/04-1-scaled.jpg',
  ],
  amenities: [
    'cf2f1f8d-68e9-436a-9caa-a1fb46726668',
    '03882c1e-3784-401c-8fd7-dfc9b31232d4',
    'bb0e32c5-41e6-4472-a3c8-4dd4d3dcfb14',
    '0aabd0f3-e865-4f20-aa41-78bcbc881bf8',
  ],
  currentStep: 3,
  visitedSteps: [1, 2],
  promotions: [
    {
      minNights: 7,
      discountPercentage: 5,
      description: 'Stay 7 nights or more and get 5% off!',
    },
    {
      minNights: 10,
      discountPercentage: 10,
      description: 'Stay 10 nights or more and get 10% off!',
    },
  ],
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
