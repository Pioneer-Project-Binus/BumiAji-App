import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';

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
    FilePenLine,
    PlusCircle,
    Search,
    Trash2,
    Home,
    ChevronRight,
    LoaderCircle,
    Filter as FilterIcon,
    Grid3X3,
    List,
    Eye,
    Star,
    TrendingUp,
    Users,
    Calendar,
    Tag,
    Archive,
    Sparkles,
    RefreshCw,
    Download,
    Upload,
} from 'lucide-react';

// --- Enhanced Types ---
// Assuming CategoryArticle interface from '@/types' has created_at and updated_at as 'string'.
// If they can be optional at the base level, you'd modify '@/types/index.d.ts'
interface CategoryArticleWithExtras extends CategoryArticle {
    articles_count?: number;
    is_featured?: boolean;
    // created_at: string; // These are assumed to be already defined as string in CategoryArticle
    // updated_at: string; // No need to redefine them here unless you want to make them optional,
                         // which would require changing the base CategoryArticle interface.
    author?: {
        name: string;
        avatar?: string;
    };
    status?: 'active' | 'inactive';
    priority?: 'high' | 'medium' | 'low';
}

interface EnhancedFilter extends Filter {
    status?: string;
    priority?: string;
    date_range?: string;
}

// Ensure EnhancedProps extends InertiaSharedProps correctly
interface EnhancedProps extends InertiaSharedProps {
    categoryArticles: Paginated<CategoryArticleWithExtras>;
    filters: EnhancedFilter;
    stats?: {
        total_categories: number;
        total_articles: number;
        active_categories: number;
        featured_categories: number;
    };
}

// --- Helper Function to Strip HTML ---
/**
 * Safely strips HTML tags from a string to display plain text.
 * @param html The HTML string from Summernote.
 * @returns A plain text string.
 */
function stripHtml(html: string | null): string {
    if (!html) return '-';
    // Create a temporary DOM element to parse the HTML
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
}

