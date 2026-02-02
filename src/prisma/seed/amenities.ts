import { AmenityCategory } from '@prisma/client';
import 'dotenv/config';
import { createPrismaClient } from './prisma.factory';

const { prisma, disconnect } = createPrismaClient();

async function main() {
  await prisma.amenity.createMany({
    data: [
      // GENERAL
      { name: 'WiFi', category: AmenityCategory.GENERAL },
      { name: 'Heating', category: AmenityCategory.GENERAL },
      { name: 'Air conditioning', category: AmenityCategory.GENERAL },
      { name: 'Parking', category: AmenityCategory.GENERAL },
      { name: 'Elevator', category: AmenityCategory.GENERAL },
      { name: 'Free street parking', category: AmenityCategory.GENERAL },
      { name: 'Paid parking off premises', category: AmenityCategory.GENERAL },
      { name: 'Pets allowed', category: AmenityCategory.GENERAL },
      { name: 'Service animals allowed', category: AmenityCategory.GENERAL },
      { name: 'Luggage drop-off allowed', category: AmenityCategory.GENERAL },
      {
        name: 'Flexible check-in/check-out',
        category: AmenityCategory.GENERAL,
      },
      { name: 'Self check-in', category: AmenityCategory.GENERAL },
      { name: 'Key safe', category: AmenityCategory.GENERAL },

      // KITCHEN
      { name: 'Refrigerator', category: AmenityCategory.KITCHEN },
      { name: 'Microwave', category: AmenityCategory.KITCHEN },
      { name: 'Oven', category: AmenityCategory.KITCHEN },
      { name: 'Dishwasher', category: AmenityCategory.KITCHEN },
      { name: 'Coffee maker', category: AmenityCategory.KITCHEN },
      { name: 'Electric kettle', category: AmenityCategory.KITCHEN },
      { name: 'Kitchenette', category: AmenityCategory.KITCHEN },
      { name: 'Food prep space', category: AmenityCategory.KITCHEN },
      { name: 'Utensils', category: AmenityCategory.KITCHEN },
      { name: 'Pots and pans', category: AmenityCategory.KITCHEN },
      {
        name: 'Plates, bowls, cups, cutlery',
        category: AmenityCategory.KITCHEN,
      },

      // DINING
      { name: 'Dining table', category: AmenityCategory.DINING },
      { name: 'Barbecue grill', category: AmenityCategory.DINING },

      // BEDROOM
      { name: 'King size bed', category: AmenityCategory.BEDROOM },
      { name: 'Queen size bed', category: AmenityCategory.BEDROOM },
      { name: 'Wardrobe / Closet', category: AmenityCategory.BEDROOM },
      { name: 'Extra pillows & blankets', category: AmenityCategory.BEDROOM },
      { name: 'Bed linen', category: AmenityCategory.BEDROOM },
      { name: 'Blackout curtains', category: AmenityCategory.BEDROOM },
      { name: 'Iron', category: AmenityCategory.BEDROOM },
      { name: 'Hangers', category: AmenityCategory.BEDROOM },

      // BATHROOM
      { name: 'Shampoo', category: AmenityCategory.BATHROOM },
      { name: 'Hair dryer', category: AmenityCategory.BATHROOM },
      { name: 'Towels', category: AmenityCategory.BATHROOM },
      { name: 'Toilet paper', category: AmenityCategory.BATHROOM },
      { name: 'Bath tub', category: AmenityCategory.BATHROOM },
      { name: 'Body soap', category: AmenityCategory.BATHROOM },
      { name: 'Bidet', category: AmenityCategory.BATHROOM },
      { name: 'Hot water', category: AmenityCategory.BATHROOM },
      { name: 'Shower gel', category: AmenityCategory.BATHROOM },
      { name: 'Cleaning products', category: AmenityCategory.BATHROOM },

      // ENTERTAINMENT
      { name: 'TV', category: AmenityCategory.ENTERTAINMENT },
      { name: 'Streaming services', category: AmenityCategory.ENTERTAINMENT },
      { name: 'Board games', category: AmenityCategory.ENTERTAINMENT },

      // SECURITY
      { name: 'Smoke detector', category: AmenityCategory.SECURITY },
      { name: 'Carbon monoxide detector', category: AmenityCategory.SECURITY },
      { name: 'Fire extinguisher', category: AmenityCategory.SECURITY },
      { name: 'First aid kit', category: AmenityCategory.SECURITY },

      // ACTIVITIES
      { name: 'Pool', category: AmenityCategory.ACTIVITIES },
      { name: 'Hot tub', category: AmenityCategory.ACTIVITIES },
      { name: 'Gym', category: AmenityCategory.ACTIVITIES },
      { name: 'Bicycle', category: AmenityCategory.ACTIVITIES },
    ],
    skipDuplicates: true,
  });
}

main().catch(console.error).finally(disconnect);
