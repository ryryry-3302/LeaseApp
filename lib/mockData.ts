import { Listing, Verification, RunnerReport, TenantReview, Belonging, UserProfile } from "@/types/listing";

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

// 100 real apartment/interior photos from Unsplash - verified working URLs
const apartmentPhotos = [
  // Living rooms (20)
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566752734-2a0cd66c42b9?w=800&h=600&fit=crop',
  // Bedrooms (20)
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f08af?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1616627561839-074385245ff6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560185127-6a2a9c4a0f67?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560448075-57d0285fc803?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop',
  // Kitchens (20)
  'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556909190-6a5e5cf0a2b4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556909153-1329be1a8c5c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556909114-d0c4c3c4f6b2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556909114-d0c4c3c4f6c4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566752421-6bd6ca86f230?w=800&h=600&fit=crop',
  // Bathrooms (20)
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566752447-f4e219736894?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566752227-e9b06481ddd2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1604709177595-ee0c90845e42?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566752227-e9b06481ddd2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566752734-2a0cd66c42b9?w=800&h=600&fit=crop',
  // Additional spaces (20)
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1493809842364-78817add7ff3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556911220-e15b29be4ba4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556912173-6719d5c3cc0a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560440021-33f9b867899d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560449752-3fd4bdbe7df0?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560448075-57d0285fc803?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560185127-6a2a9c4a0f67?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800&h=600&fit=crop',
];

// Track used cover photo indices globally for unique covers across all listings
let usedCoverIndices = new Set<number>();

function generatePhotos(count: number, listingIndex?: number): string[] {
  const photos: string[] = [];
  const usedIndices = new Set<number>();
  
  // Assign unique cover photo for each listing
  if (listingIndex !== undefined) {
    // Use listing index directly to ensure unique cover photos (first 20 listings get photos 0-19)
    const coverIndex = listingIndex % apartmentPhotos.length;
    photos.push(apartmentPhotos[coverIndex]);
    usedIndices.add(coverIndex);
    usedCoverIndices.add(coverIndex);
    count--;
  }
  
  // Generate remaining photos for gallery
  for (let i = 0; i < count; i++) {
    let photoIndex: number;
    let attempts = 0;
    do {
      photoIndex = Math.floor(seededRandom() * apartmentPhotos.length);
      attempts++;
    } while (usedIndices.has(photoIndex) && attempts < 50);
    
    usedIndices.add(photoIndex);
    photos.push(apartmentPhotos[photoIndex]);
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

function generateProfile(index: number): UserProfile {
  const universities = [
    "UC Berkeley",
    "Stanford University",
    "San Francisco State University",
    "UC San Francisco",
    "University of San Francisco",
    "San Jose State University",
    "Santa Clara University",
    "Mills College",
    "Academy of Art University",
    "California State University East Bay",
  ];

  const firstNames = [
    "Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Quinn",
    "Sam", "Jamie", "Dakota", "Cameron", "Blake", "Drew", "Emery", "Finley",
    "Hayden", "Logan", "Parker", "Reese", "Sage", "Skylar", "Tyler", "Zion"
  ];

  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas", "Taylor",
    "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris", "Sanchez"
  ];

  const majors = [
    "Computer Science", "Business Administration", "Engineering", "Psychology",
    "Biology", "Economics", "Political Science", "Communications", "Art & Design",
    "Mathematics", "Environmental Science", "Public Health", "Education", "Sociology"
  ];

  const interests = [
    "hiking", "photography", "cooking", "music", "reading", "traveling", "yoga",
    "cycling", "volunteering", "art", "gaming", "fitness", "writing", "dancing"
  ];

  const firstName = randomElement(firstNames);
  const lastName = randomElement(lastNames);
  const name = `${firstName} ${lastName}`;
  const university = randomElement(universities);
  const admissionYear = randomInt(2020, 2025);
  const major = randomElement(majors);
  const year = new Date().getFullYear();
  const currentYear = admissionYear <= year ? year : admissionYear;
  const yearInSchool = currentYear - admissionYear + 1;
  const yearLabel = yearInSchool === 1 ? "Freshman" : yearInSchool === 2 ? "Sophomore" : 
                   yearInSchool === 3 ? "Junior" : yearInSchool === 4 ? "Senior" : "Graduate";
  const interest = randomElement(interests);
  
  const descriptions = [
    `${yearLabel} ${major} student at ${university}. Love ${interest} and exploring SF. Looking for a roommate or sublet opportunity.`,
    `Student at ${university} studying ${major}. Originally from the Bay Area. Enjoy ${interest} and meeting new people.`,
    `${yearLabel} at ${university} majoring in ${major}. Intern in SF this summer. Clean, responsible, and easy-going.`,
    `Graduate student at ${university} in ${major}. Moving to SF for internship. Quiet, respectful, and organized.`,
    `Undergraduate at ${university} studying ${major}. Love ${interest} and the SF food scene. Looking for a place near campus.`,
    `${yearLabel} ${major} student at ${university}. Active in student organizations. Need housing for the semester.`,
  ];

  const description = randomElement(descriptions);
  
  // Generate social links - some profiles have all, some have partial
  const hasLinkedIn = seededRandom() > 0.2;
  const hasInstagram = seededRandom() > 0.3;
  const hasGitHub = seededRandom() > 0.4;
  const hasTwitter = seededRandom() > 0.5;
  const hasFacebook = seededRandom() > 0.6;

  const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${admissionYear}`;
  
  const socialLinks: UserProfile['socialLinks'] = {};
  if (hasLinkedIn) {
    socialLinks.linkedin = `https://linkedin.com/in/${username}`;
  }
  if (hasInstagram) {
    socialLinks.instagram = `https://instagram.com/${username}`;
  }
  if (hasGitHub) {
    socialLinks.github = `https://github.com/${username}`;
  }
  if (hasTwitter) {
    socialLinks.twitter = `https://twitter.com/${username}`;
  }
  if (hasFacebook) {
    socialLinks.facebook = `https://facebook.com/${username}`;
  }

  // About 60% verified
  const profileVerified = seededRandom() > 0.4;

  // Generate avatar initials
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

  return {
    id: `profile-${index + 1}`,
    name,
    university,
    admissionYear,
    description,
    socialLinks,
    profileVerified,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=3b82f6&color=fff&size=128`,
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
    const profile = generateProfile(i);

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
      photos: generatePhotos(randomInt(3, 6), i),
      amenities: amenities.slice(0, randomInt(3, 6)).sort(),
      contactInfo: {
        name: profile.name,
        email: `contact${i + 1}@example.com`,
        phone: `415-${randomInt(100, 999)}-${randomInt(1000, 9999)}`,
      },
      createdAt: now.toISOString(),
      verification,
      belongings,
      profile,
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


