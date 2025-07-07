import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps, Product } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import products from '@/routes/products';
import { dashboard } from '@/routes';
import ProductDetailCarousel from '@/components/ProductDetailCarousel';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props extends InertiaSharedProps {
  product: Product;
}

export default function ProdukShow({ product }: Props) {
  const sortedPhotos = product.photos?.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) || [];
  console.log("sortedPhotos:", product);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Produk', href: '/produk' },
    { title: product.productName , href: `/produk/${product.slug}` },
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
      <Head title={`Produk: ${product.productName}`} >
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
      </Head>


      <div className="min-h-dvh pb-4 bg-white">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 md:p-6 lg:pl-8 lg:pr-8">
          <button
            onClick={() => router.visit('/produk')}
            className="flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black hidden md:block">
            Produk
          </h1>
        </div>

        {/* Breadcrumb */}
        <div className="px-4 md:px-6 lg:px-8 mb-4 md:mb-6">
          <nav className="flex text-sm text-gray-500 lg:max-w-lg">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <Link href={item.href}           className={index === breadcrumbs.length - 1
                ? 'font-normal text-[#0E2815] cursor-default pointer-events-none'
                : 'hover:text-[#878787]'}>
                  {item.title}
                </Link>
                {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="px-4 md:px-6 lg:px-8">
          {/* Mobile & Tablet Layout */}
          <div className="lg:hidden">
            {/* Main Photo */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 max-w-sm mx-auto md:max-w-md">
              {sortedPhotos.length > 0 ? (
                <img
                  src={
                    sortedPhotos[currentPhotoIndex]?.filePath ??
                    `/storage/${sortedPhotos[currentPhotoIndex]?.filePath}`
                  }
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
              <div className="h-24 md:h-16 w-full mb-6 max-w-sm mx-auto md:max-w-md relative">
                <ProductDetailCarousel
                    photos={sortedPhotos}
                    onSelectImage={(index) => setCurrentPhotoIndex(index)}
                />
              </div>
            )}

            {/* Product Info */}
            <div className="space-y-4 md:space-y-6 md:max-w-vw">
              <div className="inline-block  bg-[#537D5D] text-white px-4 py-2 rounded-full text-sm font-medium font-poppins">
                {product.category?.name || 'Kategori'}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-black leading-tight font-poppins">
                {product.productName}
              </h1>

              <div className="text-xl md:text-2xl font-semibold text-[#878787] font-poppins">
                {formatPrice(product.price)}
              </div>

              <div className="text-base md:text-lg text-gray-700 leading-relaxed break-words font-poppins">
                {product.description}
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            {/* Left Column - Photo Gallery */}
            <div className="space-y-4">
              {/* Main Photo */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden max-w-lg mx-auto">
                {sortedPhotos.length > 0 ? (
                  <img
                    src={
                    sortedPhotos[currentPhotoIndex]?.filePath ??
                    `/storage/${sortedPhotos[currentPhotoIndex]?.filePath}`
                    }
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
                <div className="h-28 w-full max-w-lg mx-auto flex justify-center px-14">
                  <ProductDetailCarousel
                    photos={sortedPhotos}
                    onSelectImage={(index) => setCurrentPhotoIndex(index)}
                  />
                </div>
              )}
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              <div className="inline-block bg-[Green] text-white px-6 py-2 rounded-full text-sm font-medium font-poppins">
                {product.category?.name || 'Kategori'}
              </div>

              <h1 className="text-4xl xl:text-5xl font-bold text-black leading-tight font-poppins">
                {product.productName}
              </h1>

              <div className="text-2xl xl:text-3xl font-semibold text-[#878787] font-poppins">
                {formatPrice(product.price)}
              </div>

              <div className="text-lg xl:text-xl text-black leading-relaxed break-words font-poppins">
                {product.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
