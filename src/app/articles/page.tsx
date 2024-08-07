import React from 'react';
import { getArticleManager } from '@/utils/articleManager';
import ArticlesView from '@/components/articles/ArticlesView';

export const metadata = {
  title: 'realbrolog | Articles',
};

const ArticlesPage = () => {
  const articles = getArticleManager().articles;
  return <ArticlesView articles={articles} />;
};

export default ArticlesPage;
