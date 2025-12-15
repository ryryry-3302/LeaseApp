"use client";

import { useEffect, useState } from "react";
import { Listing } from "@/types/listing";

// Lazy load leaflet only on client side
let L: any;
let MapContainer: any;
let TileLayer: any;
let Marker: any;
let Popup: any;
let useMap: any;

// Leaflet icon fix - will be applied in useEffect to avoid SSR issues
let iconFixApplied = false;

// Custom marker icon - only create when on client
const createCustomIcon = (isSelected: boolean) => {
  if (typeof window === 'undefined' || !L) {
    // Return a placeholder during SSR or before leaflet loads
    return null;
  }
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
  useMapHook: any;
}

function MapCenter({ center, zoom, useMapHook }: MapCenterProps) {
  const map = useMapHook();
  useEffect(() => {
    if (map) {
      map.setView(center, zoom);
    }
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
  const [isClient, setIsClient] = useState(false);

  // Lazy load leaflet and react-leaflet only on client
  useEffect(() => {
    if (typeof window !== 'undefined' && !isClient) {
      // Import CSS first (side effect, doesn't return a module)
      import("leaflet/dist/leaflet.css").then(() => {
        // Then import leaflet and react-leaflet
        return Promise.all([
          import("leaflet"),
          import("react-leaflet")
        ]);
      }).then(([leafletModule, reactLeafletModule]) => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/ae696772-9808-445d-b70f-82ba076325ac',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MapView.tsx:useEffect',message:'Leaflet modules loaded',data:{hasLeaflet:!!leafletModule,hasReactLeaflet:!!reactLeafletModule,leafletKeys:Object.keys(leafletModule)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        
        // Leaflet exports as default
        L = leafletModule.default || leafletModule;
        const { MapContainer: MC, TileLayer: TL, Marker: M, Popup: P, useMap: UM } = reactLeafletModule;
        MapContainer = MC;
        TileLayer = TL;
        Marker = M;
        Popup = P;
        useMap = UM;
        
        // Fix for default marker icons in Next.js - only if L is defined
        if (L && !iconFixApplied && L.Icon && L.Icon.Default) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/ae696772-9808-445d-b70f-82ba076325ac',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MapView.tsx:useEffect',message:'Applying Leaflet icon fix on client',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
          // #endregion
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
          });
          iconFixApplied = true;
        }
        setIsClient(true);
      }).catch((error) => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/ae696772-9808-445d-b70f-82ba076325ac',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MapView.tsx:useEffect',message:'Error loading leaflet',data:{error:error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        console.error("Failed to load leaflet:", error);
      });
    }
  }, [isClient]);

  // Center map on selected listing
  useEffect(() => {
    if (selectedListing) {
      // This will be handled by MapCenter component
    }
  }, [selectedListing]);

  // Don't render map until client-side and leaflet is loaded
  if (!isClient || !MapContainer || !L) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

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
      {useMap && <MapCenter center={center} zoom={zoom} useMapHook={useMap} />}
      {listings.map((listing) => {
        // #region agent log
        if (typeof window !== 'undefined') {
          fetch('http://127.0.0.1:7242/ingest/ae696772-9808-445d-b70f-82ba076325ac',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MapView.tsx:102',message:'Marker coordinates',data:{listingId:listing.id,address:listing.address,lat:listing.coordinates.lat,lng:listing.coordinates.lng,position:[listing.coordinates.lat,listing.coordinates.lng]},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        }
        // #endregion
        // Leaflet expects [lat, lng] format
        const markerPosition: [number, number] = [listing.coordinates.lat, listing.coordinates.lng];
        // #region agent log
        if (typeof window !== 'undefined') {
          fetch('http://127.0.0.1:7242/ingest/ae696772-9808-445d-b70f-82ba076325ac',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MapView.tsx:111',message:'Marker position before render',data:{listingId:listing.id,lat:listing.coordinates.lat,lng:listing.coordinates.lng,position:markerPosition,sfCenter:[37.7749,-122.4194]},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        }
        // #endregion
        return (
        <Marker
          key={listing.id}
          position={markerPosition}
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
        );
      })}
    </MapContainer>
  );
}
