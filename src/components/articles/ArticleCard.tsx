'use client';

import React from 'react';
import { Article } from '@/types/article';
import { DateTime } from 'luxon';
import { calculateReadingTime } from '@/utils/misc';
import { Link } from '@/navigation';

const ArticleCard = (props: { article: Article }) => {
  const { article } = props;
  const formattedDateString = DateTime.fromJSDate(
    article.created,
  ).toLocaleString({ dateStyle: 'medium' });
  const readingTimeMin = calculateReadingTime(article.content);
  return (
    <Link href={`/article/${article.slug}`} prefetch={false}>
      <div className="flex flex-col gap-2 md:gap-4 p-2 md:p-4 rounded-lg transition-shadow">
        <h3 className="md:text-lg font-medium group-hover:underline">
          {article.title}
        </h3>
        <p className="text-muted-foreground line-clamp-2 text-sm md:text-lg">
          {article.subtitle}
        </p>
        <p className="flex gap-2 items-center text-xs">
          {formattedDateString} • {readingTimeMin} min read
        </p>
      </div>
    </Link>
  );
};

export default ArticleCard;
