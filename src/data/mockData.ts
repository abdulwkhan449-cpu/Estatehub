import { Agent, Property } from '../types';

export const SAMPLE_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Tariq Mehmood',
    title: 'Chief Executive & Luxury Villa Specialist',
    agency: 'EstateHub Premier Properties Lahore',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    phone: '+92 (300) 845-6789',
    email: 'tariq.mehmood@estatehub.pk',
    experience: '14 Years',
    rating: 4.9,
    reviewCount: 168,
    specialties: ['DHA Luxury Villas', 'Gulberg Penthouses', 'Commercial Plots'],
    bio: 'Tariq is one of Pakistan’s most trusted luxury real estate advisors with over 14 years of high-profile acquisitions across DHA Lahore, Gulberg, and Islamabad.',
  },
  {
    id: 'agent-2',
    name: 'Shahzaib Khan',
    title: 'Senior Seafront & Commercial Director',
    agency: 'EstateHub Luxury Karachi',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
    phone: '+92 (321) 987-6543',
    email: 'shahzaib.khan@estatehub.pk',
    experience: '11 Years',
    rating: 4.9,
    reviewCount: 142,
    specialties: ['Clifton Oceanfront', 'Emaar DHA Phase 8', 'High-Rise Towers'],
    bio: 'Shahzaib leads exclusive waterfront property transactions in Karachi, serving diplomats, corporate leaders, and expatriates seeking premier luxury estates.',
  },
  {
    id: 'agent-3',
    name: 'Aisha Rehman',
    title: 'Capital Sector Residential Specialist',
    agency: 'EstateHub Fine Estates Islamabad',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    phone: '+92 (333) 555-1234',
    email: 'aisha.rehman@estatehub.pk',
    experience: '9 Years',
    rating: 4.8,
    reviewCount: 118,
    specialties: ['Sector E-7 & F-6 Mansions', 'Margalla View Villas', 'Foreign Embassy Leases'],
    bio: 'Aisha specializes in Islamabad’s premier sectors E-7, F-6, and F-7, guiding overseas Pakistanis and diplomatic missions to verified high-value residences.',
  },
  {
    id: 'agent-4',
    name: 'Hamza Malik',
    title: 'Architectural & Farmhouse Consultant',
    agency: 'EstateHub Signature Living',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    phone: '+92 (345) 678-9012',
    email: 'hamza.malik@estatehub.pk',
    experience: '12 Years',
    rating: 5.0,
    reviewCount: 195,
    specialties: ['Luxury Farmhouses', 'Smart Eco-Villas', 'Bahria Town Golf Estates'],
    bio: 'Hamza represents bespoke modern farmhouses and sustainable estates across Bedian Road Lahore, Naval Anchorage, and Bahria Golf City.',
  },
  {
    id: 'agent-5',
    name: 'Zoya Chaudhry',
    title: 'Penthouse & Serviced Suite Advisor',
    agency: 'EstateHub Elite Apartments',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    phone: '+92 (312) 444-8899',
    email: 'zoya.chaudhry@estatehub.pk',
    experience: '8 Years',
    rating: 4.9,
    reviewCount: 104,
    specialties: ['MM Alam Serviced Apartments', 'Skyline Penthouses', 'Gated Community Duplexes'],
    bio: 'Zoya is passionate about ultra-modern urban apartments, high-end interior finishes, and delivering concierge-level service for discerning buyers.',
  }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-101',
    title: 'The Margalla Horizon Glass Villa',
    tagline: 'Ultra-modern glass architectural masterpiece with panoramic Margalla Hills views',
    price: 350000000,
    status: 'sale',
    type: 'villa',
    featured: true,
    isNew: true,
    verified: true,
    address: 'Sector E-7, Hillside Road',
    city: 'Islamabad',
    state: 'Federal Capital',
    zipCode: '44000',
    country: 'Pakistan',
    bedrooms: 6,
    bathrooms: 7,
    garages: 4,
    areaSqFt: 7200,
    pricePerSqFt: 48611,
    yearBuilt: 2024,
    description: 'An architectural milestone overlooking the Margalla Hills sanctuary. Features 2 Kanal plot size, floor-to-ceiling double-glazed thermal walls, temperature-controlled indoor pool, private elevator, imported Italian kitchen, smart security automation, and 50kW solar system.',
    features: [
      'Margalla Hills View',
      'Temperature Controlled Pool',
      'Smart Home Automation',
      '50kW Rooftop Solar System',
      'Private Elevator',
      'German Double-Glazed Glass',
      'EV Charging Station',
      '24/7 Guard House & CCTV'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200'
    ],
    virtualTourUrl: 'https://my.matterport.com/show/?m=example-margalla-horizon',
    lat: 33.7380,
    lng: 73.0500,
    agent: SAMPLE_AGENTS[2],
    nearbyPlaces: [
      { name: 'F-7 Markaz Shopping & Dining', distance: '1.2 km', type: 'shopping' },
      { name: 'Shifa International Hospital', distance: '5.5 km', type: 'hospital' },
      { name: 'Islamabad International School', distance: '2.0 km', type: 'school' },
      { name: 'Metro Bus Station', distance: '1.8 km', type: 'transit' }
    ],
    floorPlans: [
      {
        title: 'Ground Floor Grand Lounge & Courtyard',
        bedrooms: 2,
        bathrooms: 3,
        sizeSqFt: 3800,
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800'
      },
      {
        title: 'First Floor Master Suites & Terrace',
        bedrooms: 4,
        bathrooms: 4,
        sizeSqFt: 3400,
        image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80&w=800'
      }
    ],
    postedDate: '2026-07-20'
  },
  {
    id: 'prop-102',
    title: 'Clifton Seafront Penthouse at Oceanfront',
    tagline: 'Luxury penthouse with private high-speed lift and 360-degree Arabian Sea views',
    price: 650000,
    period: 'month',
    status: 'rent',
    type: 'apartment',
    featured: true,
    isNew: false,
    verified: true,
    address: 'Block 4, Clifton Beach Promenade',
    city: 'Karachi',
    state: 'Sindh',
    zipCode: '75600',
    country: 'Pakistan',
    bedrooms: 4,
    bathrooms: 4.5,
    garages: 2,
    areaSqFt: 4100,
    pricePerSqFt: 158,
    yearBuilt: 2023,
    description: 'Experience elite seafront living in Clifton. Features 12-foot high ceilings, Spanish porcelain tiling, designer kitchen with Sub-Zero appliances, Jacuzzi suite, wrapping sea-facing loggia terrace, and 100% backup power generator.',
    features: [
      'Unobstructed Arabian Sea View',
      'Private Keycard Elevator',
      '24/7 Full Power Backup',
      'Wrap-Around Sea Deck',
      'State-of-the-Art Gym & Sauna',
      'Servant Quarters Included',
      'Three Covered Parking Spots'
    ],
    images: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200'
    ],
    lat: 24.8138,
    lng: 67.0300,
    agent: SAMPLE_AGENTS[1],
    nearbyPlaces: [
      { name: 'Dolmen Mall Clifton', distance: '0.5 km', type: 'shopping' },
      { name: 'South City Hospital', distance: '1.2 km', type: 'hospital' },
      { name: 'Clifton Beach Park', distance: '0.2 km', type: 'park' }
    ],
    floorPlans: [
      {
        title: 'Penthouse Full Floor Layout',
        bedrooms: 4,
        bathrooms: 4.5,
        sizeSqFt: 4100,
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800'
      }
    ],
    postedDate: '2026-07-25'
  },
  {
    id: 'prop-103',
    title: 'DHA Phase 6 Regal Mansion',
    tagline: 'Brand new 2-Kanal Spanish designer villa in prime DHA Phase 6',
    price: 185000000,
    status: 'sale',
    type: 'villa',
    featured: true,
    isNew: true,
    verified: true,
    address: 'Sector K, Main Boulevard DHA Phase 6',
    city: 'Lahore',
    state: 'Punjab',
    zipCode: '54792',
    country: 'Pakistan',
    bedrooms: 5,
    bathrooms: 6,
    garages: 3,
    areaSqFt: 9000,
    pricePerSqFt: 20555,
    yearBuilt: 2024,
    description: 'A masterpiece 2 Kanal designer bungalow in DHA Phase 6 Lahore. Built with imported Turkish marble, double height lobby chandelier entrance, basement home cinema, heated plunge pool, lush manicured garden, and 2 servant rooms.',
    features: [
      'Basement Home Cinema',
      'Heated Plunge Pool',
      'Turkish Marble Flooring',
      'Double Height Grand Lobby',
      'Solar Net Metering System',
      'CCTV & Gated Entrance'
    ],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80&w=1200'
    ],
    lat: 31.4700,
    lng: 74.4000,
    agent: SAMPLE_AGENTS[0],
    nearbyPlaces: [
      { name: 'DHA Phase 6 Commercial Avenue', distance: '0.8 km', type: 'shopping' },
      { name: 'LUMS University', distance: '3.2 km', type: 'school' },
      { name: 'National Hospital DHA', distance: '2.5 km', type: 'hospital' }
    ],
    floorPlans: [
      {
        title: 'Ground Floor & Basement Layout',
        bedrooms: 2,
        bathrooms: 3,
        sizeSqFt: 5000,
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800'
      }
    ],
    postedDate: '2026-07-22'
  },
  {
    id: 'prop-104',
    title: 'Bahria Town Golf City Luxury Villa',
    tagline: 'Scenic 1-Kanal villa adjacent to 18-hole championship golf course',
    price: 95000000,
    status: 'sale',
    type: 'house',
    featured: false,
    isNew: false,
    verified: true,
    address: 'Golf City Sector B, Bahria Town',
    city: 'Rawalpindi',
    state: 'Punjab',
    zipCode: '46000',
    country: 'Pakistan',
    bedrooms: 5,
    bathrooms: 5,
    garages: 2,
    areaSqFt: 4500,
    pricePerSqFt: 21111,
    yearBuilt: 2023,
    description: 'Nestled right next to the lush greens of Bahria Golf Club. Features open-plan living, Grohe sanitary fittings, tempered glass balconies, roof garden lounge, automated garage gate, and solar backup system.',
    features: [
      'Direct Golf Course View',
      'Rooftop Garden Lounge',
      'Grohe Sanitaryware',
      'Solid Ash Wood Doors',
      '24/7 Bahria Security Patrol',
      'Uninterrupted Power Supply'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
    ],
    lat: 33.5200,
    lng: 73.1100,
    agent: SAMPLE_AGENTS[3],
    nearbyPlaces: [
      { name: 'Bahria International Hospital', distance: '1.5 km', type: 'hospital' },
      { name: 'Roots Millennium School', distance: '1.0 km', type: 'school' }
    ],
    floorPlans: [
      {
        title: 'Ground & Upper Floor Plan',
        bedrooms: 5,
        bathrooms: 5,
        sizeSqFt: 4500,
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800'
      }
    ],
    postedDate: '2026-07-15'
  },
  {
    id: 'prop-105',
    title: 'MM Alam Serviced Executive Suite',
    tagline: 'Sleek ultra-luxury luxury apartment in the heart of Gulberg III',
    price: 380000,
    period: 'month',
    status: 'rent',
    type: 'apartment',
    featured: false,
    isNew: true,
    verified: true,
    address: 'MM Alam Road, Gulberg III',
    city: 'Lahore',
    state: 'Punjab',
    zipCode: '54660',
    country: 'Pakistan',
    bedrooms: 2,
    bathrooms: 2,
    garages: 1,
    areaSqFt: 1850,
    pricePerSqFt: 205,
    yearBuilt: 2024,
    description: 'Boutique luxury living surrounded by Lahore’s top fine dining and fashion boulevards. Fully furnished with high-end Italian furniture, keyless access, infinity rooftop pool access, and daily concierge service.',
    features: [
      'Fully Furnished Designer Suite',
      'MM Alam Boulevard View',
      'Rooftop Pool & Cafe',
      'Keyless Smart Door Lock',
      'Underground Dedicated Parking',
      '24/7 Power Backup'
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200'
    ],
    lat: 31.5100,
    lng: 74.3500,
    agent: SAMPLE_AGENTS[4],
    nearbyPlaces: [
      { name: 'MM Alam Road Shopping', distance: '0.1 km', type: 'shopping' },
      { name: 'Liberty Market', distance: '0.5 km', type: 'shopping' },
      { name: 'Gaddafi Stadium Park', distance: '1.2 km', type: 'park' }
    ],
    floorPlans: [],
    postedDate: '2026-07-28'
  },
  {
    id: 'prop-106',
    title: 'Blue Area Corporate Financial Tower',
    tagline: 'Turnkey Grade-A office floor with panoramic Jinnah Avenue views',
    price: 280000000,
    status: 'sale',
    type: 'commercial',
    featured: false,
    isNew: false,
    verified: true,
    address: 'Jinnah Avenue, Blue Area',
    city: 'Islamabad',
    state: 'Federal Capital',
    zipCode: '44000',
    country: 'Pakistan',
    bedrooms: 0,
    bathrooms: 4,
    garages: 8,
    areaSqFt: 6500,
    pricePerSqFt: 43076,
    yearBuilt: 2022,
    description: 'Premier Blue Area commercial floor ideal for corporate headquarters or multinational tech firms. High-speed fiber optic backbone, central HVAC, executive boardroom, high-level biometric security, and dedicated basement parking.',
    features: [
      'High Speed Fiber Backbone',
      'Central Chilled Water HVAC',
      'Biometric Access Control',
      'Executive Reserved Parking',
      '24/7 Security & Fire System'
    ],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200'
    ],
    lat: 33.7100,
    lng: 73.0600,
    agent: SAMPLE_AGENTS[2],
    nearbyPlaces: [
      { name: 'Stock Exchange Station', distance: '0.2 km', type: 'transit' },
      { name: 'Centaurus Mall', distance: '1.0 km', type: 'shopping' }
    ],
    floorPlans: [],
    postedDate: '2026-07-10'
  },
  {
    id: 'prop-107',
    title: 'Bedian Green Resort Farmhouse',
    tagline: 'Exclusive 4-Kanal private luxury resort farmhouse with swimming pool',
    price: 145000000,
    status: 'sale',
    type: 'house',
    featured: true,
    isNew: false,
    verified: true,
    address: 'Bedian Green Farmhouse Enclave',
    city: 'Lahore',
    state: 'Punjab',
    zipCode: '54000',
    country: 'Pakistan',
    bedrooms: 4,
    bathrooms: 5,
    garages: 4,
    areaSqFt: 6000,
    pricePerSqFt: 24166,
    yearBuilt: 2022,
    description: 'Serene lush green retreat just 15 minutes from DHA Phase 5. Features 4 Kanal sprawling lawns, Olympic size outdoor swimming pool, barbecue gazebo, private cricket pitch, horse stables, and full solar backup.',
    features: [
      '4 Kanal Private Land',
      'Olympic Swimming Pool',
      'Barbecue Gazebo Pavilion',
      'Private Cricket Net Pitch',
      'Solar Off-Grid Capability',
      'Fruit Orchards & Palm Trees'
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
    ],
    lat: 31.4200,
    lng: 74.4500,
    agent: SAMPLE_AGENTS[3],
    nearbyPlaces: [
      { name: 'DHA Phase 5 Ring Road Interchange', distance: '4.0 km', type: 'transit' },
      { name: 'Bedian Country Club', distance: '1.5 km', type: 'park' }
    ],
    floorPlans: [],
    postedDate: '2026-07-18'
  },
  {
    id: 'prop-108',
    title: 'Emaar Oceanfront Pearl Residence',
    tagline: 'Waterfront luxury condo with floor-to-ceiling glass and marina berth',
    price: 450000,
    period: 'month',
    status: 'rent',
    type: 'condo',
    featured: false,
    isNew: true,
    verified: true,
    address: 'Crescent Bay, Emaar DHA Phase 8',
    city: 'Karachi',
    state: 'Sindh',
    zipCode: '75500',
    country: 'Pakistan',
    bedrooms: 3,
    bathrooms: 3,
    garages: 2,
    areaSqFt: 2400,
    pricePerSqFt: 187,
    yearBuilt: 2024,
    description: 'World-class coastal living in Emaar Crescent Bay DHA Phase 8 Karachi. Features panoramic ocean vistas, infinity pools, private marina slip access, central air conditioning, and top-tier Emaar security.',
    features: [
      'Arabian Gulf Ocean Views',
      'Infinity Oceanfront Pool',
      'Valet & Concierge Service',
      'Private Marina Access',
      'Fitness & Yoga Club'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'
    ],
    lat: 24.7800,
    lng: 67.0600,
    agent: SAMPLE_AGENTS[1],
    nearbyPlaces: [
      { name: 'DHA Golf & Country Club', distance: '1.2 km', type: 'park' },
      { name: 'South City Hospital Phase 8', distance: '3.0 km', type: 'hospital' }
    ],
    floorPlans: [],
    postedDate: '2026-07-27'
  }
];

