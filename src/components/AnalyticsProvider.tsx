'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getFirebaseAnalytics, logAnalyticsEvent } from '@/lib/analytics';

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize Firebase Analytics on client mount
  useEffect(() => {
    getFirebaseAnalytics();
  }, []);

  // Track page_view on route changes
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    logAnalyticsEvent('page_view', {
      page_path: url,
      page_title: typeof document !== 'undefined' ? document.title : '',
      page_location: typeof window !== 'undefined' ? window.location.href : '',
    });
  }, [pathname, searchParams]);

  return null;
}
