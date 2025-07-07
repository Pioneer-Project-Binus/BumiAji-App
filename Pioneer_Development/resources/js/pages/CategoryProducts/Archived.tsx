import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Layout & Types
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps, type CategoryProduct, type Paginated, type Filter } from '@/types';
import categoryProductRoutes from '@/routes/category-products';
import { dashboard } from '@/routes';

// UI Components & Icons
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from '@/components/pagination'; // Asumsi Anda memiliki komponen Pagination
import {
    Package,
    RefreshCw,
    ArrowUpCircle,
    Trash2,
    Search,
    FilterX,
    Calendar,
    Sparkles,
    FolderOpen,
} from 'lucide-react';

interface CategoryProductWithExtras extends CategoryProduct {
    products_count?: number;
    is_featured?: boolean;
    status?: 'active' | 'inactive';
    // Assuming createdAt is available on CategoryProduct
    created_at?: string;
    deleted_at?: string; // Menambahkan deleted_at untuk item yang diarsipkan
}

interface EnhancedFilter extends Filter {
    search?: string;
}

interface EnhancedProps extends InertiaSharedProps {
    categoryProducts: Paginated<CategoryProductWithExtras>;
    filters: EnhancedFilter;
}

// Fungsi untuk menghilangkan tag HTML dari text
const stripHtml = (html: string | null): string => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
};

