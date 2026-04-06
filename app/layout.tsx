import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/user/layout/Navbar";
import Footer from "@/components/user/layout/Footer";
import { Toaster } from "react-hot-toast";
import AOSProvider from "@/components/ui/AOSProvider";

import { Cormorant_Garamond } from "next/font/google";
import Providers from "./providers";
import Script from "next/script";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zerava.uk"),

  title: {
    default: "Zerava - Premium Eco Vehicle Care in Southampton",
    template: "%s | Zerava",
  },

  description:
    "Zerava provides premium eco-friendly vehicle cleaning and subscription car care services across Southampton. Sustainable, convenient and professionally managed.",

  keywords: [
    "Car wash Southampton",
    "Eco car wash",
    "Mobile car wash Southampton",
    "Car cleaning subscription UK",
    "Premium vehicle detailing",
    "Zerava Southampton",
  ],

  authors: [{ name: "Zerava" }],

  openGraph: {
    title: "Zerava - Premium Eco Vehicle Care",
    description:
      "Sustainable, premium vehicle care and subscription services across Southampton.",
    url: "https://www.zerava.uk",
    siteName: "Zerava",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zerava Premium Eco Vehicle Care",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Zerava - Premium Eco Vehicle Care",
    description:
      "Premium eco-friendly vehicle care subscriptions in Southampton.",
    images: ["/og-image.jpg"],
  },

  other: {
    "geo.region": "GB-HAM",
    "geo.placename": "Southampton",
    "geo.position": "50.9097;-1.4044",
    "ICBM": "50.9097, -1.4044",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-eco-black text-text-primary antialiased">
        <Providers>
          <AOSProvider />
          {children}
          <Toaster position="top-right" />
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&libraries=places`}
            strategy="afterInteractive"
          />
          <Script
            id="ld-json"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "Zerava Mobility",
                image: "https://www.zerava.uk/og-image.jpg",
                url: "https://www.zerava.uk",
                telephone: "+44 2382 252342",
                priceRange: "££",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Southampton",
                  addressRegion: "Hampshire",
                  addressCountry: "GB",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 50.9097,
                  longitude: -1.4044,
                },
                areaServed: {
                  "@type": "City",
                  name: "Southampton",
                },
                sameAs: [
                  "https://www.instagram.com/zerava.uk",
                  "https://www.linkedin.com/company/zerava"
                ],
                serviceType: "Mobile Car Wash",
              }),
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
