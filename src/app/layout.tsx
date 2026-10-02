import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import React, { Suspense } from 'react';
import Script from 'next/script';

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#ea580c',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'My Chef — 3★ to 7★ Homestyle Food, PG Mess & Daily Tiffin Loop',
  description: 'Subscribe to authentic regional homestyle food, student campus passes, and gourmet thalis across 60+ Indian cities. Real-time EV delivery tracking & smart locker takeaway.',
  keywords: [
    'My Chef',
    'Tiffin Service',
    'Student Mess',
    'Kathiyawadi Thali',
    'Rajasthani Bhojanalaya',
    'Punekar Dabbawala',
    'South Indian Meals',
    'Razorpay Tiffin Subscription',
    'GIFT City Food Delivery',
    'Kota Student Mess'
  ],
  authors: [{ name: 'My Chef Gourmet Loop' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Google Analytics 4 (GA4) */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager (GTM) */}
        {gtmId && (
          <Script
            id="google-tag-manager-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        )}
      </head>
      <body
        suppressHydrationWarning
        className={`${plusJakartaSans.className} min-h-screen flex flex-col antialiased selection:bg-orange-600 selection:text-white`}
      >
        {/* GTM noscript fallback */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <AppProvider>
          <Suspense fallback={null}>
            <AnalyticsProvider />
          </Suspense>
          <Navbar />
          <main className="flex-1 w-full animate-fade-in-up" id="main-content">
            {children}
          </main>
          <Footer />
          <AIChatbot />
        </AppProvider>
      </body>
    </html>
  );
}

