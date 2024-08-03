export interface Article {
  id: string;
  title: string;
  content: string;
  created: Date;
  tags: string[];
  category?: string;
}
