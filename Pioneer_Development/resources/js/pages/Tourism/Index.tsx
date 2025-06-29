import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps, PaginatedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect, ChangeEvent, useCallback, useMemo } from 'react';
import tourismRoute from '@/routes/tourism'; // Adjust route import
import { dashboard } from '@/routes';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import Pagination from '@/components/pagination';
import { format as formatDateFns } from 'date-fns';

import {
    MapPin,
    TrendingUp,
    Edit3,
    TrendingDown,
    RefreshCw,
    Download,
    PlusCircle,
    Eye,
    Trash2,
    FilterX,
    Search,
    BarChart3,
    Calendar,
    Users
} from 'lucide-react';

const ALL_STATUS_VALUE = "__ALL_STATUS__";

interface Props extends InertiaSharedProps {
    tourism: PaginatedData<Tourism>;
    filters: {
        search?: string;
        status?: string;
        sort?: string;
        direction?: 'asc' | 'desc';
    };
    can: {
        create_tourism: boolean;
    };
    stats?: {
        total_tourism: number;
        active_tourism: number;
        inactive_tourism: number;
        total_visitors: number;
    };
}

interface Tourism {
    id: string | number;
    name: string;
    slug: string;
    description?: string;
    address: string;
    status: 'active' | 'inactive' | string;
    createdAt: string;
    photos?: Array<{ id: string | number; filePath: string }>;
    creator?: {
        name: string;
        [key: string]: any;
    };
    updater?: {
        name: string;
        [key: string]: any;
    };
    visitorsCount?: number;
    rating?: number;
    [key: string]: any;
}

interface Column<T> {
    key: string;
    label: string;
    sortable?: boolean;
    className?: string;
    render: (value: any, row: T) => React.ReactNode;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: dashboard().url },
    { title: 'Tourism Management', href: tourismRoute.index().url },
];

