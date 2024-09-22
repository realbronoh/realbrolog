import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export const getPageContent = (pagePath: string, locale: string) => {
  const basePath = path.join(process.cwd(), 'static/pages');
  const filePath = path.join(basePath, `${locale}/${pagePath}.md`);
  const contentRaw = fs.readFileSync(filePath, 'utf8');
  const content = matter(contentRaw).content;
  return content;
};
