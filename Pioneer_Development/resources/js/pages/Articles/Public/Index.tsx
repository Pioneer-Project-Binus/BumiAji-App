import React, { useState, useEffect } from 'react';
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
import articlesRoute from '@/routes/public/articles';

dayjs.extend(utc);
dayjs.extend(timezone);

// Define the Article type
type Article = {
    id: number;
    title: string;
    date: string;
    image: string;
    category: { id: number; name: string };
    slug: string;
    createdAt: string;
    created_at: string; // Laravel uses snake_case
    status: string;
    content?: string;
};

type Category = { id: number; name: string };
type Author = { id: number; name: string };

// Laravel pagination structure
type LaravelPagination = {
    current_page: number;
    data: Article[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
};

// Default highlight article - will be replaced by data from backend
const defaultHighlight: Article = {
    id: 1,
    title: "Selamat Datang di Portal Berita Desa Bumi Aji",
    date: "20 Jun 2024",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    category: { id: 1, name: "Berita Utama" },
    slug: "selamat-datang-portal-berita",
    createdAt: "20 Jun 2024",
    created_at: "2024-06-20T00:00:00.000000Z",
    status: "published"
};

export default function ArticleSection({
    articles, 
    highlight, 
    categories, 
    filters
}: {
    articles: LaravelPagination, 
    highlight?: Article,
    categories: Category[], 
    filters: any
}) {
    console.log('articles', articles);
    console.log('highlight', highlight);
    console.log('categories', categories);
    console.log('filters', filters);
    
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        filters?.category && filters.category !== 'Semua Kategori' ? filters.category : null
    );
    const [currentPage, setCurrentPage] = useState(articles.current_page || 1);
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    
    // Use highlight from props or default
    const displayHighlight = highlight || defaultHighlight;
    
    // Handle category change
    const handleCategoryChange = (categoryName: string | null) => {
        setSelectedCategory(categoryName);
        setCurrentPage(1);
        
        // Navigate with filters
        const params = new URLSearchParams();
        if (categoryName && categoryName !== 'Semua') {
            // Find category ID by name
            const category = categories.find(cat => cat.name === categoryName);
            if (category) {
                params.append('category', category.id.toString());
            }
        }
        if (searchTerm) {
            params.append('search', searchTerm);
        }
        params.append('page', '1');
        
        router.visit(`/artikel?${params.toString()}`, {
            preserveState: true,
            preserveScroll: true
        });
    };
    
    // Handle pagination
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        
        const params = new URLSearchParams();
        if (selectedCategory && selectedCategory !== 'Semua') {
            const category = categories.find(cat => cat.name === selectedCategory);
            if (category) {
                params.append('category', category.id.toString());
            }
        }
        if (searchTerm) {
            params.append('search', searchTerm);
        }
        params.append('page', page.toString());
        
        router.visit(`/artikel?${params.toString()}`, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleArticleClick = (article: Article) => {
        router.visit(articlesRoute.show(article.slug).url);
    };

    const handleHighlightClick = () => {
        if (displayHighlight.slug) {
            router.visit(articlesRoute.show(displayHighlight.slug).url);
        }
    };

    // Handle search
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        
        const params = new URLSearchParams();
        if (selectedCategory && selectedCategory !== 'Semua') {
            const category = categories.find(cat => cat.name === selectedCategory);
            if (category) {
                params.append('category', category.id.toString());
            }
        }
        if (searchTerm) {
            params.append('search', searchTerm);
        }
        params.append('page', '1');
        
        router.visit(`/artikel?${params.toString()}`, {
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <>
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Berita Desa Bumi Aji</title>
            <meta name="description" content="Berita Desa Bumi Aji" />
            <link rel="icon" href="/LOGO.svg" type="image/svg+xml" />
        </Head>

        <div className="min-h-screen bg-white w-full pb-10">
            {/* Header */}
            <div className="w-full px-10 pt-6">
                <Link href="artikel/landing" className="flex items-center text-gray-700 mb-4">
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
                <div className="text-center mb-6">
                    <p className="text-gray-500 text-xl">
                        Berita terbaru dari Desa Bumi Aji
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 px-10">
                <div className="lg:col-span-3 flex flex-col gap-0">
                    {/* Highlight Article */}
                    {displayHighlight && (
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
                                    <div 
                                        className="relative h-64 w-full cursor-pointer"
                                        onClick={handleHighlightClick}
                                    >
                                        <div className="absolute inset-0 bg-gray-100">
                                            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/square-bg.png')] opacity-40" />
                                        </div>
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="bg-green-700 text-white px-3 py-1 rounded text-xs font-semibold">
                                                {displayHighlight.category.name}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-[#25603B] p-4">
                                            <h2 className="text-white text-lg font-bold mb-1">
                                                {displayHighlight.title}
                                            </h2>
                                            <p className="text-gray-200 text-xs">
                                                {dayjs(displayHighlight.created_at).locale('id').format('DD MMMM YYYY')}
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    )}
                    
                    {/* Articles and Sidebar */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
                        {/* Articles List */}
                        <div className="lg:col-span-2">
                            <nav className="flex items-center text-sm mb-2" aria-label="Breadcrumb">
                                <span className="text-gray-400">Home</span>
                                <span className="mx-2 text-gray-300">/</span>
                                <span className={selectedCategory ? "text-black font-medium" : "text-black"}>
                                    {selectedCategory ? selectedCategory : "Semua"}
                                </span>
                            </nav>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Berita Terkini
                                {articles.total > 0 && (
                                    <span className="text-sm font-normal text-gray-500 ml-2">
                                        ({articles.total} artikel)
                                    </span>
                                )}
                            </h3>
                            <div className="h-0.5 bg-gray-200 mb-4"></div>
                            
                            {/* Category filters for mobile */}
                            <div className="block lg:hidden mb-4 overflow-x-auto">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleCategoryChange(null)}
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
                                            onClick={() => handleCategoryChange(cat.name)}
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
                            
                            {/* Articles List */}
                            {articles.data.length > 0 ? (
                                <div className="space-y-4">
                                    {articles.data.map((article: Article) => {
                                        const tanggalWaktu = dayjs(article.created_at)
                                            .locale('id')
                                            .format('DD MMMM YYYY – HH:mm [WIB]');
                                        return (
                                            <div
                                                key={article.id}
                                                className="flex items-center bg-white border border-gray-200 rounded-lg hover:shadow transition-shadow cursor-pointer"
                                                onClick={() => handleArticleClick(article)}
                                            >
                                                <div className="w-20 h-20 flex-shrink-0 relative">
                                                    <div className="absolute inset-0 bg-gray-100 rounded-l-lg">
                                                        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/square-bg.png')] opacity-40 rounded-l-lg" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 p-4">
                                                    <p className="text-gray-500 text-xs mb-1">{article.category.name}</p>
                                                    <h4 className="font-medium text-gray-900 text-sm mb-1">{article.title}</h4>
                                                    <p className="text-gray-500 text-xs">{tanggalWaktu}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 text-6xl mb-4">📄</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada artikel</h3>
                                    <p className="text-gray-500">
                                        {searchTerm ? 
                                            `Tidak ditemukan artikel dengan kata kunci "${searchTerm}"` : 
                                            selectedCategory ? 
                                                `Tidak ada artikel dalam kategori "${selectedCategory}"` :
                                                "Belum ada artikel yang dipublikasikan"
                                        }
                                    </p>
                                </div>
                            )}
                            
                            {/* Pagination */}
                            {articles.last_page > 1 && (
                                <div className="flex justify-center mt-6">
                                    <nav className="flex items-center space-x-2">
                                        <button
                                            className={`w-10 h-10 flex items-center justify-center rounded-md border text-gray-400 bg-gray-100 ${
                                                !articles.prev_page_url ? 'cursor-not-allowed' : 'hover:bg-gray-200'
                                            }`}
                                            onClick={() => handlePageChange(articles.current_page - 1)}
                                            disabled={!articles.prev_page_url}
                                        >
                                            &lt;
                                        </button>
                                        {Array.from({ length: articles.last_page }, (_, i) => i + 1).map((num) => (
                                            <button
                                                key={num}
                                                className={`w-10 h-10 flex items-center justify-center rounded-md border text-base font-medium transition-colors
                                                    ${articles.current_page === num
                                                        ? 'border-blue-600 text-blue-600 bg-white'
                                                        : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'}
                                                `}
                                                onClick={() => handlePageChange(num)}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                        <button
                                            className={`w-10 h-10 flex items-center justify-center rounded-md border text-gray-400 bg-gray-100 ${
                                                !articles.next_page_url ? 'cursor-not-allowed' : 'hover:bg-gray-200'
                                            }`}
                                            onClick={() => handlePageChange(articles.current_page + 1)}
                                            disabled={!articles.next_page_url}
                                        >
                                            &gt;
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </div>
                        
                        {/* Sidebar */}
                        <div className="hidden lg:block">
                            <div className="bg-gray-100 rounded-lg mb-6 h-70"></div>
                            <div className="bg-white-100 rounded-lg p-4">
                                <h4 className="font-bold text-gray-700 mb-2 text-sm">Topik Terpopuler</h4>
                                <div className="h-0.5 bg-gray-200 mb-4"></div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleCategoryChange(null)}
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
                                            onClick={() => handleCategoryChange(cat.name)}
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
                            <div className="bg-gray-100 rounded-lg mt-6 h-70"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}