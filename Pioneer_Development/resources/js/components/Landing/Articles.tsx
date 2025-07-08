import React from 'react';
import { Link } from '@inertiajs/react';
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

interface ArticleSectionProps {
    latestArticles: any[]; // sekarang array
    otherArticles: any[];
}

export default function ArticleSection({ latestArticles: highlight, otherArticles: articles }: ArticleSectionProps) {
    console.log(highlight)
    console.log(articles)
    // Mapping highlight
    const mappedHighlight = (highlight || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.createdAt ? (new Date(item.createdAt)).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
        image: item.featuredImage ? `/storage/${item.featuredImage}` : '',
        kategori: item.category?.name || '',
        slug: item.slug,
    }));


    // Mapping articles (otherArticles)
    const mappedArticles = (articles || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.createdAt ? (new Date(item.createdAt)).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
        image: item.featuredImage ? `/storage/${item.featuredImage}` : '',
        kategori: item.category?.name || '',
        slug: item.slug,
    }));

    return (
        <section className="min-h-screen py-0 px-10 bg-white mt-4 font-poppins">
            <h2 className="text-5xl font-bold text-black text-center mt-10 mb-2">Article</h2>
            <p className="text-center text-xl text-gray-700 mb-12">Berita dan informasi terbaru seputar Desa Bumi Aji</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[400px]">
                {/* Highlight Article Swiper */}
                <div>
                    {mappedHighlight && (
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination]}
                            className="h-[550px]"
                        >
                            {mappedHighlight.map((item) => (
                                <SwiperSlide key={item.id} className="h-full">
                                    <div className='overflow-hidden relative h-full flex flex-col rounded-lg'>
                                        <div className="w-full mx-auto flex-1 bg-gray-300 flex items-center text-gray-500 relative">
                                            <div className="absolute top-4 left-4 z-10">
                                                <p className="inline-block bg-green-800 text-white text-sm font-semibold rounded-lg px-4 py-1">
                                                    {item.kategori}
                                                </p>
                                            </div>
                                            <Link href={articlesRoute.showPublic(item.slug).url} className="absolute object-cover w-full h-full">
                                                <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                                            </Link>
                                        </div>
                                        <div className="bg-[#25603B] shadow-md p-8 text-start">
                                            <Link href={articlesRoute.showPublic(item.slug).url} className="font-bold text-xl mb-2 text-white hover:underline block">
                                                {item.title}
                                            </Link>
                                            <p className="text-[#B6CFC6]">{item.date}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    )}
                </div>
                {/* Other Articles List */}
                <div className="flex flex-col h-[550px]">
                    <div className="flex-grow overflow-y-auto space-y-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                        {mappedArticles.map((item: Article) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-[5px_5px_10px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row w-full">
                                <div className="w-full lg:w-1/4 h-48 lg:h-full">
                                    <Link href={articlesRoute.showPublic(item.slug).url}>
                                        <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                                    </Link>
                                </div>
                                <div className="p-4 lg:p-8 flex-1 flex flex-col justify-center">
                                    <div className="flex">
                                        <p className="inline-block bg-green-800 text-white text-sm font-semibold rounded-lg px-4 py-1 mb-2">{item.kategori}</p>
                                    </div>
                                    <Link href={articlesRoute.showPublic(item.slug).url} className="font-bold text-lg mb-1 lg:mb-2 hover:underline block">{item.title}</Link>
                                    <p className="text-gray-600 text-sm lg:text-base">{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end pt-4">
                        <Link href={articlesRoute.indexPublic().url} className="font-bold text-xl text-black hover:underline">Berita Lainya...</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}