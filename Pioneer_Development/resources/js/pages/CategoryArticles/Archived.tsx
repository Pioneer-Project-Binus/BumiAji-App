import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';
import type { LucideIcon } from 'lucide-react';

// Layout, Types, and Route Imports
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps, type CategoryArticle, type Paginated, type Filter } from '@/types';
import categoryArticlesRoutes from '@/routes/category-articles';
import { dashboard } from '@/routes';

// UI and Icon Imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
    BookCopy,
    Search,
    Trash2,
    ChevronRight,
    LoaderCircle,
    RefreshCw,
    Archive as ArchiveIcon,
    RotateCcw,
    Star,
    Tag,
    AlertTriangle,
    Calendar,
    User,
} from 'lucide-react';

// --- Enhanced Types ---
interface CategoryArticleWithExtras extends CategoryArticle {
    articles_count?: number;
    is_featured?: boolean;
    author?: {
        name: string;
        avatar?: string;
    };
    status?: 'active' | 'inactive' | 'archived';
    priority?: 'high' | 'medium' | 'low';
    deleted_at?: string;
    deleted_by?: {
        name: string;
        avatar?: string;
    };
}

interface EnhancedFilter extends Filter {
    status?: string;
    priority?: string;
    date_range?: string;
}

interface EnhancedProps extends InertiaSharedProps {
    categoryArticles: Paginated<CategoryArticleWithExtras>;
    filters: EnhancedFilter;
    stats?: {
        total_archived: number;
        total_articles_affected: number;
        archived_this_month: number;
        can_be_restored: number;
    };
}

// --- Helper Function to Strip HTML ---
function stripHtml(html: string | null): string {
    if (!html) return '-';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
}

