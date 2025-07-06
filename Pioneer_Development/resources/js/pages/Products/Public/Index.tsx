import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps, PaginatedData, CategoryProduct } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect, ChangeEvent, useCallback, useMemo } from 'react';
import productsRoute from '@/routes/products'; // Menggunakan nama variabel yang tidak konflik
import { dashboard } from '@/routes';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import Pagination from '@/components/pagination';
import { format as formatDateFns } from 'date-fns'; // Memberi nama alias yang lebih jelas

import {
    Package,
    TrendingUp,
    Edit3,
    TrendingDown,
    RefreshCw,
    Download,
    PlusCircle,
    Eye,
    Trash2,
    FilterX,
    Search,
    BarChart3
} from 'lucide-react';


const ALL_CATEGORIES_VALUE = "__ALL_CATEGORIES__";
const ALL_STATUS_VALUE = "__ALL_STATUS__";

interface Props extends InertiaSharedProps {
    products: PaginatedData<Product>;
    categories: CategoryProduct[];
    filters: {
        search?: string;
        category?: string;
        status?: string;
        sort?: string;
        direction?: 'asc' | 'desc';
    };
    stats?: {
        total_products: number;
        published_products: number;
        draft_products: number;
        out_of_stock: number;
        total_value: number;
    };
}

interface Product {
  id: string | number;
  productName: string;
  slug: string; // Make sure slug is available for routing
  category: {
    name: string;
    [key: string]: any; 
  };
  price: number;
  stock: number;
  status: 'published' | 'draft' | string; 
  createdAt: string; 
  description?: string; // Added for completeness from render
  photos?: Array<{ id: string | number; filePath: string }>; // Added for completeness
  [key: string]: any; 
}

interface Column<T> {
  key: string;           
  label: string;                       
  sortable?: boolean;               
  className?: string;                 
  render: (value: any, row: T) => React.ReactNode;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: dashboard().url },
    { title: 'Product Management', href: productsRoute.index().url },
];

