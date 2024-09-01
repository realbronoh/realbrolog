'use client';

import { redirect } from '@/navigation';

const ArticlePage = (props: {
  params: {
    id: string;
  };
}) => {
  const { id } = props.params;
  return redirect(`/post/${id}`);
};

export default ArticlePage;
