"use client";

import { Belonging } from "@/types/listing";
import { Tag } from "lucide-react";

interface BelongingItemProps {
  belonging: Belonging;
}

export default function BelongingItem({ belonging }: BelongingItemProps) {
  const conditionColors = {
    New: "bg-green-100 text-green-800",
    "Like New": "bg-blue-100 text-blue-800",
    Good: "bg-yellow-100 text-yellow-800",
    Fair: "bg-orange-100 text-orange-800",
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-32 w-full overflow-hidden bg-gray-100">
        <img
          src={belonging.photos[0] || "/placeholder.jpg"}
          alt={belonging.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/200x150?text=No+Image";
          }}
        />
        {belonging.negotiable && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            Negotiable
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{belonging.name}</h4>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-600">{belonging.category}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded ${conditionColors[belonging.condition]}`}>
            {belonging.condition}
          </span>
          <span className="font-bold text-sm text-gray-900">
            ${belonging.price}
          </span>
        </div>
        {belonging.description && (
          <p className="text-xs text-gray-500 mt-2 line-clamp-2">{belonging.description}</p>
        )}
      </div>
    </div>
  );
}

