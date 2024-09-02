import { REALBROLOG_BASE_URL } from '@/constants/seo';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${REALBROLOG_BASE_URL}/sitemap.xml`,
  };
}
