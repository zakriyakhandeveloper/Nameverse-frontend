import { permanentRedirect } from "next/navigation";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.com").replace(
  /\/$/,
  ""
);

export const metadata = {
  title:
    "15,000+ Unique Baby Names with Meanings | Rare & Modern Names | NameVerse",
  description:
    "Explore 15,000+ unique and rare baby names for boys and girls. Find unusual, distinctive names from Islamic, Hindu & Christian traditions with complete meanings, origins, and cultural significance.",
  keywords: [
    "unique baby names",
    "rare baby names",
    "unusual baby names",
    "unique boy names",
    "unique girl names",
    "uncommon baby names",
    "unique islamic names",
    "unique hindu names",
    "unique christian names",
  ].join(", "),
  openGraph: {
    title: "15,000+ Unique & Rare Baby Names",
    description:
      "Distinctive and uncommon baby names from Islamic, Hindu & Christian traditions with verified meanings.",
    url: `${SITE}/unique-baby-names`,
    type: "website",
    siteName: "NameVerse",
    images: [
      {
        url: `${SITE}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Unique Baby Names — NameVerse",
      },
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE}/unique-baby-names` },
};

export default function UniqueBabyNamesPage() {
  permanentRedirect("/names/islamic?sort=unique");
}
