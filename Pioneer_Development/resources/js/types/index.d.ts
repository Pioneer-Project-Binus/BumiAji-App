import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

// =================================================================
// 1. SHARED INERTIA & PAGE PROPS
// =================================================================

/**
 * Defines the props that are shared across all pages,
 * provided by Laravel's HandleInertiaRequests middleware.
 */
export interface InertiaSharedProps {
    auth: {
        user: User;
        // You can add other auth-related properties like roles or permissions here
        // can: { [key: string]: boolean };
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

// Tipe untuk link paginasi dari Laravel
export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Tipe untuk objek respons paginasi dari Laravel
export interface PaginatedResponse<T> {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface Galery {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    type: 'photo' | 'video';
    filePath: string; // Ini adalah path mentah dari database
    displayOrder: number | null;
    
    // Properti ini ditambahkan di controller, jadi bersifat opsional
    filePath?: string | null; 
}
// =================================================================
// 2. CORE & UTILITY TYPES
// =================================================================

/**
 * Represents a standard user of the application.
 */
export interface User {
    id: number;
    name: string;
    email: string;
    avatar_url?: string; // Accessor for full URL is often helpful
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

/**
 * Represents an author, which could be a simplified User or a separate entity.
 */
export interface Author {
    id: number;
    name: string;
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

/**
 * Represents common filter parameters passed to index pages.
 */
export interface Filter {
    search?: string;
    status?: string;
    [key: string]: any; // Allows for other dynamic filter keys
}


// =================================================================
// 3. APPLICATION-SPECIFIC MODELS
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
    category_id: number;
    category?: CategoryArticle; // Optional relation
    author_id: number;
    author?: Author; // Optional relation
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

export interface PhotoProduct {
    id: number;
    title: string;
    file_path_url: string; // Accessor for full URL
    display_order?: number;
    created_at: string;
    updated_at: string;
}

export type ProductStatus = 'draft' | 'published' | 'out_of_stock';

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    status: ProductStatus;
    category_id: number | null;
    category?: CategoryProduct; // Optional relation
    photos?: PhotoProduct[]; // Optional relation
    creator?: User; // Optional relation
    updater?: User; // Optional relation
    created_at: string;
    updated_at: string;
}


export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

/**

 * Represents a group of navigation items, often used for sidebar sections.
 */
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

declare module '@/components/input-error' {
    const InputError: React.FC<InputErrorProps>;
    export default InputError;
}

declare module '@/components/pagination' {
    const Pagination: React.FC<PaginationProps>;
    export default Pagination;
}