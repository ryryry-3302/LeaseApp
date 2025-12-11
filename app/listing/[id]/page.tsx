import { notFound } from "next/navigation";
import { mockListings } from "@/lib/mockData";
import ListingDetail from "@/components/ListingDetail";

export default function ListingPage({ params }: { params: { id: string } }) {
  const listing = mockListings.find((l) => l.id === params.id);

  if (!listing) {
    notFound();
  }

  return <ListingDetail listing={listing} />;
}

