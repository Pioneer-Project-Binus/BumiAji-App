import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/id';

dayjs.extend(utc);
dayjs.extend(timezone);

// Define the Article type - Fixed category to be an object
type Article = {
    id: number;
    title: string;
    date: string;
    image: string;
    category: { id: number; name: string }; // Changed from string to object
    slug: string; // tambahkan slug
    createdAt: string;
};

type Category = { id: number; name: string };
type Author = { id: number; name: string };
type ArticlePagination = {
    current_page: number;
    data: Article[];
    // tambahkan field lain jika perlu
};

// Tambahkan highlight hardcode - Updated to match new type
const highlight: Article = {
    id: 1,
    title: "Highlight Berita Utama Desa Bumi Aji",
    date: "20 Jun 2024",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    category: { id: 1, name: "Berita Utama" }, // Changed to object
    slug: "highlight-berita-utama-desa-bumi-aji", // tambahkan slug
    createdAt: "20 Jun 2024"
};

export default function ArticleSection({articles, categories, authors, filters}: {articles: ArticlePagination, categories: Category[], authors: Author[], filters: any}) {
    console.log('articles', articles);
    console.log('categories', categories);
    console.log('authors', authors);
    console.log('filters', filters);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;

    // Filter news by selected category - Updated to use category.name
    const filteredNews =
        selectedCategory && selectedCategory !== "Semua"
            ? articles.data.filter((n: Article) => n.category.name === selectedCategory)
            : articles.data;

    // Pagination logic
    const totalPages = Math.ceil(filteredNews.length / articlesPerPage);
    const paginatedNews = filteredNews.slice(
        (currentPage - 1) * articlesPerPage,
        currentPage * articlesPerPage
    );

    const handleArticleClick = (article: Article) => {
        // Navigasi ke halaman detail artikel menggunakan slug
        router.visit(`/artikel/${article.slug}`);
    };

    return (
        <div className="min-h-screen bg-white w-full pb-10">
            {/* Header */}
            <div className="w-full px-10 pt-6">
                <Link href="/landing" className="flex items-center text-gray-700 mb-4">
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </Link>
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold text-gray-900">Berita Desa Bumi Aji</h1>
                </div>
                <div className="text-center mb-10">
                    <p className="text-gray-500 text-xl">
                        Berita terbaru dari Desa Bumi Aji
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 px-10">
                {/* Konten Kiri: Slider, Tombol, Berita Terkini */}
                <div className="lg:col-span-6 flex flex-col gap-0">
                    <div className="relative rounded-lg overflow-hidden mb-4">
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            navigation={{
                                nextEl: ".swiper-button-next-custom",
                                prevEl: ".swiper-button-prev-custom",
                            }}
                            modules={[Navigation]}
                            className="h-64"
                        >
                            <SwiperSlide>
                                <div className="relative h-64 w-full">
                                    {/* Placeholder grid */}
                                    <div className="absolute inset-0 bg-gray-100">
                                        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/square-bg.png')] opacity-40" />
                                    </div>
                                    {/* Kategori label */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="bg-green-700 text-white px-3 py-1 rounded text-xs font-semibold">
                                            {highlight.category.name}
                                        </span>
                                    </div>
                                    {/* Judul & tanggal */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-[#25603B] p-4">
                                        <h2 className="text-white text-lg font-bold mb-1">
                                            {highlight.title}
                                        </h2>
                                        <p className="text-gray-200 text-xs">{highlight.date}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    {/* Berita Terkini & Sidebar Kategori dalam grid 2 kolom */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
                        {/* Berita Terkini */}
                        <div className="lg:col-span-2">
                            {/* breadcrumb trail */}
                            <nav className="flex items-center text-sm mb-2" aria-label="Breadcrumb">
                                <span className="text-gray-400">Home</span>
                                <span className="mx-2 text-gray-300">/</span>
                                <span className={selectedCategory ? "text-black font-medium" : "text-black"}>
                                    {selectedCategory ? selectedCategory : "Semua"}
                                </span>
                            </nav>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">Berita Terkini</h3>
                            {/* garis hitam */}
                            <div className="h-0.5 bg-gray-200 mb-4"></div>
                            {/* Topik Terpopuler mobile/tablet */}
                            <div className="block lg:hidden mb-4 overflow-x-auto">
                              <div className="flex gap-2">
                                <button
                                  key="semua"
                                  onClick={() => setSelectedCategory(null)}
                                  className={`px-4 py-1 rounded-full border text-sm font-medium whitespace-nowrap
                                    ${selectedCategory === null
                                      ? "bg-green-700 text-white border-green-700"
                                      : "bg-white text-green-700 border-green-700 hover:bg-green-50"}
                                  `}
                                >
                                  Semua
                                </button>
                                {categories.map((cat: Category) => (
                                  <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`px-4 py-1 rounded-full border text-sm font-medium whitespace-nowrap
                                      ${selectedCategory === cat.name
                                        ? "bg-green-700 text-white border-green-700"
                                        : "bg-white text-green-700 border-green-700 hover:bg-green-50"}
                                    `}
                                  >
                                    {cat.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                            {/* Swiper untuk 5 artikel per slide */}
                            <div className="space-y-4">
                                {paginatedNews.map((news: Article) => {
                                    // Format tanggal dan jam WIB
                                    const tanggalWaktu = dayjs(news.createdAt)
                                        .locale('id')
                                        .format('DD MMMM YYYY – HH:mm [WIB]');
                                    return (
                                        <div
                                            key={news.id}
                                            className="flex items-center bg-white border border-gray-200 rounded-lg hover:shadow transition-shadow cursor-pointer"
                                            onClick={() => handleArticleClick(news)}
                                        >
                                            {/* Thumbnail grid */}
                                            <div className="w-20 h-20 flex-shrink-0 relative">
                                                <div className="absolute inset-0 bg-gray-100 rounded-l-lg">
                                                    <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/square-bg.png')] opacity-40 rounded-l-lg" />
                                                </div>
                                            </div>
                                            <div className="flex-1 p-4">
                                                <p className="text-gray-500 text-xs mb-1">{news.category.name}</p>
                                                <h4 className="font-medium text-gray-900 text-sm mb-1">{news.title}</h4>
                                                <p className="text-gray-500 text-xs">{tanggalWaktu}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Pagination angka di bawah daftar artikel */}
                            <div className="flex justify-center mt-6">
                                <nav className="flex items-center space-x-2">
                                    {/* Prev */}
                                    <button
                                        className={`w-10 h-10 flex items-center justify-center rounded-md border text-gray-400 bg-gray-100 ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        &lt;
                                    </button>
                                    {/* Page numbers */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                        <button
                                            key={num}
                                            className={`w-10 h-10 flex items-center justify-center rounded-md border text-base font-medium transition-colors
                                                ${currentPage === num
                                                    ? 'border-blue-600 text-blue-600 bg-white'
                                                    : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'}
                                            `}
                                            onClick={() => setCurrentPage(num)}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                    {/* Next */}
                                    <button
                                        className={`w-10 h-10 flex items-center justify-center rounded-md border text-gray-400 bg-gray-100 ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        &gt;
                                    </button>
                                </nav>
                            </div>
                        </div>
                        {/* Sidebar Kategori */}
                        <div className="hidden lg:block">
                            {/* Box gray atas */}
                            <div className="bg-gray-100 rounded-lg mb-6 h-70"></div>
                            <div className="bg-white-100 rounded-lg p-4">
                                <h4 className="font-bold text-gray-700 mb-2 text-sm">Topik Terpopuler</h4>
                                {/* garis hitam */}
                                <div className="h-0.5 bg-gray-200 mb-4"></div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        key="semua"
                                        onClick={() => setSelectedCategory(null)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                                            ${selectedCategory === null
                                                ? "bg-green-700 text-white border-green-700"
                                                : "bg-white text-green-700 border-green-700 hover:bg-green-50"}
                                        `}
                                    >
                                        Semua
                                    </button>
                                    {categories.map((cat: Category) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.name)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                                                ${selectedCategory === cat.name
                                                    ? "bg-green-700 text-white border-green-700"
                                                    : "bg-white text-green-700 border-green-700 hover:bg-green-50"}
                                            `}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Box gray bawah */}
                            <div className="bg-gray-100 rounded-lg mt-6 h-70"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}