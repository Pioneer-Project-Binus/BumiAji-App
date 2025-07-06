import React, { useMemo, useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { useDebounce } from 'use-debounce';

// Layout & Tipe Data
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps } from '@/types';
import { type Galery } from '@/types';
import { type PaginatedResponse } from '@/types';
import galeriesRoutes from '@/routes/galeries';
import { dashboard } from '@/routes';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlusCircle, Search, Edit, Trash2, Image as ImageIcon, Video, AlertTriangle, Filter, Eye, Calendar, Grid3X3, List } from 'lucide-react';
import { toast } from 'sonner';

// Props Komponen
interface Props extends InertiaSharedProps {
    galeries: PaginatedResponse<Galery>;
    filters: {
        search?: string;
        type?: string;
    };
}

export default function GaleryIndex({ galeries, filters }: Props) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Galeries', href: galeriesRoutes.indexAdmin().url },
    ], []);

    // State untuk filter dan dialog
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
    const [itemToDelete, setItemToDelete] = useState<Galery | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const handleFilterChange = () => {
            router.get(galeriesRoutes.indexAdmin().url, { search: searchTerm }, { preserveState: true, replace: true });
        };
    
        useEffect(() => {
            const delayDebounceFn = setTimeout(() => {
                if (searchTerm !== filters.search) {
                    handleFilterChange();
                }
            }, 500);
            return () => clearTimeout(delayDebounceFn);
        }, [searchTerm]);
    
    // Fungsi untuk membuka dialog konfirmasi hapus
    const openDeleteDialog = (galery: Galery) => {
        setItemToDelete(galery);
    };

    // Fungsi untuk menghapus item
    const handleDelete = () => {
        if (!itemToDelete) return;

        router.delete(galeriesRoutes.destroy(itemToDelete.slug).url, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Item galeri berhasil dihapus.');
                setItemToDelete(null);
            },
            onError: () => {
                toast.error('Gagal menghapus item galeri.');
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Galeri" />

            {/* Background dengan gradient hijau */}
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
                <div className="space-y-8 p-6">
                    {/* Header Halaman dengan background card */}
                    <div className="rounded-3xl shadow-xl border border-green-100 p-8 backdrop-blur-sm bg-white/80">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <ImageIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                            Galeri Media
                                        </h1>
                                        <p className="text-green-700/70 text-lg">Kelola koleksi foto dan video Anda dengan mudah</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-green-600">
                                    <span className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        {galeries.data.length} Total Item
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                        {galeries.data.filter(item => item.type === 'photo').length} Foto
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                        {galeries.data.filter(item => item.type === 'video').length} Video
                                    </span>
                                </div>
                            </div>
                            <Link href={galeriesRoutes.create().url}>
                                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-green-500/30 transition-all duration-300 rounded-2xl px-8 py-3 text-lg">
                                    <PlusCircle className="mr-2 h-5 w-5" />
                                    Tambah Item Baru
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Filter dan Pencarian dengan design modern */}
                    <div className=" rounded-3xl shadow-xl border border-green-100 p-6 backdrop-blur-sm bg-white/80">
                        <div className="flex flex-col lg:flex-row items-center gap-6">
                            {/* Search Bar */}
                            <div className="relative w-full lg:flex-1">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500">
                                    <Search className="h-full w-full" />
                                </div>
                                <Input
                                    type="search"
                                    placeholder="Cari berdasarkan judul atau deskripsi..."
                                    className="pl-12 pr-4 py-3 rounded-2xl border-green-200 focus:border-green-400 focus:ring-green-400/20 text-lg bg-green-50/50"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="flex items-center gap-2 bg-green-50 rounded-2xl p-1">
                                    <Button 
                                        variant={!filters.type ? 'default' : 'ghost'}
                                        onClick={() => handleFilterChange('type', '')}
                                        className={`rounded-xl px-4 py-2 transition-all duration-200 ${
                                            !filters.type 
                                                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg' 
                                                : 'hover:bg-green-100 text-green-700'
                                        }`}
                                    >
                                        <Filter className="mr-2 h-4 w-4" />
                                        Semua
                                    </Button>
                                    <Button 
                                        variant={filters.type === 'photo' ? 'default' : 'ghost'}
                                        onClick={() => handleFilterChange('type', 'photo')}
                                        className={`rounded-xl px-4 py-2 transition-all duration-200 ${
                                            filters.type === 'photo' 
                                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg' 
                                                : 'hover:bg-green-100 text-green-700'
                                        }`}
                                    >
                                        <ImageIcon className="mr-2 h-4 w-4" />
                                        Foto
                                    </Button>
                                    <Button 
                                        variant={filters.type === 'video' ? 'default' : 'ghost'}
                                        onClick={() => handleFilterChange('type', 'video')}
                                        className={`rounded-xl px-4 py-2 transition-all duration-200 ${
                                            filters.type === 'video' 
                                                ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg' 
                                                : 'hover:bg-green-100 text-green-700'
                                        }`}
                                    >
                                        <Video className="mr-2 h-4 w-4" />
                                        Video
                                    </Button>
                                </div>

                                {/* View Mode Toggle */}
                                <div className="flex items-center gap-1 bg-green-50 rounded-2xl p-1">
                                    <Button
                                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('grid')}
                                        className={`rounded-xl ${
                                            viewMode === 'grid' 
                                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                                : 'hover:bg-green-100 text-green-700'
                                        }`}
                                    >
                                        <Grid3X3 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('list')}
                                        className={`rounded-xl ${
                                            viewMode === 'list' 
                                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                                : 'hover:bg-green-100 text-green-700'
                                        }`}
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid/List Galeri */}
                    {galeries.data.length > 0 ? (
                        <div className={viewMode === 'grid' 
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                            : "space-y-4"
                        }>
                            {galeries.data.map((item) => (
                                <Card key={item.id} className={`group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 border-0 bg-white/80 backdrop-blur-sm ${
                                    viewMode === 'grid' 
                                        ? 'hover:-translate-y-2 rounded-3xl' 
                                        : 'hover:shadow-lg rounded-2xl flex flex-row'
                                }`}>
                                    <CardContent className={`p-0 ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                                        <div className={`${viewMode === 'grid' ? 'aspect-video' : 'aspect-square'} bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center relative overflow-hidden`}>
                                            {item.type === 'photo' ? (
                                                <img 
                                                    src={`storage/${item.filePath}`} 
                                                    alt={item.title} 
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                                        <Video className="h-8 w-8 text-white" />
                                                    </div>
                                                    <span className="text-green-700 font-medium">Video</span>
                                                </div>
                                            )}
                                            
                                            {/* Overlay with type badge */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                                    <div className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                                                        item.type === 'photo' 
                                                            ? 'bg-gradient-to-r from-emerald-500 to-green-600' 
                                                            : 'bg-gradient-to-r from-teal-500 to-cyan-600'
                                                    }`}>
                                                        {item.type === 'photo' ? 'Foto' : 'Video'}
                                                    </div>
                                                    <Button 
                                                            onClick={() => router.get(galeriesRoutes.show(item.slug).url)}

                                                        variant="secondary" 
                                                        size="sm" 
                                                        className="bg-white/90 hover:bg-white text-green-700 rounded-full shadow-lg"
                                                    >
                                                        <Eye
                                                            className="h-4 w-4 cursor-pointer"
                                                        />
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Corner accent */}
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500/20 to-transparent rounded-bl-[2rem]"></div>
                                        </div>
                                    </CardContent>
                                    
                                    <CardFooter className={`p-6 flex flex-col items-start space-y-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                        <div className="w-full">
                                            <h3 className="font-bold text-xl leading-tight text-green-800 mb-2 group-hover:text-green-600 transition-colors">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
                                                <Calendar className="h-4 w-4" />
                                                <span>Urutan: {item.displayOrder ?? 'Tidak diatur'}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-2">
                                                <Link href={galeriesRoutes.edit(item.slug).url}>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        className="rounded-xl border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-200 shadow-sm"
                                                    >
                                                        <Edit className="h-4 w-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => openDeleteDialog(item)}
                                                    className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 shadow-sm"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Hapus
                                                </Button>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 rounded-3xl shadow-xl border border-green-100 backdrop-blur-sm bg-white/80">
                            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ImageIcon className="h-12 w-12 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-green-800 mb-2">Tidak Ada Item Ditemukan</h3>
                            <p className="text-green-600 text-lg mb-6">Belum ada item di galeri Anda atau coba ubah filter pencarian.</p>
                            <Link href={galeriesRoutes.create().url}>
                                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/30 transition-all duration-300 rounded-2xl px-8 py-3">
                                    <PlusCircle className="mr-2 h-5 w-5" />
                                    Tambah Item Pertama
                                </Button>
                            </Link>
                        </div>
                    )}
                    
                    {/* Paginasi dengan design modern */}
                    {galeries.data.length > 0 && (
                        <div className="flex items-center justify-center mt-8">
                            <div className="rounded-3xl shadow-xl border border-green-100 p-2 backdrop-blur-sm bg-white/80">
                                <div className="flex items-center space-x-1">
                                    {galeries.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url ?? '#'}
                                            className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
                                                link.active 
                                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' 
                                                    : !link.url 
                                                        ? 'text-green-300 cursor-not-allowed' 
                                                        : 'text-green-700 hover:bg-green-50 hover:text-green-800'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            as="button"
                                            disabled={!link.url}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Dialog Konfirmasi Hapus dengan design modern */}
            <Dialog open={!!itemToDelete} onOpenChange={() => setItemToDelete(null)}>
                <DialogContent className="rounded-3xl border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                    <DialogHeader className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto">
                            <AlertTriangle className="h-8 w-8 text-red-600" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                            Konfirmasi Penghapusan
                        </DialogTitle>
                        <DialogDescription className="text-lg text-gray-600">
                            Apakah Anda yakin ingin menghapus item galeri{' '}
                            <span className="font-semibold text-green-700">"{itemToDelete?.title}"</span>?
                            <br />
                            <span className="text-red-600 font-medium">Tindakan ini tidak dapat dibatalkan.</span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-3 pt-6">
                        <Button 
                            variant="outline" 
                            onClick={() => setItemToDelete(null)}
                            className="flex-1 rounded-2xl border-green-200 text-green-700 hover:bg-green-50 py-3"
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={handleDelete}
                            className="flex-1 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-3"
                        >
                            Hapus Permanen
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}