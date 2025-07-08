import React, { useState, useMemo } from 'react';
import {
    RefreshCw,
    Trash2,
    FilterX,
    Search,
    ChevronUp,
    ChevronDown,
    Undo2,
    Eye,
    ArrowLeft
} from 'lucide-react';

const ArchivedTourism = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [data, setData] = useState([
        {
            id: 5,
            name: 'Pantai Sendiki',
            slug: 'pantai-sendiki',
            description: 'Pantai tersembunyi yang indah dan belum banyak dijamah wisatawan',
            address: 'Malang Selatan, Jawa Timur',
            createdAt: '2023-12-15T08:00:00Z',
            photos: [],
            creator: { name: 'Admin Malang Selatan' }
        },
        {
            id: 6,
            name: 'Air Terjun Coban Talun',
            slug: 'air-terjun-coban-talun',
            description: 'Air terjun dengan spot foto unik dan pemandangan alam asri',
            address: 'Batu, Jawa Timur',
            createdAt: '2023-11-20T10:30:00Z',
            photos: [],
            creator: { name: 'Admin Batu' }
        }
    ]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSortColumn('');
        setSortDirection('asc');
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        // TODO: Fetch from API if necessary
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const handleRestore = async (slug: string) => {
        try {
            await fetch(`/tourism/${slug}/restore`, {
                method: 'PUT',
                headers: { 'X-CSRF-TOKEN': getCSRFToken() },
            });
            setData(data.filter((item) => item.slug !== slug));
        } catch (err) {
            alert('Restore failed');
        }
    };

    const handleDeletePermanent = async (slug: string) => {
        if (!confirm('Hapus permanen destinasi ini?')) return;
        try {
            await fetch(`/tourism/${slug}/delete-permanent`, {
                method: 'DELETE',
                headers: { 'X-CSRF-TOKEN': getCSRFToken() },
            });
            setData(data.filter((item) => item.slug !== slug));
        } catch (err) {
            alert('Delete failed');
        }
    };

    const getCSRFToken = (): string => {
        const token = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
        return token?.content ?? '';
    };

    const filteredData = useMemo(() => {
        let filtered = [...data];
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (sortColumn) {
            filtered.sort((a, b) => {
                let aValue: any = a[sortColumn];
                let bValue: any = b[sortColumn];
                if (sortColumn === 'createdAt') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }
                return sortDirection === 'asc' ? aValue > bValue ? 1 : -1 : aValue < bValue ? 1 : -1;
            });
        }
        return filtered;
    }, [searchTerm, sortColumn, sortDirection, data]);

    const SortHeader = ({ column, children }: { column: string, children: React.ReactNode }) => (
        <th
            className="p-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/10 transition-all duration-200 group"
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
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">Archived Tourism</h1>
                <div className="flex gap-3">
                    <button
                        onClick={() => window.location.href = '/tourism'}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Index
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-green-200 dark:border-green-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <input
                        type="text"
                        placeholder="Search archived destinations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-green-300 dark:border-green-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                    />
                </div>
                <button
                    onClick={clearFilters}
                    className="px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded-xl"
                >
                    <FilterX className="h-4 w-4" />
                </button>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-slate-800 border border-green-200 dark:border-green-700 rounded-xl">
                <table className="w-full">
                    <thead className="bg-green-100 dark:bg-green-900/20">
                        <tr>
                            <SortHeader column="name">Destination</SortHeader>
                            <th className="p-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Description</th>
                            <th className="p-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Created By</th>
                            <SortHeader column="createdAt">Created</SortHeader>
                            <th className="p-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-green-100 dark:divide-green-800">
                        {filteredData.map(item => (
                            <tr key={item.id} className="hover:bg-green-50 dark:hover:bg-green-900/10">
                                <td className="p-4 font-medium text-slate-900 dark:text-slate-100">{item.name}</td>
                                <td className="p-4 text-slate-600 dark:text-slate-400">{item.description}</td>
                                <td className="p-4 text-slate-600 dark:text-slate-400">{item.creator.name}</td>
                                <td className="p-4 text-slate-600 dark:text-slate-400">{formatDate(item.createdAt)}</td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <button onClick={() => handleRestore(item.slug)} className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg">
                                        <Undo2 className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDeletePermanent(item.slug)} className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredData.length === 0 && (
                    <div className="text-center p-10 text-slate-500 dark:text-slate-400">
                        Tidak ada data destinasi wisata yang diarsipkan.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArchivedTourism;