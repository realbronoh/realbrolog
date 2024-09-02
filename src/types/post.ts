export interface Post {
  lang: string;
  id: string;
  title: string;
  description: string;
  content: string;
  created: Date;
  tags: string[];
  category?: string;
}