export const FEATURED_CATEGORIES = [
  { id: 'villa', name: 'Luxury Mansions & Villas', icon: 'Castle', count: '142 Properties', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600' },
  { id: 'house', name: 'Designer Houses & Farmhouses', icon: 'Home', count: '215 Properties', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600' },
  { id: 'apartment', name: 'Penthouses & Apartments', icon: 'Building2', count: '320 Residences', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600' },
  { id: 'commercial', name: 'Commercial & Office Towers', icon: 'Briefcase', count: '78 Plaza Spaces', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600' },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Chaudhry Kamran Akram',
    role: 'Villa Owner in DHA Lahore',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    content: 'EstateHub made acquiring our 2-Kanal DHA Phase 6 villa remarkably smooth. The AI Matcher understood our family needs perfectly, and Tariq Mehmood handled every verification with complete transparency.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Fatima Zafar',
    role: 'Overseas Pakistani Investor (UK)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    content: 'Living in London, buying real estate in Islamabad used to feel daunting. EstateHub’s verified property reports and virtual tours allowed me to confidently invest in E-7 and Clifton penthouses.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Dr. Bilal Farooq',
    role: 'Clifton Oceanfront Resident',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    content: 'Saved properties, side-by-side PKR price comparison, and direct agent connection made finding our seafront residence effortless. Truly Pakistan’s gold standard real estate platform.',
    rating: 5,
  }
];

export const STATS_COUNTER = [
  { label: 'Properties Verified', value: '2,850+' },
  { label: 'Crores Transacted', value: 'Rs. 450+ Cr' },
  { label: 'Certified Agents', value: '140+' },
  { label: 'Cities Covered', value: '18+' },
];
