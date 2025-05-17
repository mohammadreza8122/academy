export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  summary: string;
  featured_image: string | null;
  author: {
    id: number;
    username: string | null;
    email: string;
    first_name: string;
    last_name: string;
  };
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
  };
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  status: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  view_count: number;
}