import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps } from '@/types/index';
import { type PhotoProduct, type Product, type PhotoProductFilters, type PaginatedData, type PhotoProductCan } from '@/types/types-photoProducts';
import { Head, Link, router, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, ImageIcon, Search, Edit, Trash2, PlusCircle, ArrowLeft, Eye } from 'lucide-react';
import Pagination from '@/components/pagination'; // Assuming you have a Pagination component
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import photoProductsRoutes from '@/routes/photo-products'; // Corrected import name
import { dashboard } from '@/routes';

const BREADCRUMBS: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: dashboard().url },
    { title: 'Photo Product Management', href: photoProductsRoutes.index().url },
];

interface Props extends InertiaSharedProps {
    photoProducts: PaginatedData<PhotoProduct>;
    products: Product[]; // For filtering
    filters: PhotoProductFilters;
}

export default function PhotoProductIndex({ photoProducts: initialPhotoProducts, products, filters: initialFilters }: Props) {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const [filters, setFilters] = useState<PhotoProductFilters>(initialFilters);
    const [searchTerm, setSearchTerm] = useState(initialFilters.search || '');

    const handleFilterChange = (key: keyof PhotoProductFilters, value: string | number | undefined) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        // Debounce search
        const timer = setTimeout(() => {
            const queryParams: Record<string, string> = {};
            if (filters.search) queryParams.search = filters.search;
            if (filters.productId) queryParams.productId = String(filters.productId);

            router.get(photoProductsRoutes.index().url, queryParams, {
                preserveState: true,
                replace: true,
            });
        }, 500);
        return () => clearTimeout(timer);
    }, [filters.search, filters.productId]);


    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        handleFilterChange('search', e.target.value);
    };
    
    const handleProductFilterChange = (value: string) => {
        handleFilterChange('productId', value === 'all' ? undefined : value);
    };

    const handleDelete = (photoProduct: PhotoProduct) => {
        router.delete(photoProductsRoutes.destroy(photoProduct.slug).url, {
            preserveScroll: true,
            onSuccess: () => {
                // Handle success notification (e.g., using a toast library or Inertia flash)
            },
        });
    };

    return (
        <AppLayout breadcrumbs={BREADCRUMBS}>
            <Head title="Admin: Photo Products" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/50 to-blue-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/50 py-8 lg:py-12">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-white shadow-lg">
                                    <ImageIcon className="h-8 w-8" />
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                                        Photo Product Management
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                        Browse, filter, and manage product photos.
                                    </p>
                                </div>
                            </div>
                                <Link href={photoProductsRoutes.create().url}>
                                    <Button size="lg" className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
                                        <PlusCircle className="h-5 w-5 mr-2 transition-transform group-hover:rotate-90" />
                                        Add Photo Product
                                    </Button>
                                </Link>
                        </div>
                    </div>

                    {flash?.success && (
                        <Alert variant='destructive' className="mb-6 bg-green-50 border-green-300 dark:bg-green-900/30 dark:border-green-700">
                             <AlertTitle className="font-semibold text-green-700 dark:text-green-300">Success!</AlertTitle>
                            <AlertDescription className="text-green-600 dark:text-green-400">
                                {flash.success}
                            </AlertDescription>
                        </Alert>
                    )}
                    {flash?.error && (
                         <Alert variant="destructive" className="mb-6 bg-red-50 border-red-300 dark:bg-red-900/30 dark:border-red-700">
                            <AlertTitle className="font-semibold text-red-700 dark:text-red-300">Error!</AlertTitle>
                            <AlertDescription className="text-red-600 dark:text-red-400">
                                {flash.error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30">
                        <div className="p-6 md:p-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                                <Link href={photoProductsRoutes.archived().url}>
                                    Archive
                                </Link>
                            </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
                                    <Input
                                        type="text"
                                        placeholder="Search by title, path, product name..."
                                        value={searchTerm}
                                        onChange={handleSearchInputChange}
                                        className="pl-10 h-12 text-base border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 focus:border-blue-500"
                                    />
                                </div>
                                <Select
                                    value={String(filters.productId || 'all')}
                                    onValueChange={handleProductFilterChange}
                                >
                                    <SelectTrigger className="h-12 text-base border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 focus:border-blue-500">
                                        <SelectValue placeholder="Filter by Product" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md">
                                        <SelectItem value="all">All Products</SelectItem>
                                        {products.map(product => (
                                            <SelectItem key={product.id} value={String(product.id)}>
                                                {product.productName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {initialPhotoProducts.data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-slate-200 dark:border-slate-700">
                                                <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">Image</TableHead>
                                                <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">Title</TableHead>
                                                <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">Product</TableHead>
                                                <TableHead className="text-slate-600 dark:text-slate-300 font-semibold text-center">Order</TableHead>
                                                <TableHead className="text-slate-600 dark:text-slate-300 font-semibold text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {initialPhotoProducts.data.map((photo) => (
                                                <TableRow key={photo.id} className="border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/70 dark:hover:bg-slate-700/50 transition-colors">
                                                    <TableCell>
                                                        {`/storage/${photo.filePath}` ? (
                                                            <img src={`/storage/${photo.filePath}`} alt={photo.title} className="h-16 w-16 object-cover rounded-lg shadow-sm" />
                                                        ) : (
                                                            <div className="h-16 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500">
                                                                <ImageIcon size={24} />
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="font-medium text-slate-700 dark:text-slate-200">{photo.title}</TableCell>
                                                    <TableCell className="text-slate-600 dark:text-slate-300">{photo.product?.productName || 'N/A'}</TableCell>
                                                    <TableCell className="text-slate-600 dark:text-slate-300 text-center">{photo.displayOrder}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Link href={photoProductsRoutes.show(photo.slug).url} className="mr-2">
                                                            <Button variant="outline" size="sm" className="border-sky-400 text-sky-500 hover:bg-sky-50 hover:text-sky-600 dark:border-sky-600 dark:text-sky-500 dark:hover:bg-sky-700/30 dark:hover:text-sky-400">
                                                                <Eye size={16} />
                                                            </Button>
                                                        </Link>
                                                        <Link href={photoProductsRoutes.edit(photo.slug).url} className="mr-2">
                                                            <Button variant="outline" size="sm" className="border-blue-400 text-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-blue-600 dark:text-blue-500 dark:hover:bg-blue-700/30 dark:hover:text-blue-400">
                                                                <Edit size={16} />
                                                            </Button>
                                                        </Link>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="destructive" size="sm" className="border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-600 dark:text-red-500 dark:hover:bg-red-700/30 dark:hover:text-red-400">
                                                                    <Trash2 className='text-white' size={16} />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent className="bg-white dark:bg-slate-800">
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This action will mark the photo product "{photo.title}" as deleted.
                                                                        You can choose to also delete the image file from storage.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => router.delete(photoProductsRoutes.destroy(photo.slug).url, { data: { delete_file: false }, preserveScroll: true })}
                                                                        className="bg-red-600 hover:bg-red-700"
                                                                    >
                                                                        Mark as Deleted
                                                                    </AlertDialogAction>
                                                                    <AlertDialogAction
                                                                        onClick={() => router.delete(photoProductsRoutes.destroy(photo.slug).url, { data: { delete_file: true }, preserveScroll: true })}
                                                                        className="bg-red-700 hover:bg-red-800"
                                                                    >
                                                                        Delete with File
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <ImageIcon size={48} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
                                    <p className="text-slate-500 dark:text-slate-400 text-lg">No photo products found matching your criteria.</p>
                                         <Link href={photoProductsRoutes.create().url} className="mt-4 inline-block">
                                            <Button variant="link" className="text-blue-600 dark:text-blue-400">Add New Photo Product</Button>
                                        </Link>
                                </div>
                            )}
                        </div>
                        {initialPhotoProducts.data.length > 0 && (
                             <div className="px-6 md:px-8 py-4 border-t border-slate-200 dark:border-slate-700">
                                <Pagination links={initialPhotoProducts.links} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}