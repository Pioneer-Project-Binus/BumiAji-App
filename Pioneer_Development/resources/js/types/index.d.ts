import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

// =================================================================
// 1. SHARED & UTILITY TYPES
// =================================================================

/**
 * Defines the props that are shared across all pages,
 * provided by Laravel's HandleInertiaRequests middleware.
 */
export interface InertiaSharedProps {
    auth: {
        user: User | null;
    };
    errors: Record<string, string>;
    flash: {
        success?: string;
        error?: string;
        info?: string;
        warning?: string;
    };
    ziggy: Config & { location: string };
}

/**
 * Represents a user entity in the application.
 */
export interface User {
    id: number;
    name: string;
    email: string;
    avatar_url?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

/**
 * Represents a simplified author, which could be a User or a separate entity.
 */
export interface Author {
    id: number;
    name: string;
}

/**
 * Represents an item in a breadcrumb navigation.
 */
export interface BreadcrumbItem {
    title: string;
    href: string;
}

/**
 * A generic interface for Laravel's paginated API responses.
 */
export interface Paginated<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

// =================================================================
// 2. APPLICATION-SPECIFIC MODELS
// =================================================================

// --- Articles ---

export interface CategoryArticle {
    id: number;
    name: string;
    slug: string;
    description: string;
    articles_count?: number; // from withCount
    created_at: string;
    updated_at: string;
}

export type ArticleStatus = 'draft' | 'published' | 'archived';

export interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    featuredImage?: string; // Accessor for full URL
    status: ArticleStatus;
    categoryId: number;
    category?: CategoryArticle;
    authorId: number;
    author?: Author;
    created_at: string;
    updated_at: string;
}

// --- Products ---

export interface CategoryProduct {
    id: number;
    name: string;
    slug: string;
    description?: string;
    products_count?: number; // from withCount
    created_at: string;
    updated_at: string;
}

export interface ProductPhoto {
    id: number;
    filePath: string; // This should be the full URL from the backend accessor
    title?: string;
    displayOrder?: number;
    slug?: string;
}

export type ProductStatus = 'draft' | 'published' | 'outofstock';

export interface Product {
    id: number;
    productName: string;
    slug: string;
    description: string; // Can contain HTML
    price: number;
    stock: number;
    status: ProductStatus;
    highlight?: boolean;
    categoryId: number | null;
    category?: CategoryProduct;
    photos: ProductPhoto[];
    creator?: User;
    updater?: User;
    created_at: string;
    updated_at: string;
    isDeleted?: boolean;
}

// --- Gallery ---

export interface Galery {
    id: string;
    createdBy: string;
    created_at: string;
    description: string;
    displayOrder: number;
    filePath: string;
    isDeleted: boolean;
    slug: string;
    title: string;
    type: string;
    updatedBy: string | null;
    updated_at: string;
}

// =================================================================
// 3. COMPONENT & UI-SPECIFIC TYPES
// =================================================================

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface PaginationProps {
    links: Paginated<any>['links'];
}

export interface InputErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

// Module declarations for components if needed
declare module '@/components/input-error' {
    const InputError: React.FC<InputErrorProps>;
    export default InputError;
}

declare module '@/components/pagination' {
    const Pagination: React.FC<PaginationProps>;
    export default Pagination;
}
