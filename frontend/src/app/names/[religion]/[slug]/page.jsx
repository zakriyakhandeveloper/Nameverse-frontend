import NameClient from '@/components/names/NameDetailClient';
import { fetchNameDetail } from '@/lib/api/names';
import { notFound } from 'next/navigation';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { religion, slug } = params;
  const nameData = await fetchNameDetail(religion, slug);
  if (!nameData) {
    return { title: 'Name Not Found', description: 'The requested name could not be found.' };
  }
  const titleName = nameData.name || slug.replace(/[-_]/g, ' ');
  const religionTitle = religion.charAt(0).toUpperCase() + religion.slice(1);
  const desc = nameData.short_meaning || nameData.meaning || `Discover the meaning of ${titleName}.`;
  return {
    title: `${titleName} Meaning | ${religionTitle} Names`,
    description: desc,
    alternates: { canonical: `/names/${religion}/${slug}` },
    openGraph: {
      title: `${titleName} - ${religionTitle} Name Meaning`,
      description: desc,
      type: 'article',
      siteName: 'NameVerse',
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titleName} - ${religionTitle} Name`,
      description: desc,
      images: [`${SITE_URL}/og-image.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function NameSlugPage({ params }) {
  const { religion, slug } = params;
  const data = await fetchNameDetail(religion, slug);
  if (!data) return notFound();
  return <NameClient data={data} initialLanguage="english" />;
}
