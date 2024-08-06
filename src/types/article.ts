export interface Article {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  content: string;
  created: Date;
  tags: string[];
  category?: string;
}
