import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/user/layout/Navbar";
import Footer from "@/components/user/layout/Footer";
import { Toaster } from "react-hot-toast";
import AOSProvider from "@/components/ui/AOSProvider";

import { Cormorant_Garamond } from "next/font/google";
import Providers from "./providers";

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
        </Providers>
      </body>
    </html>
  );
}
