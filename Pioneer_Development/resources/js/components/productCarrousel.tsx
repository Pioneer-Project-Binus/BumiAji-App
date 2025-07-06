import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

type Product = {
  name: string;
  description: string;
  price: number;
  image: string;
};

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  return (
    <div className="relative w-full">
      <style>{`
        .product-carousel {
          position: relative;
        }

        .product-carousel .swiper-button-next,
        .product-carousel .swiper-button-prev {
          background-color: white;
          border-radius: 50%;
          transition: all 0.3s ease;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex !important;
          align-items: center;
          justify-content: center;
        }

        .product-carousel .swiper-button-next::after,
        .product-carousel .swiper-button-prev::after {
          font-weight: bold;
          color: #333;
        }

        .product-carousel .swiper-button-next:hover,
        .product-carousel .swiper-button-prev:hover {
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        /* Desktop - Tombol di luar container */
        @media (min-width: 1024px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 56px;
            height: 56px;
          }
          
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 20px;
          }
          
          .product-carousel .swiper-button-next {
            right: 10px;
          }
          
          .product-carousel .swiper-button-prev {
            left: 10px;
          }
          
          .carousel-container {
            margin: 0 100px;
          }
        }

        /* Tablet - Tombol di pinggir container */
        @media (min-width: 768px) and (max-width: 1023px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 48px;
            height: 48px;
          }
          
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 18px;
          }
          
          .product-carousel .swiper-button-next {
            right: 12px;
          }
          
          .product-carousel .swiper-button-prev {
            left: 12px;
          }
        }

        /* Mobile - Tombol di samping card tengah */
        @media (max-width: 767px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 40px;
            height: 40px;
          }
          
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 16px;
          }
          
          .product-carousel .swiper-button-next {
            right: 8px;
          }

          .product-carousel .swiper-button-prev {
            left: 8px;
          }
        }

        /* Small Mobile - Tombol lebih kecil */
        @media (max-width: 480px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 36px;
            height: 36px;
          }
          
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 14px;
          }
          
          .product-carousel .swiper-button-next {
            right: 4px;
          }

          .product-carousel .swiper-button-prev {
            left: 4px;
          }
        }

        /* Fix untuk loop rendering issue */
        .swiper-slide {
          flex-shrink: 0;
        }
      `}</style>

      <div className="carousel-container px-4 sm:px-6 lg:px-0">
        <div className="product-carousel">
        <Swiper
          navigation
          spaceBetween={24}
          modules={[Navigation, Autoplay]}
          loop
          loopAdditionalSlides={2}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.1,
              centeredSlides: true,
              spaceBetween: 12,
            },
            375: {
              slidesPerView: 1.2,
              centeredSlides: true,
              spaceBetween: 16,
            },
            480: {
              slidesPerView: 1.4,
              centeredSlides: true,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              centeredSlides: false,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.5,
              centeredSlides: false,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              centeredSlides: false,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              centeredSlides: false,
              spaceBetween: 28,
            },
            1536: {
              slidesPerView: 5,
              centeredSlides: false,
              spaceBetween: 32,
            }
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} className="!w-auto">
              <div className="bg-white rounded-2xl h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Card ukuran responsif */}
                <div className="w-[260px] h-[420px] sm:w-[280px] sm:h-[440px] md:w-[300px] md:h-[460px] lg:w-[320px] lg:h-[480px] xl:w-[300px] xl:h-[460px] 2xl:w-[280px] 2xl:h-[440px] grid grid-rows-[55%_45%]">
                  
                  {/* Image Section */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-5 md:p-6">
                    <div className="w-full h-full bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between">
                    <div className="text-center mb-4">
                      <h3 className="font-poppins text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-base font-poppins leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="border-t pt-3 sm:pt-4">
                      <p className="text-center text-lg sm:text-xl md:text-2xl font-bold text-gray-900 font-poppins">
                        Rp. {product.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;