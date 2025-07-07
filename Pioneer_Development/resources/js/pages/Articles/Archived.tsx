import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { useDebounce } from 'use-debounce';

// Layout, Types, and Route Imports
import AppLayout from '@/layouts/app-layout';
import {
    type BreadcrumbItem,
    type InertiaSharedProps,
    type Paginated,
    type Article,
    type CategoryArticle as Category,
    type Author,
    type Filter,
} from '@/types';
import articlesRoute from '@/routes/articles';
import { dashboard } from '@/routes';

// UI and Icon Imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Pagination from '@/components/pagination'; // Assuming you have a Pagination component
import {
    Newspaper,
    Search,
    RotateCcw,
    PlusCircle,
    FilePenLine,
    Trash2,
    CheckCircle,
    XCircle,
    LoaderCircle,
    Eye, // <-- Ikon baru ditambahkan di sini
} from 'lucide-react';

// --- Helper Function to Strip HTML ---
function stripHtml(html: string | null): string {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
}

// --- Helper Function to Format Date ---
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// --- Component Props ---
interface Props extends InertiaSharedProps {
    articles: Paginated<Article>;
    categories: Category[];
    authors: Author[];
    filters: Filter;
}

// --- Main Component ---
export default function Index({ articles, categories, authors, filters }: Props) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Article Management', href: articlesRoute.indexAdmin().url },
        { title: 'Article Archive', href:articlesRoute.archived().url },
    ], []);

    // State for filters
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [status, setStatus] = useState(filters.status || '');
    const [author, setAuthor] = useState(filters.author || '');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounce search input
    const [loadingSlug, setLoadingSlug] = useState<string | null>(null);

    const [confirmingDeletionSlug, setConfirmingDeletionSlug] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleApplyFilters = () => {
        const activeFilters: Filter = {};
        if (searchTerm.trim() !== '') activeFilters.search = searchTerm;
        if (category && category !== 'semua kategori') activeFilters.category = category;
        if (status && status !== 'semua status') activeFilters.status = status;
        if (author && author !== 'semua penulis') activeFilters.author = author;
    
        router.get(articlesRoute.archived().url, activeFilters, {
            preserveState: true,
            replace: true,
        });
    };

    useEffect(() => {
        const activeFilters: Filter = {};

        if (debouncedSearchTerm.trim() !== '') {
            activeFilters.search = debouncedSearchTerm;
        }

        if (category && category.toLowerCase() !== 'semua kategori') {
            activeFilters.category = category;
        }

        if (status && status.toLowerCase() !== 'semua status') {
            activeFilters.status = status;
        }

        if (author && author.toLowerCase() !== 'semua penulis') {
            activeFilters.author = author;
        }

        router.get(articlesRoute.archived().url, activeFilters, {
            preserveState: true,
            replace: true,
        });
    }, [debouncedSearchTerm, category, status, author]);

    const handleReset = () => {
        setSearchTerm('');
        setCategory('semua kategori');
        setStatus('semua status');
        setAuthor('semua penulis');
    };


    const handleRestore = (slug: string) => {
        setLoadingSlug(slug);
        router.post(`/articles/${slug}/restore`, {}, {
            onSuccess: () => toast.success('Artikel berhasil dipulihkan.'),
            onError: () => toast.error('Gagal memulihkan artikel.'),
            onFinish: () => setLoadingSlug(null),
        });
    };

    const handleDelete = (slug: string) => {
        if (!confirm('Yakin ingin menghapus artikel ini secara permanen?')) return;
        setLoadingSlug(slug);
        router.delete(`/articles/${slug}/permanent-delete`, {
            onSuccess: () => toast.success('Artikel dihapus permanen.'),
            onError: () => toast.error('Gagal menghapus permanen.'),
            onFinish: () => setLoadingSlug(null),
        });
    };

    const getStatusBadge = (status: Article['status']) => {
        if (status === 'published') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <CheckCircle className="w-3 h-3" />
                    Published
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                <XCircle className="w-3 h-3" />
                Draft
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Article Archive" />
            <div className="min-h-screen w-full bg-gradient-to-br from-green-50/50 via-emerald-50/50 to-teal-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-gray-950/50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
                            <Newspaper className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                            Article Archive
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                            Kelola artikel yang dihapus sementara.
                        </p>
                    </div>

                    {/* Filter Section */}
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-slate-700/50 mb-8 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="md:col-span-2 lg:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pencarian</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Cari judul..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="h-11 pl-10"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kategori</label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger className="h-11"><SelectValue placeholder="Semua Kategori" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Semua Kategori">Semua Kategori</SelectItem>
                                        {categories.map((cat) => <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className="h-11"><SelectValue placeholder="Semua Status" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Semua Status">Semua Status</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Penulis</label>
                                <Select value={author} onValueChange={setAuthor}>
                                    <SelectTrigger className="h-11"><SelectValue placeholder="Semua Penulis" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Semua Penulis">Semua Penulis</SelectItem>
                                        {authors.map((auth) => <SelectItem key={auth.id} value={String(auth.id)}>{auth.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4 gap-2">
                          <Button
                              onClick={handleApplyFilters}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                          >
                              Terapkan Filter
                          </Button>
                          <Button
                              variant="ghost"
                              onClick={handleReset}
                              className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                          >
                              <RotateCcw className="mr-2 h-4 w-4" />
                              Reset Filter
                          </Button>
                        </div>
                    </div>
                    
                    {/* Table Card */}
                    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden">
                        <div className="p-6 flex justify-between items-center border-b border-gray-200/80 dark:border-slate-700/80">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Daftar Artikel ({articles.total})</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-base">
                                <thead className="bg-gray-100/50 dark:bg-slate-700/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Artikel</th>
                                        <th className="px-6 py-4 text-left font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Kategori & Penulis</th>
                                        <th className="px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Tanggal Dihapus</th>
                                        <th className="px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                    {articles.data.length === 0 ? (
                                        <tr><td colSpan={5} className="text-center py-12 text-gray-500 dark:text-gray-400 text-lg">Tidak ada artikel ditemukan.</td></tr>
                                    ) : (
                                        articles.data.map((article) => (
                                            <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-200">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            className="h-16 w-24 rounded-lg object-cover flex-shrink-0 bg-gray-200"
                                                            src={`/storage/${article.featuredImage}` || `https://placehold.co/400x300/e2e8f0/64748b?text=${article.title.charAt(0)}`}
                                                            alt={article.title}
                                                        />
                                                        <div>
                                                            <div className="font-bold text-gray-800 dark:text-gray-100 line-clamp-1">{article.title}</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{stripHtml(article.content)}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-800 dark:text-gray-200 font-semibold">{article.category?.name || '-'}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">oleh {article.author?.name || '-'}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center">{getStatusBadge(article.status)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{formatDate(article.updated_at)}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center items-center gap-2">
                                                        <TooltipProvider delayDuration={100}>
                                                            <Button
                                                                onClick={() => handleRestore(article.slug)}
                                                                size="sm"
                                                                variant="outline"
                                                                className="border-green-500 text-green-600 hover:bg-green-50"
                                                            >
                                                                {loadingSlug === article.slug
                                                                    ? <LoaderCircle className="h-4 w-4 animate-spin" />
                                                                    : <RotateCcw className="h-4 w-4" />}
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleDelete(article.slug)}
                                                                size="sm"
                                                                variant="outline"
                                                                className="border-red-500 text-red-600 hover:bg-red-50"
                                                            >
                                                                {loadingSlug === article.slug
                                                                    ? <LoaderCircle className="h-4 w-4 animate-spin" />
                                                                    : <Trash2 className="h-4 w-4" />}
                                                            </Button>
                                                        </TooltipProvider>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {articles.total > articles.per_page && (
                            <div className="p-6 border-t border-gray-200/80 dark:border-slate-700/80">
                                <Pagination links={articles.links} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}