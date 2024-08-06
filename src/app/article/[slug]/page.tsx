import StyledMarkdown from '@/components/markdown/StyledMarkdown';
import { getArticleManager } from '@/utils/articleManager';

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
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const id = (params.slug ?? '').replaceAll('_', ' ');
  return {
    title: `realbrolog | ${id}`,
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
    <main className="prose">
      <article className="prose">
        <StyledMarkdown markdown={article.content} />
      </article>
    </main>
  );
};

export default ArticlePage;
