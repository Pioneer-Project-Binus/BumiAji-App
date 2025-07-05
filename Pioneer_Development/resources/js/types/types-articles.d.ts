export interface Author {
  id: string;
  name: string;
  email?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
  status: 'draft' | 'published' | 'archived';
  categoryId?: string;
  authorId?: string;
  author?: Author;
  category?: Category;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
  isDeleted: boolean;
}

export interface PopularArticle {
  id: string;
  title: string;
  category: string;
  slug: string;
}

export interface PopularBarItem {
  id: number;
  title: string;
}

export type FontSize = 'small' | 'medium' | 'large'; 