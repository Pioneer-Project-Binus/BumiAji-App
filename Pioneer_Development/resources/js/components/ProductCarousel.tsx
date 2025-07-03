import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
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
    <div className="w-full h-full overflow:hidden xl:overflow-visible">
      <div className="

        ">
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

            /* Desktop */
            @media (min-width: 1440px) {
            .swiper-button-next {
                right: 0px !important;
                transform: translate(50%, -50%) !important;
            }
            .swiper-button-prev {
                left: 0px !important;
                transform: translate(-50%, -50%) !important;
            }
            }

            /* Tablet */
            @media (min-width: 834px) and (max-width: 1439px) {
            .swiper-button-next {
                right: 28% !important;
                transform: translate(0, -50%) !important;
            }
            .swiper-button-prev {
                left: 28% !important;
                transform: translate(0, -50%) !important;
            }
            }


            @media (max-width: 833px) {
            .swiper-button-next {
                right: 28% !important;
                transform: translate(0, -50%) !important;
            }
            .swiper-button-prev {
                left: 28% !important;
                transform: translate(0, -50%) !important;
            }
            }
        `}</style>

        <Swiper
            navigation={true}
            modules={[Navigation]}
            centeredSlides={true}
            breakpoints={{
                402: {
                slidesPerView: 2.5,
                centeredSlides: true,
                spaceBetween: 14,
                },
                768: {
                slidesPerView: 2.5,
                centeredSlides: true,
                spaceBetween: 18,
                },
                1280: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 18,
                }
            }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} className=" !w-64 md:!w-96 xl:!w-80 ">
                <div className="bg-white rounded-2xl duration-[1s] h-full grid grid-rows-2 overflow-hidden ">
                    <div className="aspect-square bg-gray-50 p-4">
                        <div className="w-full h-full bg-gray-100 rounded-[8px] flex items-center justify-center overflow-hidden">
                            <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-[8px]"
                            />
                        </div>
                    </div>
                    <div className="grid grid-rows-[80%_20%]">
                        <div className="p-8 text-center grid grid-rows-[20%_80%]">
                            <h3 className="font-poppins text-xl font-medium text-black">
                                {product.name}
                            </h3>
                            <p className="text-[#878787] font-normal text-base font-poppins">
                                {product.description}
                            </p>

                        </div>
                        <div className='p-8 flex flex-col-reverse'>
                            <p className="desktop:text-sm tablet:text-xs text-xs font-normal text-black font-poppins">
                                Rp. {product.price.toLocaleString('id-ID')}
                            </p>
                        </div>

                    </div>
                </div>


            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductCarousel;
