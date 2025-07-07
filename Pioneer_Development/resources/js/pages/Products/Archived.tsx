import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps, PaginatedData, CategoryProduct } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect, ChangeEvent, useCallback, useMemo } from 'react';
import productsRoute from '@/routes/products';
import { dashboard } from '@/routes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Package, Eye, Trash2, RotateCcw, FilterX, Search, TrendingUp, TrendingDown } from 'lucide-react';
import Pagination from '@/components/pagination';
import { format as formatDateFns } from 'date-fns';
import { toast } from 'sonner';


const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: dashboard().url },
    { title: 'Product Management', href: productsRoute.index().url },
    { title: 'Archived Products', href: productsRoute.archived().url },
];

interface Props extends InertiaSharedProps {
    products: PaginatedData<any>; // Pastikan 'any' ini mencakup 'slug'
    filters: { search?: string };
}

export default function AdminProductArchive({ products, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleFilter = () => {
        router.get(productsRoute.archived().url, { search: searchTerm }, {
            preserveState: true,
            replace: true,
            preserveScroll: true
        });
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => handleFilter(), 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // UBAH PARAMETER DARI 'id' MENJADI 'slug'
    const handleRestore = (slug: string) => { // <-- UBAH DI SINI
        if (confirm('Pulihkan produk ini?')) {
            router.put(productsRoute.restore(slug).url, {}, { // <-- UBAH DI SINI
                onSuccess: () => toast.success('Produk berhasil dipulihkan.'),
                onError: () => toast.error('Gagal memulihkan produk.'),
            });
        }
    };

    // UBAH PARAMETER DARI 'id' MENJADI 'slug'
    const handleDeletePermanent = (slug: string) => { // <-- UBAH DI SINI
        if (confirm('Hapus permanen produk ini? Tindakan ini tidak bisa dikembalikan.')) {
            router.delete(productsRoute.deletePermanent(slug).url, { // <-- UBAH DI SINI
                onSuccess: () => toast.success('Produk dihapus permanen.'),
                onError: () => toast.error('Gagal menghapus produk.'),
            });
        }
    };

    const formatDate = (date: string | null | undefined) => {
        if (!date || isNaN(new Date(date).getTime())) return (
            <span className="text-slate-400 dark:text-slate-500 italic">N/A</span>
        );

        const parsedDate = new Date(date);
        return (
            <div>
                <div className="font-medium">
                    {formatDateFns(parsedDate, "dd MMM yyyy")}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDateFns(parsedDate, "HH:mm")}
                </div>
            </div>
        );
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Archived Products" />
            <div className="min-h-screen py-8 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">Archived Products</h1>
                        <p className="text-slate-600 dark:text-slate-400">Produk yang telah dihapus sementara dan bisa dipulihkan.</p>
                    </div>

                    {/* Search Filter */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-emerald-200 dark:border-emerald-700">
                        <Label htmlFor="search" className="text-emerald-700 dark:text-emerald-300">Search Archived</Label>
                        <div className="relative mt-2">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-400" />
                            <Input
                                id="search"
                                value={searchTerm}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                className="pl-10"
                                placeholder="Cari produk terarsip..."
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-700 rounded-lg">
                        <table className="w-full text-sm">
                            <thead className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 uppercase text-xs">
                                <tr>
                                    <th className="p-4 text-left">Product</th>
                                    <th className="p-4 text-left">Category</th>
                                    <th className="p-4 text-left">Price</th>
                                    <th className="p-4 text-left">Deleted</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-emerald-100 dark:divide-emerald-800">
                                {products.data.map(product => (
                                    <tr key={product.id} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition">
                                        <td className="p-4">{product.productName}</td>
                                        <td className="p-4">{product.category?.name || 'Uncategorized'}</td>
                                        <td className="p-4">Rp {product.price?.toLocaleString('id-ID') || 0}</td>
                                        <td className="p-4">{formatDate(product.updated_at)}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex gap-2 justify-end">
                                                {/* UBAH product.id MENJADI product.slug */}
                                                <Button onClick={() => handleRestore(product.slug)} size="sm" variant="outline">
                                                    <RotateCcw className="h-4 w-4 mr-1" /> Restore
                                                </Button>
                                                {/* UBAH product.id MENJADI product.slug */}
                                                <Button onClick={() => handleDeletePermanent(product.slug)} size="sm" variant="destructive">
                                                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {products.data.length === 0 && (
                            <div className="text-center py-12">
                                <Package className="h-16 w-16 text-emerald-400 dark:text-emerald-500 mx-auto mb-4" />
                                <h3 className="text-lg font-medium">Tidak ada produk terarsip</h3>
                                <p className="text-slate-500 dark:text-slate-400">
                                    Produk yang Anda hapus akan muncul di sini.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {products.data.length > 0 && (
                        <div className="pt-6 flex justify-center">
                            <Pagination links={products.links} />
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}