"use client";

import { Listing } from "@/types/listing";
import { Calendar, MapPin, Bed, Bath } from "lucide-react";
import Link from "next/link";

interface ListingCardProps {
  listing: Listing;
  onClick?: () => void;
}

export default function ListingCard({ listing, onClick }: ListingCardProps) {
  const formatDate = (dateString: string) => {
    // Parse date string as local date (YYYY-MM-DD) to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Link
      href={`/listing/${listing.id}`}
      onClick={onClick}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer border border-gray-200"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
        <img
          src={listing.photos[0] || "/placeholder.jpg"}
          alt={listing.address}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-semibold text-gray-800">
          ${listing.price.toLocaleString()}/mo
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
          {listing.address}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{listing.neighborhood}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{listing.bedrooms} bed{listing.bedrooms !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{listing.bathrooms} bath{listing.bathrooms !== 1 ? "s" : ""}</span>
          </div>
          {listing.squareFeet && (
            <div className="text-gray-600">
              {listing.squareFeet.toLocaleString()} sqft
            </div>
          )}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Available {formatDate(listing.availableDate)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

