// @/types/index.d.ts (add or update these)

// ... your existing types (InertiaSharedProps, BreadcrumbItem, ProductStatus etc.)

export interface Product {
    id: number;
    productName: string;
    slug: string;
    // Add other product fields if needed by photo product forms/views
}

export interface PhotoProduct {
    id: number;
    productId: number;
    product?: Product; // Eager loaded relation
    title: string;
    slug: string;
    filePath: string;
    file_url?: string; // Accessor from backend
    displayOrder: number;
    isDeleted: boolean; // Though usually filtered out
    createdAt?: string;
    updatedAt?: string;
    // createdBy, updatedBy if you plan to display them
}

export interface PhotoProductFilters {
    search?: string;
    productId?: string | number; // Changed from product_id to match controller
}

// For paginated data
export interface PaginatedData<T> {
    data: T[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
    current_page: number;
    first_page_url: string;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

// For controller 'can' prop
export interface PhotoProductCan {
    create_photo_product?: boolean;
    edit_photo_product?: boolean;
    // delete_photo_product if you add it
}

export interface QueryParams {
    [key: string]: string | number | undefined;
}

// Example of what might be in your InertiaSharedProps if not already defined
// export interface InertiaSharedProps {
//     auth: {
//         user: User | null; // Define User type
//         can?: any; // Permissions
//     };
//     flash: {
//         success?: string;
//         error?: string;
//     };
//     errors: Record<string, string>; // Global errors
// }