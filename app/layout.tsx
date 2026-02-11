import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ParticleBackground from "@/components/ParticleBackground";

import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

const siteUrl = "https://kodrax.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KodraX Studio",
    template: "%s | KodraX Studio"
  },
  description:
    "Full-stack studio building Laravel APIs, React & Next.js frontends, React Native mobile apps, and WordPress solutions. From Nis, Serbia.",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "KodraX Studio - Laravel, React, Next.js, React Native & WordPress",
    description:
      "Full-stack studio: Laravel APIs, React & Next.js frontends, React Native mobile apps, and WordPress solutions.",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "KodraX Studio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "KodraX Studio - Laravel, React, Next.js, React Native & WordPress",
    description: "Full-stack studio: Laravel APIs, React & Next.js frontends, React Native mobile apps, and WordPress solutions.",
    images: ["/og-cover.jpg"]
  }
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KodraX Studio",
  url: siteUrl,
  email: "hello@kodrax.studio",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nis",
    addressCountry: "RS"
  },
  sameAs: ["https://www.upwork.com/agencies/1965890569940564427/"]
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${bodyFont.variable} ${headingFont.variable}`}>
        <CursorGlow />
        <div className="site-shell">
          <ParticleBackground />
          <Header />
          <main className="site-main">{children}</main>
          <Footer />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </body>
    </html>
  );
}
