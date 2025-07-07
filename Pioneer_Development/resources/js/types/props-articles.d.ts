import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Article, PopularArticle } from './types-articles';

export interface PageProps extends InertiaPageProps {
  article: Article;
  popularArticles?: PopularArticle[];
  relatedArticles?: PopularArticle[];
  auth?: any;
  errors?: any;
}

export interface FontSizeControllerProps {
  fontSize: string;
  onFontSizeChange: (size: string, className: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PopularBarItem {
  id: number;
  title: string;
  slug?: string;
}

export interface PopularBarProps {
  items?: PopularBarItem[];
  className?: string;
} 