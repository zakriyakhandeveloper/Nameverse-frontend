'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import NameDetailPage from '@/components/NameDetail/NameDetailPage';
import { useNameData } from './NameDataContext';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function NamePage() {
  const params = useParams();
  const nameData = useNameData();
  const religion = params?.religion || nameData?.religion?.toLowerCase();

  useEffect(() => {
    if (!nameData?.id || !religion) return;

    const prefetchRelatedNames = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/names/${religion}/${nameData.id}/related`, {
          headers: { 'Cache-Control': 'public, max-age=3600' },
          next: { revalidate: 3600 },
        });

        await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/names/${religion}/${nameData.id}/similar`, {
          headers: { 'Cache-Control': 'public, max-age=3600' },
          next: { revalidate: 3600 },
        });
      } catch (err) {
        console.debug('Prefetch failed (non-critical):', err);
      }
    };

    prefetchRelatedNames();
  }, [nameData?.id, religion]);

  if (!nameData) {
    return null;
  }

  return (
    <ErrorBoundary>
      <NameDetailPage data={nameData} religion={religion} />
    </ErrorBoundary>
  );
}
