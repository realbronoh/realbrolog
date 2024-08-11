import {
  ARTICLES_DIR,
  DUMMY_ARTICLE_ID,
  MARKDOWN_EXT,
} from '@/constants/article';
import { KST_TIME_OFFSET_HOUR, KST_ZONE } from '@/constants/misc';
import { Article } from '@/types/article';
import fs from 'fs';
import matter from 'gray-matter';
import { DateTime } from 'luxon';

class ArticleManager {
  private _articles: Article[] = [];

  constructor() {
    this._articles = this.loadArticles();
  }

  public get articles() {
    return this._articles;
  }

  public getArticleByLocale = (locale: string) => {
    return this._articles.filter(({ lang }) => locale === lang);
  };

  private loadArticles = () => {
    const basePath = ARTICLES_DIR;
    const languages = fs.readdirSync(basePath);

    const loadedArticles: Article[] = [];
    for (const lang of languages) {
      const files = fs.readdirSync(`${basePath}/${lang}`);
      const markdownFiles = files.filter((file) => file.endsWith(MARKDOWN_EXT));

      markdownFiles.forEach((filename) => {
        const filePath = `${basePath}/${lang}/${filename}`;
        const content = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(content);
        const title = matterResult.data.title ?? '';
        const created = this.handleCreated(matterResult.data.created);
        const id =
          (matterResult.data.id as string | undefined)?.toString() ??
          DUMMY_ARTICLE_ID;
        const article: Article = {
          lang,
          id,
          slug: id,
          title,
          subtitle: matterResult.data.subtitle ?? '',
          content: matterResult.content,
          created,
          tags: matterResult.data.tags ?? [],
          category: matterResult.data.category,
        };

        loadedArticles.push(article);
      });
    }

    const sortedArticlesDesc = loadedArticles.sort(
      (a, b) => b.created.getTime() - a.created.getTime(),
    );

    return sortedArticlesDesc;
  };

  public getArticleBySlug = (slug: string) => {
    return this._articles.find((article) => article.slug === slug);
  };

  private handleCreated = (created: string | Date | undefined): Date => {
    if (typeof created === 'string') {
      return DateTime.fromISO(created, { zone: KST_ZONE }).toJSDate();
    }
    if (created instanceof Date) {
      return (
        DateTime.fromJSDate(created)
          // imported Date by gray-matter is utc despite of KST format
          .minus({ hours: KST_TIME_OFFSET_HOUR })
          .setZone(KST_ZONE)
          .toJSDate()
      );
    }
    return DateTime.now().setZone(KST_ZONE).toJSDate();
  };
}

let articleManager: ArticleManager | undefined = undefined;

export const getArticleManager = () => {
  if (articleManager === undefined) {
    articleManager = new ArticleManager();
  }
  return articleManager;
};
