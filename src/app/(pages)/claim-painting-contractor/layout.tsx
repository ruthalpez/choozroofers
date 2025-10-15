// app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claim Your Roofers Contractor Listing - ChoozPainters",
  description:
    "Claim your Roofers Contractor listing on ChoozPainters. Get in touch with ChoozPainters. Contact us for support, questions about our painter directory, or assistance finding local Roofers Contractors in your area.",
  keywords:
    "contact ChoozPainters, painter directory support, local painters contact, Roofers Contractors help, ChoozPainters contact form",
  robots: "index, follow",
  openGraph: {
    title: "Claim Your Roofers Contractor Listing - ChoozPainters",
    description:
      "Claim your Roofers Contractor listing on ChoozPainters. Get in touch with ChoozPainters. Contact us for support, questions about our painter directory, or assistance finding local Roofers Contractors in your area.",
    url: "https://choozroofers.com/contact",
    siteName: "ChoozPainters",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Claim Your Roofers Contractor Listing - ChoozPainters",
    description:
      "Claim your Roofers Contractor listing on ChoozPainters. Get in touch with ChoozPainters. Contact us for support, questions about our painter directory, or assistance finding local Roofers Contractors in your area.",
  },
  alternates: {
    canonical: "https://choozroofers.com/claim-roofers-contractor",
  },
};

export default function ClaimRoofersContractorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
