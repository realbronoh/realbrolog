import {
  ARTICLES_DIR,
  DUMMY_ARTICLE_CREATED,
  DUMMY_ARTICLE_ID,
  MARKDOWN_EXT,
} from '@/constants/article';
import { Article } from '@/types/article';
import fs from 'fs';
import matter from 'gray-matter';

class ArticleManager {
  private _articles: Article[] = [];

  constructor() {
    this._articles = this.getArticleMetaData();
  }

  public get articles() {
    return this._articles;
  }

  private getArticleMetaData = () => {
    const basePath = ARTICLES_DIR;
    const dir = `${basePath}/`;
    const files = fs.readdirSync(dir);
    const markdownFiles = files.filter((file) => file.endsWith(MARKDOWN_EXT));

    const articles = markdownFiles.map((filename) => {
      const filePath = `${basePath}/${filename}`;
      const content = fs.readFileSync(filePath, 'utf8');
      const matterResult = matter(content);
      const title = filename.replace(MARKDOWN_EXT, '');
      const article: Article = {
        slug: title.replaceAll(/\s+/g, '_'),
        title,
        content: matterResult.content,
        id: matterResult.data.id?.toString() ?? DUMMY_ARTICLE_ID,
        // TODO: adjust KST using luxon
        created: matterResult.data.created
          ? new Date(matterResult.data.created)
          : DUMMY_ARTICLE_CREATED,
        tags: matterResult.data.tags ?? [],
        category: matterResult.data.category,
      };
      return article;
    });
    return articles;
  };

  public getArticleBySlug = (slug: string) => {
    return this._articles.find((article) => article.slug === slug);
  };
}

let articleManager: ArticleManager | undefined = undefined;

export const getArticleManager = () => {
  if (articleManager === undefined) {
    articleManager = new ArticleManager();
  }
  return articleManager;
};
