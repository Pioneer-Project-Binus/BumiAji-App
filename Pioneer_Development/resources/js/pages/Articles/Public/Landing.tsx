import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import articlesRoute from '@/routes/public/articles';

// Define the Article type
type Article = {
    id: number;
    title: string;
    date: string;
    image: string;
    kategori: string;
    slug: string;
};

interface LandingProps {
    articles: any[];
}

export default function Landing({ articles }: LandingProps) {
    // Mapping articles (highlight & otherArticles)
    const mappedArticles = (articles || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.createdAt ? (new Date(item.createdAt)).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
        image: item.featuredImage ? `/storage/${item.featuredImage}` : '',
        kategori: item.category?.name || '',
        slug: item.slug,
    }));

    console.log("Articles", mappedArticles);

    return (
        <div
            className="relative min-h-screen w-full font-poppins leading-normal text-gray-800"
            style={{ minHeight: '100vh' }}
        >
            {/* Background putih full screen */}
            <div className="fixed inset-0 bg-white z-[-10]" />
            {/* Article Section */}
            <section className="min-h-screen py-0 px-10 bg-white mt-4">
            <h2 className="text-5xl font-bold text-black text-center mt-10 mb-2">Article</h2>
            <p className="text-center text-xl text-gray-700 mb-12">Berita dan informasi terbaru seputar Desa Bumi Aji</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[400px]">
                {/* Artikel besar Swiper (Highlight) */}
                <div className="relative">
                  {/* Tombol custom */}
                  <button
                    className="swiper-button-prev-custom absolute top-1/2 left-2 z-20 p-0 bg-transparent border-none hover:bg-gray-200 transition"
                    style={{ transform: 'translateY(-50%)' }}
                    aria-label="Sebelumnya"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    className="swiper-button-next-custom absolute top-1/2 right-2 z-20 p-0 bg-transparent border-none hover:bg-gray-200 transition"
                    style={{ transform: 'translateY(-50%)' }}
                    aria-label="Berikutnya"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </button>
                  {/* Swiper */}
                  <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={{
                      nextEl: ".swiper-button-next-custom",
                      prevEl: ".swiper-button-prev-custom",
                    }}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="h-[550px]"
                  >
                    {mappedArticles.map((item: Article) => (
                      <SwiperSlide key={item.id} className="h-110">
                        <div className='overflow-hidden relative h-full flex flex-col rounded-lg'>
                          <div className="w-full mx-auto flex-1 bg-gray-300 flex items-center text-gray-500 relative">
                            <div className="absolute top-4 left-4 z-10">
                              <p className="inline-block bg-green-800 text-white text-sm font-semibold rounded-lg px-4 py-1">{item.kategori}</p>
                            </div>
                            <Link href={articlesRoute.show(item.slug).url} className="absolute object-cover">
                              <img src={item.image} alt={item.title} className="object-fill w-full h-110" />
                            </Link>
                          </div>  
                          <div className="bg-[#25603B] shadow-md p-8 text-start">
                            <Link href={articlesRoute.show(item.slug).url} className="font-bold text-xl mb-2 text-white hover:underline block">{item.title}</Link>
                            <p className="text-[#B6CFC6]">{item.date}</p>
                          </div>  
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                {/* Artikel kecil (otherArticles) */}
                <div className="flex flex-col h-[550px]">
                    <div className="flex-grow overflow-y-auto space-y-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                        {mappedArticles.map((item: Article) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-[5px_5px_10px_rgba(0,0,0,0.3)] flex flex-col md:flex-row w-full">
                            <div className="w-full h-50 md:w-50 md:h-50 flex-shrink-0">
                                <Link href={articlesRoute.show(item.slug).url}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="object-fill w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                                    />
                                </Link>
                            </div>
                            <div className="p-4 lg:p-8 flex-1">
                                {/* Konten artikel */}
                                <div className="flex">
                                    <p className="inline-block bg-green-800 text-white text-sm font-semibold rounded-lg px-4 py-1 mb-2">{item.kategori}</p>
                                </div>
                                <Link href={articlesRoute.show(item.slug).url} className="font-bold text-lg mb-1 lg:mb-2 hover:underline block">{item.title}</Link>
                                <p className="text-gray-600 text-sm lg:text-base">{item.date}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="flex justify-end pt-4">
                        <Link href={articlesRoute.indexPublic.url()} className="font-bold text-xl text-black hover:underline">Berita Lainya...</Link>
                    </div>
                </div>
            </div>
            </section>
        </div>
    );

}