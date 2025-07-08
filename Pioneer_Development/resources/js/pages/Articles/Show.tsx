import React, { useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    type BreadcrumbItem,
    type InertiaSharedProps,
    type Article,
    type CategoryArticle as Category, // Alias for consistency
    type Author,
} from '@/types';
import articlesRoute from '@/routes/articles';
import { dashboard } from '@/routes';
import {
    CheckCircle,
    XCircle,
    CalendarDays,
    User,
    BookCopy,
    Tag,
    FilePenLine,
    ArrowLeft,
    Clock,
    Eye,
    Share2,
    Sparkles,
} from 'lucide-react';

// --- Component Props ---
interface ShowProps extends InertiaSharedProps {
    article: Article;
}

// --- Main Component ---
export default function Show({ article }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Article Management', href: articlesRoute.indexAdmin().url },
        { title: 'Detail', href: '#' },
    ], []);

    // Helper to format date
    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={article.title} />

            <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-green-50/50 to-teal-50/70 dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-900">
                <div className="relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl"></div>
                    </div>

                    {/* --- Enhanced Featured Image Header --- */}
                    <div className="h-72 md:h-96 w-full overflow-hidden relative">
                        <img
                            src={`/storage/${article.featuredImage}`|| 'https://placehold.co/1200x400/10b981/ffffff?text=Article'}
                            alt={article.title}
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-transparent to-green-600/20"></div>
                        
                        {/* Floating Status Badge */}
                        <div className="absolute top-6 right-6">
                            {article.status === 'published' ? (
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-emerald-500/90 text-white backdrop-blur-sm border border-emerald-400/30 shadow-lg">
                                    <CheckCircle className="w-4 h-4" />
                                    Published
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-amber-500/90 text-white backdrop-blur-sm border border-amber-400/30 shadow-lg">
                                    <Clock className="w-4 h-4" />
                                    Draft
                                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                                </span>
                            )}
                        </div>
                    </div>

                    {/* --- Main Content Container --- */}
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                        <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-emerald-200/50 dark:border-slate-700/50 -mt-32 md:-mt-40 overflow-hidden">
                            {/* Decorative Header Pattern */}
                            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500"></div>
                            
                            <div className="p-8 md:p-12">
                                {/* --- Enhanced Article Title and Metadata --- */}
                                <header className="mb-12 pb-8 border-b border-dashed border-emerald-200 dark:border-slate-700">
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                                                    <Sparkles className="w-4 h-4" />
                                                    Featured Article
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <Eye className="w-4 h-4" />
                                                    <span>Reading time: 5 min</span>
                                                </div>
                                            </div>
                                            
                                            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent leading-tight mb-4">
                                                {article.title}
                                            </h1>
                                            
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4" />
                                                    <span className="font-medium">{article.author?.name || 'Unknown Author'}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Tag className="w-4 h-4" />
                                                    <span className="font-medium">{article.category?.name || 'Uncategorized'}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CalendarDays className="w-4 h-4" />
                                                    <span className="font-medium">{formatDate(article.created_at)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col gap-3 lg:items-end">
                                            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200 border border-emerald-200 dark:border-emerald-800">
                                                <Share2 className="w-4 h-4" />
                                                Share Article
                                            </button>
                                        </div>
                                    </div>
                                </header>
                                
                                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                                    {/* --- Enhanced Article Content --- */}
                                    <div className="xl:col-span-8">
                                        <div className="relative">
                                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-green-600 rounded-full opacity-60"></div>
                                            <div
                                                className="prose prose-xl dark:prose-invert max-w-none prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-headings:font-bold prose-a:text-emerald-600 hover:prose-a:text-emerald-700 dark:prose-a:text-emerald-400 prose-strong:text-gray-800 dark:prose-strong:text-gray-100 prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50/50 dark:prose-blockquote:bg-emerald-900/10 prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-code:bg-emerald-100 dark:prose-code:bg-emerald-900/30 prose-code:text-emerald-800 dark:prose-code:text-emerald-200 prose-code:rounded prose-code:px-2 prose-code:py-1"
                                                dangerouslySetInnerHTML={{ __html: article.content }}
                                            />
                                        </div>
                                    </div>

                                    {/* --- Enhanced Metadata Sidebar --- */}
                                    <aside className="xl:col-span-4 space-y-6">
                                        <div className="sticky top-6 space-y-6">
                                            <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-slate-800/80 dark:via-emerald-900/20 dark:to-slate-800/80 rounded-2xl p-6 border border-emerald-200/60 dark:border-slate-600/60 shadow-lg backdrop-blur-sm">
                                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                                                    <BookCopy className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                                    Detail Informasi
                                                </h3>
                                                
                                                <div className="space-y-6">
                                                    <div className="group hover:bg-white/50 dark:hover:bg-slate-700/30 rounded-xl p-4 -m-4 transition-all duration-200">
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                                                <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Penulis</p>
                                                                <p className="font-bold text-gray-800 dark:text-gray-200">{article.author?.name || '-'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="group hover:bg-white/50 dark:hover:bg-slate-700/30 rounded-xl p-4 -m-4 transition-all duration-200">
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                                                <Tag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Kategori</p>
                                                                <p className="font-bold text-gray-800 dark:text-gray-200">{article.category?.name || '-'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="group hover:bg-white/50 dark:hover:bg-slate-700/30 rounded-xl p-4 -m-4 transition-all duration-200">
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                                                <CalendarDays className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Dibuat pada</p>
                                                                <p className="font-bold text-gray-800 dark:text-gray-200">{formatDate(article.created_at)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="group hover:bg-white/50 dark:hover:bg-slate-700/30 rounded-xl p-4 -m-4 transition-all duration-200">
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                                                <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Diperbarui pada</p>
                                                                <p className="font-bold text-gray-800 dark:text-gray-200">{formatDate(article.updated_at)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* --- Enhanced Action Buttons --- */}
                                            <div className="space-y-4">
                                                <Link href={articlesRoute.edit(article?.slug).url} className="block group">
                                                    <button className="w-full h-14 flex items-center justify-center gap-3 text-base font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        <FilePenLine className="h-5 w-5 relative z-10" />
                                                        <span className="relative z-10">Edit Artikel</span>
                                                    </button>
                                                </Link>
                                                
                                                <Link href={articlesRoute.indexAdmin().url} className="block group">
                                                    <button className="w-full h-14 flex items-center justify-center gap-3 text-base font-bold bg-white/90 dark:bg-slate-700/90 hover:bg-white dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-2xl shadow-md hover:shadow-lg border-2 border-emerald-200/60 dark:border-slate-600/60 hover:border-emerald-300 dark:hover:border-slate-500 transition-all duration-300 relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        <ArrowLeft className="h-5 w-5 relative z-10" />
                                                        <span className="relative z-10">Kembali ke Daftar</span>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}