"use client";

import { Verification } from "@/types/listing";
import { CheckCircle2, Clock, XCircle, User, Shield } from "lucide-react";

interface VerificationBadgeProps {
  verification?: Verification;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
}

export default function VerificationBadge({
  verification,
  size = "md",
  showDetails = false,
}: VerificationBadgeProps) {
  if (!verification) {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-600 ${
        size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
      }`}>
        <XCircle className={size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
        <span>Unverified</span>
      </div>
    );
  }

  const { status, runnerReport, tenantReview } = verification;

  if (status === "verified") {
    return (
      <div className="flex flex-col gap-2">
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 ${
          size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
        }`}>
          <CheckCircle2 className={size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
          <span>Verified</span>
        </div>
        {showDetails && (
          <div className="flex items-center gap-3 text-xs text-gray-600">
            {runnerReport && (
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-blue-600" />
                <span>Runner ✓</span>
              </div>
            )}
            {tenantReview && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 text-purple-600" />
                <span>Tenant ✓</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 ${
        size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
      }`}>
        <Clock className={size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
        <span>Pending Verification</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-600 ${
      size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
    }`}>
      <XCircle className={size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
      <span>Unverified</span>
    </div>
  );
}

