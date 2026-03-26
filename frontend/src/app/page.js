import HomePageClient from "../components/HomePage/Homepage";
import { getLatestArticles, getAllCategories } from "@/lib/api/articles";
import { getSiteUrl } from "@/lib/seo/site";

const SITE_URL = getSiteUrl();

const EXTRA_SEO_KEYWORDS = [
  "Quranic names for boys",
  "Quranic names for girls",
  "Sanskrit baby boy names",
  "Sanskrit baby girl names",
  "Biblical boy names",
  "Biblical girl names",
  "baby names A to Z",
  "names starting with M",
  "names starting with A",
  "Urdu baby name meanings",
  "Arabic name pronunciation",
  "Hindi baby names with meaning",
  "modern Muslim names",
  "traditional Hindu names",
  "Christian saint names",
  "baby naming ceremony",
  "name numerology baby",
  "lucky number for baby name",
  "baby name blog",
  "islamic naming guide",
  "hindu naming traditions",
  "christian naming traditions",
].join(", ");

export const metadata = {
  title:
    "60,000+ Baby Names with Meanings | Islamic, Hindu, Christian Names 2025 | NameVerse",
  description:
    "Discover the perfect baby name from 60,000+ verified Islamic, Hindu & Christian names. Get meanings in English, Urdu, Arabic & Hindi, plus numerology, lucky traits, pronunciation guides, A–Z browse, and expert baby naming articles.",
  keywords: [
    "baby names with meanings",
    "baby boy names",
    "baby girl names",
    "baby name meanings",
    "unique baby names",
    "baby names 2025",
    "Islamic baby names",
    "muslim baby names",
    "Hindu baby names",
    "Christian baby names",
    "Quranic baby names",
    "Sanskrit baby names",
    "Biblical baby names",
    "baby names in Urdu",
    "baby names in Arabic",
    "baby names in Hindi",
    "how to choose baby name",
    "best baby names 2025",
    "popular baby names",
    "trending baby names",
    "baby name meanings verified",
    "baby naming articles",
    EXTRA_SEO_KEYWORDS,
  ].join(", "),
  openGraph: {
    title: "60,000+ Baby Names with Meanings | Islamic, Hindu & Christian",
    description:
      "Find your baby's perfect name from verified Islamic, Hindu & Christian names with complete meanings, cultural origins, pronunciation guides, and naming stories.",
    url: `${SITE_URL}/`,
    type: "website",
    siteName: "NameVerse",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "NameVerse - Baby Names with Meanings from Islamic, Hindu & Christian Traditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "60,000+ Baby Names with Meanings | NameVerse",
    description:
      "Discover your baby's perfect name from verified Islamic, Hindu & Christian traditions with complete meanings and cultural significance.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      "x-default": `${SITE_URL}/`,
      en: `${SITE_URL}/`,
    },
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Zakriya Khan", url: `${SITE_URL}/` }],
};

export function generateThemeColor() {
  return "#0f766e";
}

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}

export default async function Page() {
  let initialArticles = [];
  let initialCategories = [];
  try {
    [initialArticles, initialCategories] = await Promise.all([
      getLatestArticles(8),
      getAllCategories(),
    ]);
  } catch {
    initialArticles = [];
    initialCategories = [];
  }

  return (
    <HomePageClient
      initialArticles={initialArticles}
      initialCategories={initialCategories}
    />
  );
}
