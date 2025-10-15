import type { Metadata } from "next";
import { Roboto, Montserrat, Lato, Poppins, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Providers from "@/app/providers";
import { PaintersProvider } from "@/context/PaintersContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Chooz Roofers",
  description: "Find local Roofers contractors and companies in your area",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${montserrat.variable} ${lato.variable} ${poppins.variable} ${nunito.variable}`}>
        <Providers>
          <PaintersProvider>
            <Header />
            {children}
            <Footer />
          </PaintersProvider>

          {/* <CookieConsent /> */}
          {/* <CookieYesScript /> */}
        </Providers>
      </body>
    </html>
  );
}
