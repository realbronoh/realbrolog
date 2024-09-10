'use client';

import React from 'react';
import { Post } from '@/types/post';
import { DateTime } from 'luxon';
import { calculateReadingTime } from '@/utils/misc';
import { Link } from '@/navigation';
import TagBadge from './TagBadge';

const PostCard = (props: { post: Post }) => {
  const { post } = props;
  const formattedDateString = DateTime.fromJSDate(post.created).toLocaleString({
    dateStyle: 'medium',
  });
  const readingTimeMin = calculateReadingTime(post.content);
  return (
    <Link href={`/post/${post.id}`} prefetch={false}>
      <div className="flex flex-col gap-2 md:gap-4 p-2 md:p-4 rounded-lg transition-shadow">
        <h3 className="md:text-lg font-medium group-hover:underline">
          {post.title}
        </h3>
        <p className="text-muted-foreground line-clamp-2 text-sm md:text-lg">
          {/* todo: cut or make ellipsis over 2 line. */}
          {post.description}
        </p>
        <div className="flex gap-4 items-center text-xs">
          <span>
            {formattedDateString} • {readingTimeMin} min read
          </span>
          <Tags post={post} />
        </div>
      </div>
    </Link>
  );
};

const Tags = ({ post }: { post: Post }) => {
  return (
    <div className="flex gap-0.5">
      {post.tags.map((tag) => (
        <TagBadge tag={tag} key={`${post.id}-tag-${tag}`} />
      ))}
    </div>
  );
};

export default PostCard;
