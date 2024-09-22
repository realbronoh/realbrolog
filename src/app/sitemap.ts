import { LOCALES } from '@/constants/intl';
import { BASE_URL } from '@/constants/misc';
import { getPostManager } from '@/utils/postManager';
import type { MetadataRoute } from 'next';

const generateBasicLinks = () => {
  return [
    {
      url: `${BASE_URL}/en/home`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/ko/home`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/en/posts`,
      lastModified: new Date(),
      // No alternates here because the contents differ
    },
    {
      url: `${BASE_URL}/ko/posts`,
      lastModified: new Date(),
      // No alternates here because the contents differ
    },
  ];
};

const generatePostLinks = () => {
  const links: { url: string; lastModified: Date }[] = [];
  LOCALES.forEach((locale) => {
    const posts = getPostManager().getPostByLocale(locale);
    posts.forEach((post) => {
      const link = {
        url: `${BASE_URL}/${locale}/post/${post.id}`,
        lastModified: new Date(),
      };
      links.push(link);
    });
  });
  return links;
};

const sitemap = (): MetadataRoute.Sitemap => {
  return [...generateBasicLinks(), ...generatePostLinks()];
};

export default sitemap;
