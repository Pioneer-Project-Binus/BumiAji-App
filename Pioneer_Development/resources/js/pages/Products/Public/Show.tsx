import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps, Product, PhotoProducts as PhotoProductType } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import products from '@/routes/products';
import { dashboard } from '@/routes';
import { format } from 'date-fns';
import { id as localeID } from 'date-fns/locale'; // Import locale Indonesia
import ProductDetailCarousel from '@/components/ProductDetailCarousel';

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
import { Arrow } from '@radix-ui/react-tooltip';
import { Breadcrumb } from '@/components/ui/breadcrumb';

// Props yang diterima dari ProductController@show
interface Props extends InertiaSharedProps {
    product: Product; // Termasuk relasi category, photos, creator, updater
}

export default function ProdukShow({ product, auth }: Props) {
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
        <>
            <Head title={`Produk: ${product.productName}`} />

            <div className="min-h-screen bg-white py-16">
                <div className="relative mx-auto max-w-6xl">
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 px-10">
                        <div className="flex items-center gap-4">
                            <div className="flex justify-center items-center w-8 h-8">
                                <ArrowLeft className='text-black'></ArrowLeft>
                            </div>
                            <div>
                                <h1 className="font-medium text-black text-4xl">
                                    Produk
                                </h1>
                            </div>
                        </div>

                    </div>
                    <div className="px-20">
                        <Breadcrumb></Breadcrumb>
                        {/* Main Content Area */}
                        <div className="grid grid-cols-[70%_30%]">
                            {/* Left Column: Photo Gallery */}
                            <div className="grid grid-rows-2 h-full">
                                <img
                                src={`/storage/${product.photos[0]?.filePath}`}
                                alt={product.photos[0]?.title || product.productName}
                                className="w-full h-full object-contain"
                                />
                                <div className="text-black max-w-full max-h-full">
                                    <ProductDetailCarousel products={[product]} />
                                </div>

                            </div>

                            {/* Right Column: Product Information */}
                            <div className="grid grid-rows-[50%_50%] gap-2">
                                <div className="grid grid-rows-3 gap-2">
                                    <div className="bg-[Green] h-full font-medium text-white text-[20px] py-4 px-16 w-1 rounded-2xl flex items-center justify-center">
                                    Kategori
                                    </div>
                                    <div className="font-semibold text-6xl text-black">
                                        <h1>{product.productName}</h1>
                                    </div>
                                    <div className="text-[#878787] font-medium text-3xl">
                                        <h3>
                                            Rp. {product.price}
                                        </h3>
                                    </div>
                                </div>
                                <div className="text-xl font-black font-regular">
                                    {product.description}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}
