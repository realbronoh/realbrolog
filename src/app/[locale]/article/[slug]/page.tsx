import StyledMarkdown from '@/components/markdown/StyledMarkdown';
import { Separator } from '@/components/ui/separator';
import { LOCALES } from '@/constants/intl';
import { REALBROLOG_NAME } from '@/constants/misc';
import { Article } from '@/types/article';
import { getArticleManager } from '@/utils/articleManager';
import { calculateReadingTime } from '@/utils/misc';
import { DateTime } from 'luxon';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
  const paths: {
    locale: string;
    slug: string;
  }[] = [];

  LOCALES.forEach((locale) => {
    const articles = getArticleManager().getArticleByLocale(locale);
    articles.forEach((article) => {
      paths.push({
        locale,
        slug: article.slug,
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
  const id = (params.slug ?? '').replaceAll('_', ' ');
  return {
    title: `${REALBROLOG_NAME} | Article ${id}`,
  };
};

interface ArticlePageProps {
  params: {
    slug: string;
    locale: string;
  };
}

const ArticlePage = (props: ArticlePageProps) => {
  const { slug, locale } = props.params;
  const article = getArticleManager().getArticleBySlug(slug);
  unstable_setRequestLocale(locale);

  if (article === undefined) {
    // TODO: alert and redirect to /articles
    return notFound();
  }

  return (
    <main className="prose">
      <ArticleHeader article={article} />
      <article>
        <StyledMarkdown markdown={article.content} />
      </article>
    </main>
  );
};

const ArticleHeader = (props: { article: Article }) => {
  const { title, content, created } = props.article;
  const formattedDateString = DateTime.fromJSDate(created).toLocaleString({
    dateStyle: 'medium',
  });
  const readingTimeMin = calculateReadingTime(content);
  return (
    <header>
      <div className="text-sm mb-2">
        {formattedDateString} • {readingTimeMin} min read
      </div>
      <h1 className="text-xl sm:text-2xl">{title}</h1>
      <Separator />
    </header>
  );
};

export default ArticlePage;
