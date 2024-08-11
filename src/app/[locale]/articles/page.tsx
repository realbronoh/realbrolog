import React from 'react';
import { getArticleManager } from '@/utils/articleManager';
import ArticlesView from '@/components/articles/ArticlesView';
import { REALBROLOG_NAME } from '@/constants/misc';
import { unstable_setRequestLocale } from 'next-intl/server';

interface ArticlesPageProps {
  params: {
    locale: string;
  };
}

export const metadata = {
  title: `${REALBROLOG_NAME} | Articles`,
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const { locale } = props.params;
  unstable_setRequestLocale(locale);
  const articles = getArticleManager().getArticleByLocale(locale);
  return <ArticlesView articles={articles} />;
};

export default ArticlesPage;
