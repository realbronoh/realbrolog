export interface Article {
  lang: string;
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  content: string;
  created: Date;
  tags: string[];
  category?: string;
}
