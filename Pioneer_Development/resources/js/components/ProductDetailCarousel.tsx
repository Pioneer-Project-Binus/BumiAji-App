import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

type Product = {
  photos: { file_url: string }[];
};

interface ProductCarouselProps {
  products: Product[];
}

const ProductDetailCarousel: React.FC<ProductCarouselProps> = ({ products = [] }) => {
  return (
    <div className="w-full h-full overflow-hidden xl:overflow-visible">
      <div>
        <style>{`
          .swiper-button-next,
          .swiper-button-prev {
            background-color: white !important;
            width: 60px !important;
            height: 60px !important;
            padding: 0.375rem !important;
            border-radius: 9999px !important;
            transition: all 1s !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            position: absolute !important;
            z-index: 10 !important;
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 1.5rem !important;
            font-weight: bold !important;
            color: black !important;
          }

          .swiper-button-disabled {
            opacity: 1 !important;
            cursor: not-allowed !important;
          }
        `}</style>

        <Swiper
          navigation={true}
          modules={[Navigation]}
          centeredSlides={true}
          breakpoints={{
            402: {
              slidesPerView: 3,
              centeredSlides: true,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 2,
              centeredSlides: true,
              spaceBetween: 18,
            },
            1280: {
              slidesPerView: 2,
              centeredSlides: false,
              spaceBetween: 18,
            },
          }}
        >
          {products.length > 0 && products[0].photos?.length > 0 ? (
            products[0].photos.map((photo, index) => (
              <SwiperSlide key={index} className="!w-44 !h-40 !shadow-xl">
                <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center p-4">
                  <img
                    src={photo.file_url}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-full object-cover rounded-[8px]"
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="!w-64 md:!w-96 xl:!w-80">
              <div className="h-full flex flex-col items-center justify-center border border-dashed border-gray-300 bg-gray-50 rounded-xl py-16">
                <p className="text-gray-400 text-lg font-medium font-poppins">Tidak ada foto produk</p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductDetailCarousel;
