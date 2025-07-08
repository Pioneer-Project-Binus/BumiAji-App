import React from 'react';
import ProductCarousel from "@/components/productCarrousel";
import type { Product } from '@/types';

interface ProductSectionProps {
  products: Product[];
}

export default function ProductSection({ products }: ProductSectionProps) {
  return (
    <div className="py-20 px-4 bg-[#295740] w-full">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl tablet:text-5xl font-bold text-white">
            Produk Unggulan
          </h2>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-full">
            <ProductCarousel products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}