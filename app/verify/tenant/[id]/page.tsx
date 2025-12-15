"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Star, CheckCircle2, DollarSign, ArrowLeft } from "lucide-react";
import { mockListings } from "@/lib/mockData";

export default function TenantReviewPage() {
  const router = useRouter();
  const params = useParams();
  const listingId = params.id as string;
  const listing = mockListings.find(l => l.id === listingId);

  const [formData, setFormData] = useState({
    landlordRating: 0,
    cleanliness: 0,
    recommendation: false,
    defects: [] as string[],
    notes: "",
  });

  const defectOptions = [
    "Slow drain in bathroom sink",
    "Window doesn't close completely",
    "Heating takes time to warm up",
    "Noisy neighbors",
    "Poor water pressure",
    "Electrical issues",
    "Pest problems",
    "Mold or moisture issues",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.landlordRating === 0 || formData.cleanliness === 0) {
      alert("Please complete all required fields");
      return;
    }
    alert("Review submitted! You'll earn $20 if this listing is successfully rented through Leasy.");
    router.push(`/listing/${listingId}`);
  };

  const toggleDefect = (defect: string) => {
    if (formData.defects.includes(defect)) {
      setFormData({ ...formData, defects: formData.defects.filter(d => d !== defect) });
    } else {
      setFormData({ ...formData, defects: [...formData.defects, defect] });
    }
  };

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Listing not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Link href={`/listing/${listingId}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Listing
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Current Tenant Review</h1>
            </div>
            <p className="text-gray-600 mb-2">Property: {listing.address}</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-green-800">
                <strong>Earn $20!</strong> You'll receive $20 if your lease is successfully taken over through Leasy.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Landlord Rating */}
            <section>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Landlord Experience Rating (1-5) *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, landlordRating: rating })}
                    className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                      formData.landlordRating === rating
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className={`w-5 h-5 ${
                        formData.landlordRating >= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`} />
                    </div>
                    <p className="text-xs text-center text-gray-600">{rating}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Cleanliness */}
            <section>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Property Cleanliness (1-5) *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, cleanliness: rating })}
                    className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                      formData.cleanliness === rating
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className={`w-5 h-5 ${
                        formData.cleanliness >= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`} />
                    </div>
                    <p className="text-xs text-center text-gray-600">{rating}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Defects */}
            <section>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Issues / Defects You've Experienced
              </label>
              <div className="grid grid-cols-2 gap-2">
                {defectOptions.map((defect) => (
                  <label
                    key={defect}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      formData.defects.includes(defect)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.defects.includes(defect)}
                      onChange={() => toggleDefect(defect)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">{defect}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Recommendation */}
            <section>
              <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.recommendation}
                  onChange={(e) => setFormData({ ...formData, recommendation: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
                <div>
                  <p className="font-medium text-gray-900">Would you recommend this property?</p>
                  <p className="text-sm text-gray-600">Help future tenants make informed decisions</p>
                </div>
              </label>
            </section>

            {/* Notes */}
            <section>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your experience living here..."
              />
            </section>

            {/* Submit */}
            <div className="flex gap-4 pt-4 border-t">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => router.push(`/listing/${listingId}`)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

