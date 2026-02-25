import 'dotenv/config';
import { z } from 'zod';
import { createPrismaClient } from './prisma.factory';

interface CityData {
  name: string;
  state: string | null;
  country: string | null;
  lat: number;
  lng: number;
}

const GeoapifyResponseSchema = z.object({
  features: z.array(
    z.object({
      properties: z.object({
        lat: z.number(),
        lon: z.number(),
      }),
    }),
  ),
});

async function geocodeCityWithDebug(
  cityName: string,
): Promise<{ lat: number; lng: number } | null> {
  try {
    const api_key = process.env.GEOAPIFY_API_KEY;

    if (!api_key) {
      console.error(
        '❌ API key not found. Please set GEOAPIFY_API_KEY in your .env file',
      );
      return null;
    }

    console.log(`🔍 Geocoding: ${cityName}`);
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(cityName)}&apiKey=${api_key}&limit=1`;
    console.log(`📡 API URL: ${url.replace(api_key, '***')}`);

    const response = await fetch(url);

    console.log(
      `📊 Response status: ${response.status} ${response.statusText}`,
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error: ${response.status} - ${errorText}`);
      return null;
    }

    const json: unknown = await response.json();
    const data = GeoapifyResponseSchema.parse(json);

    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      const coords = {
        lat: feature.properties.lat,
        lng: feature.properties.lon,
      };
      console.log(`✅ Got coordinates: ${coords.lat}, ${coords.lng}`);
      return coords;
    }

    console.log(`❌ No features found in response`);
    return null;
  } catch (error) {
    console.error('❌ Geocoding error:', error);
    return null;
  }
}

async function populateCities() {
  console.log('🚀 Starting cities population...');

  // Check if API key is available
  const api_key = process.env.GEOAPIFY_API_KEY;
  if (!api_key) {
    console.error(
      '❌ GEOAPIFY_API_KEY is not set in your environment variables',
    );
    console.log('💡 Please add it to your .env file and restart the script');
    process.exit(1);
  }

  try {
    // Step 1: Extract unique cities from listings
    console.log('📊 Extracting unique cities from listings...');

    const uniqueCities = await prisma.$queryRaw<
      Array<{
        city_name: string;
        state: string | null;
        country: string | null;
      }>
    >`
      SELECT DISTINCT 
        city AS city_name,
        location ->> 'state' AS state,
        country
      FROM "Listing"
      WHERE status = 'PUBLISHED'
        AND city IS NOT NULL
        AND city != ''
      ORDER BY city_name
    `;

    console.log(`📍 Found ${uniqueCities.length} unique cities`);

    // Step 2: Process each city
    const citiesToInsert: CityData[] = [];
    let processed = 0;

    for (const city of uniqueCities) {
      processed++;
      console.log(
        `\n🔄 Processing ${processed}/${uniqueCities.length}: ${city.city_name}, ${city.state || city.country || 'Unknown'}`,
      );

      try {
        // Create search term for geocoding
        const searchTerm = [city.city_name, city.state, city.country]
          .filter(Boolean)
          .join(', ');
        console.log(`🔍 Search term: ${searchTerm}`);

        // Get coordinates from geocoding API
        const coords = await geocodeCityWithDebug(searchTerm);

        if (coords) {
          citiesToInsert.push({
            name: city.city_name,
            state: city.state,
            country: city.country,
            lat: coords.lat,
            lng: coords.lng,
          });
          console.log(`✅ Added ${city.city_name} to insert list`);
        } else {
          console.log(`❌ Failed to get coordinates for ${city.city_name}`);
        }

        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Increased delay
      } catch (error) {
        console.error(`❌ Error processing ${city.city_name}:`, error);
      }
    }

    // Step 3: Clear existing cities and insert new ones
    console.log('\n🗑️ Clearing existing cities...');
    await prisma.city.deleteMany({});

    console.log('💾 Inserting cities into database...');

    if (citiesToInsert.length > 0) {
      await prisma.city.createMany({
        data: citiesToInsert,
        skipDuplicates: true,
      });

      console.log(`✅ Successfully inserted ${citiesToInsert.length} cities`);
    } else {
      console.log('❌ No cities to insert');
    }

    // Step 4: Show summary
    const totalCities = await prisma.city.count();
    console.log(`📈 Total cities in database: ${totalCities}`);

    // Show some example cities
    const sampleCities = await prisma.city.findMany({
      take: 10,
      orderBy: { name: 'asc' },
    });

    console.log('\n🏙️ Sample cities:');
    sampleCities.forEach((city, index) => {
      console.log(
        `${index + 1}. ${city.name}, ${city.state || city.country || 'Unknown'} - ${Number(city.lat)}, ${Number(city.lng)}`,
      );
    });
  } catch (error) {
    console.error('❌ Error populating cities:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

const { prisma, disconnect } = createPrismaClient();

async function main() {
  await populateCities()
    .then(() => {
      console.log('🎉 Cities population completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Cities population failed:', error);
      process.exit(1);
    });
}

main().catch(console.error).finally(disconnect);
