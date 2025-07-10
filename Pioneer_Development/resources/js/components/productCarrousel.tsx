import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Updated Product type based on the provided data structure
type Product = {
  id: string; // Added id for a more robust key
  productName: string;
  description: string;
  price: string; // Price comes as a string, will convert for display
  photos?: Array<{ filePath: string }>;
  category: { // Nested category object
    name: string;
  };
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

  const stripHtmlAndTruncate = (html: string, maxLength: number = 70) => {
    const stripped = html.replace(/<[^>]*>/g, '');
    const decoded = stripped.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    const trimmed = decoded.trim();

    if (trimmed.length <= maxLength) {
      return trimmed;
    }

    const truncated = trimmed.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex > maxLength * 0.8) {
      return truncated.substring(0, lastSpaceIndex) + '...';
    }

    return truncated + '...';
  };

  return (
    <div className="relative w-full">
      <style>{`
        .product-carousel {
          position: relative;
        }

        .product-carousel .swiper-button-next,
        .product-carousel .swiper-button-prev {
          background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%); /* Green theme */
          border-radius: 50%;
          transition: all 0.3s ease;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          box-shadow: 0 8px 20px rgba(46, 125, 50, 0.3); /* Green shadow */
          display: flex !important;
          align-items: center;
          justify-content: center;
          opacity: 0.9;
          border: 2px solid rgba(255, 255, 255, 0.2);
          z-index: 10;
        }

        .product-carousel .swiper-button-next::after,
        .product-carousel .swiper-button-prev::after {
          font-weight: bold;
          color: white;
        }

        .product-carousel .swiper-button-next:hover,
        .product-carousel .swiper-button-prev:hover {
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 12px 30px rgba(46, 125, 50, 0.4); /* Green hover shadow */
          opacity: 1;
          background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%); /* Lighter green on hover */
        }

        /* Glowing card effect (removed card hover transform/shadow) */
        .product-card {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease; /* Keep transition for other properties if any */
        }

        .product-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
          z-index: 1;
        }

        .product-card:hover::before {
          left: 100%;
        }

        .product-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(46, 125, 50, 0.05) 0%, rgba(76, 175, 80, 0.05) 100%); /* Light green overlay */
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }

        .product-card:hover::after {
          opacity: 1;
        }

        /* Removed .product-card:hover transform and box-shadow */
        .product-card:hover {
          /* No transform or box-shadow here */
          /* Keeping original state as it is */
        }

        .card-image-container {
          background-color: transparent; /* Changed from gradient background for consistency */
          position: relative;
          overflow: hidden;
        }

        .card-image-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          /* Removed gradient background from before, as it was for tinting */
          opacity: 0; /* Ensures it's not visible initially */
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .card-image-container:hover::before {
          /* No change needed here if it's just for an overlay on the image itself */
        }

        .card-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease-out;
        }

        .card-image-container:hover img {
          transform: scale(1.1); 
        }

        .price-badge {
          background: linear-gradient(135deg, #388E3C 0%, #66BB6A 100%); /* Green price badge */
          color: white;
          position: relative;
          overflow: hidden;
        }

        .price-badge::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .price-badge:hover::before {
          left: 100%;
        }

        /* Category badge styles */
        .category-badge {
          background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%);
          color: white;
          position: absolute;
          bottom: 8px;
          right: 8px;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(46, 125, 50, 0.3);
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }

        .category-badge:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.4);
        }

        /* Order button */
        .order-button {
            background: linear-gradient(135deg, #1B5E20 0%, #388E3C 100%); /* Darker green button */
            color: white;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(27, 94, 32, 0.3);
        }

        .order-button:hover {
            background: linear-gradient(135deg, #388E3C 0%, #4CAF50 100%); /* Lighter green on hover */
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(27, 94, 32, 0.4);
        }

        /* Responsive adjustments for navigation buttons */
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
          .product-carousel .swiper-button-next { right: 4px; }
          .product-carousel .swiper-button-prev { left: 4px; }
        }

        @media (min-width: 481px) and (max-width: 640px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 40px;
            height: 40px;
          }
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 16px;
          }
          .product-carousel .swiper-button-next { right: 6px; }
          .product-carousel .swiper-button-prev { left: 6px; }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 44px;
            height: 44px;
          }
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 18px;
          }
          .product-carousel .swiper-button-next { right: 8px; }
          .product-carousel .swiper-button-prev { left: 8px; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 48px;
            height: 48px;
          }
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 20px;
          }
          .product-carousel .swiper-button-next { right: 10px; }
          .product-carousel .swiper-button-prev { left: 10px; }
        }

        @media (min-width: 1025px) and (max-width: 1280px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 52px;
            height: 52px;
          }
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 22px;
          }
          .product-carousel .swiper-button-next { right: 3px; }
          .product-carousel .swiper-button-prev { left: 3px; }
        }

        @media (min-width: 1281px) and (max-width: 1536px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 56px;
            height: 56px;
          }
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 24px;
          }
          .product-carousel .swiper-button-next { right: 6px; }
          .product-carousel .swiper-button-prev { left: 6px; }
        }

        @media (min-width: 1537px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 60px;
            height: 60px;
          }
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 26px;
          }
          .product-carousel .swiper-button-next { right: 10px; }
          .product-carousel .swiper-button-prev { left: 10px; }
        }

        .swiper-slide {
          flex-shrink: 0;
          width: auto !important;
        }

        .swiper-wrapper {
          transition-timing-function: ease-in-out;
          align-items: stretch;
        }

        .swiper-container {
          transform: translateZ(0);
        }

        .swiper-slide-duplicate {
          opacity: 1 !important;
        }

        .swiper-slide > div {
          width: 100% !important;
          height: 100% !important;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .floating-element {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: -468px 0; }
          100% { background-position: 468px 0; }
        }

        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 400% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      <div className="carousel-container px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="product-carousel">
          <Swiper
            navigation
            spaceBetween={20}
            modules={[Navigation, Autoplay]}
            loop={shouldLoop}
            loopAdditionalSlides={2}
            autoplay={shouldLoop ? {
              delay: 4000,
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
            speed={600}
            breakpoints={{
              0: { slidesPerView: 1, centeredSlides: true, spaceBetween: 12 },
              375: { slidesPerView: 1, centeredSlides: true, spaceBetween: 14 },
              480: { slidesPerView: 1, centeredSlides: true, spaceBetween: 16 },
              640: { slidesPerView: 2, centeredSlides: false, spaceBetween: 18 },
              768: { slidesPerView: 2, centeredSlides: false, spaceBetween: 20 },
              1024: { slidesPerView: 3, centeredSlides: false, spaceBetween: 22 },
              1280: { slidesPerView: 3, centeredSlides: false, spaceBetween: 24 },
              1440: { slidesPerView: 4, centeredSlides: false, spaceBetween: 26 },
              1600: { slidesPerView: 4, centeredSlides: false, spaceBetween: 28 },
              1920: { slidesPerView: 5, centeredSlides: false, spaceBetween: 30 },
            }}
          >
            {duplicatedProducts.map((product, index) => (
              <SwiperSlide key={`slide-${product.id}-${index}`} className="w-auto">
                <div className="product-card bg-white rounded-xl h-full overflow-hidden shadow-xl transition-all duration-500 group relative">
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-green-300 to-teal-400 rounded-full opacity-70 floating-element"></div>
                  <div className="absolute top-8 right-8 w-2 h-2 bg-gradient-to-br from-lime-300 to-green-400 rounded-full opacity-50 floating-element" style={{ animationDelay: '1s' }}></div>

                  {/* Card with consistent sizing */}
                  <div className="w-[270px] mx-auto">
                    <div className="flex flex-col h-[430px] xs:h-[380px] sm:h-[400px] md:h-[440px] lg:h-[460px] xl:h-[480px] 2xl:h-[500px]">


                      {/* Image Section with Category Badge */}
                      <div className="card-image-container bg-white m-3 mb-0 relative rounded-2xl flex-shrink-0">
                        <div className="w-full h-[250px] bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-lg relative group">
                          <img
                            src={
                              product.photos?.[0]?.filePath
                                ? `/storage/${product.photos[0].filePath}`
                                : '/placeholder-image.jpg'
                            }
                            alt={product.productName}
                            className="w-full h-full object-cover rounded-2xl"
                            loading="eager"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-image.jpg';
                            }}
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent rounded-2xl"></div>
                          
                          {/* Category Badge - positioned at bottom right of image */}
                          <div className="category-badge">
                            {product.category.name}
                          </div>
                        </div>
                      </div>

                      {/* Content Section - positioned directly below image */}
                      <div className="px-4 pb-4 pt-2 flex flex-col justify-between flex-1 relative z-10">
                        <div className="text-left">
                          <h3 className="font-poppins text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                            {product.productName}
                          </h3>
                          <p className="text-gray-600 text-sm sm:text-base md:text-base font-poppins mb-2">
                            {stripHtmlAndTruncate(product.description, 80)}
                          </p>
                        </div>

                        {/* Price and Action Section */}
                        <div className="flex items-center justify-between mt-2">
                          {/* Price display */}
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-green-700">
                                Rp {parseFloat(product.price).toLocaleString('id-ID')}
                            </span>
                          </div>
                          
                          {/* Order Button */}
                          <button className="order-button px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap">
                            Pesan Sekarang
                          </button>
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