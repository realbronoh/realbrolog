import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Center from '@/components/Center';
import { pretendard } from '@/utils/font';
import { REALBROLOG_NAME } from '@/constants/misc';
import GA4 from '@/components/seo/GoogleAnalytics4';

export const metadata: Metadata = {
  title: REALBROLOG_NAME,
  description: 'blog of realbro',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <GA4 />
      </head>
      <body className={pretendard.className}>
        <Navbar />
        <Center>{children}</Center>
        <Footer />
      </body>
    </html>
  );
}
