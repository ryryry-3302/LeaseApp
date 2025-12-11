import { Listing } from "@/types/listing";

// San Francisco neighborhoods popular with interns/students
const neighborhoods = [
  { name: "SOMA", lat: 37.7749, lng: -122.4194 },
  { name: "Mission District", lat: 37.7599, lng: -122.4148 },
  { name: "Hayes Valley", lat: 37.7768, lng: -122.4233 },
  { name: "Nob Hill", lat: 37.7925, lng: -122.4169 },
  { name: "Pacific Heights", lat: 37.7925, lng: -122.4396 },
  { name: "Marina", lat: 37.8024, lng: -122.4488 },
  { name: "Lower Haight", lat: 37.7719, lng: -122.4312 },
  { name: "Mission Bay", lat: 37.7706, lng: -122.3892 },
  { name: "Potrero Hill", lat: 37.7647, lng: -122.4029 },
  { name: "Dogpatch", lat: 37.7572, lng: -122.3889 },
];

const amenities = [
  "In-unit laundry",
  "Dishwasher",
  "Parking",
  "Gym",
  "Rooftop",
  "Pet-friendly",
  "Furnished",
  "AC",
  "Balcony",
  "Storage",
];

const descriptions = [
  "Beautiful modern apartment perfect for interns and students. Close to public transit and tech companies.",
  "Spacious room in shared apartment. Great location with easy access to downtown SF.",
  "Cozy studio apartment in vibrant neighborhood. Walking distance to cafes and restaurants.",
  "Large bedroom in luxury building. Amenities include gym, rooftop, and 24/7 security.",
  "Furnished apartment available for sublet. Perfect for short-term stays during internship.",
  "Bright and airy space in safe neighborhood. Close to BART and Muni lines.",
  "Modern apartment with great natural light. Ideal for students or young professionals.",
  "Well-maintained unit in historic building. Character and charm with modern amenities.",
];

function randomElement<T>(array: T[]): T {
  return array[Math.floor(seededRandom() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(seededRandom() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return seededRandom() * (max - min) + min;
}

function generateAddress(neighborhood: string, streetNum: number): string {
  const streets = [
    "Mission St",
    "Market St",
    "Folsom St",
    "Harrison St",
    "Howard St",
    "Valencia St",
    "Guerrero St",
    "Dolores St",
    "Franklin St",
    "Gough St",
  ];
  return `${streetNum} ${randomElement(streets)}, ${neighborhood}`;
}

function generatePhotos(count: number): string[] {
  // Using Unsplash API for placeholder images
  const photos: string[] = [];
  for (let i = 0; i < count; i++) {
    const width = 800;
    const height = 600;
    const photoSeed = Math.floor(seededRandom() * 1000);
    photos.push(
      `https://picsum.photos/seed/apartment${photoSeed}/${width}/${height}`
    );
  }
  return photos;
}

function generateDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  // Use local date components to avoid timezone issues
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Use a seeded random number generator for deterministic results
let seed = 12345;
function seededRandom() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

export function generateMockListings(count: number = 15): Listing[] {
  const listings: Listing[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const neighborhood = randomElement(neighborhoods);
    const bedrooms = randomInt(1, 3);
    const bathrooms = bedrooms === 1 ? 1 : randomInt(1, bedrooms);
    const basePrice = bedrooms === 1 ? 2000 : bedrooms === 2 ? 3500 : 5000;
    const price = basePrice + randomInt(-300, 500);
    const availableDays = randomInt(0, 60);
    const leaseDays = randomInt(90, 365);

    const listing: Listing = {
      id: `listing-${i + 1}`,
      address: generateAddress(neighborhood.name, randomInt(100, 3000)),
      neighborhood: neighborhood.name,
      city: "San Francisco",
      state: "CA",
      zipCode: `94${randomInt(100, 999)}`,
      coordinates: {
        lat: neighborhood.lat + randomFloat(-0.02, 0.02),
        lng: neighborhood.lng + randomFloat(-0.02, 0.02),
      },
      price,
      bedrooms,
      bathrooms,
      squareFeet: bedrooms === 1 ? randomInt(400, 600) : bedrooms === 2 ? randomInt(700, 1000) : randomInt(1000, 1400),
      availableDate: generateDate(availableDays),
      leaseEndDate: generateDate(availableDays + leaseDays),
      description: randomElement(descriptions),
      photos: generatePhotos(randomInt(3, 6)),
      amenities: amenities.slice(0, randomInt(3, 6)).sort(),
      contactInfo: {
        name: `Contact ${i + 1}`,
        email: `contact${i + 1}@example.com`,
        phone: `415-${randomInt(100, 999)}-${randomInt(1000, 9999)}`,
      },
      createdAt: now.toISOString(),
    };

    listings.push(listing);
  }

  return listings;
}

// Cache the generated listings to ensure consistency between server and client
let cachedListings: Listing[] | null = null;

export const mockListings = (() => {
  if (!cachedListings) {
    // Reset seed for consistent generation
    seed = 12345;
    cachedListings = generateMockListings(15);
  }
  return cachedListings;
})();

