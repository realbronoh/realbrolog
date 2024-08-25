import {
  ARTICLES_DIR,
  DUMMY_ARTICLE_ID,
  MARKDOWN_EXT,
} from '@/constants/article';
import { KST_TIME_OFFSET_HOUR, KST_ZONE } from '@/constants/misc';
import { Article } from '@/types/article';
import fs from 'fs';
import path from 'path';
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

  public getArticleBySlug = (slug: string) => {
    return this._articles.find((article) => article.slug === slug);
  };

  private loadArticles = () => {
    const basePath = ARTICLES_DIR;
    const languages = fs.readdirSync(basePath).filter((item) => {
      // languages are directory.
      return fs.statSync(path.join(basePath, item)).isDirectory();
    });

    const loadedArticles: Article[] = [];
    for (const lang of languages) {
      const basePathWithLang = `${basePath}/${lang}`;
      const markdownFiles = this.readMarkdownFilesRecursively(basePathWithLang);

      markdownFiles.forEach((filePath) => {
        const article = this.loadArticle(filePath, lang);
        loadedArticles.push(article);
      });
    }

    const sortedArticlesDesc = loadedArticles.sort(
      (a, b) => b.created.getTime() - a.created.getTime(),
    );

    return sortedArticlesDesc;
  };

  private loadArticle = (filePath: string, lang: string) => {
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
    return article;
  };

  private readMarkdownFilesRecursively(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);

    list.forEach((file) => {
      const filePath = path.resolve(dir, file);
      const stat = fs.statSync(filePath);

      if (stat && stat.isDirectory()) {
        const markdownFilesSubDir = this.readMarkdownFilesRecursively(filePath);
        results = [...results, ...markdownFilesSubDir];
        return;
      }
      if (file.endsWith(MARKDOWN_EXT)) {
        results.push(filePath);
      }
    });
    return results;
  }

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
