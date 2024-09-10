import React from 'react';
import { REALBROLOG_NAME } from '@/constants/misc';
import { unstable_setRequestLocale } from 'next-intl/server';
import { LOCALES } from '@/constants/intl';
import PostsView from '@/components/posts/PostsView';
import { getPostManager, PostManager } from '@/utils/postManager';
import { Metadata } from 'next';
import {
  calculatePageIdx,
  generatePostsPageUrl,
  handleTagValueFromQueryString,
} from '@/utils/misc';
import { redirect } from '@/navigation';
import { DEFAULT_NUM_POSTS_PER_PAGE } from '@/constants/post';

interface PostsPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

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

export const metadata: Metadata = {
  title: `Posts | ${REALBROLOG_NAME}`,
  description: 'Posts page of realbrolog',
};

const PostsPage = (props: PostsPageProps) => {
  const {
    params: { locale },
    searchParams: { page, tag },
  } = props;
  unstable_setRequestLocale(locale);
  const currentPageIdx = calculatePageIdx(page);
  const selectedTag = handleTagValueFromQueryString(tag);
  const posts = getPostManager().getPostByLocale(locale);
  const tags = PostManager.getTagsFromPosts(posts);
  const tagFilteredPosts = PostManager.filterPostsByTag(posts, selectedTag);
  const pagesLength =
    Math.floor((tagFilteredPosts.length - 1) / DEFAULT_NUM_POSTS_PER_PAGE) + 1;

  const visiblePosts = tagFilteredPosts.filter((_, idx) => {
    const firstPostIdxOfCurrentPage =
      currentPageIdx * DEFAULT_NUM_POSTS_PER_PAGE;
    const firstPostIdxOfNextPage =
      firstPostIdxOfCurrentPage + DEFAULT_NUM_POSTS_PER_PAGE;
    return firstPostIdxOfCurrentPage <= idx && idx < firstPostIdxOfNextPage;
  });

  const isInvalidPageIdx = currentPageIdx < 0 || pagesLength <= currentPageIdx;
  if (isInvalidPageIdx) {
    redirect(generatePostsPageUrl(0, selectedTag));
    return;
  }

  return (
    <PostsView
      posts={visiblePosts}
      currentPageIdx={currentPageIdx}
      pagesLength={pagesLength}
      selectedTag={selectedTag}
      tags={tags}
    />
  );
};

export default PostsPage;