export default function TourismIndex({ tourism: tourismData, filters, can, stats, auth }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const formatNumber = useMemo(() => {
        const formatter = new Intl.NumberFormat('id-ID');
        return (num: number) => formatter.format(num);
    }, []);

    const handleFilterChange = useCallback(() => {
        router.get(tourismRoute.index().url, {
            search: searchTerm,
            status: selectedStatus,
            sort: filters.sort,
            direction: filters.direction,
        }, { preserveState: true, replace: true, preserveScroll: true });
    }, [searchTerm, selectedStatus, filters.sort, filters.direction]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== (filters.search || '')) {
                handleFilterChange();
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, filters.search, handleFilterChange]);

    useEffect(() => {
        if (selectedStatus !== (filters.status || '')) {
            handleFilterChange();
        }
    }, [selectedStatus, filters.status, handleFilterChange]);

    const clearFilters = useCallback(() => {
        setSearchTerm('');
        setSelectedStatus('');
        router.get(tourismRoute.index().url, {}, { preserveState: true, replace: true, preserveScroll: true });
    }, []);

    const handleSort = useCallback((column: string) => {
        const newDirection = filters.sort === column && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get(tourismRoute.index().url, {
            search: searchTerm,
            status: selectedStatus,
            sort: column,
            direction: newDirection,
        }, { preserveState: true, replace: true, preserveScroll: true });
    }, [searchTerm, selectedStatus, filters.sort, filters.direction]);

    const handleDelete = useCallback((tourism: Tourism) => {
        if (confirm(`Anda yakin ingin menghapus destinasi wisata "${tourism.name}"? Tindakan ini adalah soft delete.`)) {
            router.delete(tourismRoute.destroy(tourism.slug).url, {
                preserveScroll: true,
            });
        }
    }, []);

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        router.reload({
            onFinish: () => setIsRefreshing(false),
        });
    }, []);

    const getNestedValue = (obj: any, path: string): any => {
        if (path.indexOf('.') === -1) {
            return obj[path];
        }
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    const columns = useMemo<Column<Tourism>[]>(() => [
        {
            key: 'name',
            label: 'Tourism Destination',
            sortable: true,
            render: (value: string, row: Tourism) => {
                return (
                    <div className="flex items-center gap-3">
                        {row.photos && row.photos.length > 0 && row.photos[0].filePath ? (
                            <img
                                src={`${row.photos[0].filePath}`}
                                alt={row.name}
                                className="h-12 w-12 rounded-lg object-cover shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
                                loading="lazy"
                            />
                        ) : (
                            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
                                <MapPin className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                            </div>
                        )}
                        <div>
                            {/* <Link
                                href={tourismRoute.show(row.slug).url}
                                className="font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                {row.name}
                            </Link> */}
                            {row.address && (
                                <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
                                    {row.address}
                                </p>
                            )}
                        </div>
                    </div>
                );
            }
        },
        {
            key: 'description',
            label: 'Description',
            sortable: false,
            render: (value: string | undefined) => {
                return (
                    <div className="max-w-xs">
                        {value ? (
                            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                                {value.length > 100 ? `${value.substring(0, 100)}...` : value}
                            </p>
                        ) : (
                            <span className="text-sm text-slate-400 dark:text-slate-500 italic">No description</span>
                        )}
                    </div>
                );
            }
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value: string | undefined) => {
                const statusConfig = {
                    active: {
                        label: 'Active',
                        className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
                        icon: <TrendingUp className="h-3 w-3" />
                    },
                    inactive: {
                        label: 'Inactive',
                        className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
                        icon: <TrendingDown className="h-3 w-3" />
                    },
                    draft: {
                        label: 'Draft',
                        className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
                        icon: <Edit3 className="h-3 w-3" />
                    }
                };
                const currentStatus = value as keyof typeof statusConfig;
                const config = statusConfig[currentStatus] || statusConfig.draft;
                return (
                    <Badge className={`flex items-center gap-1 ${config.className}`}>
                        {config.icon}
                        {config.label}
                    </Badge>
                );
            }
        },
        {
            key: 'creator.name',
            label: 'Created By',
            sortable: false,
            render: (value: string | undefined) => {
                return (
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        {value || 'Unknown'}
                    </span>
                );
            }
        },
        {
            key: 'createdAt',
            label: 'Created',
            sortable: true,
            render: (value: string | undefined) => {
                return (
                    <div className="text-sm">
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                            {value ? formatDateFns(new Date(value), "dd MMM yyyy") : "N/A"}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">
                            {value ? formatDateFns(new Date(value), "HH:mm") : ""}
                        </div>
                    </div>
                );
            }
        }
    ], [formatNumber]);

    const actions = useMemo(() => [
        // {
        //     label: 'View',
        //     icon: <Eye className="h-4 w-4" />,
        //     onClick: (tourism: Tourism) => router.visit(tourismRoute.show(tourism.slug).url),
        //     variant: 'outline' as const,
        // },
        {
            label: 'Edit',
            icon: <Edit3 className="h-4 w-4" />,
            onClick: (tourism: Tourism) => router.visit(tourismRoute.edit(tourism.slug).url),
            variant: 'outline' as const,
        },
        {
            label: 'Delete',
            icon: <Trash2 className="h-4 w-4" />,
            onClick: handleDelete,
            variant: 'destructive' as const,
        },
    ], [handleDelete]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Tourism Management">
                <meta name="description" content="Halaman untuk mengelola destinasi wisata, termasuk filter, sorting, dan operasi lainnya." />
            </Head>
            <div className="min-h-screen py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                                <MapPin className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    Tourism Management
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">
                                    Kelola destinasi wisata dengan filter canggih dan operasi massal.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleRefresh}
                                variant="outline"
                                size="sm"
                                disabled={isRefreshing}
                                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm"
                            >
                                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>

                            {can.create_tourism && (
                                <Button
                                    onClick={() => router.visit(tourismRoute.create().url)}
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                                >
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    Add Tourism
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Stats Cards */}
                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Destinations</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{formatNumber(stats.total_tourism)}</p>
                                    </div>
                                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                        <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active</p>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatNumber(stats.active_tourism)}</p>
                                    </div>
                                    <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Inactive</p>
                                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatNumber(stats.inactive_tourism)}</p>
                                    </div>
                                    <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                        <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Visitors</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{formatNumber(stats.total_visitors)}</p>
                                    </div>
                                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Filters */}
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="search">Search Destinations</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="search"
                                        type="text"
                                        placeholder="Cari berdasarkan nama, deskripsi, atau alamat..."
                                        value={searchTerm}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-white/50 dark:bg-slate-900/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                    value={selectedStatus === '' ? ALL_STATUS_VALUE : selectedStatus}
                                    onValueChange={(value) => {
                                        setSelectedStatus(value === ALL_STATUS_VALUE ? "" : value);
                                    }}
                                >
                                    <SelectTrigger className="bg-white/50 dark:bg-slate-900/50">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={ALL_STATUS_VALUE}>All Status</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-end">
                                <Button
                                    onClick={clearFilters}
                                    variant="outline"
                                    className="w-full bg-white/50 dark:bg-slate-900/50"
                                >
                                    <FilterX className="h-4 w-4 mr-2" />
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Data Table */}
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-slate-700/50 overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800/50">
                                <tr>
                                    {columns.map((col) => (
                                        <th
                                            key={col.key}
                                            className={`p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider ${col.className || ''} ${col.sortable ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors' : ''}`}
                                            onClick={() => col.sortable && handleSort(col.key)}
                                        >
                                            <div className="flex items-center gap-1">
                                                {col.label}
                                                {col.sortable && filters.sort === col.key && (
                                                    filters.direction === 'asc' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                    <th className="p-4 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {tourismData.data.map((tourism) => (
                                    <tr key={tourism.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                        {columns.map((col) => (
                                            <td key={`${tourism.id}-${col.key}`} className={`p-4 whitespace-nowrap ${col.className || ''}`}>
                                                {(() => {
                                                    const value = getNestedValue(tourism, col.key);
                                                    return col.render(value, tourism);
                                                })()}
                                            </td>
                                        ))}
                                        <td className="p-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {actions.map((action, index) => (
                                                    <Button
                                                        key={index}
                                                        onClick={() => action.onClick(tourism)}
                                                        variant={action.variant}
                                                        size="sm"
                                                        className={action.variant === 'destructive' ?
                                                            "border-red-500 text-red-500 hover:bg-red-100 hover:text-red-700 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/50 dark:hover:text-red-300 [&>svg]:text-red-500 dark:[&>svg]:text-red-400"
                                                            : "border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:border-slate-500"
                                                        }
                                                    >
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

                        {tourismData.data.length === 0 && (
                            <div className="text-center py-12">
                                <MapPin className="h-16 w-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                                    Tidak ada destinasi wisata ditemukan
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-6">
                                    {searchTerm || selectedStatus
                                        ? "Coba sesuaikan kriteria pencarian atau filter Anda."
                                        : "Mulai dengan membuat destinasi wisata pertama Anda."
                                    }
                                </p>
                                {can.create_tourism && (
                                    <Button
                                        onClick={() => router.visit(tourismRoute.create().url)}
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                                    >
                                        <PlusCircle className="h-4 w-4 mr-2" />
                                        Buat Destinasi Wisata Pertama Anda
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>

                    {tourismData.data.length > 0 && (
                        <div className="flex justify-center pt-6">
                            <Pagination links={tourismData.links} />
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}