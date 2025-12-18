export interface ListingFilters {
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  availableAfter?: string; // ISO date string
  verificationStatus?: 'verified' | 'pending' | 'unverified' | 'all';
}

export interface RunnerReport {
  propertyCondition: number; // 1-5
  cleanliness: number; // 1-5
  defects: string[];
  landlordExperience: number; // 1-5
  photos: string[];
  notes: string;
  completedAt: string; // ISO date string
  runnerName?: string;
}

export interface TenantReview {
  landlordRating: number; // 1-5
  defects: string[];
  cleanliness: number; // 1-5
  recommendation: boolean;
  notes: string;
  submittedAt: string; // ISO date string
  tenantName?: string;
}

export interface Verification {
  status: 'verified' | 'pending' | 'unverified';
  runnerReport?: RunnerReport;
  tenantReview?: TenantReview;
  verifiedAt?: string; // ISO date string
}

export interface Belonging {
  id: string;
  name: string;
  category: 'Furniture' | 'Electronics' | 'Appliances' | 'Decor' | 'Other';
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  price: number;
  negotiable: boolean;
  photos: string[];
  description?: string;
}

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
  verification?: Verification;
  belongings?: Belonging[];
  profile?: UserProfile;
}



export interface UserProfile {
  id: string;
  name: string;
  university: string;
  admissionYear: number;
  description: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    github?: string;
    twitter?: string;
    facebook?: string;
  };
  profileVerified: boolean;
  avatar?: string;
}
