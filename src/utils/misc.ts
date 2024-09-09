import {
  LANGUAGE_ENGLISH,
  LANGUAGE_KOREAN,
  LOCALE_ENGLISH,
  LOCALE_KOREAN,
} from '@/constants/intl';

export const calculateReadingTime = (markdown: string): number => {
  const plainText = markdown.replace(/<\/?[^>]+(>|$)/g, '');

  // Calculate word count
  const words = plainText.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  // Average reading speed (words per minute)
  const wordsPerMinute = 200;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  return readingTimeMinutes;
};

export const convertLocaleToLanguage = (locale: string) => {
  if (locale === LOCALE_KOREAN) return LANGUAGE_KOREAN;
  if (locale === LOCALE_ENGLISH) return LANGUAGE_ENGLISH;
  console.error(`Not supported locale ${locale}.`);
  return LANGUAGE_ENGLISH;
};

export const calculatePageIdx = (
  page: string | string[] | undefined,
): number => {
  if (page === undefined) return 0;
  if (page instanceof Array) return 0;

  const pageNum = Number(page);
  if (isNaN(pageNum)) return 0;
  if (!Number.isInteger(pageNum)) return 0;
  return pageNum;
};

export const generateQueryString = (
  params: Record<string, string | number | boolean | undefined>,
) => {
  const searchParams = new URLSearchParams();

  // Iterate over the params object and append each key-value pair to the URLSearchParams
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  // Convert URLSearchParams to a string
  return searchParams.toString();
};
