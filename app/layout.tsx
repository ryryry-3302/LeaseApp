import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeaseTakeover - Find Your Next Sublet",
  description: "Easy lease takeover platform for students and interns",
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

