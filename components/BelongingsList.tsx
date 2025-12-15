"use client";

import { Belonging } from "@/types/listing";
import BelongingItem from "./BelongingItem";
import { Package } from "lucide-react";

interface BelongingsListProps {
  belongings?: Belonging[];
}

export default function BelongingsList({ belongings }: BelongingsListProps) {
  if (!belongings || belongings.length === 0) {
    return null;
  }

  const totalValue = belongings.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-gray-600" />
          <h2 className="text-2xl font-semibold">Belongings Included</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-xl font-bold text-blue-600">${totalValue.toLocaleString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {belongings.map((belonging) => (
          <BelongingItem key={belonging.id} belonging={belonging} />
        ))}
      </div>
    </div>
  );
}

