"use client";

import { useState, useMemo } from "react";
import MapView from "@/components/Map/MapView";
import ListingCard from "@/components/ListingCard";
import ChatBot from "@/components/ChatBot";
import SearchBar from "@/components/SearchBar";
import { mockListings } from "@/lib/mockData";
import { Listing, ListingFilters } from "@/types/listing";
import Link from "next/link";

export default function BrowsePage() {
  const [filters, setFilters] = useState<ListingFilters>({});
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showChat, setShowChat] = useState(false);

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
    <div className="h-screen flex flex-col relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-white to-gray-50 shadow-md border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Leasy
                </h1>
                <p className="text-xs text-gray-500 font-medium">Verified Lease Takeover Platform</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Link 
                href="/browse" 
                className="px-4 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm transition-all hover:shadow-md"
              >
                Browse Listings
              </Link>
              <Link 
                href="/list" 
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors rounded-md"
              >
                List Your Lease
              </Link>
              <button
                onClick={() => setShowChat(!showChat)}
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-md shadow-sm transition-all hover:shadow-md flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat with AI
              </button>
            </nav>
          </div>
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

      {/* Chat Window */}
      {showChat && (
        <div className="fixed top-20 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl z-50 border border-gray-200 overflow-hidden">
          <ChatBot onListingSelect={setSelectedListing} onClose={() => setShowChat(false)} />
        </div>
      )}
    </div>
  );
}