export default function AdminProductIndex({ products: productsData, categories, filters, stats, auth }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const formatPrice = useMemo(() => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });
        return (price: number) => formatter.format(price);
    }, []);

    const formatNumber = useMemo(() => {
        const formatter = new Intl.NumberFormat('id-ID');
        return (num: number) => formatter.format(num);
    }, []);

    const handleFilterChange = useCallback(() => {
        router.get(productsRoute.index().url, {
            search: searchTerm,
            category: selectedCategory,
            status: selectedStatus,
            sort: filters.sort,
            direction: filters.direction,
        }, { preserveState: true, replace: true, preserveScroll: true });
    }, [searchTerm, selectedCategory, selectedStatus, filters.sort, filters.direction]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== (filters.search || '')) {
                handleFilterChange();
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, filters.search, handleFilterChange]);

    useEffect(() => {
        if (selectedCategory !== (filters.category || '') || selectedStatus !== (filters.status || '')) {
            handleFilterChange();
        }
    }, [selectedCategory, selectedStatus, filters.category, filters.status, handleFilterChange]);

    const clearFilters = useCallback(() => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedStatus('');
        router.get(productsRoute.index().url, {}, { preserveState: true, replace: true, preserveScroll: true });
    }, []);

    const handleSort = useCallback((column: string) => {
        const newDirection = filters.sort === column && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get(productsRoute.index().url, {
            search: searchTerm,
            category: selectedCategory,
            status: selectedStatus,
            sort: column,
            direction: newDirection,
        }, { preserveState: true, replace: true, preserveScroll: true });
    }, [searchTerm, selectedCategory, selectedStatus, filters.sort, filters.direction]);

    const handleDelete = useCallback((product: Product) => {
        if (confirm(`Anda yakin ingin menghapus "${product.productName}"? Tindakan ini adalah soft delete.`)) { 
            router.delete(productsRoute.destroy(product.slug).url, { // Assuming destroy uses slug
                preserveScroll: true,
            });
        }
    }, []);

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        router.reload({
            onFinish: () => setIsRefreshing(false),
        });
    }, []);

    // NEW: Handler for export button
    const handleExport = useCallback(() => {
        const currentFilters = {
            search: searchTerm,
            category: selectedCategory,
            status: selectedStatus,
            sort: filters.sort,
            direction: filters.direction,
        };
        // Remove empty filters to keep URL clean
        const activeFilters: Record<string, string> = {};
        for (const key in currentFilters) {
            if (Object.prototype.hasOwnProperty.call(currentFilters, key)) {
                const value = (currentFilters as any)[key];
                if (value !== undefined && value !== null && value !== '') {
                    activeFilters[key] = value;
                }
            }
        }
        
        const exportUrl = productsRoute.export(activeFilters).url;
        window.location.href = exportUrl;

    }, [searchTerm, selectedCategory, selectedStatus, filters.sort, filters.direction]);

    const getNestedValue = (obj: any, path: string): any => {
        if (path.indexOf('.') === -1) {
            return obj[path];
        }
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };
    
    const columns = useMemo<Column<Product>[]>(() => [
    {
        key: 'productName',
        label: 'Product',
        sortable: true,
        render: (value: string, row: Product) => {
            return (
                <div className="flex items-center gap-3">
                    {row.photos && row.photos.length > 0 && row.photos[0].filePath ? (
                        <img
                            src={`${row.photos[0].filePath}`} // Assuming filePath is already a full URL from backend
                            alt={row.productName}
                            className="h-12 w-12 rounded-lg object-cover shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
                            loading="lazy"
                        />
                    ) : (
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
                            <Package className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                        </div>
                    )}
                    <div>
                        <Link
                            href={productsRoute.show(row.slug).url} // Assuming show uses slug
                            className="font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {row.productName}
                        </Link>
                        {row.description && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
                                {row.description}
                            </p>
                        )}
                    </div>
                </div>
            );
        }
    },
    {
        key: 'category.name',
        label: 'Category',
        sortable: true, // Note: Sorting by category.name might need backend adjustment if not directly supported
        render: (value: string | undefined, row: Product) => {
            return (
                <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {value || 'Uncategorized'}
                </Badge>
            );
        }
    },
    {
        key: 'price',
        label: 'Price',
        sortable: true,
        className: 'text-right',
        render: (value: number | undefined) => {
            return (
                <span className="font-medium text-slate-900 dark:text-slate-100">
                    {typeof value === 'number' ? formatPrice(value) : 'N/A'}
                </span>
            );
        }
    },
    {
        key: 'stock',
        label: 'Stock',
        sortable: true,
        className: 'text-center',
        render: (value: number | undefined) => {
            return (
                <div className="flex items-center justify-center gap-2">
                    <span className={`font-medium ${typeof value === 'number' ? (
                        value <= 5
                            ? 'text-red-600 dark:text-red-400'
                            : value <= 20
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-green-600 dark:text-green-400'
                    ) : 'text-slate-500 dark:text-slate-400'}`}>
                        {typeof value === 'number' ? formatNumber(value) : 'N/A'}
                    </span>
                    {typeof value === 'number' && value <= 5 && (
                        <Badge variant="destructive" className="text-xs">
                            Low
                        </Badge>
                    )}
                </div>
            );
        }
    },
    {
        key: 'status',
        label: 'Status',
        sortable: true,
        render: (value: string | undefined) => {
            const statusConfig = {
                published: {
                    label: 'Published',
                    className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
                    icon: <TrendingUp className="h-3 w-3" />
                },
                draft: {
                    label: 'Draft',
                    className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
                    icon: <Edit3 className="h-3 w-3" />
                },
                outofstock: { // Ensure this key matches your backend status value if different
                    label: 'Out of Stock',
                    className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
                    icon: <TrendingDown className="h-3 w-3" />
                }
            };
            const currentStatus = value as keyof typeof statusConfig;
            const config = statusConfig[currentStatus] || statusConfig.draft; // Default to draft if unknown
            return (
                <Badge className={`flex items-center gap-1 ${config.className}`}>
                    {config.icon}
                    {config.label}
                </Badge>
            );
        }
    },
    {
        key: 'createdAt',
        label: 'Created',
        sortable: true,
        render: (value: string | undefined) => {
            return (
                <div className="text-sm">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                        {value ? formatDateFns(new Date(value), "dd MMM yyyy") : "N/A"}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">
                        {value ? formatDateFns(new Date(value), "HH:mm") : ""}
                    </div>
                </div>
            );
        }
    }
], [formatPrice, formatNumber]);


    const actions = useMemo(() => [
        {
            label: 'View',
            icon: <Eye className="h-4 w-4" />,
            onClick: (product: Product) => router.visit(productsRoute.show(product.slug).url),
            variant: 'outline' as const,
        },
        {
            label: 'Edit',
            icon: <Edit3 className="h-4 w-4" />,
            onClick: (product: Product) => router.visit(productsRoute.edit(product.slug).url),
            variant: 'outline' as const,
        },
        {
            label: 'Delete',
            icon: <Trash2 className="h-4 w-4" />, // Icon color fixed in button className
            onClick: handleDelete,
            variant: 'destructive' as const,
        },
    ], [handleDelete]); // router is stable, no need to include


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Product Management">
                <meta name="description" content="Halaman untuk mengelola produk admin, termasuk filter, sorting, dan operasi lainnya pada katalog produk." />
            </Head>
            <div className="min-h-screen py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                                <Package className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Product Management
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">
                                    Kelola katalog produk Anda dengan filter canggih dan operasi massal.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleRefresh}
                                variant="outline"
                                size="sm"
                                disabled={isRefreshing}
                                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm"
                            >
                                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>

                            {/* UPDATED EXPORT BUTTON */}
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm"
                                onClick={handleExport} // Call the new handler
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>

                            <Button
                                onClick={() => router.visit(productsRoute.create().url)}
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add Product
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Products</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{formatNumber(stats.total_products)}</p>
                                    </div>
                                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Published</p>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatNumber(stats.published_products)}</p>
                                    </div>
                                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Draft</p>
                                        <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{formatNumber(stats.draft_products)}</p>
                                    </div>
                                    <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                                        <Edit3 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Out of Stock</p>
                                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatNumber(stats.out_of_stock)}</p>
                                    </div>
                                    <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                        <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Value</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{formatPrice(stats.total_value)}</p>
                                    </div>
                                    <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                                        <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Filters */}
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="search">Search Products</Label> {/* Added htmlFor */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="search"
                                        type="text"
                                        placeholder="Cari berdasarkan nama atau deskripsi..."
                                        value={searchTerm}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-white/50 dark:bg-slate-900/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select
                                    value={selectedCategory === '' ? ALL_CATEGORIES_VALUE : selectedCategory}
                                    onValueChange={(value) => {
                                        setSelectedCategory(value === ALL_CATEGORIES_VALUE ? "" : value);
                                    }}
                                >
                                    <SelectTrigger className="bg-white/50 dark:bg-slate-900/50">
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={ALL_CATEGORIES_VALUE}>All Categories</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                    value={selectedStatus === '' ? ALL_STATUS_VALUE : selectedStatus}
                                    onValueChange={(value) => {
                                        setSelectedStatus(value === ALL_STATUS_VALUE ? "" : value);
                                    }}
                                >
                                    <SelectTrigger className="bg-white/50 dark:bg-slate-900/50">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={ALL_STATUS_VALUE}>All Status</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="outofstock">Out of Stock</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-end">
                                <Button
                                    onClick={clearFilters}
                                    variant="outline"
                                    className="w-full bg-white/50 dark:bg-slate-900/50"
                                >
                                    <FilterX className="h-4 w-4 mr-2" />
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Data Table */}
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-slate-700/50 overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800/50">
                                <tr>
                                    {columns.map((col) => (
                                        <th
                                            key={col.key}
                                            className={`p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider ${col.className || ''} ${col.sortable ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors' : ''}`}
                                            onClick={() => col.sortable && handleSort(col.key)}
                                        >
                                            <div className="flex items-center gap-1">
                                                {col.label}
                                                {col.sortable && filters.sort === col.key && (
                                                    filters.direction === 'asc' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                    <th className="p-4 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {productsData.data.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                        {columns.map((col) => (
                                            <td key={`${product.id}-${col.key}`} className={`p-4 whitespace-nowrap ${col.className || ''}`}>
                                                {(() => {
                                                    const value = getNestedValue(product, col.key);
                                                    return col.render(value, product);
                                                })()}
                                            </td>
                                        ))}
                                        <td className="p-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {actions.map((action, index) => (
                                                    <Button
                                                        key={index}
                                                        onClick={() => action.onClick(product)}
                                                        variant={action.variant}
                                                        size="sm"
                                                        // Adjusted className for destructive button icon color
                                                        className={action.variant === 'destructive' ?
                                                            "border-red-500 text-red-500 hover:bg-red-100 hover:text-red-700 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/50 dark:hover:text-red-300 [&>svg]:text-red-500 dark:[&>svg]:text-red-400"
                                                            : "border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:border-slate-500"
                                                        }
                                                    >
                                                        {action.icon}
                                                        <span className="sr-only">{action.label}</span>
                                                    </Button>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {productsData.data.length === 0 && (
                            <div className="text-center py-12">
                                <Package className="h-16 w-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                                    Tidak ada produk ditemukan
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-6">
                                    {searchTerm || selectedCategory || selectedStatus
                                        ? "Coba sesuaikan kriteria pencarian atau filter Anda."
                                        : "Mulai dengan membuat produk pertama Anda."
                                    }
                                </p>
                                    <Button
                                        onClick={() => router.visit(productsRoute.create().url)}
                                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                                    >
                                        <PlusCircle className="h-4 w-4 mr-2" />
                                        Buat Produk Pertama Anda
                                    </Button>
                            </div>
                        )}
                    </div>

                    {productsData.data.length > 0 && (
                        <div className="flex justify-center pt-6">
                            <Pagination links={productsData.links} />
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}