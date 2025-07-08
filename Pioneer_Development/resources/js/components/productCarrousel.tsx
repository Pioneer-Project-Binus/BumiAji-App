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
  productName?: string;
  photos?: Array<{ filePath: string }>;
};

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const duplicatedProducts = React.useMemo(() => {
    if (products.length === 0) return [];
    
    const minProducts = 8;
    if (products.length >= minProducts) {
      return products;
    }
    
    const duplicates = [];
    while (duplicates.length < minProducts) {
      duplicates.push(...products);
    }
    return duplicates;
  }, [products]);

  const shouldLoop = duplicatedProducts.length >= 4;

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
          opacity: 0.9;
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
          opacity: 1;
        }

        /* Extra Small Mobile - 320px to 480px */
        @media (max-width: 480px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 32px;
            height: 32px;
          }
          
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 12px;
          }
          
          .product-carousel .swiper-button-next {
            right: 4px;
          }
          .product-carousel .swiper-button-prev {
            left: 4px;
          }
        }

        /* Small Mobile - 480px to 640px */
        @media (min-width: 481px) and (max-width: 640px) {
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
            right: 6px;
          }
          .product-carousel .swiper-button-prev {
            left: 6px;
          }
        }

        /* Medium Mobile - 640px to 768px */
        @media (min-width: 641px) and (max-width: 768px) {
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

        /* Tablet - 768px to 1024px */
        @media (min-width: 769px) and (max-width: 1024px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 44px;
            height: 44px;
          }
          
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 18px;
          }
          
          .product-carousel .swiper-button-next {
            right: 10px;
          }
          .product-carousel .swiper-button-prev {
            left: 10px;
          }
        }

        /* Small Desktop - 1024px to 1280px */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 48px;
            height: 48px;
          }
          
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 20px;
          }
          
          .product-carousel .swiper-button-next {
            right: -24px;
          }
          .product-carousel .swiper-button-prev {
            left: -24px;
          }
        }

        /* Large Desktop - 1280px to 1536px */
        @media (min-width: 1281px) and (max-width: 1536px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 52px;
            height: 52px;
          }
          
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 22px;
          }
          
          .product-carousel .swiper-button-next {
            right: -26px;
          }
          .product-carousel .swiper-button-prev {
            left: -26px;
          }
        }

        /* Extra Large Desktop - 1536px+ */
        @media (min-width: 1537px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 56px;
            height: 56px;
          }
          
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 24px;
          }
          
          .product-carousel .swiper-button-next {
            right: -28px;
          }
          .product-carousel .swiper-button-prev {
            left: -28px;
          }
        }

        /* Fix untuk loop rendering issue */
        .swiper-slide {
          flex-shrink: 0;
          width: auto !important;
        }

        /* Smooth transition dan fix rendering */
        .swiper-wrapper {
          transition-timing-function: ease-in-out;
          align-items: stretch;
        }

        /* Force GPU acceleration untuk smooth rendering */
        .swiper-container {
          transform: translateZ(0);
        }

        /* Prevent flash of unstyled content */
        .swiper-slide-duplicate {
          opacity: 1 !important;
        }

        /* Consistent sizing */
        .swiper-slide > div {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>

      <div className="carousel-container px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="product-carousel">
          <Swiper
            navigation
            spaceBetween={16}
            modules={[Navigation, Autoplay]}
            loop={shouldLoop}
            loopAdditionalSlides={2}
            autoplay={shouldLoop ? {
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            } : false}
            grabCursor={true}
            watchSlidesProgress={true}
            updateOnWindowResize={true}
            observer={true}
            observeParents={true}
            resistanceRatio={0.85}
            threshold={10}
            longSwipesRatio={0.3}
            speed={400}
            breakpoints={{
              // Extra Small Mobile - gunakan nilai bulat
              0: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 8,
              },
              // Small Mobile - gunakan nilai bulat
              375: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 10,
              },
              // Medium Mobile - gunakan nilai bulat
              480: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 12,
              },
              // Large Mobile - gunakan nilai bulat
              640: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 14,
              },
              // Small Tablet
              768: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 16,
              },
              // Large Tablet
              1024: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 18,
              },
              // Small Desktop
              1280: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 20,
              },
              // Medium Desktop
              1440: {
                slidesPerView: 4,
                centeredSlides: false,
                spaceBetween: 22,
              },
              // Large Desktop
              1600: {
                slidesPerView: 4,
                centeredSlides: false,
                spaceBetween: 24,
              },
              // Extra Large Desktop
              1920: {
                slidesPerView: 5,
                centeredSlides: false,
                spaceBetween: 26,
              },
            }}
          >
            {duplicatedProducts.map((product, index) => (
              <SwiperSlide key={`slide-${index}`} className="!w-auto">
                <div className="bg-white rounded-2xl h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Card dengan ukuran yang konsisten */}
                  <div className="w-full max-w-[280px] mx-auto">
                    <div className="
                      h-[380px] xs:h-[400px] sm:h-[420px] md:h-[440px] lg:h-[460px] xl:h-[480px] 2xl:h-[500px]
                      grid grid-rows-[55%_45%]
                    ">
                      
                      {/* Image Section */}
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 md:p-5">
                        <div className="w-full h-full bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
                          <img
                            src={
                              product.photos?.[0]?.filePath 
                                ? `/storage/${product.photos[0].filePath}`
                                : product.image || '/placeholder-image.jpg'
                            }
                            alt={product.productName || product.name}
                            className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-500"
                            loading="eager"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-image.jpg';
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-3 sm:p-4 md:p-5 flex flex-col justify-between">
                        <div className="text-center mb-3 sm:mb-4">
                          <h3 className="font-poppins text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                            {product.productName || product.name}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-sm md:text-base font-poppins leading-relaxed line-clamp-3">
                            {product.description}
                          </p>
                        </div>
                        
                        <div className="border-t pt-3 sm:pt-4">
                          <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 font-poppins">
                            Rp. {product.price.toLocaleString('id-ID')}
                          </p>
                        </div>
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