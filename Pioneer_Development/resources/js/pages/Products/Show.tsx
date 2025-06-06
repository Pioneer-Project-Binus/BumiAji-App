import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps, Product, PhotoProducts as PhotoProductType } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import products from '@/routes/products';
import { dashboard } from '@/routes';
import { format } from 'date-fns';
import { id as localeID } from 'date-fns/locale'; // Import locale Indonesia

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Package,
    ArrowLeft,
    Edit3,
    Trash2,
    DollarSign,
    Archive,
    Tag,
    Info,
    Image as ImageIcon,
    User as UserIcon,
    CalendarDays,
    ShieldCheck,
    Eye,
    ShieldX,
    ShoppingCart,
    TrendingUp,
    TrendingDown,
    FileText
} from 'lucide-react';

// Props yang diterima dari ProductController@show
interface Props extends InertiaSharedProps {
    product: Product; // Termasuk relasi category, photos, creator, updater
}

export default function AdminProductShow({ product, auth }: Props) {
    const sortedPhotos = product.photos?.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) || [];
    const [currentPhoto, setCurrentPhoto] = useState<PhotoProductType | null>(
        sortedPhotos.length > 0 ? sortedPhotos[0] : null
    );

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin Dashboard', href: dashboard().url },
        { title: 'Product Management', href: products.index().url },
        { title: product.productName, href: products.show(product.slug).url },
    ];

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${product.productName}"? This is a soft delete.`)) {
            router.delete(products.destroy(product.slug).url, {
                onSuccess: () => router.visit(products.index().url), // Redirect to index after delete
            });
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return format(new Date(dateString), "d MMMM yyyy, HH:mm", { locale: localeID });
    };
    
    const getStatusConfig = (status: string) => {
        const config = {
            published: {
                label: 'Published',
                className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-500/50',
                icon: <TrendingUp className="h-4 w-4" />
            },
            draft: {
                label: 'Draft',
                className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-500/50',
                icon: <Edit3 className="h-4 w-4" />
            },
            outofstock: {
                label: 'Out of Stock',
                className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-500/50',
                icon: <ShoppingCart className="h-4 w-4" /> // Ganti ikon jika perlu
            }
        };
        return config[status as keyof typeof config] || config.draft;
    };
    const statusInfo = getStatusConfig(product.status);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Product: ${product.productName}`} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50 py-8 lg:py-12">
                <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                             <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                                <Eye className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                                    Product Details
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 mt-1 text-base">
                                    Viewing information for: <span className="font-semibold text-slate-700 dark:text-slate-300">{product.productName}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Link
                                href={products.index().url}
                                className="group flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-slate-200/80 dark:border-slate-700/80 transition-all duration-200 hover:shadow-md backdrop-blur-sm"
                            >
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                                Back to Products
                            </Link>
                                <Link href={products.edit(product.slug).url}>
                                    <Button variant="outline" className="bg-yellow-400/20 hover:bg-yellow-500/30 border-yellow-500 text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 dark:border-yellow-600 dark:hover:border-yellow-500 shadow-sm">
                                        <Edit3 className="h-4 w-4 mr-2" /> Edit
                                    </Button>
                                </Link>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Photo Gallery */}
                        <div className="lg:col-span-1 space-y-6">
                             <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <ImageIcon className="h-5 w-5 text-blue-500" />
                                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Product Gallery</h2>
                                    </div>
                                    {currentPhoto ? (
                                        <div className="mb-4 aspect-square w-full bg-slate-100 dark:bg-slate-700/50 rounded-xl overflow-hidden shadow-inner">
                                            <img
                                                src={`/storage/${currentPhoto.filePath}`}
                                                alt={currentPhoto.title || product.productName}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-4 aspect-square w-full flex items-center justify-center bg-slate-100 dark:bg-slate-700/50 rounded-xl text-slate-400 dark:text-slate-500 shadow-inner">
                                            <ImageIcon className="h-16 w-16" />
                                            <p className="ml-2">No image available</p>
                                        </div>
                                    )}
                                    {sortedPhotos.length > 1 && (
                                        <div className="grid grid-cols-4 gap-3">
                                            {sortedPhotos.map((photo) => (
                                                <button
                                                    key={photo.id}
                                                    onClick={() => setCurrentPhoto(photo)}
                                                    className={`aspect-square rounded-lg overflow-hidden focus:outline-none ring-offset-2 dark:ring-offset-slate-800 focus:ring-2 transition-all duration-150
                                                        ${currentPhoto?.id === photo.id ? 'ring-2 ring-blue-500 shadow-md' : 'ring-1 ring-slate-200 dark:ring-slate-700 hover:ring-blue-400'}`}
                                                >
                                                    <img
                                                        src={`/storage/${photo.filePath}`}
                                                        alt={photo.title || `Photo ${photo.id}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                     {sortedPhotos.length === 0 && !currentPhoto && <p className="text-sm text-center text-slate-500 dark:text-slate-400">This product has no images yet.</p>}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Product Information */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 overflow-hidden">
                                <div className="p-6 lg:p-8">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Package className="h-6 w-6 text-blue-500" />
                                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{product.productName}</h2>
                                    </div>

                                    {product.category && (
                                        <div className="mb-4">
                                            <Link href={'#'} /* Replace with actual category link if available */ className="inline-block">
                                                <Badge variant="outline" className="border-indigo-500/50 bg-indigo-100/70 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition-colors">
                                                    <Tag className="h-3 w-3 mr-1.5"/> {product.category.name}
                                                </Badge>
                                            </Link>
                                        </div>
                                    )}
                                    
                                    <div className="mb-6">
                                        <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
                                            {formatPrice(product.price)}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                        <div className="flex items-center gap-3 p-4 bg-slate-50/70 dark:bg-slate-700/30 rounded-lg border border-slate-200/70 dark:border-slate-600/50">
                                            <Archive className="h-6 w-6 text-orange-500" />
                                            <div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Stock</p>
                                                <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">{product.stock} Units</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-slate-50/70 dark:bg-slate-700/30 rounded-lg border border-slate-200/70 dark:border-slate-600/50">
                                            {statusInfo.icon}
                                            <div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
                                                <p className={`text-lg font-semibold ${statusInfo.className.split(' ')[1]}`}>{statusInfo.label}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6 prose prose-slate dark:prose-invert max-w-none">
                                        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-purple-500"/> Description
                                        </h3>
                                        <div dangerouslySetInnerHTML={{ __html: product.description || '<p>No description provided.</p>' }} />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Metadata Card */}
                             <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Info className="h-5 w-5 text-gray-500" />
                                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Additional Information</h2>
                                    </div>
                                    <ul className="space-y-3 text-sm">
                                        <li className="flex items-center gap-3">
                                            <strong className="w-28 text-slate-500 dark:text-slate-400">SKU/Slug:</strong> 
                                            <Badge variant="outline" className="font-mono">{product.slug}</Badge>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <strong className="w-28 text-slate-500 dark:text-slate-400 shrink-0">Created:</strong> 
                                            <div className="text-slate-700 dark:text-slate-300">
                                                {formatDate(product.createdAt)}
                                                {product.creator && <span className="block text-xs text-slate-500 dark:text-slate-400">by {product.creator.name}</span>}
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <strong className="w-28 text-slate-500 dark:text-slate-400 shrink-0">Last Updated:</strong> 
                                             <div className="text-slate-700 dark:text-slate-300">
                                                {formatDate(product.updatedAt)}
                                                {product.updater && <span className="block text-xs text-slate-500 dark:text-slate-400">by {product.updater.name}</span>}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Actions Card (Delete) */}
                                <div className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-xl rounded-2xl shadow-xl border border-red-200/50 dark:border-red-700/30 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
                                                    <ShieldX className="h-5 w-5"/> Danger Zone
                                                </h3>
                                                <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">
                                                    Deleting this product is a soft delete and can be potentially recovered.
                                                </p>
                                            </div>
                                            <Button onClick={handleDelete} variant="destructive" className="shadow-md">
                                                <Trash2 className="h-4 w-4 mr-2" /> Delete Product
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}