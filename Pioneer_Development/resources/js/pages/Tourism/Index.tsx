import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from '@inertiajs/react'; 
import { 
    MapPin, 
    TrendingUp, 
    Edit3, 
    TrendingDown, 
    RefreshCw, 
    PlusCircle, 
    Trash2, 
    FilterX, 
    Search, 
    Users,
    Calendar,
    Eye,
    ChevronUp,
    ChevronDown
} from 'lucide-react';

const TourismManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    // Mock data
    const stats = {
        total_tourism: 45,
        active_tourism: 32,
        inactive_tourism: 13,
        total_visitors: 15420
    };

    const tourismData = [
        {
            id: 1,
            name: "Pantai Balekambang",
            slug: "pantai-balekambang",
            description: "Pantai eksotis dengan tiga pulau kecil yang mempesona, dikenal sebagai Tanah Lot-nya Jawa Timur",
            address: "Bantur, Kabupaten Malang, Jawa Timur",
            status: "active",
            createdAt: "2024-01-15T08:00:00Z",
            photos: [{ id: 1, filePath: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop" }],
            creator: { name: "Admin Malang" },
            visitorsCount: 2850,
            rating: 4.8
        },
        {
            id: 2,
            name: "Coban Rondo",
            slug: "coban-rondo",
            description: "Air terjun indah dengan ketinggian 84 meter yang dikelilingi hutan pinus yang asri",
            address: "Pujon, Kabupaten Malang, Jawa Timur",
            status: "active",
            createdAt: "2024-01-10T10:30:00Z",
            photos: [{ id: 2, filePath: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" }],
            creator: { name: "Admin Pujon" },
            visitorsCount: 1950,
            rating: 4.6
        },
        {
            id: 3,
            name: "Gunung Bromo",
            slug: "gunung-bromo",
            description: "Gunung berapi aktif yang menjadi ikon wisata Jawa Timur dengan pemandangan sunrise yang memukau",
            address: "Probolinggo, Jawa Timur",
            status: "active",
            createdAt: "2024-01-05T06:00:00Z",
            photos: [{ id: 3, filePath: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop" }],
            creator: { name: "Admin Probolinggo" },
            visitorsCount: 5200,
            rating: 4.9
        },
        {
            id: 4,
            name: "Taman Nasional Bromo Tengger",
            slug: "taman-nasional-bromo-tengger",
            description: "Area konservasi yang melindungi ekosistem unik pegunungan vulkanik",
            address: "Malang, Jawa Timur",
            status: "inactive",
            createdAt: "2024-01-20T14:15:00Z",
            photos: [],
            creator: { name: "Admin Taman Nasional" },
            visitorsCount: 890,
            rating: 4.3
        }
    ];

    const formatNumber = (num) => {
        return new Intl.NumberFormat('id-ID').format(num);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('id-ID', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
            }),
            time: date.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        };
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedStatus('');
        setSortColumn('');
        setSortDirection('asc');
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const filteredData = useMemo(() => {
        let filtered = [...tourismData];
        
        if (searchTerm) {
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (selectedStatus && selectedStatus !== 'all') {
            filtered = filtered.filter(item => item.status === selectedStatus);
        }
        
        if (sortColumn) {
            filtered.sort((a, b) => {
                let aValue = a[sortColumn];
                let bValue = b[sortColumn];
                
                if (sortColumn === 'createdAt') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }
                
                if (sortDirection === 'asc') {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return aValue < bValue ? 1 : -1;
                }
            });
        }
        
        return filtered;
    }, [tourismData, searchTerm, selectedStatus, sortColumn, sortDirection]);

    const StatusBadge = ({ status }) => {
        const statusConfig = {
            active: {
                label: 'Active',
                className: 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200 dark:from-emerald-900/30 dark:to-green-900/30 dark:text-emerald-300 dark:border-emerald-700',
                icon: <TrendingUp className="h-3 w-3" />
            },
            inactive: {
                label: 'Inactive',
                className: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-300 dark:border-red-700',
                icon: <TrendingDown className="h-3 w-3" />
            },
            draft: {
                label: 'Draft',
                className: 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200 dark:from-amber-900/30 dark:to-orange-900/30 dark:text-amber-300 dark:border-amber-700',
                icon: <Edit3 className="h-3 w-3" />
            }
        };
        
        const config = statusConfig[status] || statusConfig.draft;
        
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.className}`}>
                {config.icon}
                {config.label}
            </span>
        );
    };

    const SortHeader = ({ column, children }) => (
        <th 
            className="p-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/10 transition-all duration-200 group"
            onClick={() => handleSort(column)}
        >
            <div className="flex items-center gap-2">
                {children}
                <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronUp className={`h-3 w-3 -mb-1 ${sortColumn === column && sortDirection === 'asc' ? 'text-green-600' : 'text-slate-400'}`} />
                    <ChevronDown className={`h-3 w-3 ${sortColumn === column && sortDirection === 'desc' ? 'text-green-600' : 'text-slate-400'}`} />
                </div>
            </div>
        </th>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-green-900/10 dark:to-emerald-900/10">
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="h-16 w-16 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                                <MapPin className="h-8 w-8 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">{filteredData.length}</span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Tourism Management
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                Kelola destinasi wisata dengan sistem manajemen yang canggih
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-green-200 dark:border-green-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                        >
                            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>

                        <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-200 font-medium">
                            <PlusCircle className="h-4 w-4" />
                            Add Tourism
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-green-500/5 border border-green-100 dark:border-green-800 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Total Destinations</p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{formatNumber(stats.total_tourism)}</p>
                            </div>
                            <div className="h-14 w-14 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <MapPin className="h-7 w-7 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-emerald-500/5 border border-emerald-100 dark:border-emerald-800 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Active</p>
                                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{formatNumber(stats.active_tourism)}</p>
                            </div>
                            <div className="h-14 w-14 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <TrendingUp className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-red-500/5 border border-red-100 dark:border-red-800 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Inactive</p>
                                <p className="text-3xl font-bold text-red-600 dark:text-red-400">{formatNumber(stats.inactive_tourism)}</p>
                            </div>
                            <div className="h-14 w-14 bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <TrendingDown className="h-7 w-7 text-red-600 dark:text-red-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-500/5 border border-blue-100 dark:border-blue-800 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Total Visitors</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(stats.total_visitors)}</p>
                            </div>
                            <div className="h-14 w-14 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Users className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-green-500/5 border border-green-100 dark:border-green-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Search Destinations</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                                <input
                                    type="text"
                                    placeholder="Cari berdasarkan nama, deskripsi, atau alamat..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-400 dark:focus:border-green-400 transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-4 py-3 bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-400 dark:focus:border-green-400 transition-all duration-200"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={clearFilters}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded-xl transition-all duration-200"
                            >
                                <FilterX className="h-4 w-4" />
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-green-500/5 border border-green-100 dark:border-green-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-b border-green-200 dark:border-green-700">
                                <tr>
                                    <SortHeader column="name">Tourism Destination</SortHeader>
                                    <th className="p-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Description</th>
                                    <SortHeader column="status">Status</SortHeader>
                                    <th className="p-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Created By</th>
                                    <SortHeader column="createdAt">Created</SortHeader>
                                    <th className="p-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-green-100 dark:divide-green-800">
                                {filteredData.map((tourism, index) => (
                                    <tr key={tourism.id} className="hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all duration-200 group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                {tourism.photos && tourism.photos.length > 0 ? (
                                                    <img
                                                        src={tourism.photos[0].filePath}
                                                        alt={tourism.name}
                                                        className="h-16 w-16 rounded-2xl object-cover shadow-lg shadow-green-500/10 ring-2 ring-green-100 dark:ring-green-800 group-hover:scale-105 transition-transform duration-200"
                                                    />
                                                ) : (
                                                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center shadow-lg shadow-green-500/10 ring-2 ring-green-100 dark:ring-green-800 group-hover:scale-105 transition-transform duration-200">
                                                        <MapPin className="h-8 w-8 text-green-500" />
                                                    </div>
                                                )}
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg mb-1">
                                                        {tourism.name}
                                                    </h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                                        <MapPin className="inline h-4 w-4 mr-1" />
                                                        {tourism.address}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 max-w-xs">
                                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                                {tourism.description || "No description available"}
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <StatusBadge status={tourism.status} />
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                                {tourism.creator?.name || 'Unknown'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm">
                                                <div className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                                                    {formatDate(tourism.createdAt).date}
                                                </div>
                                                <div className="text-slate-500 dark:text-slate-400">
                                                    {formatDate(tourism.createdAt).time}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
                                                    <Edit3 className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredData.length === 0 && (
                        <div className="text-center py-16">
                            <div className="h-24 w-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-3xl flex items-center justify-center">
                                <MapPin className="h-12 w-12 text-green-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                Tidak ada destinasi wisata ditemukan
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
                                {searchTerm || selectedStatus
                                    ? "Coba sesuaikan kriteria pencarian atau filter Anda untuk menemukan destinasi yang tepat."
                                    : "Mulai dengan membuat destinasi wisata pertama Anda untuk membangun koleksi tempat-tempat menarik."
                                }
                            </p>
                            <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-200 font-medium">
                                <PlusCircle className="h-5 w-5" />
                                Buat Destinasi Wisata Pertama
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredData.length > 0 && (
                    <div className="flex justify-center items-center gap-2">
                        <button className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-green-200 dark:border-green-700 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/10 transition-all duration-200">
                            Previous
                        </button>
                        <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium">
                            1
                        </span>
                        <button className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-green-200 dark:border-green-700 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/10 transition-all duration-200">
                            2
                        </button>
                        <button className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-green-200 dark:border-green-700 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/10 transition-all duration-200">
                            3
                        </button>
                        <button className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-green-200 dark:border-green-700 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/10 transition-all duration-200">
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TourismManagement;