import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps, Product } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import productsRoute from '@/routes/products';
import ProductDetailCarousel from '@/components/ProductDetailCarousel';
import { ArrowLeft, Star, Shield, Truck, MessageCircle } from 'lucide-react';

interface Props extends InertiaSharedProps {
    product: Product;
}

export default function ProdukShow({ product }: Props) {
    const sortedPhotos = product.photos?.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) || [];
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Home', href: '/' },
        { title: 'Produk', href: productsRoute.indexPublic().url },
        { title: product.productName, href: productsRoute.showPublic(product.slug).url },
    ];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            <Head title={product.productName}>
            <meta name="description" content={product.description.replace(/<[^>]+>/g, '').substring(0, 160)} />
            <meta name="keywords" content={`${product.productName}, ${product.category?.name}, desa bumi aji`} />
            <meta property="og:title" content={product.productName} />
            <meta property="og:description" content={product.description.replace(/<[^>]+>/g, '').substring(0, 160)} />
            <meta property="og:image" content={sortedPhotos.length > 0 ? sortedPhotos[0].filePath : '/default-image.jpg'} />
            <meta property="og:type" content="product" />
            </Head>

            <div className="min-h-dvh pb-8 bg-gradient-to-br bg-white">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 md:p-6 lg:pl-8 lg:pr-8 bg-white ">
                    <button
                        onClick={() => router.visit(productsRoute.indexPublic().url)}
                        className="flex items-center justify-center cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 hidden md:block">
                        Detail Produk
                    </h1>
                </div>

                {/* Main Content */}
                <div className="px-4 md:px-6 lg:px-8 mt-6 bg-white">
                    {/* Mobile & Tablet Layout */}
                    <div className="lg:hidden">
                        {/* Breadcrumb */}
                        <div className="mb-4 md:mb-6">
                            <nav className="flex text-sm text-gray-500">
                                {breadcrumbs.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <Link
                                            href={item.href}
                                            className={
                                                index === breadcrumbs.length - 1
                                                    ? 'font-medium text-gray-900 cursor-default pointer-events-none'
                                                    : 'hover:text-gray-700 transition-colors'
                                            }
                                        >
                                            {item.title}
                                        </Link>
                                        {index < breadcrumbs.length - 1 && <span className="mx-2 text-gray-400">/</span>}
                                    </React.Fragment>
                                ))}
                            </nav>
                        </div>

                        {/* Main Photo */}
                        <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-4 max-w-sm mx-auto md:max-w-md shadow-lg">
                            {sortedPhotos.length > 0 ? (
                                <img
                                    src={sortedPhotos[currentPhotoIndex]?.filePath}
                                    alt={sortedPhotos[currentPhotoIndex]?.title || product.productName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <span className="text-gray-400">No image available</span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Navigation */}
                        {sortedPhotos.length > 1 && (
                            <div className="h-20 md:h-16 w-full mb-6 max-w-sm mx-auto md:max-w-md relative">
                                <ProductDetailCarousel
                                    photos={sortedPhotos}
                                    onSelectImage={(index) => setCurrentPhotoIndex(index)}
                                />
                            </div>
                        )}

                        {/* Product Info Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="inline-block bg-gradient-to-r from-[#537D5D] to-[#6B8E6B] text-white px-4 py-2 rounded-full text-sm font-medium font-poppins shadow-md">
                                    {product.category?.name || 'Kategori'}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm text-gray-600 font-medium">4.8</span>
                                </div>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight font-poppins">
                                {product.productName}
                            </h1>

                            <div className="text-2xl md:text-3xl font-bold text-[#537D5D] font-poppins">
                                {formatPrice(product.price)}
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center gap-4 py-3 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-green-600" />
                                    <span className="text-sm text-gray-600">Kualitas Terjamin</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Truck className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm text-gray-600">Pengiriman Cepat</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div
                                className="prose prose-base max-w-none text-gray-700 leading-relaxed break-words font-poppins [&_p]:mb-4 [&_ul]:my-4 [&_ol]:my-4 [&_li]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mb-3"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        {/* Left Column - Photo Gallery */}
                        <div className="space-y-6">
                            {/* Breadcrumb aligned with image */}
                            <div>
                                <nav className="flex text-sm text-gray-500 mb-4">
                                    {breadcrumbs.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <Link
                                                href={item.href}
                                                className={
                                                    index === breadcrumbs.length - 1
                                                        ? 'font-medium text-gray-900 cursor-default pointer-events-none'
                                                        : 'hover:text-gray-700 transition-colors'
                                                }
                                            >
                                                {item.title}
                                            </Link>
                                            {index < breadcrumbs.length - 1 && <span className="mx-2 text-gray-400">/</span>}
                                        </React.Fragment>
                                    ))}
                                </nav>
                            </div>

                            {/* Main Photo */}
                            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-xl">
                                {sortedPhotos.length > 0 ? (
                                    <img
                                        src={sortedPhotos[currentPhotoIndex]?.filePath}
                                        alt={sortedPhotos[currentPhotoIndex]?.title || product.productName}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <span className="text-gray-400">No image available</span>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Navigation */}
                            {sortedPhotos.length > 1 && (
                                <div className="h-24 w-full flex justify-center mb-10">
                                    <div className="max-w-md w-full">
                                        <ProductDetailCarousel
                                            photos={sortedPhotos}
                                            onSelectImage={(index) => setCurrentPhotoIndex(index)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Product Info */}
                        <div className="space-y-4 py-4 relative">
                            {/* Category Badge sejajar dengan image */}
                            <div className="mb-4">
                                <div className="inline-block bg-gradient-to-r from-[#537D5D] to-[#6B8E6B] text-white px-6 py-3 rounded-full text-sm font-medium font-poppins shadow-lg">
                                    {product.category?.name || 'Kategori'}
                                </div>
                            </div>

                            <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 leading-tight font-poppins">
                                {product.productName}
                            </h1>

                            <div className="flex items-baseline gap-4">
                                <div className="text-3xl xl:text-4xl font-bold text-[#537D5D] font-poppins">
                                    {formatPrice(product.price)}
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center gap-6 py-6 border-t border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-full">
                                        <Shield className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">Kualitas Terjamin</div>
                                        <div className="text-xs text-gray-500">Produk berkualitas tinggi</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <Truck className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">Pengiriman Cepat</div>
                                        <div className="text-xs text-gray-500">Waktu pengiriman tergantung lokasi</div>
                                    </div>
                                </div>
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center space-x-2">
                                    <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="text-sm text-gray-600">
                                        {product.stock > 0 ? (
                                        <span className="font-medium text-gray-900">Stok Tersedia</span>
                                        ) : (
                                        <span className="font-medium text-red-600">Stok Tidak Tersedia</span>
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div
                                className="prose prose-lg max-w-none text-black leading-relaxed break-words font-poppins [&_p]:mb-4 [&_ul]:my-4 [&_ol]:my-4 [&_li]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mb-4 [&_h3]:mt-6"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />

                            {/* Order Now Button - Fixed at bottom right */}
                            <div className="fixed bottom-6 right-6 z-50">
                                <button 
                                    className="bg-gradient-to-r from-[#537D5D] to-[#6B8E6B] hover:from-[#4a6b52] hover:to-[#5d7a5d] text-white font-semibold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 font-poppins"
                                    onClick={() => {
                                        // Add your order logic here
                                        console.log('Order now clicked for:', product.productName);
                                    }}
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Pesan Sekarang</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}