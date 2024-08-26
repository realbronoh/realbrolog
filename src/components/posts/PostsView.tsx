'use client';

import { Post } from '@/types/post';
import React, { useState } from 'react';
import PostsPaginationHandle from './PostsPagination';
import PostCard from './PostCard';
import { Separator } from '../ui/separator';

const DEFAULT_NUM_POSTS_PER_PAGE = 5;

const PostsView = (props: { posts: Post[] }) => {
  const { posts: posts } = props;
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const postsLength = posts.length;
  const numPages =
    Math.floor((postsLength - 1) / DEFAULT_NUM_POSTS_PER_PAGE) + 1;

  const visiblePosts = posts.filter((_, idx) => {
    const firstPostIdxOfCurrentPage =
      currentPageIdx * DEFAULT_NUM_POSTS_PER_PAGE;
    const firstPostIdxOfNextPage =
      firstPostIdxOfCurrentPage + DEFAULT_NUM_POSTS_PER_PAGE;
    return firstPostIdxOfCurrentPage <= idx && idx < firstPostIdxOfNextPage;
  });

  return (
    <main className="flex flex-col gap-2 sm:gap-6">
      <h2 className="text-xl font-bold text-center sm:text-2xl md:text-start">
        Posts
      </h2>
      <div className="grid gap-6">
        <div className="grid gap-4">
          {visiblePosts.map((post, idx) => {
            return (
              <>
                {idx !== 0 && <Separator />}
                <PostCard post={post} />
              </>
            );
          })}
        </div>
      </div>
      <PostsPaginationHandle
        currentPageIdx={currentPageIdx}
        setCurrentPageIdx={setCurrentPageIdx}
        numPages={numPages}
      />
    </main>
  );
};

export default PostsView;
