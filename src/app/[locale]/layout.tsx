import type { Metadata } from 'next';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Center from '@/components/Center';
import { pretendard } from '@/utils/font';
import { REALBROLOG_NAME } from '@/constants/misc';
import GA4 from '@/components/seo/GoogleAnalytics4';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { LOCALES } from '@/constants/intl';

export const metadata: Metadata = {
  title: REALBROLOG_NAME,
  description: 'blog of realbro',
};

export const generateStaticParams = () => {
  return LOCALES.map((locale) => {
    locale;
  });
};

const LocaleLayout = async ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <GA4 />
      </head>
      <body className={pretendard.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <Center>{children}</Center>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
