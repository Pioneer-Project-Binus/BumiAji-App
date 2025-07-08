import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {Star} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "../Landing/css/style.css"; // Jika ada custom CSS

const Testimoni = ({ name, title = "Pengunjung", message, photo, rating = 5 }) => (
  <div className="w-[60%] h-[200px]         /* default (mobile) */
      sm:w-[70%] sm:h-[250px]   /* ≥640px */
      md:w-[400px] md:h-[300px] /* ≥768px */
      lg:w-[440px] lg:h-[350px] /* ≥1024px */ bg-white rounded-[20px] shadow-md p-5 flex flex-col gap-2 mx-auto">
    <div className="flex items-center gap-2">
      <img
        src={photo}
        alt={name}
        className="w-[40px] h-[40px] md:w-[52px] md:h-[52px] object-cover rounded-full"
      />
      <div className="flex flex-col pl-4">
        <div className="text-black text-sm md:text-[20px] font-medium">{name}</div>
        <div className="text-gray-600 text-xs md:text-[16px] font-light">{title}</div>
      </div>
    </div>

    <div className="flex gap-1 py-1">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
      ))}
    </div>

    <p className="text-black text-xs md:text-[17.96px] line-clamp-4">{message}</p>

    <div className="text-zinc-500 text-xs md:text-[16px] mt-auto text-right">
      See more
    </div>
  </div>
);

const TestimoniSection = ({ testimonials = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full mx-auto px-4 md:px-10 lg:px-20 bg-white justify-cente mt-60">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-black mb-2">
          Apa Kata Mereka?
        </h2>
        <p className="text-sm md:text-lg lg:text-xl font-normal text-black text-center">
          Simak pengalaman para pengunjung
          <br className="block md:hidden" />
          yang telah menjelajahi keindahan desa Batu Aji.
        </p>
      </div>

      <div className="w-full max-w-[1200px] mx-auto relative h-[514px] flex items-center justify-center">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <div className="w-[800px] h-[514px] bg-[rgba(176,211,194,1)] rounded-2xl" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px]">
          {testimonials.length > 0 ? (
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={250}
              slidesPerView={3}
              centeredSlides={true}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="relative z-10"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id} className="testimonial-slide flex justify-center">
                  <div className="w-[500px] h-[400px] py-6 ml-[-140px]">
                    <Testimoni
                      name={item.name}
                      message={item.message}
                      photo={item.photo}
                      rating={item.rating}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-gray-500">Belum ada testimoni tersedia.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimoniSection;
