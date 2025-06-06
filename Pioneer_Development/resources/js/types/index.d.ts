import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    createdAt: string;
    updatedAt: string;
    [key: string]: unknown; // This allows for additional properties...
}

// resources/js/types/index.d.ts
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    // tambahkan properti lain jika ada
}

export interface InertiaSharedProps {
    auth: {
        user: User;
        // tambahkan properti auth lain jika ada (misal roles, permissions)
    };
    errors: Record<string, string>;
    flash: {
        success?: string;
        error?: string;
        // tipe flash message lain
    };
    // ziggy: object; // jika menggunakan Ziggy
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface PaginatedData<T> {
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

export type ProductStatus = 'draft' | 'published' | 'outofstock';

export interface CategoryProduct {
    id: number;
    name: string;
    slug: string;
    description?: string;
    products_count?: number; // Jika ada withCount
    createdAt: string; // atau Date
    updatedAt: string; // atau Date
    // Tambahkan field lain jika ada
}

export interface PhotoProducts {
    id: number;
    productId: number;
    product?: Product; // Relasi opsional jika di-load
    title: string;
    slug: string;
    filePath: string;
    file_path_url?: string; // Accessor untuk URL lengkap
    displayOrder?: number;
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    id: number;
    productName: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number | null;
    category?: CategoryProduct; // Relasi opsional
    status: ProductStatus;
    photos?: PhotoProducts[]; // Relasi opsional
    creator?: User; // Relasi opsional
    updater?: User; // Relasi opsional
    createdAt: string;
    updatedAt: string;
    // Tambahkan field lain seperti createdBy, updatedBy, isDeleted jika perlu di frontend
    // can?: { update: boolean, delete: boolean }; // Hak akses per item jika ada
}

// Komponen Pagination (contoh sederhana)
// Anda mungkin punya komponen Pagination yang lebih baik
declare module '@/components/pagination' {
    import React from 'react';
    interface PaginationProps {
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    }
    const Pagination: React.FC<PaginationProps>;
    export default Pagination;
}

// Pastikan InputError juga punya definisi jika belum
declare module '@/components/input-error' {
    import React from 'react';
    interface InputErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
        message?: string;
    }
    const InputError: React.FC<InputErrorProps>;
    export default InputError;
}
