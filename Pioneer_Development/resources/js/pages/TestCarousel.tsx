import React from 'react';
import ProductCarousel from '@/Components/ProductCarousel';
import { Head } from '@inertiajs/react';

type Product = {
  name: string;
  description: string;
  price: number;
  image: string;
};

interface Props {
  products: Product[];
}

export default function TestCarousel({ products }: Props) {
  return (
    <>
      <Head title="Test Carousel" />
      <div className="flex justify-center items-center">
        <div className="h-screen w-5xl bg-white flex justify-center items-center">
            <ProductCarousel products={products} />
        </div>
      </div>

    </>
  );
}
