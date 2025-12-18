const STORAGE_KEY = "leasy_saved_listings";

export function getSavedListings(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function isListingSaved(listingId: string): boolean {
  return getSavedListings().includes(listingId);
}

export function toggleSavedListing(listingId: string): boolean {
  const saved = getSavedListings();
  const index = saved.indexOf(listingId);
  
  if (index > -1) {
    saved.splice(index, 1);
  } else {
    saved.push(listingId);
  }
  
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }
  
  return index === -1; // Returns true if now saved, false if unsaved
}

export function removeSavedListing(listingId: string): void {
  const saved = getSavedListings();
  const index = saved.indexOf(listingId);
  
  if (index > -1) {
    saved.splice(index, 1);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    }
  }
}