// --- Helper Function to Format Date ---
function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// --- Archive Stats Cards Component ---
function ArchiveStatsCards({ stats }: { stats?: EnhancedProps['stats'] }) {
    if (!stats) return null;

    // 💡 Tambahkan tipe eksplisit pada array statsData
    const statsData: {
        title: string;
        value: number;
        icon: LucideIcon;
        color: string;
        bgColor: string;
        textColor: string;
    }[] = [
        {
            title: 'Total Archived',
            value: stats.total_archived,
            icon: ArchiveIcon,
            color: 'from-gray-500 to-slate-500',
            bgColor: 'bg-gray-50 dark:bg-gray-900/20',
            textColor: 'text-gray-700 dark:text-gray-300'
        },
        {
            title: 'Articles Affected',
            value: stats.total_articles_affected,
            icon: BookCopy,
            color: 'from-orange-500 to-red-500',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
            textColor: 'text-orange-700 dark:text-orange-300'
        },
        {
            title: 'Archived This Month',
            value: stats.archived_this_month,
            icon: Calendar,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            textColor: 'text-purple-700 dark:text-purple-300'
        },
        {
            title: 'Can Be Restored',
            value: stats.can_be_restored,
            icon: RotateCcw,
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            textColor: 'text-green-700 dark:text-green-300'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
                <div key={index} className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"
                        style={{ backgroundImage: `linear-gradient(135deg, ${stat.color})` }} />
                    <div className={`${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- Archive Action Buttons ---
function ArchiveActionButtons() {
    return (
        <div className="flex flex-wrap gap-3">
            <Link href={categoryArticlesRoutes.indexAdmin().url}>
                <Button size="lg" className="h-12 text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group">
                    <ArchiveIcon className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    Back to Categories
                </Button>
            </Link>
        </div>
    );
}

// --- Archive Table Row Component ---
function ArchiveTableRow({
    category,
    onRestore,
    onDelete,
}: {
    category: CategoryArticleWithExtras;
    onRestore: (slug: string) => void;
    onDelete: (slug: string) => void;
}) {
    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    return (
        <tr className="group hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-slate-50/50 dark:hover:from-slate-800/50 dark:hover:to-slate-700/50 transition-all duration-300 opacity-80">
            <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-orange-400 rounded-full shadow-lg" />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-600 dark:text-gray-300 text-lg line-through group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                                {category.name}
                            </span>
                            {category.is_featured && (
                                <Star className="w-4 h-4 text-yellow-400 fill-current opacity-60" />
                            )}
                        </div>
                        {category.priority && (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 opacity-70 ${getPriorityColor(category.priority)}`}>
                                {category.priority}
                            </span>
                        )}
                    </div>
                </div>
            </td>
            <td className="px-6 py-5 max-w-md">
                <p className="text-gray-500 dark:text-gray-500 line-clamp-2 leading-relaxed opacity-70">
                    {stripHtml(category.description)}
                </p>
            </td>
            <td className="px-6 py-5 text-center">
                <div className="flex items-center justify-center gap-2">
                    <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 dark:from-orange-900/30 dark:to-red-900/30 dark:text-orange-300 shadow-sm opacity-80">
                        <BookCopy className="w-4 h-4 mr-1" />
                        {category.articles_count ?? '0'}
                    </span>
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {category.deleted_at && (
                        <div className="flex flex-col gap-1">
                            <span className="font-medium">Archived: {formatDate(category.deleted_at)}</span>
                            {category.deleted_by && (
                                <span className="text-xs flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    by {category.deleted_by.name}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </td>
            <td className="px-6 py-5 text-center">
                <div className="flex justify-center items-center gap-2">
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => onRestore(category.slug)}
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 text-green-600 hover:bg-green-50 hover:text-green-700 dark:text-green-400 dark:hover:bg-green-900/30 rounded-xl transition-all duration-300 group/btn"
                                >
                                    <RotateCcw className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Restore Category</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => onDelete(category.slug)}
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/30 rounded-xl transition-all duration-300 group/btn"
                                >
                                    <Trash2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Permanently Delete</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </td>
        </tr>
    );
}

// --- Main Archive Page Component ---
export default function Archive(props: EnhancedProps) {
    const { categoryArticles, filters, stats } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Article Categories', href: categoryArticlesRoutes.indexAdmin().url },
        { title: 'Archive', href: categoryArticlesRoutes.archived().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Archived Categories" />
            <ArchiveTableContent
                {...props}
            />
        </AppLayout>
    );
}

// --- Archive Table Content & Logic Component ---
function ArchiveTableContent({ categoryArticles, filters, stats }: EnhancedProps) {
    const [search, setSearch] = useState<string>(filters.search || '');
    const [confirmingRestoreSlug, setConfirmingRestoreSlug] = useState<string | null>(null);
    const [confirmingPermanentDeleteSlug, setConfirmingPermanentDeleteSlug] = useState<string | null>(null);
    const [isRestoring, setIsRestoring] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(
                    categoryArticlesRoutes.archived().url, // Assuming you have an archive route
                    { search },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                    },
                );
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [search, filters.search]);

    const handleRestore = (slug: string) => {
        setIsRestoring(true);
        router.put(categoryArticlesRoutes.restore(slug).url, {}, {
            onSuccess: () => {
                toast.success('Category has been restored successfully.');
                setConfirmingRestoreSlug(null);
            },
            onError: () => {
                toast.error('Failed to restore the category.');
            },
            onFinish: () => {
                setIsRestoring(false);
            },
        });
    };

    const handlePermanentDelete = (slug: string) => {
        setIsDeleting(true);
        router.delete(categoryArticlesRoutes.deletePermanent(slug).url, {
            onSuccess: () => {
                toast.success('Category has been permanently deleted.');
                setConfirmingPermanentDeleteSlug(null);
            },
            onError: () => {
                toast.error('Failed to permanently delete the category.');
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.get(categoryArticlesRoutes.archived().url, {
            search,
        }, {
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Archive refreshed successfully!');
            }
        });
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50/30 via-slate-50/30 to-gray-100/30 dark:from-slate-950 dark:via-slate-900 dark:to-gray-950/50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Enhanced Header */}
                <div className="text-center mb-12 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-slate-400/20 blur-3xl rounded-full transform -translate-y-12" />
                    <div className="relative">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-500 via-slate-500 to-gray-600 rounded-2xl mb-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <ArchiveIcon className="w-12 h-12 text-white" />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse shadow-lg" />
                        </div>
                        <h1 className="text-6xl font-black bg-gradient-to-r from-gray-600 via-slate-600 to-gray-700 bg-clip-text text-transparent mb-4 tracking-tight">
                            Archived Categories
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                            Manage your archived categories with care.
                            <span className="font-semibold text-orange-600 dark:text-orange-400"> Restore valuable content </span>
                            or permanently remove what's no longer needed.
                        </p>
                    </div>
                </div>

                {/* Archive Stats Cards */}
                <ArchiveStatsCards stats={stats} />

                {/* Enhanced Search and Actions */}
                <div className="bg-white/60 dark:bg-slate-800/30 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-slate-700/50 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                            <div className="relative w-full sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 z-10" />
                                <Input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search archived categories..."
                                    className="h-12 pl-12 pr-4 w-full text-base bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-sm border-gray-200 dark:border-gray-700 focus:border-gray-500 focus:ring-gray-500/20 transition-all duration-300"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleRefresh}
                                    disabled={isRefreshing}
                                    className="h-12 w-12 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800/20 rounded-xl transition-all duration-300"
                                >
                                    <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                                </Button>
                            </div>
                        </div>
                        <ArchiveActionButtons />
                    </div>
                </div>

                {/* Enhanced Archive Table */}
                <div className="bg-white/70 dark:bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-base">
                            <thead className="bg-gradient-to-r from-gray-100/80 to-slate-100/80 dark:from-slate-700/80 dark:to-slate-600/80 backdrop-blur-sm">
                                <tr>
                                    <th className="px-6 py-5 text-left font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider text-sm">
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-gray-600" />
                                            Category
                                        </div>
                                    </th>
                                    <th className="px-6 py-5 text-left font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider text-sm">
                                        <div className="flex items-center gap-2">
                                            <ArchiveIcon className="w-4 h-4 text-gray-600" />
                                            Description
                                        </div>
                                    </th>
                                    <th className="px-6 py-5 text-center font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider text-sm">
                                        <div className="flex items-center justify-center gap-2">
                                            <BookCopy className="w-4 h-4 text-gray-600" />
                                            Articles
                                        </div>
                                    </th>
                                    <th className="px-6 py-5 text-left font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-600" />
                                            Archived Info
                                        </div>
                                    </th>
                                    <th className="px-6 py-5 text-center font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider text-sm">
                                        <div className="flex items-center justify-center gap-2">
                                            <AlertTriangle className="w-4 h-4 text-gray-600" />
                                            Actions
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/50 dark:divide-slate-700/50">
                                {categoryArticles.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-16">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-900/30 dark:to-slate-900/30 rounded-2xl flex items-center justify-center">
                                                    <ArchiveIcon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No archived categories found</p>
                                                    <p className="text-gray-400 dark:text-gray-500 text-sm">Archived categories will appear here</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    categoryArticles.data.map((category) => (
                                        <ArchiveTableRow
                                            key={category.id}
                                            category={category}
                                            onRestore={setConfirmingRestoreSlug}
                                            onDelete={setConfirmingPermanentDeleteSlug}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Restore Confirmation Modal */}
            {confirmingRestoreSlug && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200/50 dark:border-slate-700/50 transform scale-100 animate-in fade-in-0 zoom-in-95 duration-300">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <RotateCcw className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Restore Category</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Are you sure you want to restore this category? It will become active again and visible to users.
                            </p>
                        </div>
                        <div className="flex justify-center gap-4">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setConfirmingRestoreSlug(null)}
                                className="font-semibold px-6 rounded-xl border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                                disabled={isRestoring}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="lg"
                                className="font-bold text-base px-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                onClick={() => handleRestore(confirmingRestoreSlug)}
                                disabled={isRestoring}
                            >
                                {isRestoring && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                                {isRestoring ? 'Restoring...' : 'Restore Category'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Permanent Delete Confirmation Modal */}
            {confirmingPermanentDeleteSlug && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200/50 dark:border-slate-700/50 transform scale-100 animate-in fade-in-0 zoom-in-95 duration-300">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Permanent Deletion</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                <span className="font-semibold text-red-600 dark:text-red-400">Warning:</span> This action cannot be undone! 
                                The category and all its data will be permanently removed from the system.
                            </p>
                        </div>
                        <div className="flex justify-center gap-4">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setConfirmingPermanentDeleteSlug(null)}
                                className="font-semibold px-6 rounded-xl border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                                disabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                size="lg"
                                className="font-bold text-base px-6 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                onClick={() => handlePermanentDelete(confirmingPermanentDeleteSlug)}
                                disabled={isDeleting}
                            >
                                {isDeleting && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                                {isDeleting ? 'Deleting...' : 'Delete Forever'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}