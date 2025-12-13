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

  return {
    title: `${religionTitle} Baby Names - Meanings & Origins | Name Database`,
    description: `Discover authentic ${religionTitle} baby names with verified meanings, cultural context, and pronunciation guides. Browse thousands of traditional and modern names for boys and girls.`,
    keywords: `${religionTitle} names, baby names, ${religionTitle} baby names, name meanings, boy names, girl names, religious names`,
    openGraph: {
      title: `${religionTitle} Baby Names - Complete Database`,
      description: `Explore ${religionTitle} baby names with authentic meanings and cultural significance.`,
      type: 'website',
      url: `${SITE_URL}/religion/${religion}`,
      siteName: 'NameVerse',
      images: [
        {
          url: `${SITE_URL}/og-image-${religion}.png`,
          width: 1200,
          height: 630,
          alt: `${religionTitle} Baby Names`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${religionTitle} Baby Names`,
      description: `Explore ${religionTitle} baby names with meanings and origins.`,
      images: [`${SITE_URL}/og-image-${religion}.png`],
    },
    robots: { index: true, follow: true },
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
    console.error('Fetch names error:', error);
    return { success: false, data: [], pagination: { totalPages: 1, totalCount: 0 } };
  }
}

async function fetchFilters(religion) {
  try {
    const filtersData = await fetchFiltersAPI(religion);
    return { success: !!filtersData, filters: filtersData || {} };
  } catch (error) {
    console.error('Fetch filters error:', error);
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

  return (
    <ReligiousNamesBrowser
      initialReligion={religion}
      initialNames={initialNames}
      initialFilters={initialFilters}
      initialTotalPages={initialTotalPages}
      initialTotalCount={initialTotalCount}
    />
  );
}
