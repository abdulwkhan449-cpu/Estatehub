export type PropertyType = 'house' | 'apartment' | 'villa' | 'commercial' | 'condo' | 'townhouse';
export type PropertyStatus = 'sale' | 'rent';

export interface Agent {
  id: string;
  name: string;
  title: string;
  agency: string;
  photo: string;
  phone: string;
  email: string;
  experience: string; // e.g., '8 Years'
  rating: number; // e.g., 4.9
  reviewCount: number;
  specialties: string[];
  bio: string;
}

export interface NearbyPlace {
  name: string;
  distance: string;
  type: 'school' | 'hospital' | 'transit' | 'shopping' | 'park';
}

export interface FloorPlan {
  title: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqFt: number;
  image: string;
}

export interface Property {
  id: string;
  title: string;
  tagline?: string;
  price: number;
  period?: 'month' | 'year'; // for rentals
  status: PropertyStatus;
  type: PropertyType;
  featured?: boolean;
  isNew?: boolean;
  verified?: boolean;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  areaSqFt: number;
  pricePerSqFt: number;
  yearBuilt: number;
  description: string;
  features: string[];
  images: string[];
  virtualTourUrl?: string;
  lat: number;
  lng: number;
  agent: Agent;
  nearbyPlaces: NearbyPlace[];
  floorPlans: FloorPlan[];
  postedDate: string;
}

export interface FilterState {
  searchQuery: string;
  city: string;
  status: PropertyStatus | 'all';
  type: PropertyType | 'all';
  minPrice: number;
  maxPrice: number;
  minBedrooms: number | 'any';
  minBathrooms: number | 'any';
  minAreaSqFt: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'area-desc';
}

export interface MortgageCalcInputs {
  homePrice: number;
  downPaymentPercent: number;
  interestRate: number; // annual percentage e.g. 6.5
  loanTermYears: number; // e.g. 30
  propertyTaxRate: number; // annual % e.g. 1.2
  homeInsuranceAnnual: number; // $ annual
  hoaFeeMonthly: number; // $ monthly
}

export interface MortgageCalcResults {
  principalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
  totalLoanAmount: number;
  totalInterestPaid: number;
  downPaymentAmount: number;
}

export interface AIAdvisorPrompt {
  budget: number;
  preferredCity: string;
  propertyType: PropertyType | 'any';
  bedroomsNeeded: number;
  lifestyleTags: string[]; // e.g. ['Family Friendly', 'Close to Metro', 'Quiet Neighborhood', 'Modern Luxury']
  additionalNotes: string;
}

export interface AIAdvisorRecommendation {
  summary: string;
  topMatches: {
    propertyId: string;
    matchScore: number; // e.g. 95%
    reasoning: string;
  }[];
  lifestyleTips: string[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}
