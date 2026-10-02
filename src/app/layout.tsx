import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import React from 'react';

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
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${plusJakartaSans.className} min-h-screen flex flex-col antialiased selection:bg-orange-600 selection:text-white`}
      >
        <AppProvider>
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
