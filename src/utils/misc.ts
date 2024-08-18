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
