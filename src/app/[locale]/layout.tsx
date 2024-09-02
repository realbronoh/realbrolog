import type { Metadata } from 'next';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Center from '@/components/Center';
import { pretendard } from '@/utils/font';
import { REALBROLOG_NAME } from '@/constants/misc';
import GA4 from '@/components/seo/GoogleAnalytics4';
import { unstable_setRequestLocale } from 'next-intl/server';
import { LOCALES } from '@/constants/intl';
import GoogleSearch from '@/components/seo/GoogleSearch';
import { REALBROLOG_BASE_URL } from '@/constants/seo';

export const generateStaticParams = () => {
  return LOCALES.map((locale) => {
    locale;
  });
};

export const generateMetadata = async ({ params }: { params: any }) => {
  const { locale } = params;
  const metadata: Metadata = {
    metadataBase: new URL(REALBROLOG_BASE_URL),
    title: REALBROLOG_NAME,
    description: 'blog of realbro',
    openGraph: {
      siteName: REALBROLOG_NAME,
      type: 'website',
      locale,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: 'index, follow',
    },
    applicationName: REALBROLOG_NAME,
    appleWebApp: {
      title: REALBROLOG_NAME,
      statusBarStyle: 'default',
      capable: true,
    },
  };
  return metadata;
};

const LocaleLayout = async ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <GA4 />
        <GoogleSearch />
      </head>
      <body className={pretendard.className}>
        <Navbar />
        <Center>{children}</Center>
        <Footer />
      </body>
    </html>
  );
};

export default LocaleLayout;
