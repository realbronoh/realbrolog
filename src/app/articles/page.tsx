import React from 'react';
import { getArticleManager } from '@/utils/articleManager';
import ArticlesView from '@/components/articles/ArticlesView';

const ArticlesPage = () => {
  const articles = getArticleManager().articles;
  return <ArticlesView articles={articles} />;
};

export default ArticlesPage;
