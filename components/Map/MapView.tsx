"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Listing } from "@/types/listing";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker icon
const createCustomIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: ${isSelected ? "#3b82f6" : "#ef4444"};
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      cursor: pointer;
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

interface MapCenterProps {
  center: [number, number];
  zoom: number;
}

function MapCenter({ center, zoom }: MapCenterProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

interface MapViewProps {
  listings: Listing[];
  selectedListing?: Listing | null;
  onListingSelect?: (listing: Listing | null) => void;
}

export default function MapView({
  listings,
  selectedListing,
  onListingSelect,
}: MapViewProps) {
  // San Francisco center coordinates
  const sfCenter: [number, number] = [37.7749, -122.4194];
  const defaultZoom = 12;

  const center = selectedListing
    ? [selectedListing.coordinates.lat, selectedListing.coordinates.lng] as [number, number]
    : sfCenter;
  const zoom = selectedListing ? 15 : defaultZoom;

  return (
    <MapContainer
      center={sfCenter}
      zoom={defaultZoom}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapCenter center={center} zoom={zoom} />
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.coordinates.lat, listing.coordinates.lng]}
          icon={createCustomIcon(selectedListing?.id === listing.id)}
          eventHandlers={{
            click: () => {
              onListingSelect?.(listing);
            },
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-sm mb-1">{listing.address}</h3>
              <p className="text-xs text-gray-600 mb-1">{listing.neighborhood}</p>
              <p className="text-sm font-bold text-blue-600">
                ${listing.price.toLocaleString()}/mo
              </p>
              <p className="text-xs text-gray-600">
                {listing.bedrooms} bed{listing.bedrooms !== 1 ? "s" : ""} · {listing.bathrooms} bath{listing.bathrooms !== 1 ? "s" : ""}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
