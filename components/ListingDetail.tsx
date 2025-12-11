"use client";

import { Listing } from "@/types/listing";
import { Calendar, MapPin, Bed, Bath, Square, ArrowLeft, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ListingDetailProps {
  listing: Listing;
}

export default function ListingDetail({ listing }: ListingDetailProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const formatDate = (dateString: string) => {
    // Parse date string as local date (YYYY-MM-DD) to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Map
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Photo Gallery */}
        <div className="relative h-96 w-full bg-gray-200">
          <img
            src={listing.photos[selectedPhotoIndex] || "/placeholder.jpg"}
            alt={listing.address}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/800x600?text=No+Image";
            }}
          />
          {listing.photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {listing.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhotoIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === selectedPhotoIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {listing.photos.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto">
            {listing.photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 ${
                  index === selectedPhotoIndex
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              >
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {listing.address}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin className="w-5 h-5" />
              <span>
                {listing.neighborhood}, {listing.city}, {listing.state} {listing.zipCode}
              </span>
            </div>
            <div className="text-4xl font-bold text-blue-600">
              ${listing.price.toLocaleString()}/mo
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-sm text-gray-600">Bedrooms</div>
                <div className="font-semibold">{listing.bedrooms}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-sm text-gray-600">Bathrooms</div>
                <div className="font-semibold">{listing.bathrooms}</div>
              </div>
            </div>
            {listing.squareFeet && (
              <div className="flex items-center gap-2">
                <Square className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-600">Square Feet</div>
                  <div className="font-semibold">{listing.squareFeet.toLocaleString()}</div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-sm text-gray-600">Available</div>
                <div className="font-semibold">{formatDate(listing.availableDate)}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{listing.description}</p>
          </div>

          {/* Amenities */}
          {listing.amenities.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {listing.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Lease Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Lease Information</h2>
            <div className="space-y-1 text-gray-700">
              <div>
                <span className="font-medium">Available:</span> {formatDate(listing.availableDate)}
              </div>
              <div>
                <span className="font-medium">Lease Ends:</span> {formatDate(listing.leaseEndDate)}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            {!showContactInfo ? (
              <button
                onClick={() => setShowContactInfo(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Show Contact Information
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="font-semibold">{listing.contactInfo.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-5 h-5" />
                  <a
                    href={`mailto:${listing.contactInfo.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {listing.contactInfo.email}
                  </a>
                </div>
                {listing.contactInfo.phone && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-5 h-5" />
                    <a
                      href={`tel:${listing.contactInfo.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {listing.contactInfo.phone}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

