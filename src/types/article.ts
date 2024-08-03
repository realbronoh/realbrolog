export interface Article {
  slug: string;
  id: string;
  title: string;
  content: string;
  created: Date;
  tags: string[];
  category?: string;
}