// Fungsi untuk truncate text dengan panjang tertentu
const truncateText = (text: string, maxLength: number = 60): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export default function ArchiveCategoryProducts({ categoryProducts, filters }: EnhancedProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(categoryProductRoutes.archived().url, { search }, { preserveState: true, replace: true });
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [search]);

    const handleRestore = (slug: string) => {
        router.put(categoryProductRoutes.restore(slug).url, {}, {
            onSuccess: () => toast.success('Category restored.'),
            onError: () => toast.error('Failed to restore category.'),
        });
    };

    const handlePermanentDelete = (slug: string) => {
        if (!confirm('Are you sure you want to permanently delete this category? This action cannot be undone.')) {
            return;
        }
        router.delete(categoryProductRoutes.deletePermanent(slug).url, {
            onSuccess: () => toast.success('Category permanently deleted.'),
            onError: () => toast.error('Failed to delete category permanently.'),
        });
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.get(categoryProductRoutes.archived().url, { search }, {
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Archived categories refreshed.');
            },
            preserveState: true,
            replace: true,
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Category Management', href: categoryProductRoutes.index().url },
        { title: 'Archived Categories', href: categoryProductRoutes.archived().url },
    ];

    const clearFilters = () => {
        setSearch('');
        router.get(categoryProductRoutes.archived().url, {}, { preserveState: true, replace: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Archived Product Categories" />
            <div className="min-h-screen py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 dark:from-slate-900 dark:via-emerald-900/20 dark:to-slate-900">
                <div className="max-w-7xl mx-auto">
                    {/* Enhanced Header with Stats */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white shadow-2xl shadow-emerald-500/30">
                                    <Trash2 className="h-8 w-8" />
                                </div>
                                <div className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                    <Sparkles className="h-3 w-3 text-white" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                                    Archived Categories
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                    Manage your soft-deleted product categories
                                </p>
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                                        <Package className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                            {categoryProducts.total} Archived Categories
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-teal-100 dark:bg-teal-900/30 rounded-full">
                                        <FolderOpen className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                        <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                                            Showing {categoryProducts.data.length} items
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link href={categoryProductRoutes.index().url}>
                            <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 hover:from-pink-600 hover:via-purple-600 hover:to-purple-700 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 h-12 px-8 rounded-xl group">
                                Back to Product Categories
                            </Button>
                        </Link>
                    </div>

                    {/* Enhanced Filters */}
                    <div className="mb-8 p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-emerald-200/50 dark:border-emerald-700/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <div className="relative">
                                <label htmlFor="search" className="block text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-2">
                                    Search Archived Categories
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-400 dark:text-emerald-500" />
                                    <Input
                                        id="search"
                                        type="text"
                                        placeholder="Search by name or description..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10 h-12 bg-white/80 dark:bg-slate-700/80 border-emerald-200 dark:border-emerald-700/50 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all duration-200"
                                    />
                                    {search && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={clearFilters}
                                    variant="outline"
                                    className="w-full md:w-auto h-12 bg-white/80 dark:bg-slate-700/80 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 rounded-xl transition-all duration-200"
                                >
                                    <FilterX className="h-4 w-4 mr-2" /> Clear Filters
                                </Button>
                                <Button
                                    onClick={handleRefresh}
                                    disabled={isRefreshing}
                                    variant="outline"
                                    className="w-full md:w-auto h-12 bg-white/80 dark:bg-slate-700/80 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 rounded-xl transition-all duration-200"
                                >
                                    <RefreshCw className={`h-5 w-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh Archive
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Archived Category Table */}
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-emerald-200/50 dark:border-emerald-700/30 overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-900/30 dark:via-green-900/30 dark:to-teal-900/30 border-b border-emerald-200/50 dark:border-emerald-700/30">
                                    <TableHead className="text-emerald-800 dark:text-emerald-200 font-semibold py-4">
                                        <div className="flex items-center gap-2">
                                            <Package className="h-4 w-4" />
                                            Category Name
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-emerald-800 dark:text-emerald-200 font-semibold py-4">Description</TableHead>
                                    <TableHead className="text-emerald-800 dark:text-emerald-200 font-semibold text-center py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                                            Products
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-emerald-800 dark:text-emerald-200 font-semibold py-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            Archived At
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-emerald-800 dark:text-emerald-200 font-semibold text-right py-4">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categoryProducts.data.length > 0 ? categoryProducts.data.map((category, index) => (
                                    <TableRow
                                        key={category.id}
                                        className="hover:bg-gradient-to-r hover:from-emerald-50/50 hover:via-green-50/50 hover:to-teal-50/50 dark:hover:from-emerald-900/20 dark:hover:via-green-900/20 dark:hover:to-teal-900/20 border-b border-emerald-100/30 dark:border-emerald-800/30 transition-all duration-200 group"
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                                    {category.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                                                        {category.name}
                                                    </div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                                        ID: {category.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 max-w-xs">
                                            <div className="text-slate-600 dark:text-slate-400">
                                                {category.description ? (
                                                    <div className="relative">
                                                        <p className="leading-relaxed">
                                                            {truncateText(stripHtml(category.description))}
                                                        </p>
                                                        {stripHtml(category.description).length > 60 && (
                                                            <div className="absolute bottom-0 right-0 bg-gradient-to-l from-white dark:from-slate-800 to-transparent pl-8 pr-2">
                                                                <span className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer">
                                                                    more...
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-400 dark:text-slate-500 italic">No description</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center py-4">
                                            <div className="flex items-center justify-center">
                                                <div className="relative">
                                                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 dark:from-emerald-900/30 dark:via-green-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 font-bold text-sm shadow-lg border-2 border-emerald-200/50 dark:border-emerald-700/50">
                                                        {category.products_count ?? '0'}
                                                    </span>
                                                    {category.products_count && category.products_count > 0 && (
                                                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                                            <div className="h-2 w-2 bg-white rounded-full"></div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="text-slate-600 dark:text-slate-400">
                                                {category.updated_at ? (
                                                    <div>
                                                        <div className="font-medium">
                                                            {format(new Date(category.updated_at), "dd MMM yyyy")}
                                                        </div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                                            {format(new Date(category.updated_at), "HH:mm")}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-400 dark:text-slate-500 italic">N/A</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                onClick={() => handleRestore(category.slug)}
                                                                variant="outline"
                                                                size="icon"
                                                                className="border-blue-300 dark:border-blue-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:border-blue-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 transition-all duration-200 h-9 w-9 rounded-lg group/restore"
                                                            >
                                                                <ArrowUpCircle className="h-4 w-4 group-hover/restore:scale-110 transition-transform" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent><p>Restore Category</p></TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                onClick={() => handlePermanentDelete(category.slug)}
                                                                variant="outline"
                                                                size="icon"
                                                                className="border-red-300 dark:border-red-600 hover:border-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:border-red-400 dark:hover:text-red-400 dark:hover:bg-red-900/30 transition-all duration-200 h-9 w-9 rounded-lg group/delete"
                                                            >
                                                                <Trash2 className="h-4 w-4 group-hover/delete:scale-110 transition-transform" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent><p>Delete Permanently</p></TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-16 text-slate-500 dark:text-slate-400">
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <div className="relative">
                                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 dark:from-emerald-900/30 dark:via-green-900/30 dark:to-teal-900/30 flex items-center justify-center border-4 border-emerald-200/50 dark:border-emerald-700/50">
                                                        <FolderOpen className="h-10 w-10 text-emerald-500 dark:text-emerald-400" />
                                                    </div>
                                                    <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                                        <Sparkles className="h-4 w-4 text-white" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-xl font-semibold text-slate-600 dark:text-slate-300">No archived categories found</p>
                                                    <p className="text-sm text-slate-400 dark:text-slate-500 max-w-sm">
                                                        {search ?
                                                            `No archived categories match your search "${search}". Try a different search term.` :
                                                            "All categories are currently active. Nothing to see here!"
                                                        }
                                                    </p>
                                                </div>
                                                {search && (
                                                    <Button
                                                        onClick={clearFilters}
                                                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg mt-4"
                                                    >
                                                        <FilterX className="h-4 w-4 mr-2" /> Clear Search
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Enhanced Pagination */}
                    {categoryProducts.data.length > 0 && (
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <div className="flex items-center gap-1">
                                    <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                                    <span>Page {categoryProducts.current_page} of {categoryProducts.last_page}</span>
                                </div>
                                <span>•</span>
                                <span>{categoryProducts.total} total items</span>
                            </div>
                            <Pagination links={categoryProducts.links} />
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}