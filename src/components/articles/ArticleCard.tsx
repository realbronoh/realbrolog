'use client';
import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';
import Image from 'next/image';
import ClockIcon from '../../../static/images/clock_outline.svg';

const ArticleCard = (props: { article: Article }) => {
  const { article } = props;
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
          <Image src={ClockIcon} alt="Posted on" width={16} height={16} />{' '}
          <span>{article.created.toLocaleString()}</span>
        </p>
      </div>
    </Link>
  );
};

export default ArticleCard;
