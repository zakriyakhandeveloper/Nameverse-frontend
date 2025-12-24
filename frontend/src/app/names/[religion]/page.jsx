import ReligiousNamesBrowser from './client';
import { notFound } from 'next/navigation';
import { fetchNames as fetchNamesAPI, fetchFilters as fetchFiltersAPI } from '@/lib/api/names';

// ==========================================
// ISR CONFIGURATION
// ==========================================
export const revalidate = 60; // Revalidate every 60 seconds

const RELIGIONS = ['islamic', 'christian', 'hindu'];
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com';

// ==========================================
// GENERATE STATIC PARAMS
// ==========================================
export async function generateStaticParams() {
  return RELIGIONS.map((religion) => ({ religion }));
}

// ==========================================
// METADATA
// ==========================================
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { religion } = resolvedParams;
  const religionTitle = religion.charAt(0).toUpperCase() + religion.slice(1);

  const metadataMap = {
    islamic: {
      title: `25,000+ Islamic Baby Names with Meanings | Muslim Names from Quran | NameVerse`,
      description: `Discover authentic Islamic baby names with Quranic references and verified meanings in English, Urdu & Arabic. Browse 25,000+ Muslim baby names for boys and girls with spiritual significance, pronunciation guides, and lucky traits.`,
      keywords: `Islamic baby names, Muslim baby names, Islamic names, Quranic baby names, Arabic baby names, Muslim boy names, Muslim girl names, Islamic names for boys, Islamic names for girls, baby boy islamic names, islamic names wiki, meaning of islamic names urdu, islamic names urdu pakistan, what are some muslim names, what do muslim names mean, how do muslim names work, Quranic names for boys, Quranic names for girls`
    },
    christian: {
      title: `15,000+ Christian Baby Names with Meanings | Biblical Names | NameVerse`,
      description: `Explore authentic Christian baby names with Biblical references and saint connections. Browse 15,000+ Christian names for boys and girls with scripture verses, Hebrew/Greek origins, and spiritual significance.`,
      keywords: `Christian baby names, Biblical baby names, Christian names, saint names, Biblical boy names, Biblical girl names, Christian names for boys, Christian names for girls, names from the Bible, Catholic baby names, Protestant baby names, Orthodox Christian names, Hebrew baby names, Greek baby names`
    },
    hindu: {
      title: `20,000+ Hindu Baby Names with Meanings | Sanskrit Names | NameVerse`,
      description: `Find beautiful Hindu baby names from Sanskrit with Vedic meanings and deity connections. Browse 20,000+ Hindu names for boys and girls inspired by gods, goddesses, and ancient Indian wisdom.`,
      keywords: `Hindu baby names, Sanskrit baby names, Hindu names, Vedic baby names, Indian baby names, Hindu boy names, Hindu girl names, Sanskrit names for boys, Sanskrit names for girls, Lord Krishna names, Lord Shiva names, Goddess Lakshmi names, Tamil baby names, Hindi baby names`
    }
  };

  const metadata = metadataMap[religion] || metadataMap.islamic;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: `${SITE_URL}/names/${religion}`,
    },
    openGraph: {
      title: `${religionTitle} Baby Names - Complete Database`,
      description: metadata.description,
      type: 'website',
      url: `${SITE_URL}/names/${religion}`,
      siteName: 'NameVerse',
      images: [
        {
          url: `${SITE_URL}/og-image-${religion}.png`,
          width: 1200,
          height: 630,
          alt: `${religionTitle} Baby Names with Meanings`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [`${SITE_URL}/og-image-${religion}.png`],
    },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    authors: [{ name: 'NameVerse Team' }],
  };
}

// ==========================================
// SERVER-SIDE DATA FETCHING
// ==========================================
async function fetchNames(religion, params = {}) {
  try {
    return await fetchNamesAPI({
      religion,
      page: '1',
      limit: '40',
      sort: 'asc',
      ...params,
    });
  } catch (error) {
    
    return { success: false, data: [], pagination: { totalPages: 1, totalCount: 0 } };
  }
}

async function fetchFilters(religion) {
  try {
    const filtersData = await fetchFiltersAPI(religion);
    return { success: !!filtersData, filters: filtersData || {} };
  } catch (error) {
    
    return { success: false, filters: {} };
  }
}

// ==========================================
// THEME & VIEWPORT
// ==========================================
export function generateThemeColor() {
  return '#0f766e';
}

export function generateViewport() {
  return { width: 'device-width', initialScale: 1 };
}

// ==========================================
// GENERATE JSON-LD SCHEMA
// ==========================================
function generateStructuredData(religion, names, totalCount) {
  const religionTitle = religion.charAt(0).toUpperCase() + religion.slice(1);

  const nameItems = (names || []).slice(0, 20).map((n, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: n.name,
    url: `${SITE_URL}/names/${religion}/${n.slug}`,
    description: n.short_meaning || n.long_meaning
  }));

  const religionDescriptions = {
    islamic: 'Authentic Islamic baby names with Quranic references and meanings in English, Urdu & Arabic',
    christian: 'Biblical Christian baby names with scripture verses and saint connections',
    hindu: 'Hindu baby names from Sanskrit with Vedic meanings and deity connections'
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/names/${religion}#webpage`,
        "name": `${religionTitle} Baby Names with Meanings`,
        "description": religionDescriptions[religion] || `${religionTitle} baby names with meanings`,
        "url": `${SITE_URL}/names/${religion}`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "name": "NameVerse"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
            { "@type": "ListItem", "position": 2, "name": "Names", "item": `${SITE_URL}/names` },
            { "@type": "ListItem", "position": 3, "name": `${religionTitle} Names`, "item": `${SITE_URL}/names/${religion}` }
          ]
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": `${religionTitle} Baby Names Collection`,
          "numberOfItems": totalCount,
          "itemListElement": nameItems
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How many ${religionTitle} baby names are available?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `NameVerse features ${totalCount.toLocaleString()}+ verified ${religionTitle} baby names with complete meanings, origins, pronunciations, and cultural significance.`
            }
          }
        ]
      }
    ]
  };
}

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function ReligionNamesPage({ params }) {
  const resolvedParams = await params;
  const { religion } = resolvedParams;

  if (!RELIGIONS.includes(religion)) {
    notFound();
  }

  // Fetch data in parallel
  const [namesData, filtersData] = await Promise.all([
    fetchNames(religion),
    fetchFilters(religion),
  ]);

  const initialNames = namesData.success ? namesData.data || [] : [];
  const initialTotalPages = namesData.success ? namesData.pagination?.totalPages || 1 : 1;
  const initialTotalCount = namesData.success ? namesData.pagination?.totalCount || 0 : 0;
  const initialFilters = filtersData.success ? filtersData.filters || {} : {};

  const structuredData = generateStructuredData(religion, initialNames, initialTotalCount);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ReligiousNamesBrowser
        initialReligion={religion}
        initialNames={initialNames}
        initialFilters={initialFilters}
        initialTotalPages={initialTotalPages}
        initialTotalCount={initialTotalCount}
      />
    </>
  );
}
