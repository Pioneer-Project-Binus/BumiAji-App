import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';


import 'swiper/css';

type Product = {
  photos: { file_url: string }[];
};

interface ProductCarouselProps {
  photos: {
    file_url?: string;
    filePath?: string;
    title?: string;
  }[];
  onSelectImage?: (index: number) => void;
}

const ProductDetailCarousel: React.FC<ProductCarouselProps> = ({ photos = [], onSelectImage }) => {
    console.log(photos);
  return (
    <div className="relative w-full px-4">

        <div className="swiper-button-prev custom-prev absolute  top-1/2 -translate-y-1/2 z-10
        w-10 h-10 flex items-center justify-center text-[#878787] text-xl
        cursor-pointer select-none -left-5 lg:-left-10">
        <ChevronLeft className="w-6 h-6 text-[#878787]" />
        </div>

        <div className="swiper-button-next custom-next absolute -right-5 lg:-right-10 top-1/2 -translate-y-1/2 z-10
        w-10 h-10 flex items-center justify-center text-[#878787] text-xl
         cursor-pointer select-none">
        <ChevronRight className="w-6 h-6 text-[#878787]" />
        </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        modules={[Navigation]}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
          disabledClass: "swiper-button-disabled"
        }}
        className="w-full"
      >
        {photos.length > 0  ? (
          photos.map((photo, index) => (
            <SwiperSlide
              key={index}
              onClick={() => onSelectImage?.(index)}
              className="cursor-pointer max-h-40"
            >
              <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center p-4 hover:scale-105 transition-transform">
                <img
                src={photo.filePath ?? `/storage/${photo.filePath}`}
                alt={photo.title || `Foto ${index + 1}`}
                className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="h-full flex flex-col items-center justify-center border border-dashed border-gray-300 bg-gray-50 rounded-xl py-16">
              <p className="text-gray-400 text-lg font-medium">Tidak ada foto produk</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default ProductDetailCarousel;
