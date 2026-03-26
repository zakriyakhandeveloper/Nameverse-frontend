import { permanentRedirect } from "next/navigation";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.com").replace(
  /\/$/,
  ""
);

export const metadata = {
  title:
    "50,000+ Baby Boy Names with Meanings | Islamic, Hindu, Christian | NameVerse",
  description:
    "Discover perfect baby boy names from 50,000+ verified options. Get Islamic, Hindu & Christian boy names with complete meanings in English, Urdu, Arabic & Hindi, plus numerology, lucky traits, and pronunciation guides.",
  keywords: [
    "baby boy names",
    "baby boy names with meanings",
    "boy baby names",
    "islamic baby boy names",
    "muslim boy names",
    "christian boy names",
    "hindu boy names",
    "baby boy names 2025",
    "quranic boy names",
    "biblical boy names",
    "arabic boy names",
    "sanskrit boy names",
    "baby boy names in urdu",
  ].join(", "),
  openGraph: {
    title: "50,000+ Baby Boy Names with Meanings",
    description:
      "Find the perfect baby boy name from Islamic, Hindu & Christian traditions with complete meanings and cultural origins.",
    url: `${SITE}/baby-boy-names`,
    type: "website",
    siteName: "NameVerse",
    images: [
      {
        url: `${SITE}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Baby Boy Names — NameVerse",
      },
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE}/baby-boy-names` },
};

export default function BabyBoyNamesPage() {
  permanentRedirect("/names/islamic?gender=male");
}
