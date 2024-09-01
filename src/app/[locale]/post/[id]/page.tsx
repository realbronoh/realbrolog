import TagBadge from '@/components/posts/TagBadge';
import StyledMarkdown from '@/components/markdown/StyledMarkdown';
import { Separator } from '@/components/ui/separator';
import { LOCALES } from '@/constants/intl';
import { REALBROLOG_NAME } from '@/constants/misc';
import { Post } from '@/types/post';
import { calculateReadingTime } from '@/utils/misc';
import { DateTime } from 'luxon';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getPostManager } from '@/utils/postManager';

export const generateStaticParams = async () => {
  const paths: {
    locale: string;
    id: string;
  }[] = [];

  LOCALES.forEach((locale) => {
    const posts = getPostManager().getPostByLocale(locale);
    posts.forEach((post) => {
      paths.push({
        locale,
        id: post.id,
      });
    });
  });

  return paths;
};

export const generateMetadata = async ({
  params,
}: {
  params: any;
  searchParams: any;
}) => {
  const id = (params.id ?? '').replaceAll('_', ' ');
  return {
    title: `${REALBROLOG_NAME} | Post ${id}`,
  };
};

interface PostPageProps {
  params: {
    id: string;
    locale: string;
  };
}

const PostPage = (props: PostPageProps) => {
  const { id, locale } = props.params;
  const post = getPostManager().getPostById(id);
  unstable_setRequestLocale(locale);

  if (post === undefined) {
    // TODO: alert and redirect to /posts
    return notFound();
  }

  return (
    <main className="prose">
      <PostHeader post={post} />
      <article>
        <StyledMarkdown markdown={post.content} />
      </article>
    </main>
  );
};

const PostHeader = (props: { post: Post }) => {
  const { title, content, created } = props.post;
  const formattedDateString = DateTime.fromJSDate(created).toLocaleString({
    dateStyle: 'medium',
  });
  const readingTimeMin = calculateReadingTime(content);
  return (
    <header>
      <div className="flex justify-between gap-2 text-sm mb-2">
        <div>
          {formattedDateString} • {readingTimeMin} min read
        </div>
        <Tags post={props.post} />
      </div>
      <h1 className="text-xl sm:text-2xl">{title}</h1>
      <Separator />
    </header>
  );
};

const Tags = ({ post }: { post: Post }) => {
  return (
    <div className="flex gap-1">
      {post.tags.map((tag) => (
        <TagBadge tag={tag} key={`${post.id}-tag-${tag}`} />
      ))}
    </div>
  );
};

export default PostPage;