// --- Stats Cards Component ---
function StatsCards({ stats }: { stats?: EnhancedProps['stats'] }) {
    if (!stats) return null;

    const statsData = [
        {
            title: 'Total Categories',
            value: stats.total_categories,
            icon: Tag,
            color: 'from-emerald-500 to-green-500',
            bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
            textColor: 'text-emerald-700 dark:text-emerald-300'
        },
        {
            title: 'Total Articles',
            value: stats.total_articles,
            icon: BookCopy,
            color: 'from-green-500 to-teal-500',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            textColor: 'text-green-700 dark:text-green-300'
        },
        {
            title: 'Active Categories',
            value: stats.active_categories,
            icon: TrendingUp,
            color: 'from-teal-500 to-cyan-500',
            bgColor: 'bg-teal-50 dark:bg-teal-900/20',
            textColor: 'text-teal-700 dark:text-teal-300'
        },
        {
            title: 'Featured',
            value: stats.featured_categories,
            icon: Star,
            color: 'from-green-600 to-emerald-600',
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

// --- Enhanced Action Buttons ---
function ActionButtons() {
    return (
        <div className="flex flex-wrap gap-3">
            <Link href={categoryArticlesRoutes.create().url}>
                <Button size="lg" className="h-12 text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group">
                    <PlusCircle className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                    Create Category
                </Button>
            </Link>
        </div>
    );
}

function ArchiveButton(){
    return (
        <div className="flex flex-wrap gap-3">
                <Link href={categoryArticlesRoutes.archived().url}>
                    <Button size="lg" className="h-12 text-base font-bold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group">
                        <PlusCircle className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                        Archive
                    </Button>
                </Link>
            </div>
    );
}
// --- Enhanced Table Row Component ---
function CategoryTableRow({
    category,
    onEdit,
    onDelete,
}: {
    category: CategoryArticleWithExtras;
    onEdit: (slug: string) => void;
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

    // This function is defined but not used in the provided JSX for CategoryTableRow
    // const getStatusColor = (status?: string) => {
    //     return status === 'active'
    //         ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
    //         : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    // };

    return (
        <tr className="group hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 dark:hover:from-slate-800/50 dark:hover:to-slate-700/50 transition-all duration-300">
            <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                    {category.is_featured && (
                        <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg animate-pulse" />
                    )}
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-800 dark:text-gray-100 text-lg group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors duration-300">
                                {category.name}
                            </span>
                            {category.is_featured && (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                        </div>
                        {category.priority && (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPriorityColor(category.priority)}`}>
                                {category.priority}
                            </span>
                        )}
                    </div>
                </div>
            </td>
            <td className="px-6 py-5 max-w-md">
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {stripHtml(category.description)}
                </p>
            </td>
            <td className="px-6 py-5 text-center">
                <div className="flex items-center justify-center gap-2">
                    <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 dark:from-emerald-900/30 dark:to-green-900/30 dark:text-emerald-300 shadow-sm">
                        <BookCopy className="w-4 h-4 mr-1" />
                        {category.articles_count ?? '0'}
                    </span>
                </div>
            </td>

            <td className="px-6 py-5 text-center">
                <div className="flex justify-center items-center gap-2">
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-300 group/btn"
                                >
                                    <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>View Details</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => onEdit(category.slug)}
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 text-green-600 hover:bg-green-50 hover:text-green-700 dark:text-green-400 dark:hover:bg-green-900/30 rounded-xl transition-all duration-300 group/btn"
                                >
                                    <FilePenLine className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Edit Category</p></TooltipContent>
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
                            <TooltipContent><p>Delete Category</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </td>
        </tr>
    );
}

// --- Main Page Component ---
export default function Index(props: EnhancedProps) { // Use props directly to pass all InertiaSharedProps
    const { categoryArticles, filters, stats } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Article Categories', href: 'category-articles' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Article Categories" />
            <CategoryTableContent
                {...props} // Spread all props here
            />
        </AppLayout>
    );
}

// --- Enhanced Table Content & Logic Component ---
function CategoryTableContent({ categoryArticles, filters, stats, auth, errors, flash, ziggy }: EnhancedProps) { // Destructure all props
    const [search, setSearch] = useState<string>(filters.search || '');
    const [confirmingDeletionSlug, setConfirmingDeletionSlug] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(
                    categoryArticlesRoutes.admin().url,
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

    const handleDelete = (slug: string) => {
        setIsDeleting(true);
        router.delete(categoryArticlesRoutes.destroy(slug).url, {
            onSuccess: () => {
                toast.success('Category has been deleted successfully.');
                setConfirmingDeletionSlug(null);
            },
            onError: () => {
                toast.error('Failed to delete the category.');
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };

    const handleEdit = (slug: string) => {
        router.get(categoryArticlesRoutes.edit(slug).url);
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.get(categoryArticlesRoutes.admin().url, {
            search,
        },{
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Data refreshed successfully!');
            }
        });
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-green-50/30 via-emerald-50/30 to-teal-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-gray-950/50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Enhanced Header */}
                <div className="text-center mb-12 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 blur-3xl rounded-full transform -translate-y-12" />
                    <div className="relative">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl mb-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <BookCopy className="w-12 h-12 text-white" />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse shadow-lg" />
                        </div>
                        <h1 className="text-6xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 tracking-tight">
                            Article Categories
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                            Organize and manage your content with our powerful category system.
                            <span className="font-semibold text-green-600 dark:text-green-400"> Create, edit, and optimize </span>
                            your article categories effortlessly.
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <StatsCards stats={stats} />

                {/* Enhanced Search and Actions */}
                <div className="bg-white/60 dark:bg-slate-800/30 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-slate-700/50 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                            <div className="relative w-full sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500 z-10" />
                                <Input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search categories, descriptions..."
                                    className="h-12 pl-12 pr-4 w-full text-base bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-sm border-green-200 dark:border-green-700 focus:border-green-500 focus:ring-green-500/20 transition-all duration-300"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleRefresh}
                                    disabled={isRefreshing}
                                    className="h-12 w-12 border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-900/20 rounded-xl transition-all duration-300"
                                >
                                    <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                                </Button>
                            </div>
                        </div>
                        <div className="flex gap-3 ml-auto">
                            <ArchiveButton />
                            <ActionButtons />
                        </div>
                    </div>
                </div>

                {/* Enhanced Table */}
                <div className="bg-white/70 dark:bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-base">
                            <thead className="bg-gradient-to-r from-green-100/80 to-emerald-100/80 dark:from-slate-700/80 dark:to-slate-600/80 backdrop-blur-sm">
                                <tr>
                                    <th className="px-6 py-5 text-left font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider text-sm">
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-green-600" />
                                            Category
                                        </div>
                                    </th>
                                    <th className="px-6 py-5 text-left font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider text-sm">
                                        <div className="flex items-center gap-2">
                                            <Archive className="w-4 h-4 text-green-600" />
                                            Description
                                        </div>
                                    </th>
                                    <th className="px-6 py-5 text-center font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider text-sm">
                                        <div className="flex items-center justify-center gap-2">
                                            <BookCopy className="w-4 h-4 text-green-600" />
                                            Articles
                                        </div>
                                    </th>
                                    <th className="px-6 py-5 text-center font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider text-sm">
                                        <div className="flex items-center justify-center gap-2">
                                            <Sparkles className="w-4 h-4 text-green-600" />
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
                                                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center">
                                                    <BookCopy className="w-8 h-8 text-green-600 dark:text-green-400" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No categories found</p>
                                                    <p className="text-gray-400 dark:text-gray-500 text-sm">Create your first category to get started</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    categoryArticles.data.map((category) => (
                                        <CategoryTableRow
                                            key={category.id}
                                            category={category}
                                            onEdit={handleEdit}
                                            onDelete={setConfirmingDeletionSlug}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Enhanced Deletion Confirmation Modal */}
            {confirmingDeletionSlug && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200/50 dark:border-slate-700/50 transform scale-100 animate-in fade-in-0 zoom-in-95 duration-300">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Confirm Deletion</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Are you sure you want to delete this category? This action cannot be undone and will affect all associated articles.
                            </p>
                        </div>
                        <div className="flex justify-center gap-4">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setConfirmingDeletionSlug(null)}
                                className="font-semibold px-6 rounded-xl border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                                disabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                size="lg"
                                className="font-bold text-base px-6 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                onClick={() => handleDelete(confirmingDeletionSlug)}
                                disabled={isDeleting}
                            >
                                {isDeleting && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                                {isDeleting ? 'Deleting...' : 'Delete Category'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}