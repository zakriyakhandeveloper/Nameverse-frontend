import HomePageClient from "../components/HomePage/Homepage";

// ✅ Read domain from .env
const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

// 100/100 SEO SSR metadata
export const metadata = {
  title: "Baby Names, Meanings & Stories — Muslim, Hindu, Christian | NameVerse",
  description:
    "Explore 65,000+ baby names with meanings, origins, and numerology. Discover Islamic, Hindu, and Christian names in Urdu, Arabic, Hindi & English. Find Quranic, Biblical, and modern baby names A–Z with meanings and stories.",
  keywords: [
    "Islamic names",
    "Muslim baby names",
    "Quranic names",
    "Urdu names",
    "Arabic names",
    "Islamic stories",
    "Islamic origin names",
    "trending Islamic names",
    "boys names",
    "girls names",
    "Muslim culture",
  ],
  openGraph: {
    title: "Islamic Names & Stories – Discover Meaning, Origin & History",
    description:
      "Explore authentic Islamic names and stories with meanings, origins and virtues. Perfect for parents and learners.",
    url: DOMAIN + "/",
    type: "website",
    siteName: "Islamic Names & Stories",
    images: [{ url: DOMAIN + "/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Islamic Names & Stories — Meaning, Origin, and Virtues",
    description:
      "Discover meaningful Islamic names and fascinating stories behind them.",
    images: [DOMAIN + "/og-image.jpg"],
  },
  alternates: {
    canonical: DOMAIN + "/",
    languages: {
      "x-default": DOMAIN + "/",
      en: DOMAIN + "/",
    },
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Zakriya Khan", url: DOMAIN + "/" }],
};

// ✅ Enhanced SEO Metadata (already defined above, just adding to existing)
// Metadata is already defined above, this section adds enhancements

// ✅ Next.js 14+ themeColor export
export function generateThemeColor() {
  return "#0f766e";
}

// ✅ Next.js 14+ viewport export
export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}

export default function Page() {
  return <HomePageClient />;
}