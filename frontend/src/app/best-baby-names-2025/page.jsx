import { permanentRedirect } from "next/navigation";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.com").replace(
  /\/$/,
  ""
);

export const metadata = {
  title:
    "Best Baby Names 2025 | Top Modern, Unique & Trending Names | NameVerse",
  description:
    "Discover the best baby names for 2025. Browse top trending, modern, and popular names for boys and girls across Islamic, Hindu & Christian traditions with complete meanings and cultural significance.",
  keywords: [
    "best baby names 2025",
    "top baby names 2025",
    "trending baby names 2025",
    "popular baby names 2025",
    "modern baby names 2025",
    "best islamic names 2025",
    "best hindu names 2025",
    "best christian names 2025",
  ].join(", "),
  openGraph: {
    title: "Best Baby Names 2025 | Trending & Popular Names",
    description:
      "Find the most trending and popular baby names for 2025 across traditions with verified meanings.",
    url: `${SITE}/best-baby-names-2025`,
    type: "website",
    siteName: "NameVerse",
    images: [
      {
        url: `${SITE}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Best Baby Names 2025 — NameVerse",
      },
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE}/best-baby-names-2025` },
};

export default function BestBabyNames2025Page() {
  permanentRedirect("/names/islamic?sort=popular");
}
