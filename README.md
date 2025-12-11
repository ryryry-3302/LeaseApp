# LeaseTakeover - Lease Subletting Platform

A Zillow-style lease takeover platform for students, interns, and exchange students looking for sublets in San Francisco.

## Features

- 🗺️ Interactive map view with Mapbox integration
- 🔍 Search and filter listings by price, bedrooms, availability date
- 📱 Responsive design for mobile and desktop
- 🏠 Detailed listing pages with photo galleries
- 📍 15+ mock listings in popular SF neighborhoods (SOMA, Mission, etc.)

## Tech Stack

- **Next.js 14** (App Router) with TypeScript
- **Mapbox GL JS** for interactive maps
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Mapbox access token (optional - uses demo token by default):
   - Get a free token at https://account.mapbox.com/access-tokens/
   - Create a `.env.local` file:
   ```
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here
   ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
LeaseApp/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home page with map and listings
│   ├── listing/[id]/      # Individual listing detail pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Map/              # Map components
│   ├── ListingCard.tsx   # Listing card component
│   ├── SearchBar.tsx     # Search and filters
│   └── ListingDetail.tsx # Full listing view
├── lib/                   # Utilities
│   ├── mapbox.ts         # Mapbox configuration
│   └── mockData.ts       # Mock listing data
└── types/                 # TypeScript types
    └── listing.ts        # Listing interfaces
```

## Mock Data

The app uses mock data with 15 listings across San Francisco neighborhoods. All data is generated programmatically and includes:
- Realistic addresses and coordinates
- Price ranges ($1,700 - $5,500/month)
- Bedroom/bathroom counts
- Availability dates
- Photos (via Picsum placeholder service)

## Building for Production

```bash
npm run build
npm start
```

## Notes

- Mapbox free tier: 50,000 map loads/month
- All listing data is mock - no backend/database required for MVP
- Designed for San Francisco area (can be extended to other cities)