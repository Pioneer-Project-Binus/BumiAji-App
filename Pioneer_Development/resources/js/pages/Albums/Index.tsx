import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps, PaginatedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react';
import { motion } from 'framer-motion';

// --- Route Helpers (assuming a similar setup to products) ---
import { dashboard } from '@/routes';
import albumsRoute from '@/routes/albums';

// --- UI Components ---
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Pagination from '@/components/pagination';

// --- Utils ---
import { format as formatDateFns } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

// --- Icons ---
import {
    BookImage,
    ImageUp,
    Edit3,
    Archive,
    RefreshCw,
    PlusCircle,
    Eye,
    Trash2,
    FilterX,
    Search,
    TrendingUp,
    TrendingDown,
    Images,
    FileArchive,
} from 'lucide-react';

// --- Constants ---
const ALL_STATUS_VALUE = "__ALL_STATUS__";

// --- Type Definitions ---
interface Album {
    id: string | number;
    name: string;
    slug: string;
    description: string | null;
    coverImage: string | null; // Use the pre-signed URL from the backend
    status: 'draft' | 'published' | 'archived';
    galeries_count: number;
    createdAt: string; // ISO date string from Laravel
}

interface Props extends InertiaSharedProps {
    albums: PaginatedData<Album>;
    filters: {
        search?: string;
        status?: string;
        sort?: string;
        direction?: 'asc' | 'desc';
    };
    stats?: {
        total_albums: number;
        published_albums: number;
        draft_albums: number;
        archived_albums: number;
    };
}

// --- Framer Motion Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 }
    }
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Album Management', href: albumsRoute.index().url },
];

