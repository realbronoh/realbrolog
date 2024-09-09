import { KST_TIME_OFFSET_HOUR, KST_ZONE } from '@/constants/misc';
import { Post } from '@/types/post';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DateTime } from 'luxon';
import { DUMMY_POST_ID, MARKDOWN_EXT, POSTS_DIR } from '@/constants/post';

class PostManager {
  private _posts: Post[] = [];

  constructor() {
    this._posts = this.loadPosts();
  }

  public get posts() {
    return this._posts;
  }

  public getPostByLocale = (locale: string) => {
    return this._posts.filter(({ lang }) => locale === lang);
  };

  public getPostById = (id: string) => {
    return this._posts.find((post) => post.id === id);
  };

  private loadPosts = () => {
    const basePath = path.join(process.cwd(), POSTS_DIR);
    const languages = fs.readdirSync(basePath).filter((item) => {
      // languages are directory.
      return fs.statSync(path.join(basePath, item)).isDirectory();
    });

    const loadedPosts: Post[] = [];
    for (const lang of languages) {
      const basePathWithLang = `${basePath}/${lang}`;
      const markdownFiles = this.readMarkdownFilesRecursively(basePathWithLang);

      markdownFiles.forEach((filePath) => {
        const post = this.loadPost(filePath, lang);
        loadedPosts.push(post);
      });
    }

    const sortedPostsDesc = loadedPosts.sort(
      (a, b) => b.created.getTime() - a.created.getTime(),
    );

    return sortedPostsDesc;
  };

  private loadPost = (filePath: string, lang: string) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(content);
    const title = matterResult.data.title ?? '';
    const created = this.handleCreated(matterResult.data.created);
    const id =
      (matterResult.data.id as string | undefined)?.toString() ?? DUMMY_POST_ID;
    const post: Post = {
      lang,
      id,
      title,
      description: matterResult.data.description ?? '',
      content: matterResult.content,
      created,
      tags: matterResult.data.tags ?? [],
      category: matterResult.data.category,
    };
    return post;
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

let postManager: PostManager | undefined = undefined;

export const getPostManager = () => {
  if (postManager === undefined) {
    postManager = new PostManager();
  }
  return postManager;
};
