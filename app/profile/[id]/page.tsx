"use client";

import { mockListings } from "@/lib/mockData";
import { UserProfile } from "@/types/listing";
import { GraduationCap, Linkedin, Instagram, Github, Twitter, Facebook, ArrowLeft, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  const listingWithProfile = mockListings.find(l => l.profile?.id === id);
  const profile: UserProfile | undefined = listingWithProfile?.profile;

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Profile not found</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const userListings = mockListings.filter(l => l.profile?.id === id);
  const currentYear = new Date().getFullYear();
  const yearInSchool = currentYear - profile.admissionYear + 1;
  const yearLabel = yearInSchool === 1 ? "Freshman" : yearInSchool === 2 ? "Sophomore" : 
                   yearInSchool === 3 ? "Junior" : yearInSchool === 4 ? "Senior" : "Graduate";

  const socialLinks = [
    { key: "linkedin", icon: Linkedin, url: profile.socialLinks.linkedin, label: "LinkedIn" },
    { key: "instagram", icon: Instagram, url: profile.socialLinks.instagram, label: "Instagram" },
    { key: "github", icon: Github, url: profile.socialLinks.github, label: "GitHub" },
    { key: "twitter", icon: Twitter, url: profile.socialLinks.twitter, label: "Twitter" },
    { key: "facebook", icon: Facebook, url: profile.socialLinks.facebook, label: "Facebook" },
  ].filter(item => item.url);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Listings
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8">
            <div className="flex items-start gap-6">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const initials = profile.name.split(' ').map(n => n[0]).join('').toUpperCase();
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=ffffff&color=3b82f6&size=128`;
                }}
              />
              <div className="flex-1 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{profile.name}</h1>
                  {profile.profileVerified && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verified Student</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-blue-100 mb-4">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-lg">{profile.university}</span>
                </div>
                <div className="text-blue-100">
                  {yearLabel} • Class of {profile.admissionYear}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">About</h2>
              <p className="text-gray-700 leading-relaxed">{profile.description}</p>
            </div>

            {socialLinks.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">Connect</h2>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map(({ key, icon: Icon, url, label }) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Listings ({userListings.length})
              </h2>
              {userListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>No listings yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
