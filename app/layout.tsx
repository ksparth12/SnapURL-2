import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { LayoutClient } from '@/components/layout-client';
import { ShortenedUrlProvider } from '@/context/shortened-url-context';
import { PerformanceProvider } from '@/context/performance-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SnapURL - URL Shortener',
  description: 'A modern URL shortener for creating concise, shareable links',
  icons: {
    icon: [
      {
        url: '/SnapURL.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/SnapURL.png',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/SnapURL.png',
      type: 'image/png',
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SnapURL',
  },
  robots: 'index, follow',
};

export const viewport: Viewport = {
  themeColor: '#06B6D4',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ 
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PerformanceProvider>
          <ShortenedUrlProvider>
            <LayoutClient>
              {children}
            </LayoutClient>
          </ShortenedUrlProvider>
        </PerformanceProvider>
      </body>
    </html>
  );
}