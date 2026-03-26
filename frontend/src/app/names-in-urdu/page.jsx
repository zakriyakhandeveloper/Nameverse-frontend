import { permanentRedirect } from "next/navigation";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.com").replace(
  /\/$/,
  ""
);

export const metadata = {
  title:
    "Baby Names in Urdu | Islamic, Hindu, Christian Names with Urdu Meanings | NameVerse",
  description:
    "Find baby names with complete meanings in Urdu. Browse 60,000+ Islamic, Hindu & Christian baby names with Urdu translations, pronunciation guides, cultural significance, and lucky traits for boys and girls.",
  keywords: [
    "baby names in urdu",
    "names meaning in urdu",
    "islamic baby names in urdu",
    "muslim baby names in urdu",
    "urdu baby names",
    "quranic names in urdu",
    "pakistani baby names",
    "islamic names with urdu translation",
  ].join(", "),
  openGraph: {
    title: "Baby Names in Urdu | Islamic, Hindu & Christian Names",
    description:
      "Baby names with Urdu meanings for families who want authentic translations and pronunciation.",
    url: `${SITE}/names-in-urdu`,
    type: "website",
    siteName: "NameVerse",
    images: [
      {
        url: `${SITE}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Baby Names in Urdu — NameVerse",
      },
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE}/names-in-urdu` },
};

export default function NamesInUrduPage() {
  permanentRedirect("/names/islamic?language=urdu");
}
