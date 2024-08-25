import React from 'react';
import { getArticleManager } from '@/utils/articleManager';
import ArticlesView from '@/components/articles/ArticlesView';
import { REALBROLOG_NAME } from '@/constants/misc';

export const metadata = {
  title: `${REALBROLOG_NAME} | Articles`,
};

const ArticlesPage = () => {
  const articles = getArticleManager().articles;
  return <ArticlesView articles={articles} />;
};

export default ArticlesPage;
