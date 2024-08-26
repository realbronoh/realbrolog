'use client';

import { redirect } from '@/navigation';

const ArticlePage = (props: {
  params: {
    slug: string;
  };
}) => {
  const { slug } = props.params;
  return redirect(`/post/${slug}`);
};

export default ArticlePage;
