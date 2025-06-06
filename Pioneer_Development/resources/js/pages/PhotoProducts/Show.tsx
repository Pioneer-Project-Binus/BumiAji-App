import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Package, ListOrdered, TagIcon, CalendarDays } from 'lucide-react';

import photoProductsRoutes from '@/routes/photo-products';
import productsRoutes from '@/routes/products';

import { dashboard } from '@/routes';
import { PhotoProduct } from '@/types/types-photoProducts';

const BREADCRUMBS_BASE: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: dashboard().url },
    { title: 'Photo Product Management', href: photoProductsRoutes.index().url },
];

interface Props extends InertiaSharedProps {
    photoProduct: PhotoProduct;
}

export default function PhotoProductShow({ photoProduct }: Props) {
    console.log('PhotoProductShow props:', { photoProduct });
    
    const breadcrumbs: BreadcrumbItem[] = [
        ...BREADCRUMBS_BASE,
        { title: photoProduct.title, href: photoProductsRoutes.show(photoProduct.slug).url },
    ];
    
    const parentProductSlug = photoProduct?.slug;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin: View Photo - ${photoProduct.title}`} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/50 to-blue-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/50">
                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 lg:py-12">
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                             <div className="flex items-center gap-4">
                                {`/storage/${photoProduct.filePath}` ? (
                                    <img src={`/storage/${photoProduct.filePath}`} alt={photoProduct.title} className="h-16 w-16 object-cover rounded-2xl shadow-lg" />
                                 ) : (
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-400 to-slate-500 text-white shadow-lg">
                                        <TagIcon className="h-8 w-8" />
                                    </div>
                                 )}
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight break-all">
                                        {photoProduct.title}
                                    </h1>
                                    {photoProduct.product && (
                                         <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                            Part of: <Link href={productsRoutes.edit(photoProduct.product.slug).url} className="text-blue-600 hover:underline dark:text-blue-400">{photoProduct.product.productName}</Link>
                                        </p>
                                    )}
                                </div>
                            </div>
                                <Link href={photoProductsRoutes.edit(photoProduct.slug).url}>
                                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-md">
                                        <Edit className="h-5 w-5 mr-2" />
                                        Edit Photo
                                    </Button>
                                </Link>
                        </div>
                        <Link
                            href={parentProductSlug ? photoProductsRoutes.edit(parentProductSlug).url : photoProductsRoutes.index().url}
                            className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 backdrop-blur-sm"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            {parentProductSlug ? 'Back to Photo Edit' : 'Back to Photo List'}
                        </Link>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden">
                        {`/storage/${photoProduct.filePath}` && (
                            <div className="p-2 bg-slate-50 dark:bg-slate-900/50">
                                <img
                                    src={`/storage/${photoProduct.filePath}`}
                                    alt={photoProduct.title}
                                    className="w-full max-h-[70vh] object-contain rounded-2xl shadow-inner"
                                />
                            </div>
                        )}
                        <div className="p-8 lg:p-10 space-y-6">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="flex items-start">
                                    <TagIcon className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Title</h3>
                                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 break-all">{photoProduct.title}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Package className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Associated Product</h3>
                                        {photoProduct.product ? (
                                            <Link href={productsRoutes.edit(photoProduct.product.slug).url} className="text-lg font-semibold text-blue-600 hover:underline dark:text-blue-400">
                                                {photoProduct.product.productName} (ID: {photoProduct.productId})
                                            </Link>
                                        ) : (
                                            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">N/A (ID: {photoProduct.productId})</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <ListOrdered className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Display Order</h3>
                                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{photoProduct.displayOrder}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <TagIcon className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" /> {/* Using TagIcon for slug too */}
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Slug</h3>
                                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 break-all">{photoProduct.slug}</p>
                                    </div>
                                </div>
                                {photoProduct.createdAt && (
                                    <div className="flex items-start">
                                        <CalendarDays className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Created At</h3>
                                            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{new Date(photoProduct.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                                 {photoProduct.updatedAt && (
                                    <div className="flex items-start">
                                        <CalendarDays className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Last Updated</h3>
                                            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{new Date(photoProduct.updatedAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6">
                                 <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">File Path</h3>
                                 <p className="text-base text-slate-700 dark:text-slate-300 break-all bg-slate-100 dark:bg-slate-700 p-3 rounded-md font-mono">{photoProduct.filePath}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}