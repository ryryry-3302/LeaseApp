"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { ListingFilters } from "@/types/listing";

interface SearchBarProps {
  onFilterChange: (filters: ListingFilters) => void;
}

export default function SearchBar({ onFilterChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [availableAfter, setAvailableAfter] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters({ searchQuery: query });
  };

  const applyFilters = (overrideFilters?: Partial<ListingFilters>) => {
    const filters: ListingFilters = {
      searchQuery: overrideFilters?.searchQuery ?? (searchQuery || undefined),
      minPrice: overrideFilters?.minPrice ?? (minPrice ? parseInt(minPrice) : undefined),
      maxPrice: overrideFilters?.maxPrice ?? (maxPrice ? parseInt(maxPrice) : undefined),
      bedrooms: overrideFilters?.bedrooms ?? (bedrooms ? parseInt(bedrooms) : undefined),
      availableAfter: overrideFilters?.availableAfter ?? (availableAfter || undefined),
    };
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setAvailableAfter("");
    onFilterChange({});
  };

  const hasActiveFilters =
    minPrice || maxPrice || bedrooms || availableAfter || searchQuery;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by address or neighborhood..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
            showFilters || hasActiveFilters
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Clear
          </button>
        )}
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Price ($)
            </label>
            <input
              type="number"
              placeholder="e.g. 2000"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                applyFilters({ minPrice: e.target.value ? parseInt(e.target.value) : undefined });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Price ($)
            </label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                applyFilters({ maxPrice: e.target.value ? parseInt(e.target.value) : undefined });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bedrooms
            </label>
            <select
              value={bedrooms}
              onChange={(e) => {
                setBedrooms(e.target.value);
                applyFilters({ bedrooms: e.target.value ? parseInt(e.target.value) : undefined });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available After
            </label>
            <input
              type="date"
              value={availableAfter}
              onChange={(e) => {
                setAvailableAfter(e.target.value);
                applyFilters({ availableAfter: e.target.value || undefined });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}

