import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "../Landing/css/style.css";

// TypeScript interfaces
interface TestimoniData {
  id: number;
  name: string;
  title?: string;
  message: string;
  photo: string;
  rating?: number;
}

interface TestimoniProps {
  name: string;
  title?: string;
  message: string;
  photo: string;
  rating?: number;
}

interface TestimoniSectionProps {
  testimonials?: TestimoniData[];
}

const Testimoni: React.FC<TestimoniProps> = ({ 
  name, 
  title = "Pengunjung", 
  message, 
  photo, 
  rating = 5 
}) => (
  <div className="w-full max-w-[300px] h-[200px] 
      sm:max-w-[350px] sm:h-[250px] 
      md:max-w-[400px] md:h-[300px] 
      lg:max-w-[440px] lg:h-[350px] 
      bg-white rounded-[20px] shadow-md p-4 sm:p-5 flex flex-col gap-2 mx-auto">
    <div className="flex items-center gap-2">
      <img
        src={`storage/${photo}`}
        alt={name}
        className="w-[40px] h-[40px] md:w-[52px] md:h-[52px] object-cover rounded-full flex-shrink-0"
      />
      <div className="flex flex-col pl-2 sm:pl-4 min-w-0">
        <div className="text-black text-sm md:text-[20px] font-medium truncate">{name}</div>
        <div className="text-gray-600 text-xs md:text-[16px] font-light truncate">{title}</div>
      </div>
    </div>

    <div className="flex gap-1 py-1">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-yellow-500" />
      ))}
    </div>

    <p className="text-black text-xs md:text-[17.96px] line-clamp-4 flex-grow overflow-hidden">
      {message}
    </p>

    <div className="text-zinc-500 text-xs md:text-[16px] mt-auto text-right">
      See more
    </div>
  </div>
);

const TestimoniSection: React.FC<TestimoniSectionProps> = ({ testimonials = [] }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="w-full mx-auto px-4 md:px-10 lg:px-20 bg-white justify-center mt-20 sm:mt-40 md:mt-60">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-black mb-2">
          Apa Kata Mereka?
        </h2>
        <p className="text-sm md:text-lg lg:text-xl font-normal text-black text-center">
          Simak pengalaman para pengunjung
          <br className="block md:hidden" />
          yang telah menjelajahi keindahan desa Batu Aji.
        </p>
      </div>

      <div className="w-full max-w-[1200px] mx-auto relative min-h-[300px] sm:min-h-[400px] md:min-h-[514px] flex items-center justify-center">
        {/* Background decoration - responsive */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <div className="w-[90%] max-w-[600px] h-[250px] 
              sm:w-[80%] sm:max-w-[700px] sm:h-[350px] 
              md:w-[800px] md:h-[514px] 
              bg-[rgba(176,211,194,1)] rounded-2xl" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px]">
          {testimonials.length > 0 ? (
            <Swiper
              modules={[Pagination]}
              pagination={{ 
                clickable: true,
                dynamicBullets: true
              }}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="relative z-10 pb-10"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id} className="testimonial-slide flex justify-center">
                  <div className="w-full max-w-[500px] py-4 sm:py-6 flex justify-center">
                    <Testimoni
                      name={item.name}
                      title={item.title}
                      message={item.message}
                      photo={item.photo}
                      rating={item.rating}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex justify-center items-center h-[200px]">
              <p className="text-center text-gray-500 text-sm md:text-base">
                Belum ada testimoni tersedia.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimoniSection;