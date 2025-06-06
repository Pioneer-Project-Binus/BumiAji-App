import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps, PaginatedData, CategoryProduct } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import categoryProducts from '@/routes/category-products'; // categoryProductRoutes = categoryProductRoutes

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FolderOpen, PlusCircle, Edit3, Trash2, Search, FilterX } from 'lucide-react';
import Pagination from '@/components/pagination';
import { format } from 'date-fns';
import { dashboard } from '@/routes';

let categoryProductRoutes = categoryProducts;

interface Props extends InertiaSharedProps {
    categoryProducts: PaginatedData<CategoryProduct>;
    filters: { search?: string };
    // can: { create_category_product: boolean }; // Jika ada policy
}


const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: dashboard().url },
    { title: 'Category Management', href: categoryProductRoutes.index().url },
];


export default function CategoryProductIndex({ categoryProducts, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleFilterChange = () => {
        router.get(categoryProductRoutes.index().url, { search: searchTerm }, { preserveState: true, replace: true });
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== filters.search) {
                handleFilterChange();
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const clearFilters = () => {
        setSearchTerm('');
        router.get(categoryProductRoutes.index().url, {}, { preserveState: true, replace: true });
    };

    const handleDelete = (category: CategoryProduct) => {
        if (confirm(`Are you sure you want to delete category "${category.name}"?`)) {
            router.delete(categoryProductRoutes.destroy(category.id).url, { preserveScroll: true });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Category Management" />
            <div className="min-h-screen py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg">
                                <FolderOpen className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Category Management
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your product categories.</p>
                            </div>
                        </div>
                        {/* {can.create_category_product && ( */}
                        <Link href={categoryProductRoutes.create().url}>
                            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-150">
                                <PlusCircle className="h-5 w-5 mr-2" /> Add New Category
                            </Button>
                        </Link>
                        {/* )} */}
                    </div>

                    {/* Filters */}
                    <div className="mb-6 p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-slate-700/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                            <div className="relative">
                                <label htmlFor="search" className="sr-only">Search</label>
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
                                <Input
                                    id="search"
                                    type="text"
                                    placeholder="Search categories by name or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-10 bg-white/50 dark:bg-slate-700/50"
                                />
                            </div>
                            <div>
                                <Button onClick={clearFilters} variant="outline" className="w-full md:w-auto h-10 bg-white/50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700">
                                    <FilterX className="h-4 w-4 mr-2" /> Clear Filters
                                </Button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Category Table */}
                     <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 dark:border-slate-700/50 overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                                    <TableHead className="text-slate-700 dark:text-slate-300">Name</TableHead>
                                    <TableHead className="text-slate-700 dark:text-slate-300">Description</TableHead>
                                    <TableHead className="text-slate-700 dark:text-slate-300 text-center">Products</TableHead>
                                    <TableHead className="text-slate-700 dark:text-slate-300">Created At</TableHead>
                                    <TableHead className="text-slate-700 dark:text-slate-300 text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categoryProducts.data.length > 0 ? categoryProducts.data.map((category) => (
                                    <TableRow key={category.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                                        <TableCell className="font-medium text-slate-800 dark:text-slate-100">{category.name}</TableCell>
                                        <TableCell className="text-slate-600 dark:text-slate-400 max-w-sm truncate" title={category.description || ''}>{category.description || 'N/A'}</TableCell>
                                        <TableCell className="text-slate-600 dark:text-slate-400 text-center">{category.products_count}</TableCell>
                                        <TableCell className="text-slate-600 dark:text-slate-400">
                                            {category.createdAt ? format(new Date(category.createdAt), "dd MMM yyyy, HH:mm") : 'N/A'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={categoryProductRoutes.edit(category.slug).url} className="mr-2">
                                                <Button variant="outline" size="icon" className="border-slate-300 dark:border-slate-600 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400">
                                                    <Edit3 className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="icon" onClick={() => handleDelete(category)} className="border-slate-300 dark:border-slate-600 hover:border-red-500 hover:text-red-500 dark:hover:border-red-400 dark:hover:text-red-400">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                     <TableRow>
                                        <TableCell colSpan={5} className="text-center py-10 text-slate-500 dark:text-slate-400">
                                            No categories found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {categoryProducts.data.length > 0 && (
                        <div className="mt-8">
                            <Pagination links={categoryProducts.links} />
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}