import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leasy - Verified Lease Takeover Platform",
  description: "Trusted lease takeover platform with on-ground validation for students and interns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

