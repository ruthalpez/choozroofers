// app/premium-directory-listing-offer/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Directory Listing Offer - ChoozPainters",
  description:
    "Get in touch with ChoozPainters. Contact us for support, questions about our painter directory, or assistance finding local Roofers Contractors in your area.",
  keywords:
    "contact ChoozPainters, painter directory support, local painters contact, Roofers Contractors help, ChoozPainters contact form",
  robots: "index, follow",
  openGraph: {
    title: "Premium Directory Listing Offer - ChoozPainters",
    description:
      "Get in touch with ChoozPainters. Contact us for support, questions about our painter directory, or assistance finding local Roofers Contractors in your area.",
    url: "https://choozroofers.com/premium-directory-listing-offer",
    siteName: "ChoozPainters",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Premium Directory Listing Offer - ChoozPainters",
    description:
      "Get in touch with ChoozPainters. Contact us for support, questions about our painter directory, or assistance finding local Roofers Contractors in your area.",
  },
  alternates: {
    canonical: "https://choozroofers.com/premium-directory-listing-offer",
  },
};

export default function PremiumDirectoryListingOfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
