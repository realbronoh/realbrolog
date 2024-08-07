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
