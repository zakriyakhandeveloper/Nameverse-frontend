// app/names/[religion]/[lang]/page.jsx
import NameDetailsClient from './ClientSide';
import { fetchNameDetail } from '@/lib/api/names';

export const revalidate = 3600;

// Pre-render few fallback pages
export async function generateStaticParams() {
  return [
    { religion: 'islamic', lang: 'kamran' },
    { religion: 'hinduism', lang: 'ajay' },
    { religion: 'christianity', lang: 'bella' },
  ];
}

// Fetch API
async function getNameData(religion, lang) {
  try {
    return await fetchNameDetail(religion, lang);
  } catch {
    return null;
  }
}

// ---------------- METADATA (100/100 SEO) ----------------
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { religion, lang } = resolvedParams;
  const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const data = await getNameData(religion, lang);

  if (!data) {
    return {
      title: 'Name Not Found | Baby Names Database',
      description: 'The requested name could not be found.',
      robots: 'noindex, nofollow',
    };
  }

  const title =
    data.seo?.title ||
    `${data.name} Meaning – ${data.religion} Name Origin, Lucky Number & More`;

  const description =
    data.seo?.meta_description ||
    data.long_meaning ||
    `Learn the meaning, origin, numerology, personality traits and significance of the ${data.religion} baby name ${data.name}.`;

  const keywords = [
    data.name,
    `${data.name} meaning`,
    `${data.name} name meaning`,
    `${data.name} origin`,
    `${data.religion} baby name`,
    `${data.name} personality`,
    `${data.name} lucky number`,
    `${data.name} numerology`,
    `${data.name} religion`,
    `${data.name} in ${religion}`,
    `${data.gender} name ${data.name}`,
    `${data.name} astrology`,
    `modern ${religion} names`,
    'baby names list',
    'unique names',
  ];

  const canonical = `${DOMAIN}/names/${religion}/${lang}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical,
      languages: {
        'x-default': canonical,
        en: canonical,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Baby Names Database',
      type: 'article',
      locale: 'en_US',
      images: [
        {
          url: data?.share_options?.facebook?.image || '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${data.name} meaning`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [data?.share_options?.facebook?.image || '/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    other: {
      name: data.name,
      religion: data.religion,
      origin: data.origin,
      gender: data.gender,
    },
  };
}

// ---------------- Theme & Viewport ----------------
export function generateThemeColor() {
  return "#0f766e";
}

export function generateViewport() {
  return { width: "device-width", initialScale: 1 };
}

// ---------------- MAIN PAGE ----------------
export default async function NamePage({ params }) {
  const resolvedParams = await params;
  const { religion, lang } = resolvedParams;
  const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const data = await getNameData(religion, lang);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <h1 className="text-4xl font-bold">Name Not Found</h1>
        <p className="mt-2 text-gray-600">
          We couldn't find the requested name.
        </p>
      </div>
    );
  }

  // Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    gender: data.gender,
    description: data.long_meaning,
    nationality: data.origin,
    additionalName: data.religion,
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${data.name} Meaning & Origin`,
    description: data.long_meaning,
    author: { "@type": "Organization", name: "Baby Names Database" },
    datePublished: data.updated_at || new Date().toISOString(),
    image: data.share_options?.facebook?.image || "/default-og.jpg",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Names", item: `${DOMAIN}/names` },
      { "@type": "ListItem", position: 2, name: religion, item: `${DOMAIN}/names/${religion}` },
      { "@type": "ListItem", position: 3, name: data.name, item: `${DOMAIN}/names/${religion}/${lang}` },
    ],
  };

  const faqItems = data.faq?.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })) || [
    {
      "@type": "Question",
      name: `What is the meaning of ${data.name}?`,
      acceptedAnswer: { "@type": "Answer", text: data.long_meaning },
    },
    {
      "@type": "Question",
      name: `Is ${data.name} a good baby name?`,
      acceptedAnswer: { "@type": "Answer", text: `${data.name} is considered a positive and meaningful name.` },
    },
  ];

  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <NameDetailsClient data={data} />
    </>
  );
}
