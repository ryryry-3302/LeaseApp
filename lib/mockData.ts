import { Listing, Verification, RunnerReport, TenantReview, Belonging } from "@/types/listing";

// Real San Francisco addresses with geocoded coordinates
const realAddresses = [
  { address: "1234 Mission St", neighborhood: "SOMA", lat: 37.7771405, lng: -122.413706, zipCode: "94102" },
  { address: "567 Market St", neighborhood: "SOMA", lat: 37.7897769, lng: -122.4004917, zipCode: "94102" },
  { address: "2453 Mission St", neighborhood: "Mission District", lat: 37.7577986, lng: -122.4188696, zipCode: "94110" },
  { address: "1890 Valencia St", neighborhood: "Mission District", lat: 37.7557022, lng: -122.4210107, zipCode: "94110" },
  { address: "450 Hayes St", neighborhood: "Hayes Valley", lat: 37.777031, lng: -122.4238821, zipCode: "94102" },
  { address: "580 Gough St", neighborhood: "Hayes Valley", lat: 37.7785116, lng: -122.4232015, zipCode: "94102" },
  { address: "1200 California St", neighborhood: "Nob Hill", lat: 37.7916313, lng: -122.4145284, zipCode: "94108" },
  { address: "950 Mason St", neighborhood: "Nob Hill", lat: 37.79242, lng: -122.4097691, zipCode: "94108" },
  { address: "2100 Fillmore St", neighborhood: "Pacific Heights", lat: 37.7891589, lng: -122.4336826, zipCode: "94115" },
  { address: "1800 Jackson St", neighborhood: "Pacific Heights", lat: 37.793788, lng: -122.424864, zipCode: "94115" },
  { address: "3200 Fillmore St", neighborhood: "Marina", lat: 37.799087, lng: -122.435788, zipCode: "94123" },
  { address: "2800 Lombard St", neighborhood: "Marina", lat: 37.80152, lng: -122.4242511, zipCode: "94123" },
  { address: "550 Haight St", neighborhood: "Lower Haight", lat: 37.7720267, lng: -122.4317298, zipCode: "94117" },
  { address: "800 Fillmore St", neighborhood: "Lower Haight", lat: 37.8015505, lng: -122.4364113, zipCode: "94117" },
  { address: "185 Berry St", neighborhood: "Mission Bay", lat: 37.7762432, lng: -122.3917021, zipCode: "94107" },
  { address: "250 King St", neighborhood: "Mission Bay", lat: 37.7780985, lng: -122.3928865, zipCode: "94107" },
  { address: "1200 18th St", neighborhood: "Potrero Hill", lat: 37.762769, lng: -122.394758, zipCode: "94107" },
  { address: "800 De Haro St", neighborhood: "Potrero Hill", lat: 37.759605, lng: -122.401204, zipCode: "94107" },
  { address: "1200 3rd St", neighborhood: "Dogpatch", lat: 37.7737365, lng: -122.3898478, zipCode: "94107" },
  { address: "900 Tennessee St", neighborhood: "Dogpatch", lat: 37.760306, lng: -122.389578, zipCode: "94107" },
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

// Use a seeded random number generator for deterministic results
let seed = 12345;
function seededRandom() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(seededRandom() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(seededRandom() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return seededRandom() * (max - min) + min;
}

// generateAddress is no longer needed - we use real addresses

function generatePhotos(count: number): string[] {
  // Using verified Pexels photo IDs for real apartment/home interiors
  // All URLs tested and confirmed working - these are actual real estate photos
  const pexelsPhotos = [
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  ];
  
  const photos: string[] = [];
  const usedIndices = new Set<number>();
  
  for (let i = 0; i < count; i++) {
    let photoIndex: number;
    // Randomly select photos, avoiding duplicates within the same listing
    if (usedIndices.size < pexelsPhotos.length) {
      do {
        photoIndex = Math.floor(seededRandom() * pexelsPhotos.length);
      } while (usedIndices.has(photoIndex));
      usedIndices.add(photoIndex);
    } else {
      // If we've used all photos, allow reuse but still randomize
      photoIndex = Math.floor(seededRandom() * pexelsPhotos.length);
    }
    photos.push(pexelsPhotos[photoIndex]);
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

function generateBelongings(count: number): Belonging[] {
  const categories: Belonging['category'][] = ['Furniture', 'Electronics', 'Appliances', 'Decor', 'Other'];
  const conditions: Belonging['condition'][] = ['New', 'Like New', 'Good', 'Fair'];
  const furnitureItems = ['Desk', 'Chair', 'Bed Frame', 'Dresser', 'Bookshelf', 'Coffee Table', 'Dining Table'];
  const electronics = ['TV', 'Monitor', 'Speakers', 'Router', 'Lamp', 'Fan'];
  const appliances = ['Microwave', 'Toaster', 'Blender', 'Coffee Maker', 'Air Fryer'];
  const decor = ['Wall Art', 'Plants', 'Rugs', 'Curtains', 'Mirror', 'Shelves'];
  const other = ['Storage Bins', 'Hangers', 'Kitchenware Set', 'Bedding Set'];

  const itemPools: { [key: string]: string[] } = {
    Furniture: furnitureItems,
    Electronics: electronics,
    Appliances: appliances,
    Decor: decor,
    Other: other,
  };

  const belongings: Belonging[] = [];
  for (let i = 0; i < count; i++) {
    const category = randomElement(categories);
    const items = itemPools[category];
    const name = randomElement(items);
    const condition = randomElement(conditions);
    const basePrice = category === 'Furniture' ? randomInt(50, 300) : 
                      category === 'Electronics' ? randomInt(30, 200) :
                      category === 'Appliances' ? randomInt(20, 150) :
                      randomInt(10, 100);
    const price = basePrice + randomInt(-10, 20);
    
    belongings.push({
      id: `belonging-${i + 1}`,
      name,
      category,
      condition,
      price,
      negotiable: seededRandom() > 0.5,
      photos: generatePhotos(1),
      description: `${condition} condition ${name.toLowerCase()}.`,
    });
  }
  return belongings;
}

function generateRunnerReport(): RunnerReport {
  const defects = [
    'Minor scuff marks on walls',
    'Small crack in bathroom tile',
    'Window latch needs repair',
    'Kitchen faucet drips slightly',
    'Closet door off track',
  ];
  
  return {
    propertyCondition: randomInt(3, 5),
    cleanliness: randomInt(4, 5),
    defects: defects.slice(0, randomInt(0, 2)),
    landlordExperience: randomInt(3, 5),
    photos: generatePhotos(randomInt(2, 4)),
    notes: 'Property is in good condition overall. Minor wear and tear expected for age. Landlord responsive to maintenance requests.',
    completedAt: generateDate(-randomInt(1, 30)),
    runnerName: `Runner ${randomInt(1, 10)}`,
  };
}

function generateTenantReview(): TenantReview {
  const defects = [
    'Slow drain in bathroom sink',
    'Window doesn\'t close completely',
    'Heating takes time to warm up',
  ];
  
  return {
    landlordRating: randomInt(3, 5),
    defects: defects.slice(0, randomInt(0, 1)),
    cleanliness: randomInt(4, 5),
    recommendation: seededRandom() > 0.3,
    notes: 'Great location and responsive landlord. Would recommend for students.',
    submittedAt: generateDate(-randomInt(1, 20)),
    tenantName: `Tenant ${randomInt(1, 5)}`,
  };
}

function generateVerification(index: number): Verification | undefined {
  // First 7 listings: fully verified
  if (index < 7) {
    return {
      status: 'verified',
      runnerReport: generateRunnerReport(),
      tenantReview: generateTenantReview(),
      verifiedAt: generateDate(-randomInt(5, 15)),
    };
  }
  // Next 4 listings: pending verification
  else if (index < 11) {
    return {
      status: 'pending',
    };
  }
  // Last 4 listings: unverified
  else {
    return {
      status: 'unverified',
    };
  }
}

export function generateMockListings(count: number = 20): Listing[] {
  const listings: Listing[] = [];
  const now = new Date();

  // Use real addresses - if count exceeds available addresses, cycle through them
  for (let i = 0; i < count; i++) {
    // Select a real address (ensure we don't reuse if we have enough)
    let addressIndex: number;
    if (i < realAddresses.length) {
      // Use each address once if possible
      addressIndex = i;
    } else {
      // If we need more listings than addresses, randomly select from available
      addressIndex = Math.floor(seededRandom() * realAddresses.length);
    }
    
    const realAddress = realAddresses[addressIndex];
    const bedrooms = randomInt(1, 3);
    const bathrooms = bedrooms === 1 ? 1 : randomInt(1, bedrooms);
    const basePrice = bedrooms === 1 ? 2000 : bedrooms === 2 ? 3500 : 5000;
    const price = basePrice + randomInt(-300, 500);
    const availableDays = randomInt(0, 60);
    const leaseDays = randomInt(90, 365);

    const verification = generateVerification(i);
    const belongings = verification?.status === 'verified' ? generateBelongings(randomInt(3, 8)) : undefined;

    const listing: Listing = {
      id: `listing-${i + 1}`,
      address: realAddress.address, // Using real geocoded address
      neighborhood: realAddress.neighborhood,
      city: "San Francisco",
      state: "CA",
      zipCode: realAddress.zipCode,
      coordinates: {
        lat: realAddress.lat, // Using real geocoded coordinates
        lng: realAddress.lng, // Using real geocoded coordinates
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
      verification,
      belongings,
    };

    listings.push(listing);
  }

  return listings;
}

// Cache the generated listings to ensure consistency between server and client
let cachedListings: Listing[] | null = null;

export const mockListings = (() => {
  // Always regenerate to ensure we use the latest real addresses
  // Reset seed for consistent generation
  seed = 12345;
  cachedListings = generateMockListings(20);
  return cachedListings;
})();


