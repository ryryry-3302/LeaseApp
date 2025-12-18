"use client";

import { UserProfile } from "@/types/listing";
import { GraduationCap, Linkedin, Instagram, Github, Twitter, Facebook, ExternalLink, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface ProfileCardProps {
  profile: UserProfile;
  mode?: "inline" | "card";
  showFullDescription?: boolean;
}

export default function ProfileCard({ profile, mode = "card", showFullDescription = false }: ProfileCardProps) {
  const currentYear = new Date().getFullYear();
  const yearInSchool = currentYear - profile.admissionYear + 1;
  const yearLabel = yearInSchool === 1 ? "Freshman" : yearInSchool === 2 ? "Sophomore" : 
                   yearInSchool === 3 ? "Junior" : yearInSchool === 4 ? "Senior" : "Graduate";

  const descriptionPreview = showFullDescription 
    ? profile.description 
    : profile.description.length > 100 
      ? profile.description.substring(0, 100) + "..." 
      : profile.description;

  const socialIcons = [
    { key: "linkedin", icon: Linkedin, url: profile.socialLinks.linkedin },
    { key: "instagram", icon: Instagram, url: profile.socialLinks.instagram },
    { key: "github", icon: Github, url: profile.socialLinks.github },
    { key: "twitter", icon: Twitter, url: profile.socialLinks.twitter },
    { key: "facebook", icon: Facebook, url: profile.socialLinks.facebook },
  ].filter(item => item.url);

  if (mode === "inline") {
    return (
      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex-shrink-0">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const initials = profile.name.split(' ').map(n => n[0]).join('').toUpperCase();
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=3b82f6&color=fff&size=64`;
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-gray-900">{profile.name}</h3>
                {profile.profileVerified && (
                  <CheckCircle2 className="w-5 h-5 text-blue-600"  />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4" />
                <span>{profile.university} • Class of {profile.admissionYear}</span>
              </div>
            </div>
            <Link
              href={`/profile/${profile.id}`}
              className="flex-shrink-0 text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
            >
              View Profile
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-sm text-gray-700 mb-3">{descriptionPreview}</p>
          {socialIcons.length > 0 && (
            <div className="flex items-center gap-2">
              {socialIcons.map(({ key, icon: Icon, url }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/profile/${profile.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const initials = profile.name.split(' ').map(n => n[0]).join('').toUpperCase();
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=3b82f6&color=fff&size=80`;
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-lg text-gray-900">{profile.name}</h3>
              {profile.profileVerified && (
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0"  />
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>{profile.university}</span>
            </div>
            <div className="text-xs text-gray-500">Class of {profile.admissionYear}</div>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{descriptionPreview}</p>
        {socialIcons.length > 0 && (
          <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
            {socialIcons.map(({ key, icon: Icon, url }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                title={key.charAt(0).toUpperCase() + key.slice(1)}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
