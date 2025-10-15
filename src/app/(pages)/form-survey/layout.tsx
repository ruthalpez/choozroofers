// app/form-survey/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Survey - ChoozPainters",
  description:
    "Get in touch with ChoozPainters. Contact us for support, questions about our painter directory, or assistance finding local Roofers Contractors in your area.",
  keywords:
    "contact ChoozPainters, painter directory support, local painters contact, Roofers Contractors help, ChoozPainters contact form",
  robots: "index, follow",
  openGraph: {
    title: "Form Survey - ChoozPainters",
    description:
      "Get in touch with ChoozPainters. Contact us for support, questions about our painter directory, or assistance finding local Roofers Contractors in your area.",
    url: "https://choozroofers.com/form-survey",
    siteName: "ChoozPainters",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Form Survey - ChoozPainters",
    description:
      "Get in touch with ChoozPainters. Contact us for support, questions about our painter directory, or assistance finding local Roofers Contractors in your area.",
  },
  alternates: {
    canonical: "https://choozroofers.com/form-survey",
  },
};

export default function FormSurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
