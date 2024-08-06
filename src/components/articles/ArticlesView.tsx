'use client';
import { Article } from '@/types/article';
import React, { useState } from 'react';
import ArticlesPaginationHandle from './ArticlesPagination';
import ArticleCard from './ArticleCard';
import { Separator } from '../ui/separator';

const DEFAULT_NUM_ARTICLES_PER_PAGE = 10;

const ArticlesView = (props: { articles: Article[] }) => {
  const { articles } = props;
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const articlesLength = articles.length;
  const numPages =
    Math.floor((articlesLength - 1) / DEFAULT_NUM_ARTICLES_PER_PAGE) + 1;

  const visibleArticles = articles.filter((_, idx) => {
    const firstArticleIdxOfCurrentPage =
      currentPageIdx * DEFAULT_NUM_ARTICLES_PER_PAGE;
    const firstArticleIdxOfNextPage =
      firstArticleIdxOfCurrentPage + DEFAULT_NUM_ARTICLES_PER_PAGE;
    return (
      firstArticleIdxOfCurrentPage <= idx && idx < firstArticleIdxOfNextPage
    );
  });

  return (
    <main className="flex flex-col gap-2 sm:gap-6">
      <h2 className="text-xl font-bold text-center sm:text-2xl md:text-start">
        Articles
      </h2>
      <div className="grid gap-6">
        <div className="grid gap-4">
          {visibleArticles.map((article, idx) => {
            return (
              <>
                {idx !== 0 && <Separator />}
                <ArticleCard article={article} />
              </>
            );
          })}
        </div>
      </div>
      <ArticlesPaginationHandle
        currentPageIdx={currentPageIdx}
        setCurrentPageIdx={setCurrentPageIdx}
        numPages={numPages}
      />
    </main>
  );
};

export default ArticlesView;
