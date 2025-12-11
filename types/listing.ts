export interface Listing {
  id: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet?: number;
  availableDate: string; // ISO date string
  leaseEndDate: string; // ISO date string
  description: string;
  photos: string[];
  amenities: string[];
  contactInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  createdAt: string; // ISO date string
}

export interface ListingFilters {
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  availableAfter?: string; // ISO date string
}

