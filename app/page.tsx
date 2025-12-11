"use client";

import { useState, useMemo } from "react";
import MapView from "@/components/Map/MapView";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import { mockListings } from "@/lib/mockData";
import { Listing, ListingFilters } from "@/types/listing";

export default function Home() {
  const [filters, setFilters] = useState<ListingFilters>({});
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const filteredListings = useMemo(() => {
    let results = [...mockListings];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(
        (listing) =>
          listing.address.toLowerCase().includes(query) ||
          listing.neighborhood.toLowerCase().includes(query) ||
          listing.city.toLowerCase().includes(query)
      );
    }

    if (filters.minPrice !== undefined) {
      results = results.filter((listing) => listing.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter((listing) => listing.price <= filters.maxPrice!);
    }

    if (filters.bedrooms !== undefined) {
      results = results.filter((listing) => listing.bedrooms === filters.bedrooms);
    }

    if (filters.availableAfter) {
      const filterDate = new Date(filters.availableAfter);
      results = results.filter((listing) => {
        const availableDate = new Date(listing.availableDate);
        return availableDate >= filterDate;
      });
    }

    return results;
  }, [filters]);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">LeaseTakeover</h1>
          <p className="text-sm text-gray-600">Find your next sublet in San Francisco</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar - Listings */}
        <div className="w-full md:w-96 lg:w-[450px] bg-gray-50 overflow-y-auto border-r border-gray-200 p-4 flex flex-col">
          <div className="flex-shrink-0">
            <SearchBar onFilterChange={setFilters} />
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 mt-2">
            {filteredListings.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No listings found matching your criteria.
              </div>
            ) : (
              filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onClick={() => setSelectedListing(listing)}
                />
              ))
            )}
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="flex-1 relative min-h-[400px] md:min-h-0">
          <MapView
            listings={filteredListings}
            selectedListing={selectedListing}
            onListingSelect={setSelectedListing}
          />
        </div>
      </div>
    </div>
  );
}

