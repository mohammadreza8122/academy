export interface Lesson {
  id: number;
  title: string;
  content: string;
  video_url: string;
  duration: number;
  order: number;
  is_free_preview: boolean;
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  instructor: {
    id: number;
    username: string | null;
    email: string;
    first_name: string;
    last_name: string;
  };
  thumbnail: string;
  price: string;
  is_free: boolean;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  chapters: Chapter[];
}