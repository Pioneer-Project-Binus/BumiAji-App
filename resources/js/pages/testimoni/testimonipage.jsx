import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import bintang from "../assets/Star.svg";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

const Testimoni = ({ name, title, message, image }) => (
  <div className="w-[90%] max-w-[440px] h-[60%] md:w-[440px] md:h-[350px] bg-white rounded-[20px] shadow-md p-4 flex flex-col gap-2 mx-auto">
    <div className="flex items-center gap-2">
      <img
        src={image}
        alt={name}
        className="w-[40px] h-[40px] md:w-[52.46px] md:h-[52.51px] object-cover rounded-full"
      />
      <div className="flex flex-col">
        <div className="text-black text-sm md:text-[20px] font-medium font-poppins">{name}</div>
        <div className="text-gray-600 text-xs md:text-[16px] font-light font-poppins">{title}</div>
      </div>
    </div>

    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <img src={bintang} key={i} className="w-[20px] h-[20px] md:w-[35.92px] md:h-[35.92px]" />
      ))}
    </div>

    <p className="text-black text-xs md:text-[17.96px] font-poppins line-clamp-4">{message}</p>

    <div className="text-zinc-500 text-xs md:text-[16px] font-poppins mt-auto text-right">
      See more
    </div>
  </div>
);

export default function TestimoniPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // GET data dari backend
  useEffect(() => {
  fetch("/testimoni", {
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success && data.data?.data) {
        setTestimonials(data.data.data); // ambil array dari data.data.data (pagination format)
      } else {
        console.warn("Data format tidak sesuai:", data);
      }
    })
    .catch((err) => {
      console.error("Gagal mengambil data testimoni:", err);
    });
}, []);


  return (
    <div className="w-full mx-auto px-4 md:px-10 lg:px-20 py-10 bg-white justify-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-poppins text-black mb-2">
          Apa Kata Mereka?
        </h2>
        <p className="text-sm md:text-lg lg:text-xl font-normal font-poppins text-black text-center">
          Simak pengalaman para pengunjung
          <br className="block md:hidden" />
          yang telah menjelajahi keindahan desa Batu Aji.
        </p>
      </div>

      <div className="w-full max-w-[1200px] mx-auto relative h-[514px] flex items-center justify-center">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <div className="w-[800px] h-[514px] bg-[rgba(176,211,194,1)] rounded-2xl" />
        </div>

        {/* Konten slider */}
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
              {testimonials.map((item, i) => (
                <SwiperSlide key={i} className="testimonial-slide flex justify-center">
                  <div className="w-[500px] h-[400px] py-6 ml-[-140px]">
                    <Testimoni
                      name={item.name}
                      title={item.title}
                      message={item.message}
                      image={item.image}
                      isActive={i === activeIndex}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-gray-500">Memuat testimoni...</p>
          )}
        </div>
      </div>
    </div>
  );
}
