export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  email: string;
  date: string;
  tags: string[];
  imageUrl?: string | null;
  comments: Comment[];
  status: 'draft' | 'published';
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  date: string;
  status: 'pending' | 'approved';
}

export interface BlogState {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
} 