export default function AdminAlbumIndex({ albums: albumsData, filters, stats, auth }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [isRefreshing, setIsRefreshing] = useState(false);

    // --- Memoized Formatters ---
    const formatNumber = useMemo(() => {
        const formatter = new Intl.NumberFormat('id-ID');
        return (num: number) => formatter.format(num);
    }, []);

    // --- Handlers (wrapped in useCallback for performance) ---
    const handleFilterChange = useCallback(() => {
        router.get(albumsRoute.index().url, {
            search: searchTerm,
            status: selectedStatus,
            sort: filters.sort,
            direction: filters.direction,
        }, { preserveState: true, replace: true, preserveScroll: true });
    }, [searchTerm, selectedStatus, filters.sort, filters.direction]);

    const clearFilters = useCallback(() => {
        setSearchTerm('');
        setSelectedStatus('');
        router.get(albumsRoute.index().url, {}, { preserveState: true, replace: true, preserveScroll: true });
    }, []);

    const handleSort = useCallback((column: string) => {
        const newDirection = filters.sort === column && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get(albumsRoute.index().url, {
            ...filters,
            search: searchTerm,
            status: selectedStatus,
            sort: column,
            direction: newDirection,
        }, { preserveState: true, replace: true, preserveScroll: true });
    }, [searchTerm, selectedStatus, filters]);

    const handleDelete = useCallback((album: Album) => {
        if (confirm(`Are you sure you want to delete the album "${album.name}"? This action is a soft delete.`)) {
            router.delete(albumsRoute.destroy(album.slug).url, {
                preserveScroll: true,
            });
        }
    }, []);

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        router.reload({ onFinish: () => setIsRefreshing(false) });
    }, []);

    // --- Debounced Search Effect ---
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== (filters.search || '')) {
                handleFilterChange();
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, filters.search, handleFilterChange]);
    
    // --- Immediate Filter Effect for Selects ---
    useEffect(() => {
        if (selectedStatus !== (filters.status || '')) {
            handleFilterChange();
        }
    }, [selectedStatus, filters.status, handleFilterChange]);
    console.log(albumsData.data);
    

    // --- Table Columns Definition ---
    const columns = useMemo(() => [
        {
            key: 'name',
            label: 'Album',
            sortable: true,
            render: (row: Album) => (
                <div className="flex items-center gap-3">
                    {row.coverImage ? (
                        <img src={`storage/${row.coverImage}`} alt={row.name} className="h-12 w-12 rounded-lg object-cover shadow-sm ring-1 ring-slate-200 dark:ring-slate-700" loading="lazy" />
                    ) : (
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
                            <BookImage className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                        </div>
                    )}
                    <div>
                        <Link href={albumsRoute.show(row.slug).url} className="font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {row.name}
                        </Link>
                        {row.description && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
                                {row.description}
                            </p>
                        )}
                    </div>
                </div>
            )
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            className: 'text-center',
            render: (row: Album) => {
                const statusConfig = {
                    published: { label: 'Published', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300', icon: <ImageUp className="h-3 w-3" /> },
                    draft: { label: 'Draft', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300', icon: <Edit3 className="h-3 w-3" /> },
                    archived: { label: 'Archived', className: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300', icon: <Archive className="h-3 w-3" /> }
                };
                const config = statusConfig[row.status] || statusConfig.draft;
                return <Badge className={`flex items-center justify-center gap-1.5 ${config.className}`}>{config.icon}{config.label}</Badge>;
            }
        },
        {
            key: 'galeries_count',
            label: 'Images',
            sortable: true,
            className: 'text-center',
            render: (row: Album) => (
                <div className="flex items-center justify-center gap-2 font-medium text-slate-600 dark:text-slate-300">
                    <Images className="h-4 w-4 text-slate-400"/>
                    {formatNumber(row.galeries_count)}
                </div>
            )
        },
        {
            key: 'createdAt',
            label: 'Created',
            sortable: true,
            render: (row: Album) => (
                <div className="text-sm">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                        {formatDateFns(new Date(row.createdAt), "dd MMM yyyy", { locale: idLocale })}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">
                        {formatDateFns(new Date(row.createdAt), "HH:mm")}
                    </div>
                </div>
            )
        }
    ], [formatNumber]);

    // --- Table Actions ---
    const actions = useMemo(() => [
        { label: 'View', icon: <Eye className="h-4 w-4" />, onClick: (album: Album) => router.visit(albumsRoute.show(album.slug).url), variant: 'outline' as const, },
        { label: 'Edit', icon: <Edit3 className="h-4 w-4" />, onClick: (album: Album) => router.visit(albumsRoute.edit(album.slug).url), variant: 'outline' as const, },
        { label: 'Delete', icon: <Trash2 className="h-4 w-4" />, onClick: handleDelete, variant: 'destructive' as const, },
    ], [handleDelete]);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Album Management" />
            <motion.div
                className="min-h-screen py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                                <BookImage className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Album Management
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">
                                    Organize and manage your photo albums.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button onClick={handleRefresh} variant="outline" size="sm" disabled={isRefreshing} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh
                            </Button>
                            <Button onClick={() => router.visit(albumsRoute.create().url)} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg">
                                <PlusCircle className="h-4 w-4 mr-2" /> Add Album
                            </Button>
                        </div>
                    </motion.div>

                    {/* Stats Cards */}
                    {stats && (
                        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: 'Total Albums', value: stats.total_albums, icon: <BookImage />, color: 'blue' },
                                { title: 'Published', value: stats.published_albums, icon: <ImageUp />, color: 'green' },
                                { title: 'Drafts', value: stats.draft_albums, icon: <Edit3 />, color: 'amber' },
                                { title: 'Archived', value: stats.archived_albums, icon: <FileArchive />, color: 'slate' },
                            ].map(stat => (
                                <motion.div key={stat.title} variants={itemVariants} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
                                            <p className={`text-2xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{formatNumber(stat.value)}</p>
                                        </div>
                                        <div className={`h-12 w-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                            {React.cloneElement(stat.icon, { className: "h-6 w-6" })}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Filters */}
                    <motion.div variants={itemVariants} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="search">Search Albums</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input id="search" type="text" placeholder="Search by name or description..." value={searchTerm} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} className="pl-10 bg-white/50 dark:bg-slate-900/50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={selectedStatus || ALL_STATUS_VALUE} onValueChange={(value) => setSelectedStatus(value === ALL_STATUS_VALUE ? "" : value)}>
                                    <SelectTrigger id="status" className="bg-white/50 dark:bg-slate-900/50"><SelectValue placeholder="All Statuses" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={ALL_STATUS_VALUE}>All Statuses</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button onClick={clearFilters} variant="outline" className="w-full bg-white/50 dark:bg-slate-900/50">
                                    <FilterX className="h-4 w-4 mr-2" /> Clear Filters
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* Data Table */}
                    <motion.div variants={itemVariants} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-slate-700/50 overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800/50">
                                <tr>
                                    {columns.map((col) => (
                                        <th key={col.key} className={`p-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ${col.className || ''} ${col.sortable ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50' : ''}`} onClick={() => col.sortable && handleSort(col.key)}>
                                            <div className="flex items-center gap-1.5">
                                                {col.label}
                                                {col.sortable && filters.sort === col.key && (filters.direction === 'asc' ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />)}
                                            </div>
                                        </th>
                                    ))}
                                    <th className="p-4 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {albumsData.data.map((album) => (
                                    <tr key={album.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                        {columns.map((col) => (
                                            <td key={`${album.id}-${col.key}`} className={`p-4 whitespace-nowrap ${col.className || ''}`}>
                                                {col.render(album)}
                                            </td>
                                        ))}
                                        <td className="p-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {actions.map((action, index) => (
                                                    <Button key={index} onClick={() => action.onClick(album)} variant={action.variant} size="icon" className="h-8 w-8">
                                                        {action.icon}
                                                        <span className="sr-only">{action.label}</span>
                                                    </Button>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {albumsData.data.length === 0 && (
                            <div className="text-center py-12">
                                <BookImage className="h-16 w-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">No Albums Found</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-6">
                                    {searchTerm || selectedStatus ? "Try adjusting your search or filter criteria." : "Get started by creating your first album."}
                                </p>
                                <Button onClick={() => router.visit(albumsRoute.create().url)} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                                    <PlusCircle className="h-4 w-4 mr-2" /> Create First Album
                                </Button>
                            </div>
                        )}
                    </motion.div>

                    {albumsData.data.length > 0 && (
                        <motion.div variants={itemVariants} className="flex justify-center pt-6">
                            <Pagination links={albumsData.links} />
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </AppLayout>
    );
}