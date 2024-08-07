import StyledMarkdown from '@/components/markdown/StyledMarkdown';
import { Separator } from '@/components/ui/separator';
import { Article } from '@/types/article';
import { getArticleManager } from '@/utils/articleManager';
import { calculateReadingTime } from '@/utils/misc';
import { DateTime } from 'luxon';

export const generateStaticParams = async () => {
  const articles = getArticleManager().articles;

  return articles.map((article) => {
    return {
      slug: article.slug,
    };
  });
};

export const generateMetadata = async ({
  params,
}: {
  params: any;
  searchParams: any;
}) => {
  const id = (params.slug ?? '').replaceAll('_', ' ');
  return {
    title: `realbrolog | Article ${id}`,
  };
};

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

const ArticlePage = (props: ArticlePageProps) => {
  const { slug } = props.params;
  const article = getArticleManager().getArticleBySlug(slug);

  if (article === undefined) {
    return <div>404</div>;
  }

  return (
    <main className="prose-sm md:prose">
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
      <h1>{title}</h1>
      <Separator />
    </header>
  );
};

export default ArticlePage;
