import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import AppInstallPopup from "./install";
import SWRegister from "./sw"; // Register service worker
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import ResourceHints from "@/components/Performance/ResourceHints";
import PerformanceInit from "./performance";
import StructuredData from "@/components/SEO/StructuredData";
import GoogleBotMeta from "@/components/SEO/GoogleBotMeta";
import { AppProvider } from "@/contexts/AppContext";
import LoadingWrapper from "@/components/LoadingAnimation/LoadingWrapper";

// Use environment variable or default - will be overridden client-side if needed
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.vercel.app";

// ✅ Font optimization
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ✅ Global SEO Metadata
export const metadata = {
  title: "NameVerse — Baby Names & Meanings | Muslim, Hindu, Christian",
  description:
    "Explore 65,000+ baby names with meanings, origins, and numerology. Discover Islamic, Hindu, and Christian names in Urdu, Arabic, Hindi & English. Find Quranic, Biblical, and modern baby names A–Z.",
  keywords:
    "baby names, baby names a to z, baby names muslim, baby names girl, baby names muslim boy, name meanings, name meanings in urdu, name meanings in islam, baby names with meanings, unique baby names, modern baby names, islamic boy names from quran, hindu girl names meaning love, christian baby names with meanings, nameverse meaning, nameverse website",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  authors: [{ name: "NameVerse", url: siteUrl }],
  creator: "NameVerse",
  publisher: "NameVerse",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl, languages: { "en-US": siteUrl } },
  openGraph: {
    title: "NameVerse — Baby Names & Meanings (Islamic, Hindu, Christian, Modern)",
    description:
      "Discover baby names with meanings, origins, and numerology across religions — Islam, Hinduism, Christianity — in English, Urdu, Arabic & Hindi.",
    url: siteUrl,
    siteName: "NameVerse",
    images: [
      { url: `${siteUrl}/og-image.png`, width: 1200, height: 630, type: "image/png", alt: "NameVerse — Baby Names & Meanings from Around the World" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby Names & Meanings — Islamic, Hindu, Christian | NameVerse",
    description:
      "Explore thousands of baby names by religion and origin — Islamic, Hindu, and Christian — with detailed meanings and numerology.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@NameVerseOfficial",
    site: "@NameVerseOfficial",
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: [
      { url: '/apple-touch.png', sizes: '180x180', type: 'image/png' },
      { url: '/logo.png', sizes: '152x152', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.png',
      },
    ],
  },
  manifest: `/manifest.json`, // Use relative path to avoid CORS issues
  category: "Baby Names, Culture, Religion",
};

// Viewport configuration (Next.js App Router)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#1E40AF",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="application-name" content="NameVerse" />
        <meta name="content-language" content="en-US" />

        {/* ✅ Performance: Resource Hints */}
        <ResourceHints />

        {/* ✅ Icons - use relative paths */}
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="shortcut icon" type="image/png" href="/logo.png" />

        {/* ✅ Enhanced crawl hints */}
        <GoogleBotMeta siteUrl={siteUrl} />

        {/* ✅ Enhanced Structured Data */}
        <StructuredData
          organization={true}
          website={true}
          breadcrumbs={[
            { name: "Home", url: siteUrl },
            { name: "Baby Names", url: `${siteUrl}/names` },
          ]}
          collectionPage={{
            name: "Popular Baby Names by Religion",
            description: "Browse top baby names from different faiths — Muslim, Hindu, and Christian — with meanings and translations.",
            url: `${siteUrl}/names`,
            items: [],
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        <ErrorBoundary>
          <AppProvider>
            <LoadingWrapper>
              <PerformanceInit />
              <Navbar />
              {children}
              <AppInstallPopup />
              <SWRegister /> {/* ✅ Service Worker registration */}
            </LoadingWrapper>
          </AppProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
