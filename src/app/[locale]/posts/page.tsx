import React from 'react';
import { REALBROLOG_NAME } from '@/constants/misc';
import { unstable_setRequestLocale } from 'next-intl/server';
import { LOCALES } from '@/constants/intl';
import PostsView from '@/components/posts/PostsView';
import { getPostManager } from '@/utils/postManager';
import { Metadata } from 'next';

interface PostsPageProps {
  params: {
    locale: string;
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
  const { locale } = props.params;
  unstable_setRequestLocale(locale);
  const posts = getPostManager().getPostByLocale(locale);
  return <PostsView posts={posts} />;
};

export default PostsPage;
