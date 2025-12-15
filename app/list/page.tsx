"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Belonging } from "@/types/listing";
import { Plus, X, Upload, Trash2, ArrowLeft } from "lucide-react";

export default function ListLeasePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    address: "",
    neighborhood: "",
    city: "San Francisco",
    state: "CA",
    zipCode: "",
    price: "",
    bedrooms: "1",
    bathrooms: "1",
    squareFeet: "",
    availableDate: "",
    leaseEndDate: "",
    description: "",
    amenities: [] as string[],
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [belongings, setBelongings] = useState<Belonging[]>([]);
  const [showBelongingForm, setShowBelongingForm] = useState(false);
  const [newBelonging, setNewBelonging] = useState({
    name: "",
    category: "Furniture" as Belonging['category'],
    condition: "Good" as Belonging['condition'],
    price: "",
    negotiable: false,
    description: "",
  });

  const amenitiesOptions = [
    "In-unit laundry", "Dishwasher", "Parking", "Gym", "Rooftop",
    "Pet-friendly", "Furnished", "AC", "Balcony", "Storage",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to backend
    alert("Listing created! (This is a demo - no backend connected)");
    router.push("/");
  };

  const addBelonging = () => {
    if (!newBelonging.name || !newBelonging.price) return;
    
    const belonging: Belonging = {
      id: `belonging-${Date.now()}`,
      name: newBelonging.name,
      category: newBelonging.category,
      condition: newBelonging.condition,
      price: parseFloat(newBelonging.price),
      negotiable: newBelonging.negotiable,
      photos: ["https://picsum.photos/200/150"],
      description: newBelonging.description || undefined,
    };
    
    setBelongings([...belongings, belonging]);
    setNewBelonging({
      name: "",
      category: "Furniture",
      condition: "Good",
      price: "",
      negotiable: false,
      description: "",
    });
    setShowBelongingForm(false);
  };

  const removeBelonging = (id: string) => {
    setBelongings(belongings.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Lease</h1>
          <p className="text-gray-600 mb-6">
            Create a listing and earn $20 when your lease is successfully taken over through Leasy.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Neighborhood *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Rent ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms *
                  </label>
                  <select
                    required
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms *
                  </label>
                  <select
                    required
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Square Feet
                  </label>
                  <input
                    type="number"
                    value={formData.squareFeet}
                    onChange={(e) => setFormData({ ...formData, squareFeet: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Available Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.availableDate}
                    onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lease End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.leaseEndDate}
                    onChange={(e) => setFormData({ ...formData, leaseEndDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Description */}
            <section>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your property..."
              />
            </section>

            {/* Amenities */}
            <section>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {amenitiesOptions.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, amenities: [...formData.amenities, amenity] });
                        } else {
                          setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== amenity) });
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Photos */}
            <section>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos
              </label>
              <div className="flex gap-2 flex-wrap">
                {photos.map((photo, index) => (
                  <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300">
                    <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setPhotos([...photos, `https://picsum.photos/200/200?random=${Date.now()}`])}
                  className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500"
                >
                  <Upload className="w-6 h-6 text-gray-400" />
                </button>
              </div>
            </section>

            {/* Belongings */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Belongings to Sell</h2>
                <button
                  type="button"
                  onClick={() => setShowBelongingForm(!showBelongingForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              {showBelongingForm && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Item name"
                      value={newBelonging.name}
                      onChange={(e) => setNewBelonging({ ...newBelonging, name: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Price ($)"
                      value={newBelonging.price}
                      onChange={(e) => setNewBelonging({ ...newBelonging, price: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <select
                      value={newBelonging.category}
                      onChange={(e) => setNewBelonging({ ...newBelonging, category: e.target.value as Belonging['category'] })}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option>Furniture</option>
                      <option>Electronics</option>
                      <option>Appliances</option>
                      <option>Decor</option>
                      <option>Other</option>
                    </select>
                    <select
                      value={newBelonging.condition}
                      onChange={(e) => setNewBelonging({ ...newBelonging, condition: e.target.value as Belonging['condition'] })}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option>New</option>
                      <option>Like New</option>
                      <option>Good</option>
                      <option>Fair</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Description (optional)"
                    value={newBelonging.description}
                    onChange={(e) => setNewBelonging({ ...newBelonging, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={2}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newBelonging.negotiable}
                      onChange={(e) => setNewBelonging({ ...newBelonging, negotiable: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Price is negotiable</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={addBelonging}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBelongingForm(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {belongings.length > 0 && (
                <div className="space-y-2">
                  {belongings.map((belonging) => (
                    <div key={belonging.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{belonging.name}</p>
                        <p className="text-sm text-gray-600">
                          {belonging.category} · {belonging.condition} · ${belonging.price}
                          {belonging.negotiable && " (Negotiable)"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBelonging(belonging.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Submit */}
            <div className="flex gap-4 pt-4 border-t">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Create Listing
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
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

