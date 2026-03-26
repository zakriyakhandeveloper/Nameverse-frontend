import { permanentRedirect } from "next/navigation";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.com").replace(
  /\/$/,
  ""
);

export const metadata = {
  title:
    "50,000+ Baby Girl Names with Meanings | Islamic, Hindu, Christian | NameVerse",
  description:
    "Discover perfect baby girl names from 50,000+ verified options. Get Islamic, Hindu & Christian girl names with complete meanings in English, Urdu, Arabic & Hindi, plus numerology, lucky traits, and pronunciation guides.",
  keywords: [
    "baby girl names",
    "baby girl names with meanings",
    "girl baby names",
    "islamic baby girl names",
    "muslim girl names",
    "christian girl names",
    "hindu girl names",
    "baby girl names 2025",
    "biblical girl names",
    "arabic girl names",
    "sanskrit girl names",
    "baby girl names in urdu",
  ].join(", "),
  openGraph: {
    title: "50,000+ Baby Girl Names with Meanings",
    description:
      "Find the perfect baby girl name from Islamic, Hindu & Christian traditions with complete meanings and cultural origins.",
    url: `${SITE}/baby-girl-names`,
    type: "website",
    siteName: "NameVerse",
    images: [
      {
        url: `${SITE}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Baby Girl Names — NameVerse",
      },
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE}/baby-girl-names` },
};

export default function BabyGirlNamesPage() {
  permanentRedirect("/names/islamic?gender=female");
}
