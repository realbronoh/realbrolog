import StyledMarkdown from '@/components/markdown/StyledMarkdown';
import { LOCALES } from '@/constants/intl';
import { REALBROLOG_NAME } from '@/constants/misc';
import { REALBROLOG_BASE_URL } from '@/constants/seo';
import { getPageContent } from '@/utils/page';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

interface HomePageProps {
  params: {
    locale: string;
  };
}

export const generateMetadata = async ({
  params,
}: {
  params: any;
}): Promise<Metadata> => {
  const { locale } = params;
  const t = await getTranslations();
  return {
    title: `${t('home.title')} | ${REALBROLOG_NAME}`,
    description: t('home.description'),
    alternates: {
      canonical: `${REALBROLOG_BASE_URL}/${locale}/home`,
    },
  };
};

export const generateStaticParams = async () => {
  const paths: {
    locale: string;
  }[] = [];

  LOCALES.forEach((locale) => {
    paths.push({
      locale,
    });
  });

  return paths;
};

const HomePage = ({ params: { locale } }: HomePageProps) => {
  unstable_setRequestLocale(locale);
  const homepageMarkdown = getPageContent('home', locale);
  return (
    <main className="prose">
      <StyledMarkdown markdown={homepageMarkdown} />
    </main>
  );
};

export default HomePage;
