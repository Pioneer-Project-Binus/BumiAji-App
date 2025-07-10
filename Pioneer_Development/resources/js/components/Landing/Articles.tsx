import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import articlesRoute from '@/routes/articles';

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
    latestArticles: any[];
    otherArticles: any[];
}

export default function ArticleSection({ latestArticles, otherArticles }: LandingProps) {
    console.log(latestArticles, "latestArticles <<");
    console.log(otherArticles, 'otherArticles <<');
    
    // Map latest articles (5 data terbaru) for the Swiper
    const mappedLatestArticles = (latestArticles || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.created_at ? (new Date(item.created_at)).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
        image: item.featuredImage ? `/storage/${item.featuredImage}` : '',
        kategori: item.category?.name || 'Umum',
        slug: item.slug,
    }));

    // Map other articles (3 data) for the sidebar
    const mappedOtherArticles = (otherArticles || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.created_at ? (new Date(item.created_at)).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
        image: item.featuredImage ? `/storage/${item.featuredImage}` : '',
        kategori: item.category?.name || 'Umum',
        slug: item.slug,
    }));

    console.log("Latest Articles", mappedLatestArticles);
    console.log("Other Articles", mappedOtherArticles);

    return (
        <div
            className="relative min-h-screen w-full font-poppins leading-normal text-gray-800"
            style={{ minHeight: '100vh' }}
        >
            {/* Background putih full screen */}
            <div className="fixed inset-0 bg-white z-[-10]" />
            {/* Article Section */}
            <section className="min-h-screen py-0 px-4 sm:px-6 lg:px-10 bg-white mt-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black text-center mt-10 mb-2">Article</h2>
                <p className="text-center text-lg sm:text-xl text-gray-700 mb-8 sm:mb-12 px-4">Berita dan informasi terbaru seputar Desa Bumi Aji</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[400px]">
                        {/* Artikel besar Swiper (Latest Articles - 5 data terbaru) */}
                        <div className="relative h-[550px] w-full mx-auto">
                            {/* Tombol custom */}
                            <button
                                className="swiper-button-prev-custom absolute top-1/2 left-2 z-20 p-2 bg-white/80 border-none hover:bg-white rounded-full shadow-md transition duration-300"
                                style={{ transform: 'translateY(-50%)' }}
                                aria-label="Sebelumnya"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button
                                className="swiper-button-next-custom absolute top-1/2 right-2 z-20 p-2 bg-white/80 border-none hover:bg-white rounded-full shadow-md transition duration-300"
                                style={{ transform: 'translateY(-50%)' }}
                                aria-label="Berikutnya"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </button>
                            {/* Swiper */}
                            <div className="h-full">
                                <Swiper
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    navigation={{
                                        nextEl: ".swiper-button-next-custom",
                                        prevEl: ".swiper-button-prev-custom",
                                    }}
                                    pagination={{
                                        clickable: true,
                                        bulletClass: 'swiper-pagination-bullet',
                                        bulletActiveClass: 'swiper-pagination-bullet-active'
                                    }}
                                    modules={[Navigation, Pagination]}
                                    className="h-full w-full"
                                >
                                    {mappedLatestArticles.map((item: Article) => (
                                        <SwiperSlide key={item.id} className="!w-full">
                                            <div className='overflow-hidden static h-[550px] w-full flex flex-col'>
                                                {/* Image Container - 70% dari tinggi */}
                                                <div className="relative h-[70%] w-full mx-auto bg-gray-300 flex-shrink-0">
                                                    {/* Category Badge */}
                                                    <div className="absolute top-4 left-4 z-10">
                                                        <span className="inline-block bg-green-800 text-white text-sm font-semibold rounded-lg px-4 py-2 shadow-sm">
                                                            {item.kategori}
                                                        </span>
                                                    </div>
                                                    {/* Image Link */}
                                                    <Link href={articlesRoute.showPublic(item.slug).url} className="absolute block w-full h-full">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.title} 
                                                            className="w-full h-full object-fill hover:scale-105 transition-transform duration-300" 
                                                        />
                                                    </Link>
                                                </div>
                                                {/* Content Container - 30% dari tinggi */}
                                                <div className="relative bg-[#25603B] h-[22%] w-full mx-auto p-6 flex flex-col justify-between">
                                                    <div className="flex-2">
                                                        <Link 
                                                            href={articlesRoute.showPublic(item.slug).url} 
                                                            className="font-bold text-lg leading-tight text-white hover:underline block transition-colors duration-200"
                                                        >
                                                            {/* Truncate title jika terlalu panjang */}
                                                            {item.title.length > 80 ? `${item.title.substring(0, 80)}...` : item.title}
                                                        </Link>
                                                    </div>
                                                    <div className="">
                                                        <p className="text-[#B6CFC6] text-sm">{item.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                        {/* Artikel kecil (Other Articles - 3 data) - RESPONSIVE */}
                        <div className="flex flex-col lg:h-[550px]">
                            <div className="flex-grow overflow-y-auto space-y-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {mappedOtherArticles.map((item: Article) => (
                                    <div
                                        key={item.id}
                                        className="relative w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px]"
                                    >
                                        {/* Image */}
                                        <div className="w-[180px] sm:w-[200px] md:w-[220px] lg:w-[260px] h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] rounded-[1px] overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>

                                        {/* Text over image, centered vertically, slightly offset right - RESPONSIVE */}
                                        <div className="absolute top-1/2 left-[160px] sm:left-[180px] md:left-[200px] lg:left-[220px] transform -translate-y-1/2 z-10 bg-white bg-opacity-90 backdrop-blur-md rounded-lg p-3 sm:p-4 lg:p-6 w-[calc(100%-180px)] sm:w-[calc(100%-200px)] md:w-[calc(100%-220px)] lg:w-[calc(100%-240px)] shadow-md">
                                            <p className="inline-block bg-green-800 text-white text-xs sm:text-sm font-semibold rounded-lg px-2 sm:px-3 lg:px-4 py-1 mb-1">
                                                {item.kategori}
                                            </p>
                                            <Link
                                                href={articlesRoute.showPublic(item.slug).url}
                                                className="font-bold text-sm sm:text-base lg:text-[16px] mb-1 lg:mb-2 hover:underline block line-clamp-2"
                                            >
                                                {item.title}
                                            </Link>
                                            <p className="text-gray-600 text-xs sm:text-sm lg:text-base">{item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end pt-4">
                                <Link href={articlesRoute.indexPublic.url()} className="font-bold text-lg sm:text-xl text-black hover:underline">Berita Lainya...</Link>
                            </div>
                        </div>
                    </div>
            </section>
        </div>
    );
}