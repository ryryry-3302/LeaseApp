"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Star, Upload, CheckCircle2, ArrowLeft } from "lucide-react";
import { mockListings } from "@/lib/mockData";

export default function RunnerVerificationPage() {
  const router = useRouter();
  const params = useParams();
  const listingId = params.id as string;
  const listing = mockListings.find(l => l.id === listingId);

  const [formData, setFormData] = useState({
    propertyCondition: 0,
    cleanliness: 0,
    landlordExperience: 0,
    defects: [] as string[],
    notes: "",
    photos: [] as string[],
  });

  const defectOptions = [
    "Minor scuff marks on walls",
    "Small crack in bathroom tile",
    "Window latch needs repair",
    "Kitchen faucet drips slightly",
    "Closet door off track",
    "Peeling paint",
    "Loose cabinet handle",
    "Stained carpet",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.propertyCondition === 0 || formData.cleanliness === 0 || formData.landlordExperience === 0) {
      alert("Please rate all required fields");
      return;
    }
    alert("Inspection report submitted! (This is a demo - no backend connected)");
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Runner Inspection Report</h1>
            <p className="text-gray-600 mb-2">Property: {listing.address}</p>
            <p className="text-sm text-gray-500">
              Complete this standardized checklist based on your 45-minute onboarding course.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property Condition */}
            <section>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Property Condition (1-5) *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, propertyCondition: rating })}
                    className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                      formData.propertyCondition === rating
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className={`w-5 h-5 ${
                        formData.propertyCondition >= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
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
                Cleanliness (1-5) *
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

            {/* Landlord Experience */}
            <section>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Landlord Experience (1-5) *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, landlordExperience: rating })}
                    className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                      formData.landlordExperience === rating
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className={`w-5 h-5 ${
                        formData.landlordExperience >= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
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
                Defects / Issues Found
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

            {/* Photos */}
            <section>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos of Issues
              </label>
              <div className="flex gap-2 flex-wrap">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300">
                    <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, photos: [...formData.photos, `https://picsum.photos/200/200?random=${Date.now()}`] })}
                  className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500"
                >
                  <Upload className="w-6 h-6 text-gray-400" />
                </button>
              </div>
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
                placeholder="Add any additional observations..."
              />
            </section>

            {/* Submit */}
            <div className="flex gap-4 pt-4 border-t">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Submit Inspection Report
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

