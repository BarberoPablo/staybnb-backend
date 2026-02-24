import { Prisma } from '@prisma/client';
import 'dotenv/config';
import { createPrismaClient } from './prisma.factory';

const { prisma, disconnect } = createPrismaClient();

async function main() {
  const listingsToSeed: Prisma.ListingCreateManyInput[] = [
    {
      title: 'Peaceful Modern Studio with Ocean View',
      description:
        'Immerse yourself in the vibrant atmosphere of San Francisco from this modern apartment. Featuring Library and Dining Area, this space provides the perfect blend of urban convenience and comfort.',
      nightPrice: 218.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
      ],
      propertyType: 'APARTMENT',
      hostId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
      images: [
        'https://images.unsplash.com/photo-1603072388139-565853396b38?fm=webp',
        'https://images.unsplash.com/photo-1620633484172-9efeaf685cf4?fm=webp',
        'https://images.unsplash.com/photo-1622429420441-60dd67f737a6?fm=webp',
        'https://images.unsplash.com/photo-1623050632591-13118534319e?fm=webp',
        'https://images.unsplash.com/photo-1629078691977-dc51747c0263?fm=webp',
      ],
      beds: 1,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 4.6,
        reviews: [
          {
            score: 5,
            message:
              'Beautiful apartment with stunning views. Highly recommend!',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 5,
            message:
              'Perfect location and the apartment had everything we needed.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 4,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 4,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Outstanding apartment with modern amenities. Perfect for our trip.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Beautiful apartment with stunning views. Highly recommend!',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 4,
            message:
              'Perfect location and the apartment had everything we needed.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 5,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 5,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 4,
            message:
              'Excellent stay! The apartment was exactly as described and very comfortable.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 5,
            message:
              'Outstanding apartment with modern amenities. Perfect for our trip.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 4,
            message:
              'Fantastic apartment in a great neighborhood. Would stay again!',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
        ],
      },
      lat: 37.71787810565889,
      lng: -122.3682851541362,
      city: 'San Francisco',
      country: 'United States',
      location: {
        state: 'California',
        street: 'Fay Spring',
        postcode: '18661-9941',
        timezone: 'America/Los_Angeles',
        formatted:
          '46010 Fay Spring, 18661-9941 San Francisco, California, United States',
        housenumber: '46010',
      },
      checkInTime: '16:00',
      checkOutTime: '12:00',
      minCancelDays: 1,
      status: 'PUBLISHED',
      privacyType: 'ENTIRE',
    },
    {
      title: 'Serene Minimalist Home in Upper East Side',
      description:
        'Experience the charm of Los Angeles in this lovely house. With Balcony and Workspace, this home provides the perfect blend of comfort and style. The Downtown LA neighborhood offers a vibrant atmosphere with plenty of dining and entertainment options.',
      nightPrice: 333.0,
      promotions: [
        {
          minNights: 7,
          description: '',
          discountPercentage: 18,
        },
      ],
      propertyType: 'HOUSE',
      hostId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
      images: [
        'https://images.unsplash.com/photo-1635242179550-41970b1726c2?fm=webp',
        'https://images.unsplash.com/photo-1655300283246-1ef0317a565d?fm=webp',
        'https://images.unsplash.com/photo-1667313178716-580c47dff913?fm=webp',
        'https://images.unsplash.com/photo-1667313178665-e24b0c465ceb?fm=webp',
        'https://images.unsplash.com/photo-1672508013582-035e75fb76ec?fm=webp',
      ],
      beds: 6,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 2,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.3,
        reviews: [
          {
            score: 3,
            message:
              'Good location and clean house, but the kitchen could be better equipped.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 5,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 4,
            message:
              'Fantastic house with a lovely garden. Would definitely stay again!',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 3,
            message: 'Comfortable stay, but the house could use some updates.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 4,
            message:
              'Fantastic house with a lovely garden. Would definitely stay again!',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 3,
            message:
              'Nice house but the neighborhood was noisier than expected.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 5,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 3,
            message:
              'Good value for money, but the house could use some maintenance.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 4,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 3,
            message:
              'Nice house but the neighborhood was noisier than expected.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
        ],
      },
      lat: 34.08224867681319,
      lng: -118.2311297235549,
      city: 'Los Angeles',
      country: 'United States',
      location: {
        state: 'California',
        street: 'Ritchie Views',
        postcode: '29367',
        timezone: 'America/Los_Angeles',
        formatted:
          '11475 Ritchie Views, 29367 Los Angeles, California, United States',
        housenumber: '11475',
      },
      checkInTime: '16:00',
      checkOutTime: '12:00',
      minCancelDays: 2,
      status: 'PUBLISHED',
      privacyType: 'SHARED',
    },
    {
      title: 'Luxury Welcoming House with Rooftop Terrace',
      description:
        'Discover the perfect blend of luxury and comfort in this elegant house. Featuring Private Garden and Balcony, this home in Manhattan provides an ideal base for exploring New York and its many attractions.',
      nightPrice: 263.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'HOUSE',
      hostId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
      images: [
        'https://images.unsplash.com/photo-1595678816463-f94d2070f0a3?fm=webp',
        'https://images.unsplash.com/photo-1611145367596-364abefb1f9f?fm=webp',
        'https://images.unsplash.com/photo-1611646586402-86f9a3fc582b?fm=webp',
        'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?fm=webp',
        'https://images.unsplash.com/photo-1619992518071-8645fd575807?fm=webp',
      ],
      beds: 2,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 3,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.1,
        reviews: [
          {
            score: 3,
            message:
              'Decent stay overall, though the house was smaller than the photos suggested.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 1,
            message:
              'Poor communication from the host and the house had maintenance problems.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 3,
            message: 'Comfortable stay, but the house could use some updates.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 3,
            message:
              'Decent house for the price, though parking was a bit challenging.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 3,
            message:
              'Good value for money, but the house could use some maintenance.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 2,
            message:
              "Disappointing stay. The house didn't match the description and had several issues.",
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 4,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
        ],
      },
      lat: 40.72882839624172,
      lng: -73.93818269970926,
      city: 'New York',
      country: 'United States',
      location: {
        state: 'New York',
        street: 'Shemar Knoll',
        postcode: '42114',
        timezone: 'America/New_York',
        formatted:
          '56555 Shemar Knoll, 42114 New York, New York, United States',
        housenumber: '56555',
      },
      checkInTime: '15:00',
      checkOutTime: '10:00',
      minCancelDays: 7,
      status: 'PUBLISHED',
      privacyType: 'SHARED',
    },
    {
      title: 'Peaceful Modern House Near Statue of Liberty',
      description:
        'Welcome to this stunning home in the heart of San Francisco. This spacious residence features a Library and Study, ideal for families. Just minutes from Fisherman’s Wharf, you’ll enjoy quick access to the city’s top attractions and vibrant lifestyle.',
      nightPrice: 316.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=webp',
        'https://images.unsplash.com/photo-1628133287836-40bd5453bed1?fm=webp',
        'https://images.unsplash.com/photo-1628624747271-4df6ca1e1ba3?fm=webp',
        'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?fm=webp',
        'https://images.unsplash.com/photo-1628744448838-c04e09b1ba03?fm=webp',
      ],
      beds: 6,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 1,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.2,
        reviews: [
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 3,
            message:
              'Decent house for the price, though parking was a bit challenging.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 3,
            message:
              'Decent stay overall, though the house was smaller than the photos suggested.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 3,
            message:
              'Overall pleasant stay, though some amenities were not working properly.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
        ],
      },
      lat: 37.73817485222016,
      lng: -122.4355594339277,
      city: 'San Francisco',
      country: 'United States',
      location: {
        state: 'California',
        street: 'Price Burg',
        postcode: '06556',
        timezone: 'America/Los_Angeles',
        formatted:
          '79295 Price Burg, 06556 San Francisco, California, United States',
        housenumber: '79295',
      },
      checkInTime: '15:00',
      checkOutTime: '12:00',
      minCancelDays: 1,
      status: 'PAUSED',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Contemporary Exclusive Flat with Kitchen',
      description:
        'This beautifully appointed apartment provides the perfect home base for exploring San Francisco. Featuring Pool and Ocean View, this space in North Beach is just moments from Lombard Street.',
      nightPrice: 316.0,
      promotions: [
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'APARTMENT',
      hostId: '2d991008-f434-41b1-a581-5e91b92578da',
      images: [
        'https://images.unsplash.com/photo-1749295587863-6cda6b3c24d1?fm=webp',
        'https://images.unsplash.com/photo-1745429523637-60f5986cc1db?fm=webp',
        'https://images.unsplash.com/photo-1749878064335-117141e3a1aa?fm=webp',
        'https://images.unsplash.com/photo-1750764611091-93ac9e7d4c92?fm=webp',
        'https://images.unsplash.com/photo-1598147265504-899fbf4b5500?fm=webp',
      ],
      beds: 4,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 4.3,
        reviews: [
          {
            score: 4,
            message:
              'Outstanding apartment with modern amenities. Perfect for our trip.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 4,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 3,
            message:
              'Decent apartment with good amenities, but the check-in was complicated.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 4,
            message:
              'Beautiful apartment with stunning views. Highly recommend!',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Perfect location and the apartment had everything we needed.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 4,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 5,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 5,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 4,
            message:
              'Excellent stay! The apartment was exactly as described and very comfortable.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 4,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 5,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 3,
            message:
              'Good value for money, but the apartment was noisier than expected.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 3,
            message:
              'Decent apartment with good amenities, but the check-in was complicated.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 5,
            message:
              'Fantastic apartment in a great neighborhood. Would stay again!',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Outstanding apartment with modern amenities. Perfect for our trip.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
        ],
      },
      lat: 37.73332577003417,
      lng: -122.4687650731292,
      city: 'San Francisco',
      country: 'United States',
      location: {
        state: 'California',
        street: 'Maggio Alley',
        postcode: '96257-9655',
        timezone: 'America/Los_Angeles',
        formatted:
          '34120 Maggio Alley, 96257-9655 San Francisco, California, United States',
        housenumber: '34120',
      },
      checkInTime: '16:00',
      checkOutTime: '11:00',
      minCancelDays: 1,
      status: 'PUBLISHED',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Tranquil Contemporary Cabin Near Navy Pier',
      description:
        'Experience the rustic charm of Miami from this elegantly designed cabin. Featuring Living Room and Dining Area, this retreat offers a unique blend of natural beauty and modern comfort.',
      nightPrice: 305.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'CABIN',
      hostId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
      images: [
        'https://images.unsplash.com/photo-1702014862053-946a122b920d?fm=webp',
        'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?fm=webp',
        'https://images.unsplash.com/photo-1721824324332-a95c70f35cf6?fm=webp',
      ],
      beds: 1,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 4.2,
        reviews: [
          {
            score: 4,
            message:
              'Perfect cabin for a nature getaway. Clean, comfortable, and well-maintained.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Wonderful cabin with stunning views. Perfect for a peaceful retreat.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 4,
            message:
              'Loved this cabin! Perfect for a relaxing getaway in nature.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Amazing cabin experience! Great amenities and peaceful surroundings.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 4,
            message:
              'Excellent cabin with everything you need for a comfortable stay.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Beautiful cabin in a great location. Highly recommend for nature lovers.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 5,
            message:
              'Great cabin in a beautiful setting. Would definitely stay again!',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 2,
            message:
              'The cabin was not as advertised and had several problems.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Great cabin in a beautiful setting. Would definitely stay again!',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 4,
            message:
              'Loved this cabin! Perfect for a relaxing getaway in nature.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 3,
            message:
              'Good value for the location, though the cabin had some minor issues.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 4,
            message:
              'Perfect cabin retreat! Beautiful location and cozy atmosphere.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 5,
            message:
              'Great cabin in a beautiful setting. Would definitely stay again!',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 3,
            message:
              'Comfortable accommodation, though the cabin was not as modern as expected.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Fantastic cabin experience! Clean, comfortable, and well-equipped.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 5,
            message:
              'Amazing cabin experience! Great amenities and peaceful surroundings.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 4,
            message:
              'Perfect cabin retreat! Beautiful location and cozy atmosphere.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 3,
            message:
              'Good cabin overall, but the heating was a bit inconsistent.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Great cabin in a beautiful setting. Would definitely stay again!',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 3,
            message: 'Comfortable stay, but the cabin could use some updates.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Amazing cabin experience! Great amenities and peaceful surroundings.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Fantastic cabin experience! Clean, comfortable, and well-equipped.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 4,
            message:
              'Great cabin in a beautiful setting. Would definitely stay again!',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 4,
            message:
              'Perfect cabin retreat! Beautiful location and cozy atmosphere.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 5,
            message:
              'Amazing cabin experience! Great amenities and peaceful surroundings.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
        ],
      },
      lat: 25.69114290124752,
      lng: -80.14418071838075,
      city: 'Miami',
      country: 'United States',
      location: {
        state: 'Florida',
        street: 'W 6th Avenue',
        postcode: '20577',
        timezone: 'America/New_York',
        formatted: '62339 W 6th Avenue, 20577 Miami, Florida, United States',
        housenumber: '62339',
      },
      checkInTime: '15:00',
      checkOutTime: '12:00',
      minCancelDays: 7,
      status: 'PUBLISHED',
      privacyType: 'SHARED',
    },
    {
      title: 'Beautiful Luxury Home Near Central Park',
      description:
        'This exceptional house provides a unique opportunity to experience Chicago like a local. Featuring Patio and Ocean View, this home in West Loop is perfectly positioned near Magnificent Mile.',
      nightPrice: 106.0,
      promotions: [
        {
          minNights: 5,
          description: '',
          discountPercentage: 23,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
      images: [
        'https://images.unsplash.com/photo-1721222203546-eda8036736cd?fm=webp',
        'https://images.unsplash.com/photo-1739598752069-6806ce5d762a?fm=webp',
        'https://images.unsplash.com/photo-1754415163555-c583965c4fb2?fm=webp',
        'https://images.unsplash.com/photo-1757439402103-fc35542f96f8?fm=webp',
        'https://images.unsplash.com/photo-1566447695072-9f6cc2c84fb6?fm=webp',
      ],
      beds: 6,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 3,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.4,
        reviews: [
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 5,
            message:
              'Fantastic house with a lovely garden. Would definitely stay again!',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 3,
            message:
              'Nice house but the neighborhood was noisier than expected.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 4,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 4,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 4,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 4,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 4,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 5,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
        ],
      },
      lat: 41.85720520344853,
      lng: -87.53827397483356,
      city: 'Chicago',
      country: 'United States',
      location: {
        state: 'Illinois',
        street: 'Mikel Lodge',
        postcode: '33958',
        timezone: 'America/Chicago',
        formatted: '576 Mikel Lodge, 33958 Chicago, Illinois, United States',
        housenumber: '576',
      },
      checkInTime: '15:00',
      checkOutTime: '12:00',
      minCancelDays: 4,
      status: 'PUBLISHED',
      privacyType: 'SHARED',
    },
    {
      title: 'Elegant Tranquil Cabin Near Lake Michigan',
      description:
        'This beautifully crafted cabin offers a unique opportunity to experience Miami from a different perspective. Featuring Balcony and Library, this retreat combines comfort with natural beauty.',
      nightPrice: 175.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'CABIN',
      hostId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
      images: [
        'https://images.unsplash.com/photo-1649083048381-520a5b3d91ff?fm=webp',
        'https://images.unsplash.com/photo-1668910229211-c4616eaedcb8?fm=webp',
        'https://images.unsplash.com/photo-1737737196308-e5b848160b78?fm=webp',
        'https://images.unsplash.com/photo-1737737238595-099398e24649?fm=webp',
      ],
      beds: 1,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 4.4,
        reviews: [
          {
            score: 4,
            message:
              'Excellent cabin with everything you need for a comfortable stay.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Wonderful cabin with stunning views. Perfect for a peaceful retreat.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 3,
            message:
              'Comfortable accommodation, though the cabin was not as modern as expected.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Loved this cabin! Perfect for a relaxing getaway in nature.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 5,
            message:
              'Perfect cabin retreat! Beautiful location and cozy atmosphere.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Wonderful cabin with stunning views. Perfect for a peaceful retreat.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 5,
            message:
              'Amazing cabin experience! Great amenities and peaceful surroundings.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 4,
            message:
              'Fantastic cabin experience! Clean, comfortable, and well-equipped.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Great cabin in a beautiful setting. Would definitely stay again!',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 4,
            message: 'Outstanding cabin with all the amenities you could want.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Fantastic cabin experience! Clean, comfortable, and well-equipped.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 3,
            message:
              'Comfortable accommodation, though the cabin was not as modern as expected.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 3,
            message:
              'Nice cabin overall, though some amenities were not working properly.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 5,
            message:
              'Perfect cabin retreat! Beautiful location and cozy atmosphere.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
        ],
      },
      lat: 25.7463070294406,
      lng: -80.22222905776805,
      city: 'Miami',
      country: 'United States',
      location: {
        state: 'Florida',
        street: 'S Washington Street',
        postcode: '79541',
        timezone: 'America/New_York',
        formatted:
          '3197 S Washington Street, 79541 Miami, Florida, United States',
        housenumber: '3197',
      },
      checkInTime: '14:00',
      checkOutTime: '12:00',
      minCancelDays: 4,
      status: 'PUBLISHED',
      privacyType: 'ENTIRE',
    },
    {
      title: 'Serene Luxury Apartment with Deck',
      description:
        "Elegant apartment featuring Fireplace and Patio. Perfect for business travelers, this space combines modern amenities with the vibrant energy of Chicago's Lincoln Park neighborhood.",
      nightPrice: 206.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'APARTMENT',
      hostId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
      images: [
        'https://images.unsplash.com/photo-1714153515403-943037fb49e2?fm=webp',
        'https://images.unsplash.com/photo-1715985160020-d8cd6fdc8ba9?fm=webp',
        'https://images.unsplash.com/photo-1737737247650-a71e84ec4c29?fm=webp',
        'https://images.unsplash.com/photo-1737737238595-099398e24649?fm=webp',
        'https://images.unsplash.com/photo-1737737196308-e5b848160b78?fm=webp',
      ],
      beds: 2,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 2,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 4.4,
        reviews: [
          {
            score: 4,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 4,
            message:
              'Beautiful apartment with stunning views. Highly recommend!',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 5,
            message:
              'Fantastic apartment in a great neighborhood. Would stay again!',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Fantastic apartment in a great neighborhood. Would stay again!',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 3,
            message:
              'Nice apartment overall, though some amenities were not working properly.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 3,
            message:
              'Good value for the location, though the apartment had some minor issues.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was exactly as described and very comfortable.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Wonderful apartment with all the amenities you could want.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 5,
            message:
              'Fantastic apartment in a great neighborhood. Would stay again!',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was exactly as described and very comfortable.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was exactly as described and very comfortable.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 5,
            message:
              'Outstanding apartment with modern amenities. Perfect for our trip.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 2,
            message:
              'Disappointing stay. The host was unresponsive and the apartment had issues.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was exactly as described and very comfortable.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 4,
            message:
              'Perfect location and the apartment had everything we needed.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 4,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
        ],
      },
      lat: 41.9210121732577,
      lng: -87.60778921089167,
      city: 'Chicago',
      country: 'United States',
      location: {
        state: 'Illinois',
        street: 'Littel Points',
        postcode: '37928',
        timezone: 'America/Chicago',
        formatted:
          '86288 Littel Points, 37928 Chicago, Illinois, United States',
        housenumber: '86288',
      },
      checkInTime: '14:00',
      checkOutTime: '11:00',
      minCancelDays: 5,
      status: 'PENDING',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Exclusive Cozy Cabin with Lake View',
      description:
        'Cozy cabin featuring Garage and Living Room. This charming space in Coral Gables provides a unique Miami experience, combining natural beauty with modern comfort.',
      nightPrice: 321.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'CABIN',
      hostId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
      images: [
        'https://images.unsplash.com/photo-1693560821176-f26424b2d5d4?fm=webp',
        'https://images.unsplash.com/photo-1653928069878-32e246258e8e?fm=webp',
        'https://images.unsplash.com/photo-1630703103236-f712db10e234?fm=webp',
      ],
      beds: 4,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 2,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 4.3,
        reviews: [
          {
            score: 4,
            message:
              'Great cabin in a beautiful setting. Would definitely stay again!',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 4,
            message:
              'Perfect cabin retreat! Beautiful location and cozy atmosphere.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 5,
            message:
              'Perfect cabin retreat! Beautiful location and cozy atmosphere.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 3,
            message:
              'Decent cabin with good amenities, but the check-in was complicated.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 4,
            message:
              'Beautiful cabin in a great location. Highly recommend for nature lovers.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 5,
            message:
              'Perfect cabin for a nature getaway. Clean, comfortable, and well-maintained.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 4,
            message: 'Outstanding cabin with all the amenities you could want.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 3,
            message:
              'Good cabin overall, but the heating was a bit inconsistent.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Great cabin in a beautiful setting. Would definitely stay again!',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 5,
            message:
              'Fantastic cabin experience! Clean, comfortable, and well-equipped.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Excellent cabin with everything you need for a comfortable stay.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
        ],
      },
      lat: 25.71697594959091,
      lng: -80.23317768251631,
      city: 'Miami',
      country: 'United States',
      location: {
        state: 'Florida',
        street: 'Hill Road',
        postcode: '67999-8480',
        timezone: 'America/New_York',
        formatted: '2804 Hill Road, 67999-8480 Miami, Florida, United States',
        housenumber: '2804',
      },
      checkInTime: '15:00',
      checkOutTime: '12:00',
      minCancelDays: 6,
      status: 'PUBLISHED',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Sophisticated Rustic Cabin with Outdoor Space',
      description:
        'Discover the perfect blend of rustic charm and modern convenience in this beautiful cabin. Featuring Living Room and Deck, this retreat in South Beach offers a unique way to experience Miami.',
      nightPrice: 283.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'CABIN',
      hostId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
      images: [
        'https://images.unsplash.com/photo-1655300283246-1ef0317a565d?fm=webp',
        'https://images.unsplash.com/photo-1667313178665-e24b0c465ceb?fm=webp',
        'https://images.unsplash.com/photo-1551806406-3d0835050227?fm=webp',
      ],
      beds: 2,
      maxGuests: 4,
      bedrooms: 3,
      bathrooms: 1,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 4.2,
        reviews: [
          {
            score: 4,
            message: 'Outstanding cabin with all the amenities you could want.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 5,
            message:
              'Perfect cabin for a nature getaway. Clean, comfortable, and well-maintained.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 4,
            message:
              'Wonderful cabin with stunning views. Perfect for a peaceful retreat.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 3,
            message:
              'Good cabin overall, but the heating was a bit inconsistent.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 4,
            message:
              'Beautiful cabin in a great location. Highly recommend for nature lovers.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Amazing cabin experience! Great amenities and peaceful surroundings.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 4,
            message:
              'Loved this cabin! Perfect for a relaxing getaway in nature.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 3,
            message:
              'Good value for money, but the cabin was noisier than expected.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 5,
            message:
              'Great cabin in a beautiful setting. Would definitely stay again!',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 3,
            message:
              'Decent stay overall, though the cabin could use some maintenance.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Loved this cabin! Perfect for a relaxing getaway in nature.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 5,
            message:
              'Loved this cabin! Perfect for a relaxing getaway in nature.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 4,
            message:
              'Loved this cabin! Perfect for a relaxing getaway in nature.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 5,
            message:
              'Beautiful cabin in a great location. Highly recommend for nature lovers.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
        ],
      },
      lat: 25.8602365966715,
      lng: -80.09464051548977,
      city: 'Miami',
      country: 'United States',
      location: {
        state: 'Florida',
        street: 'Front Street',
        postcode: '04283-8288',
        timezone: 'America/New_York',
        formatted:
          '90953 Front Street, 04283-8288 Miami, Florida, United States',
        housenumber: '90953',
      },
      checkInTime: '15:00',
      checkOutTime: '11:00',
      minCancelDays: 4,
      status: 'PUBLISHED',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Vibrant Elegant Loft in Downtown LA',
      description:
        'Step into luxury and convenience in this thoughtfully designed apartment. Featuring Study and Wine Cellar, this space provides an ideal setting for families visiting Miami.',
      nightPrice: 212.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
      ],
      propertyType: 'APARTMENT',
      hostId: '92fd022e-e347-4062-bc53-92b40fcac60e',
      images: [
        'https://images.unsplash.com/photo-1619221891415-e5ec4890da3f?fm=webp',
        'https://images.unsplash.com/photo-1630699144418-6ca9059f9a44?fm=webp',
        'https://images.unsplash.com/photo-1630703103236-f712db10e234?fm=webp',
        'https://images.unsplash.com/photo-1633119712778-30d94755de54?fm=webp',
        'https://images.unsplash.com/photo-1653928069878-32e246258e8e?fm=webp',
      ],
      beds: 3,
      maxGuests: 4,
      bedrooms: 3,
      bathrooms: 1,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 4.1,
        reviews: [
          {
            score: 4,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 4,
            message:
              'Beautiful apartment with stunning views. Highly recommend!',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was exactly as described and very comfortable.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 5,
            message:
              'Fantastic apartment in a great neighborhood. Would stay again!',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 4,
            message:
              'Excellent stay! The apartment was exactly as described and very comfortable.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 4,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 2,
            message:
              'Overpriced for what you get. The apartment needs significant improvements.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 3,
            message:
              'Decent apartment with good amenities, but the check-in was complicated.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 4,
            message:
              'Wonderful apartment with all the amenities you could want.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 3,
            message:
              'Decent apartment with good amenities, but the check-in was complicated.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 4,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
        ],
      },
      lat: 25.75606468690208,
      lng: -80.22566452573122,
      city: 'Miami',
      country: 'United States',
      location: {
        state: 'Florida',
        street: 'Railroad Avenue',
        postcode: '09010-7361',
        timezone: 'America/New_York',
        formatted:
          '603 Railroad Avenue, 09010-7361 Miami, Florida, United States',
        housenumber: '603',
      },
      checkInTime: '16:00',
      checkOutTime: '11:00',
      minCancelDays: 2,
      status: 'PUBLISHED',
      privacyType: 'ENTIRE',
    },
    {
      title: 'Exclusive Contemporary Home with Gym',
      description:
        'Experience the charm of Houston in this lovely house. With Ocean View and Wine Cellar, this home provides the perfect blend of comfort and style. The Downtown neighborhood offers a vibrant atmosphere with plenty of dining and entertainment options.',
      nightPrice: 69.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'HOUSE',
      hostId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
      images: [
        'https://images.unsplash.com/photo-1613575831056-0acd5da8f085?fm=webp',
        'https://images.unsplash.com/photo-1628133287836-40bd5453bed1?fm=webp',
        'https://images.unsplash.com/photo-1628624747271-4df6ca1e1ba3?fm=webp',
        'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?fm=webp',
        'https://images.unsplash.com/photo-1628744448838-c04e09b1ba03?fm=webp',
      ],
      beds: 3,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 3,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.4,
        reviews: [
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 2,
            message:
              "Disappointing stay. The house didn't match the description and had several issues.",
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 3,
            message:
              'Decent house for the price, though parking was a bit challenging.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
        ],
      },
      lat: 29.72194706883675,
      lng: -95.38927862982817,
      city: 'Houston',
      country: 'United States',
      location: {
        state: 'Texas',
        street: 'Berneice Trail',
        postcode: '93879-9146',
        timezone: 'America/Chicago',
        formatted:
          '7978 Berneice Trail, 93879-9146 Houston, Texas, United States',
        housenumber: '7978',
      },
      checkInTime: '16:00',
      checkOutTime: '12:00',
      minCancelDays: 4,
      status: 'PUBLISHED',
      privacyType: 'SHARED',
    },
    {
      title: 'Stylish Boutique House Near Brooklyn Bridge',
      description:
        'Step into this beautifully designed house that showcases the best of New York living. With Hot Tub and Garage, this home in Chelsea offers both comfort and convenience for your stay.',
      nightPrice: 204.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '2d991008-f434-41b1-a581-5e91b92578da',
      images: [
        'https://images.unsplash.com/photo-1715844496716-43d2e759d1e4?fm=webp',
        'https://images.unsplash.com/photo-1718894071402-fb944e2a1849?fm=webp',
        'https://images.unsplash.com/photo-1718894071528-1108a094cc78?fm=webp',
        'https://images.unsplash.com/photo-1718894071404-b59a1edd4072?fm=webp',
        'https://images.unsplash.com/photo-1730751686920-7ac05bcdb549?fm=webp',
      ],
      beds: 6,
      maxGuests: 6,
      bedrooms: 5,
      bathrooms: 3,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.3,
        reviews: [
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 3,
            message: 'Comfortable stay, but the house could use some updates.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 3,
            message:
              'Comfortable accommodation, though the check-in process was a bit complicated.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 4,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 3,
            message:
              'Good house overall, but some minor issues with the heating.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 5,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 5,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 3,
            message:
              'Decent house for the price, though parking was a bit challenging.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 5,
            message:
              'Fantastic house with a lovely garden. Would definitely stay again!',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Fantastic house with a lovely garden. Would definitely stay again!',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
        ],
      },
      lat: 40.78886874150746,
      lng: -74.03642726665139,
      city: 'New York',
      country: 'United States',
      location: {
        state: 'New York',
        street: 'Talbot Road',
        postcode: '92328',
        timezone: 'America/New_York',
        formatted: '520 Talbot Road, 92328 New York, New York, United States',
        housenumber: '520',
      },
      checkInTime: '15:00',
      checkOutTime: '12:00',
      minCancelDays: 3,
      status: 'PUBLISHED',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Intimate Traditional House in Chelsea',
      description:
        "Welcome to this beautiful house in the heart of Miami. This spacious home offers Kitchen and Study, perfect for families. Located just minutes from Ocean Drive, you'll have easy access to all the best Chelsea has to offer.",
      nightPrice: 211.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
      images: [
        'https://images.unsplash.com/photo-1575245122563-776ff6af7411?fm=webp',
        'https://images.unsplash.com/photo-1628852527234-8e608956df03?fm=webp',
        'https://images.unsplash.com/photo-1630699293575-933e9b6c3db4?fm=webp',
        'https://images.unsplash.com/photo-1633425814624-7ae53db7de88?fm=webp',
        'https://images.unsplash.com/photo-1651951646668-46562cfb4518?fm=webp',
      ],
      beds: 4,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 3.8,
        reviews: [
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 4,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 3,
            message:
              'Comfortable accommodation, though the check-in process was a bit complicated.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 1,
            message:
              'The house was not as advertised and had several maintenance issues.',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 4,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 2,
            message:
              'The house was not as advertised and had several maintenance issues.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
        ],
      },
      lat: 25.75974823404588,
      lng: -80.25380589247592,
      city: 'Miami',
      country: 'United States',
      location: {
        state: 'Florida',
        street: 'Thurman Manor',
        postcode: '20685',
        timezone: 'America/New_York',
        formatted: '37791 Thurman Manor, 20685 Miami, Florida, United States',
        housenumber: '37791',
      },
      checkInTime: '14:00',
      checkOutTime: '12:00',
      minCancelDays: 7,
      status: 'PUBLISHED',
      privacyType: 'ENTIRE',
    },
    {
      title: 'Stylish Modern Apartment in Hollywood',
      description:
        'Discover urban living at its finest in this sophisticated apartment. With Garage and Pool, this space in Hollywood offers both style and functionality for your Los Angeles adventure.',
      nightPrice: 271.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
      ],
      propertyType: 'APARTMENT',
      hostId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
      images: [
        'https://images.unsplash.com/photo-1639664701039-f747268e2243?fm=webp',
        'https://images.unsplash.com/photo-1654943975174-602791f69c09?fm=webp',
        'https://images.unsplash.com/photo-1662454419622-a41092ecd245?fm=webp',
        'https://images.unsplash.com/photo-1662454419736-de132ff75638?fm=webp',
        'https://images.unsplash.com/photo-1718894071402-fb944e2a1849?fm=webp',
      ],
      beds: 2,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 4.4,
        reviews: [
          {
            score: 5,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 4,
            message:
              'Beautiful apartment with stunning views. Highly recommend!',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Fantastic apartment in a great neighborhood. Would stay again!',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 4,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 4,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Beautiful apartment with stunning views. Highly recommend!',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 4,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 4,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 5,
            message:
              'Fantastic apartment in a great neighborhood. Would stay again!',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 4,
            message:
              'Perfect location and the apartment had everything we needed.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 4,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 5,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was exactly as described and very comfortable.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 3,
            message:
              'Good apartment overall, but the building was noisier than expected.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 5,
            message:
              'Perfect location and the apartment had everything we needed.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 3,
            message:
              'Nice location and decent amenities, though the apartment was smaller than photos.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Wonderful apartment with all the amenities you could want.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 5,
            message:
              'Fantastic apartment in a great neighborhood. Would stay again!',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 5,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 4,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
        ],
      },
      lat: 33.98299452807598,
      lng: -118.3018081725195,
      city: 'Los Angeles',
      country: 'United States',
      location: {
        state: 'California',
        street: 'Romaguera Bridge',
        postcode: '31950-8849',
        timezone: 'America/Los_Angeles',
        formatted:
          '754 Romaguera Bridge, 31950-8849 Los Angeles, California, United States',
        housenumber: '754',
      },
      checkInTime: '14:00',
      checkOutTime: '12:00',
      minCancelDays: 6,
      status: 'PAUSED',
      privacyType: 'SHARED',
    },
    {
      title: 'Elegant Peaceful House with Ocean View',
      description:
        'Immerse yourself in the vibrant culture of Los Angeles from this thoughtfully designed house. With Workspace and Wine Cellar, this home offers the perfect retreat after a day of exploring.',
      nightPrice: 241.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
      images: [
        'https://images.unsplash.com/photo-1649083047855-203d8363d893?fm=webp',
        'https://images.unsplash.com/photo-1649083048391-1c9e82472f65?fm=webp',
        'https://images.unsplash.com/photo-1694885200929-42646459bcc7?fm=webp',
        'https://images.unsplash.com/photo-1696986324692-f4aa0f2f495d?fm=webp',
        'https://images.unsplash.com/photo-1699852676054-a55370ac4c7a?fm=webp',
      ],
      beds: 3,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 2,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.3,
        reviews: [
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 2,
            message:
              'The house was not as advertised and had several maintenance issues.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Fantastic house with a lovely garden. Would definitely stay again!',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 4,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 4,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
        ],
      },
      lat: 34.01918090040105,
      lng: -118.1954703970625,
      city: 'Los Angeles',
      country: 'United States',
      location: {
        state: 'California',
        street: 'Bartell Curve',
        postcode: '27662',
        timezone: 'America/Los_Angeles',
        formatted:
          '30168 Bartell Curve, 27662 Los Angeles, California, United States',
        housenumber: '30168',
      },
      checkInTime: '16:00',
      checkOutTime: '11:00',
      minCancelDays: 1,
      status: 'PUBLISHED',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Cozy Modern House in Manhattan',
      description:
        'Step into this beautifully designed house that showcases the best of San Francisco living. With Kitchen and City View, this home in Marina offers both comfort and convenience for your stay.',
      nightPrice: 223.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '7bacc92e-5457-461d-83ec-a303c89f278e',
      images: [
        'https://images.unsplash.com/photo-1722604530611-fca2c621bd75?fm=webp',
        'https://images.unsplash.com/photo-1722606507650-9ad3b8cb9763?fm=webp',
        'https://images.unsplash.com/photo-1723257141691-144eadabb18a?fm=webp',
        'https://images.unsplash.com/photo-1723468357092-078deda7c22a?fm=webp',
        'https://images.unsplash.com/photo-1723810733641-da4e78e45f0a?fm=webp',
      ],
      beds: 4,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 2,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.2,
        reviews: [
          {
            score: 2,
            message:
              'Overpriced for what you get. The house needs significant improvements.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 3,
            message:
              'Decent house for the price, though parking was a bit challenging.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 2,
            message:
              'The house was not as advertised and had several maintenance issues.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Fantastic house with a lovely garden. Would definitely stay again!',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 5,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 3,
            message:
              'Comfortable accommodation, though the check-in process was a bit complicated.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
        ],
      },
      lat: 37.71259618035536,
      lng: -122.4990598866748,
      city: 'San Francisco',
      country: 'United States',
      location: {
        state: 'California',
        street: 'River Road',
        postcode: '17392-2356',
        timezone: 'America/Los_Angeles',
        formatted:
          '77170 River Road, 17392-2356 San Francisco, California, United States',
        housenumber: '77170',
      },
      checkInTime: '15:00',
      checkOutTime: '11:00',
      minCancelDays: 1,
      status: 'PUBLISHED',
      privacyType: 'SHARED',
    },
    {
      title: 'Contemporary Exclusive House in Greenwich Village',
      description:
        'Experience the warmth and hospitality of Houston in this inviting house. Located in Museum District, this home features Living Room and Workspace, making it ideal for weekend getaways.',
      nightPrice: 141.0,
      promotions: [
        {
          minNights: 4,
          description: '',
          discountPercentage: 20,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '7bacc92e-5457-461d-83ec-a303c89f278e',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=webp',
        'https://images.unsplash.com/photo-1628133287836-40bd5453bed1?fm=webp',
        'https://images.unsplash.com/photo-1628624747271-4df6ca1e1ba3?fm=webp',
        'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?fm=webp',
        'https://images.unsplash.com/photo-1628744448838-c04e09b1ba03?fm=webp',
      ],
      beds: 2,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4,
        reviews: [
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 1,
            message:
              'Poor experience overall. The house was not clean and had broken amenities.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 3,
            message:
              'Nice house but the neighborhood was noisier than expected.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 4,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 3,
            message:
              'Good location and clean house, but the kitchen could be better equipped.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
        ],
      },
      lat: 29.85051908071127,
      lng: -95.46538239902586,
      city: 'Houston',
      country: 'United States',
      location: {
        state: 'Texas',
        street: 'Hermiston Skyway',
        postcode: '51543',
        timezone: 'America/Chicago',
        formatted: '5007 Hermiston Skyway, 51543 Houston, Texas, United States',
        housenumber: '5007',
      },
      checkInTime: '16:00',
      checkOutTime: '10:00',
      minCancelDays: 5,
      status: 'PUBLISHED',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Boutique Contemporary Apartment with Patio',
      description:
        "Contemporary apartment with Rooftop Terrace and Balcony. Located in the heart of Gold Coast, this space provides easy access to Chicago's best restaurants, shops, and entertainment venues.",
      nightPrice: 69.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
      ],
      propertyType: 'APARTMENT',
      hostId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
      images: [
        'https://images.unsplash.com/photo-1753685724702-93dad97785df?fm=webp',
        'https://images.unsplash.com/photo-1753685726923-a5615452db33?fm=webp',
        'https://images.unsplash.com/photo-1753685724244-8080b761bcde?fm=webp',
        'https://images.unsplash.com/photo-1551806406-3d0835050227?fm=webp',
        'https://images.unsplash.com/photo-1566893017625-800ab3e094d7?fm=webp',
      ],
      beds: 1,
      maxGuests: 4,
      bedrooms: 3,
      bathrooms: 2,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 4.6,
        reviews: [
          {
            score: 5,
            message:
              'Outstanding apartment with modern amenities. Perfect for our trip.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 5,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Wonderful apartment with all the amenities you could want.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 5,
            message:
              'Beautiful apartment with stunning views. Highly recommend!',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 4,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 5,
            message:
              'Wonderful apartment with all the amenities you could want.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 2,
            message:
              'Poor experience overall. The apartment was not clean and had broken amenities.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 5,
            message:
              'Outstanding apartment with modern amenities. Perfect for our trip.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 3,
            message:
              'Good value for money, but the apartment was noisier than expected.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 5,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 5,
            message:
              'Beautiful apartment with stunning views. Highly recommend!',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 4,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
        ],
      },
      lat: 41.7895029889682,
      lng: -87.64399222660396,
      city: 'Chicago',
      country: 'United States',
      location: {
        state: 'Illinois',
        street: 'Coy Trace',
        postcode: '54295',
        timezone: 'America/Chicago',
        formatted: '2595 Coy Trace, 54295 Chicago, Illinois, United States',
        housenumber: '2595',
      },
      checkInTime: '14:00',
      checkOutTime: '10:00',
      minCancelDays: 4,
      status: 'PUBLISHED',
      privacyType: 'ENTIRE',
    },
    {
      title: 'Modern Luxury Condo Near Santa Monica Pier',
      description:
        'This stylish apartment captures the essence of Los Angeles living. With Dining Area and Library, this space in Downtown LA offers both comfort and easy access to local attractions.',
      nightPrice: 184.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
      ],
      propertyType: 'APARTMENT',
      hostId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
      images: [
        'https://images.unsplash.com/photo-1571992579655-8134e2b8df0b?fm=webp',
        'https://images.unsplash.com/photo-1588611395282-e2cc9a533e27?fm=webp',
        'https://images.unsplash.com/photo-1598528644707-9abbec14b693?fm=webp',
        'https://images.unsplash.com/photo-1613575831056-0acd5da8f085?fm=webp',
        'https://images.unsplash.com/photo-1617721595342-ab308966360c?fm=webp',
      ],
      beds: 1,
      maxGuests: 4,
      bedrooms: 3,
      bathrooms: 1,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 4.5,
        reviews: [
          {
            score: 5,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 4,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 5,
            message:
              'Wonderful apartment with all the amenities you could want.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 4,
            message:
              'Wonderful apartment with all the amenities you could want.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 4,
            message:
              'Outstanding apartment with modern amenities. Perfect for our trip.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 4,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 3,
            message:
              'Comfortable stay, but the apartment could use some updates.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 4,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Fantastic apartment in a great neighborhood. Would stay again!',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Excellent stay! The apartment was exactly as described and very comfortable.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
        ],
      },
      lat: 33.97529865092061,
      lng: -118.2559006067308,
      city: 'Los Angeles',
      country: 'United States',
      location: {
        state: 'California',
        street: 'W Elm Street',
        postcode: '12146',
        timezone: 'America/Los_Angeles',
        formatted:
          '1372 W Elm Street, 12146 Los Angeles, California, United States',
        housenumber: '1372',
      },
      checkInTime: '15:00',
      checkOutTime: '12:00',
      minCancelDays: 6,
      status: 'PUBLISHED',
      privacyType: 'ENTIRE',
    },
    {
      title: 'Trendy Vibrant Home Near Times Square',
      description:
        'This exceptional house provides a unique opportunity to experience Miami like a local. Featuring Fireplace and Study, this home in Key Biscayne is perfectly positioned near Art Deco District.',
      nightPrice: 271.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
      images: [
        'https://images.unsplash.com/photo-1649083047855-203d8363d893?fm=webp',
        'https://images.unsplash.com/photo-1664361238207-164532d1934e?fm=webp',
        'https://images.unsplash.com/photo-1668910229211-c4616eaedcb8?fm=webp',
        'https://images.unsplash.com/photo-1696814543786-1597bc1e2ac7?fm=webp',
        'https://images.unsplash.com/photo-1710883734891-93709398496d?fm=webp',
      ],
      beds: 5,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 1,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 3.7,
        reviews: [
          {
            score: 3,
            message:
              'Decent stay overall, though the house was smaller than the photos suggested.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 1,
            message:
              'The house was not as clean as expected and some amenities were broken.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 4,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 4,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 1,
            message:
              'Overpriced for what you get. The house needs significant improvements.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 3,
            message:
              'Nice house but the neighborhood was noisier than expected.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
        ],
      },
      lat: 25.82625687357304,
      lng: -80.21281898882096,
      city: 'Miami',
      country: 'United States',
      location: {
        state: 'Florida',
        street: 'Waylon Fall',
        postcode: '49792',
        timezone: 'America/New_York',
        formatted: '285 Waylon Fall, 49792 Miami, Florida, United States',
        housenumber: '285',
      },
      checkInTime: '15:00',
      checkOutTime: '11:00',
      minCancelDays: 1,
      status: 'PUBLISHED',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Vibrant Historic House with Hot Tub',
      description:
        'Discover the perfect blend of luxury and comfort in this elegant house. Featuring Balcony and Pool, this home in Bronx provides an ideal base for exploring New York and its many attractions.',
      nightPrice: 290.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '92fd022e-e347-4062-bc53-92b40fcac60e',
      images: [
        'https://images.unsplash.com/photo-1680645944941-da9198d7f6aa?fm=webp',
        'https://images.unsplash.com/photo-1683131597435-7874abc187cd?fm=webp',
        'https://images.unsplash.com/photo-1693560821176-f26424b2d5d4?fm=webp',
        'https://images.unsplash.com/photo-1712079325210-5b4f2383ead2?fm=webp',
        'https://images.unsplash.com/photo-1718222934867-55301ef5571e?fm=webp',
      ],
      beds: 3,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.1,
        reviews: [
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 4,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 3,
            message:
              'Good house overall, but some minor issues with the heating.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 2,
            message:
              'Poor experience overall. The house was not clean and had broken amenities.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Fantastic house with a lovely garden. Would definitely stay again!',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 2,
            message:
              'Poor experience overall. The house was not clean and had broken amenities.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 4,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 4,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
        ],
      },
      lat: 40.69956078581731,
      lng: -73.91305990384468,
      city: 'New York',
      country: 'United States',
      location: {
        state: 'New York',
        street: 'Ash Street',
        postcode: '95029-1768',
        timezone: 'America/New_York',
        formatted:
          '2374 Ash Street, 95029-1768 New York, New York, United States',
        housenumber: '2374',
      },
      checkInTime: '14:00',
      checkOutTime: '12:00',
      minCancelDays: 4,
      status: 'PUBLISHED',
      privacyType: 'SHARED',
    },
    {
      title: 'Historic Sophisticated House Downtown',
      description:
        'This meticulously maintained house offers a peaceful sanctuary in the bustling city of Los Angeles. With Patio and Fireplace, this home provides everything you need for a comfortable stay.',
      nightPrice: 131.0,
      promotions: [
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'HOUSE',
      hostId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
      images: [
        'https://images.unsplash.com/photo-1635242179550-41970b1726c2?fm=webp',
        'https://images.unsplash.com/photo-1655300283246-1ef0317a565d?fm=webp',
        'https://images.unsplash.com/photo-1667313178716-580c47dff913?fm=webp',
        'https://images.unsplash.com/photo-1667313178665-e24b0c465ceb?fm=webp',
        'https://images.unsplash.com/photo-1672508013582-035e75fb76ec?fm=webp',
      ],
      beds: 6,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 2,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.1,
        reviews: [
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 5,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 5,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 2,
            message:
              'Poor communication from the host and the house had maintenance problems.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 1,
            message:
              'Unpleasant experience. The house was dirty and several things were not working.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 4,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 5,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 4,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 4,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 4,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
        ],
      },
      lat: 34.04472485,
      lng: -118.2344614880631,
      city: 'Los Angeles',
      country: 'United States',
      location: {
        state: 'California',
        street: '837 Traction Avenue',
        postcode: 'CA 90013',
        timezone: 'America/Los_Angeles',
        formatted:
          '837 Traction Avenue, Los Angeles, California, CA 90013, United States',
        housenumber: '837',
      },
      checkInTime: '14:00',
      checkOutTime: '10:00',
      minCancelDays: 6,
      status: 'PUBLISHED',
      privacyType: 'ENTIRE',
    },
    {
      title: 'Sophisticated Tranquil Home with Fireplace',
      description:
        "This stunning house in Castro features City View and Balcony. Whether you're here for business or pleasure, this home offers everything you need for a memorable stay in San Francisco.",
      nightPrice: 188.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
      ],
      propertyType: 'HOUSE',
      hostId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
      images: [
        'https://images.unsplash.com/photo-1581269632338-1e913f536380?fm=webp',
        'https://images.unsplash.com/flagged/photo-1600002807685-2345c0b50a7c?fm=webp',
        'https://images.unsplash.com/photo-1618311332215-2ead26bc35c1?fm=webp',
        'https://images.unsplash.com/photo-1632208962087-2719e5e57886?fm=webp',
        'https://images.unsplash.com/photo-1638541363822-6f4c189b5cf7?fm=webp',
      ],
      beds: 4,
      maxGuests: 6,
      bedrooms: 4,
      bathrooms: 3,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 3.9,
        reviews: [
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 3,
            message:
              'Overall pleasant stay, though some amenities were not working properly.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 4,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 3,
            message:
              'Overall pleasant stay, though some amenities were not working properly.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 2,
            message:
              'Unpleasant experience. The house was dirty and several things were not working.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 3,
            message: 'Comfortable stay, but the house could use some updates.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 2,
            message:
              'Unpleasant experience. The house was dirty and several things were not working.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
        ],
      },
      lat: 37.79474540230798,
      lng: -122.3545651463803,
      city: 'San Francisco',
      country: 'United States',
      location: {
        state: 'California',
        street: 'Medhurst Locks',
        postcode: '88580',
        timezone: 'America/Los_Angeles',
        formatted:
          '71352 Medhurst Locks, 88580 San Francisco, California, United States',
        housenumber: '71352',
      },
      checkInTime: '15:00',
      checkOutTime: '11:00',
      minCancelDays: 4,
      status: 'PUBLISHED',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Modern Stylish Home in SoHo',
      description:
        "This stunning house in Pacific Heights features Kitchen and Fireplace. Whether you're here for business or pleasure, this home offers everything you need for a memorable stay in San Francisco.",
      nightPrice: 327.0,
      promotions: [
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '337820d8-2cb4-492a-9992-718e4da8cc88',
      images: [
        'https://images.unsplash.com/photo-1734599511415-cb4a52aea2fe?fm=webp',
        'https://images.unsplash.com/photo-1741669933192-01dda690f5d2?fm=webp',
        'https://images.unsplash.com/photo-1477777585865-f0ff912096f3?fm=webp',
        'https://images.unsplash.com/photo-1560184897-ad57012c0981?fm=webp',
        'https://images.unsplash.com/photo-1594408065362-379a5b60910b?fm=webp',
      ],
      beds: 6,
      maxGuests: 6,
      bedrooms: 5,
      bathrooms: 3,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.1,
        reviews: [
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 3,
            message: 'Comfortable stay, but the house could use some updates.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 3,
            message:
              'Comfortable accommodation, though the check-in process was a bit complicated.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 2,
            message:
              'Disappointing stay. The host was unresponsive and the house had problems.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 3,
            message:
              'Overall pleasant stay, though some amenities were not working properly.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 5,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 2,
            message:
              "Disappointing stay. The house didn't match the description and had several issues.",
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 3,
            message:
              'Good value for money, but the house could use some maintenance.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 3,
            message:
              'Nice house but the neighborhood was noisier than expected.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
        ],
      },
      lat: 37.78680657307229,
      lng: -122.4304270910819,
      city: 'San Francisco',
      country: 'United States',
      location: {
        state: 'California',
        street: 'Hilario Island',
        postcode: '06911',
        timezone: 'America/Los_Angeles',
        formatted:
          '5274 Hilario Island, 06911 San Francisco, California, United States',
        housenumber: '5274',
      },
      checkInTime: '16:00',
      checkOutTime: '10:00',
      minCancelDays: 6,
      status: 'PUBLISHED',
      privacyType: 'ENTIRE',
    },
    {
      title: 'Charming Sophisticated Flat Downtown',
      description:
        'Modern apartment in the trendy Heights district. This stylish space features Hot Tub and Dining Area, offering a comfortable base for exploring Houston. Just steps away from Museum District and local attractions.',
      nightPrice: 100.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
      ],
      propertyType: 'APARTMENT',
      hostId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
      images: [
        'https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3?fm=webp',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?fm=webp',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?fm=webp',
        'https://images.unsplash.com/photo-1600493505873-cddd69453072?fm=webp',
        'https://images.unsplash.com/photo-1613575831056-0acd5da8f085?fm=webp',
      ],
      beds: 1,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 3.9,
        reviews: [
          {
            score: 3,
            message:
              'Good location and clean apartment, but the building had some issues.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 4,
            message:
              'Outstanding apartment with modern amenities. Perfect for our trip.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 4,
            message:
              'Wonderful apartment with all the amenities you could want.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 5,
            message:
              'Fantastic apartment in a great neighborhood. Would stay again!',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 4,
            message:
              'Perfect location and the apartment had everything we needed.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 5,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 5,
            message:
              'Wonderful apartment with all the amenities you could want.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 4,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 3,
            message:
              'Comfortable stay, but the apartment could use some updates.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 3,
            message:
              'Nice location and decent amenities, though the apartment was smaller than photos.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Fantastic apartment in a great neighborhood. Would stay again!',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Perfect location and the apartment had everything we needed.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 1,
            message:
              'Poor communication from the host and the apartment had problems.',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 5,
            message:
              'Perfect location and the apartment had everything we needed.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
        ],
      },
      lat: 29.85595340400284,
      lng: -95.3710088968677,
      city: 'Houston',
      country: 'United States',
      location: {
        state: 'Texas',
        street: 'E Water Street',
        postcode: '45961',
        timezone: 'America/Chicago',
        formatted: '325 E Water Street, 45961 Houston, Texas, United States',
        housenumber: '325',
      },
      checkInTime: '14:00',
      checkOutTime: '12:00',
      minCancelDays: 3,
      status: 'PUBLISHED',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Elegant Welcoming Condo with Balcony',
      description:
        'Experience the pulse of Chicago from this contemporary apartment. With Garage and Rooftop Terrace, this space in River North offers modern comfort in a prime location.',
      nightPrice: 97.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'APARTMENT',
      hostId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
      images: [
        'https://images.unsplash.com/photo-1629042306548-afec37a5e46b?fm=webp',
        'https://images.unsplash.com/photo-1637747019989-fec01a8d70fa?fm=webp',
        'https://images.unsplash.com/photo-1652882860938-f90aa298e644?fm=webp',
        'https://images.unsplash.com/photo-1667507273665-c11b6c81106c?fm=webp',
        'https://images.unsplash.com/photo-1702014862053-946a122b920d?fm=webp',
      ],
      beds: 4,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 4.3,
        reviews: [
          {
            score: 4,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 5,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Outstanding apartment with modern amenities. Perfect for our trip.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 4,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 2,
            message:
              'The apartment was not clean and had several maintenance issues.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 5,
            message:
              'Outstanding apartment with modern amenities. Perfect for our trip.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 4,
            message:
              'Wonderful apartment with all the amenities you could want.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 4,
            message:
              'Perfect location and the apartment had everything we needed.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 3,
            message:
              'Good apartment overall, but the building was noisier than expected.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 4,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 3,
            message:
              'Decent apartment with good amenities, but the check-in was complicated.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 5,
            message:
              'Perfect location and the apartment had everything we needed.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was exactly as described and very comfortable.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 5,
            message:
              'Excellent stay! The apartment was exactly as described and very comfortable.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
        ],
      },
      lat: 41.84983334848327,
      lng: -87.72795986850564,
      city: 'Chicago',
      country: 'United States',
      location: {
        state: 'Illinois',
        street: 'Ziemann Spring',
        postcode: '35904',
        timezone: 'America/Chicago',
        formatted:
          '46226 Ziemann Spring, 35904 Chicago, Illinois, United States',
        housenumber: '46226',
      },
      checkInTime: '16:00',
      checkOutTime: '12:00',
      minCancelDays: 4,
      status: 'PUBLISHED',
      privacyType: 'SHARED',
    },
    {
      title: 'Spacious Elegant House with Private Garden',
      description:
        'Nestled in the heart of North Beach, this charming house offers Living Room and Fireplace. Perfect for weekend getaways, this home combines modern amenities with the authentic character of San Francisco.',
      nightPrice: 298.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
      images: [
        'https://images.unsplash.com/photo-1619992542351-0873d50ec90a?fm=webp',
        'https://images.unsplash.com/photo-1627257061278-50f10eb4a52d?fm=webp',
        'https://images.unsplash.com/photo-1628745277926-086b68b2d542?fm=webp',
        'https://images.unsplash.com/photo-1640109229792-a26a0ee366ff?fm=webp',
        'https://images.unsplash.com/photo-1662557499804-7f1d3910d13e?fm=webp',
      ],
      beds: 6,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 2,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.4,
        reviews: [
          {
            score: 3,
            message:
              'Nice location and decent amenities, though the WiFi was a bit slow.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 3,
            message:
              'Nice location and decent amenities, though the WiFi was a bit slow.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 3,
            message:
              'Decent stay overall, though the house was smaller than the photos suggested.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 4,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 3,
            message:
              'Nice location and decent amenities, though the WiFi was a bit slow.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Fantastic house with a lovely garden. Would definitely stay again!',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
        ],
      },
      lat: 37.67717213820993,
      lng: -122.35060427689,
      city: 'San Francisco',
      country: 'United States',
      location: {
        state: 'California',
        street: 'Victoria Hill',
        postcode: '72382',
        timezone: 'America/Los_Angeles',
        formatted:
          '360 Victoria Hill, 72382 San Francisco, California, United States',
        housenumber: '360',
      },
      checkInTime: '16:00',
      checkOutTime: '10:00',
      minCancelDays: 7,
      status: 'PENDING',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Family-Friendly Serene Home',
      description:
        'This meticulously maintained house offers a peaceful sanctuary in the bustling city of New York. With Study and Gym, this home provides everything you need for a comfortable stay.',
      nightPrice: 339.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
      images: [
        'https://images.unsplash.com/photo-1718893389568-22a2a039998c?fm=webp',
        'https://images.unsplash.com/photo-1502814151-947a9877a776?fm=webp',
        'https://images.unsplash.com/photo-1598414381594-18d86505f5d5?fm=webp',
        'https://images.unsplash.com/photo-1623625434462-e5e42318ae49?fm=webp',
        'https://images.unsplash.com/photo-1649083048381-520a5b3d91ff?fm=webp',
      ],
      beds: 5,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 3,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.1,
        reviews: [
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 4,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 2,
            message:
              'Poor experience overall. The house was not clean and had broken amenities.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 3,
            message:
              'Decent stay overall, though the house was smaller than the photos suggested.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 2,
            message:
              'The house was not as advertised and had several maintenance issues.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 3,
            message: 'The Wifi was too slow but the view was really good.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
        ],
      },
      lat: 40.62013138564529,
      lng: -73.96096884109525,
      city: 'New York',
      country: 'United States',
      location: {
        state: 'New York',
        street: 'Douglas Fall',
        postcode: '59111-4986',
        timezone: 'America/New_York',
        formatted:
          '23510 Douglas Fall, 59111-4986 New York, New York, United States',
        housenumber: '23510',
      },
      checkInTime: '16:00',
      checkOutTime: '10:00',
      minCancelDays: 3,
      status: 'PENDING',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Boutique Elegant House in Queens',
      description:
        'Immerse yourself in the vibrant culture of Houston from this thoughtfully designed house. With Living Room and City View, this home offers the perfect retreat after a day of exploring.',
      nightPrice: 122.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'HOUSE',
      hostId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
      images: [
        'https://images.unsplash.com/photo-1668911493514-2aeed8439227?fm=webp',
        'https://images.unsplash.com/photo-1688465162675-87d395cf35e4?fm=webp',
        'https://images.unsplash.com/photo-1696814543702-63d40f01f67b?fm=webp',
        'https://images.unsplash.com/photo-1560185010-2a290b0cd4cd?fm=webp',
        'https://images.unsplash.com/photo-1560185008-37a6ea85a4d4?fm=webp',
      ],
      beds: 3,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 1,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.4,
        reviews: [
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 3,
            message:
              'Overall pleasant stay, though some amenities were not working properly.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 5,
            message:
              'Beautiful home with great amenities. The host was very responsive.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 5,
            message:
              'Fantastic house with a lovely garden. Would definitely stay again!',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 4,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 4,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 4,
            message:
              'Fantastic house with a lovely garden. Would definitely stay again!',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 3,
            message:
              'Comfortable accommodation, though the check-in process was a bit complicated.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 4,
            message:
              'Fantastic house with a lovely garden. Would definitely stay again!',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 4,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '4a84f6f1-31bc-4696-adeb-3f4e1b13b685',
          },
        ],
      },
      lat: 29.79110769590939,
      lng: -95.46078000511524,
      city: 'Houston',
      country: 'United States',
      location: {
        state: 'Texas',
        street: 'Davis Run',
        postcode: '17108-2869',
        timezone: 'America/Chicago',
        formatted: '60209 Davis Run, 17108-2869 Houston, Texas, United States',
        housenumber: '60209',
      },
      checkInTime: '16:00',
      checkOutTime: '10:00',
      minCancelDays: 7,
      status: 'PUBLISHED',
      privacyType: 'PRIVATE',
    },
    {
      title: 'Charming Contemporary House in Brooklyn',
      description:
        'Experience the warmth and hospitality of Houston in this inviting house. Located in Museum District, this home features Pool and Kitchen, making it ideal for groups of friends.',
      nightPrice: 192.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
      images: [
        'https://images.unsplash.com/photo-1680645944941-da9198d7f6aa?fm=webp',
        'https://images.unsplash.com/photo-1683131597435-7874abc187cd?fm=webp',
        'https://images.unsplash.com/photo-1693560821176-f26424b2d5d4?fm=webp',
        'https://images.unsplash.com/photo-1712079325210-5b4f2383ead2?fm=webp',
        'https://images.unsplash.com/photo-1718222934867-55301ef5571e?fm=webp',
      ],
      beds: 3,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 2,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 3.9,
        reviews: [
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 3,
            message:
              'Nice house but the neighborhood was noisier than expected.',
            userId: '1d7e3aeb-e7ee-44ec-8b85-30411ff5c070',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 4,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '7bacc92e-5457-461d-83ec-a303c89f278e',
          },
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
          },
          {
            score: 3,
            message:
              'Decent house for the price, though parking was a bit challenging.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 2,
            message:
              'The house was not ready when we arrived and had cleanliness issues.',
            userId: '07c15de8-47c9-4959-8ad7-f75093caebb1',
          },
          {
            score: 4,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 5,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 3,
            message:
              'Nice location and decent amenities, though the WiFi was a bit slow.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 4,
            message:
              'Excellent location and the house had everything we needed for our stay.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 4,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 3,
            message:
              'Nice location and decent amenities, though the WiFi was a bit slow.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 4,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: 'a32c8c05-748b-45ac-9458-814d1be86c87',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
        ],
      },
      lat: 29.78364541751447,
      lng: -95.36471169283143,
      city: 'Houston',
      country: 'United States',
      location: {
        state: 'Texas',
        street: 'Okey Hills',
        postcode: '63095',
        timezone: 'America/Chicago',
        formatted: '15567 Okey Hills, 63095 Houston, Texas, United States',
        housenumber: '15567',
      },
      checkInTime: '14:00',
      checkOutTime: '12:00',
      minCancelDays: 2,
      status: 'PUBLISHED',
      privacyType: 'SHARED',
    },
    {
      title: 'Welcoming Urban House with Pool',
      description:
        'Nestled in the heart of Manhattan, this charming house offers Rooftop Terrace and Balcony. Perfect for couples, this home combines modern amenities with the authentic character of New York.',
      nightPrice: 367.0,
      promotions: [
        {
          minNights: 7,
          description: '',
          discountPercentage: 21,
        },
      ],
      propertyType: 'HOUSE',
      hostId: '7bacc92e-5457-461d-83ec-a303c89f278e',
      images: [
        'https://images.unsplash.com/photo-1663659511603-c30f51f2b042?fm=webp',
        'https://images.unsplash.com/photo-1678783769655-6c7eb81a60b9?fm=webp',
        'https://images.unsplash.com/photo-1696814543768-f8ff4610419a?fm=webp',
        'https://images.unsplash.com/photo-1721201341381-83a12ef88004?fm=webp',
        'https://images.unsplash.com/photo-1721824324332-a95c70f35cf6?fm=webp',
      ],
      beds: 6,
      maxGuests: 6,
      bedrooms: 4,
      bathrooms: 3,
      maxPets: 2,
      maxAdults: 6,
      maxInfants: 2,
      maxChildren: 4,
      score: {
        value: 4.5,
        reviews: [
          {
            score: 4,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 5,
            message:
              'Beautiful home in a great location. Highly recommend for families.',
            userId: 'dc31ace3-236e-4942-8dc0-c0828d6b53a2',
          },
          {
            score: 5,
            message:
              'Amazing house! Perfect location and everything was exactly as described.',
            userId: 'e41a8605-f57d-4d54-b92e-c4ba34ee081e',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '2d991008-f434-41b1-a581-5e91b92578da',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '88a251dd-8af3-466d-b85d-b3f3f49474f5',
          },
          {
            score: 4,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Outstanding house with all the amenities you could want. Perfect stay!',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 3,
            message:
              'Good house overall, but some minor issues with the heating.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 5,
            message:
              'Wonderful experience! The house was spacious and beautifully decorated.',
            userId: 'd352c065-113c-4a18-9a4c-b0137198e7d0',
          },
          {
            score: 4,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: '427ff357-2c0e-4713-8046-6534b411a943',
          },
          {
            score: 5,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
          {
            score: 5,
            message:
              'Fantastic house with a lovely garden. Would definitely stay again!',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 5,
            message:
              'Loved staying here! The house was clean, comfortable, and well-equipped.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 3,
            message:
              'Decent house for the price, though parking was a bit challenging.',
            userId: 'e60ba086-655b-448a-a474-0d996c2c0da7',
          },
          {
            score: 4,
            message:
              'Clean, comfortable, and well-maintained. The host was very helpful.',
            userId: 'd1a8a8cc-665f-4978-b2d6-01e68a6e4225',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
          {
            score: 5,
            message:
              'Perfect for our family vacation. Great neighborhood and easy access to attractions.',
            userId: '92fd022e-e347-4062-bc53-92b40fcac60e',
          },
        ],
      },
      lat: 40.77816426962813,
      lng: -73.99070612145213,
      city: 'New York',
      country: 'United States',
      location: {
        state: 'New York',
        street: 'Marvin Glens',
        postcode: '63508',
        timezone: 'America/New_York',
        formatted:
          '69471 Marvin Glens, 63508 New York, New York, United States',
        housenumber: '69471',
      },
      checkInTime: '15:00',
      checkOutTime: '12:00',
      minCancelDays: 3,
      status: 'PUBLISHED',
      privacyType: 'ENTIRE',
    },
    {
      title: 'Luxury Elegant Apartment with City View',
      description:
        'Experience the best of San Francisco from this elegantly designed apartment. With Balcony and Wine Cellar, this space in North Beach offers a sophisticated retreat in the heart of the city.',
      nightPrice: 275.0,
      promotions: [
        {
          minNights: 3,
          description: 'Stay 3+ nights and save!',
          discountPercentage: 6,
        },
        {
          minNights: 7,
          description: 'Extended stay discount',
          discountPercentage: 9,
        },
        {
          minNights: 10,
          description: 'Weekly stay special',
          discountPercentage: 15,
        },
        {
          minNights: 14,
          description: 'Bi-weekly discount',
          discountPercentage: 19,
        },
      ],
      propertyType: 'APARTMENT',
      hostId: '4c82c43f-6786-40d0-8f1b-062ac74daf49',
      images: [
        'https://images.unsplash.com/photo-1718894071085-5be03ad32a53?fm=webp',
        'https://images.unsplash.com/photo-1723468357904-22ea41bc4157?fm=webp',
        'https://images.unsplash.com/photo-1737253333511-0f27fc9508a4?fm=webp',
        'https://images.unsplash.com/photo-1738748444659-f8975b12ce57?fm=webp',
        'https://images.unsplash.com/photo-1745221847962-0397cc719b8e?fm=webp',
      ],
      beds: 3,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      maxPets: 1,
      maxAdults: 4,
      maxInfants: 1,
      maxChildren: 2,
      score: {
        value: 4.1,
        reviews: [
          {
            score: 4,
            message:
              'Outstanding apartment with modern amenities. Perfect for our trip.',
            userId: '3eb7caec-dac3-40fb-923c-31d2424e7a0e',
          },
          {
            score: 4,
            message:
              'Wonderful apartment with all the amenities you could want.',
            userId: '67237730-69a1-4e8a-92ef-d0419eec252e',
          },
          {
            score: 3,
            message:
              'Comfortable accommodation, though the apartment was not as modern as expected.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 2,
            message:
              'Unpleasant experience. The apartment was dirty and several things were broken.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 4,
            message:
              'Excellent stay! The apartment was exactly as described and very comfortable.',
            userId: '37896486-6eca-42fb-b070-4b9adce8b68b',
          },
          {
            score: 4,
            message:
              'Outstanding apartment with modern amenities. Perfect for our trip.',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 4,
            message:
              'Excellent stay! The apartment was spacious and well-equipped.',
            userId: '337820d8-2cb4-492a-9992-718e4da8cc88',
          },
          {
            score: 3,
            message:
              'Comfortable stay, but the apartment could use some updates.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Great apartment in a perfect location! Everything was clean and modern.',
            userId: 'db17b6c1-45d0-454b-8327-37462c3b993b',
          },
          {
            score: 5,
            message:
              'Beautiful apartment with stunning views. Highly recommend!',
            userId: 'dbea12f9-5837-4f9f-928f-83d090793b44',
          },
          {
            score: 5,
            message:
              'Fantastic apartment in a great neighborhood. Would stay again!',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 5,
            message:
              'Wonderful apartment with all the amenities you could want.',
            userId: 'a296e25a-f889-4d37-9bc0-ca4dd5dc8047',
          },
          {
            score: 5,
            message:
              'Great value and excellent location. The apartment was clean and comfortable.',
            userId: 'd744fe42-f85f-4b8f-a8b2-1a4b109def31',
          },
          {
            score: 5,
            message:
              'Loved this apartment! Great amenities and the host was very helpful.',
            userId: '99d96573-ce1f-46e2-bbbd-2f30c280b998',
          },
        ],
      },
      lat: 37.82068122983717,
      lng: -122.3374502508189,
      city: 'San Francisco',
      country: 'United States',
      location: {
        state: 'California',
        street: 'Maple Drive',
        postcode: '80596',
        timezone: 'America/Los_Angeles',
        formatted:
          '283 Maple Drive, 80596 San Francisco, California, United States',
        housenumber: '283',
      },
      checkInTime: '14:00',
      checkOutTime: '10:00',
      minCancelDays: 7,
      status: 'PUBLISHED',
      privacyType: 'ENTIRE',
    },
  ];
  await prisma.listing.createMany({
    data: listingsToSeed,
    skipDuplicates: true,
  });
}

main().catch(console.error).finally(disconnect);
