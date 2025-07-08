import React, { useMemo, useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { useDebounce } from 'use-debounce';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps, type Galery, type PaginatedResponse } from '@/types';
import galeriesRoutes from '@/routes/galeries';
import { dashboard } from '@/routes';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Image, Video, AlertTriangle, Search, RotateCcw, Grid3X3, List } from 'lucide-react';
import { toast } from 'sonner';

interface Props extends InertiaSharedProps {
    galeries: PaginatedResponse<Galery>;
    filters: {
        search?: string;
    };
}

export default function ArchivedGaleryPage({ galeries, filters }: Props) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Galeri', href: galeriesRoutes.indexAdmin().url },
        { title: 'Arsip', href: galeriesRoutes.archived().url },
    ], []);

    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [itemToDelete, setItemToDelete] = useState<Galery | null>(null);
    const [itemToRestore, setItemToRestore] = useState<Galery | null>(null);

    useEffect(() => {
        if (debouncedSearchTerm !== filters.search) {
            router.get(galeriesRoutes.archived().url, { search: debouncedSearchTerm }, { preserveState: true, replace: true });
        }
    }, [debouncedSearchTerm]);

    const handleDeletePermanent = () => {
        if (!itemToDelete) return;
        router.delete(galeriesRoutes.deletePermanent(itemToDelete.slug).url, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Item berhasil dihapus permanen.');
                setItemToDelete(null);
            },
            onError: () => toast.error('Gagal menghapus permanen.')
        });
    };

    const handleRestore = () => {
        if (!itemToRestore) return;
        router.put(galeriesRoutes.restore(itemToRestore.slug).url, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Item berhasil dipulihkan.');
                setItemToRestore(null);
            },
            onError: () => toast.error('Gagal memulihkan item.')
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galeri - Arsip" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
                <div className="space-y-8 p-6">
                    <div className="rounded-3xl shadow-xl border border-green-100 p-8 backdrop-blur-sm bg-white/80">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                            Arsip Galeri
                        </h1>
                        <p className="text-gray-600 text-lg">Daftar item galeri yang telah diarsipkan</p>
                    </div>

                    <div className="rounded-3xl shadow-xl border border-green-100 p-6 backdrop-blur-sm bg-white/80">
                        <div className="flex justify-between items-center mb-4">
                            <Link
                                href={galeriesRoutes.indexAdmin().url}
                                className="inline-flex items-center px-4 py-2 rounded-xl border border-green-600 text-green-700 bg-white hover:bg-green-50 transition-all font-medium text-sm"
                            >
                                ← Kembali ke Galeri
                            </Link>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center gap-6">
                            <div className="relative w-full lg:flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <Input
                                    type="search"
                                    placeholder="Cari item arsip..."
                                    className="pl-12 pr-4 py-3 rounded-2xl border-green-200 focus:border-green-400 focus:ring-green-300 text-lg bg-green-50/50"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-1 bg-green-100 rounded-2xl p-1">
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className={`rounded-xl ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-green-700'}`}
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                    className={`rounded-xl ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-green-700'}`}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {galeries.data.length > 0 ? (
                        <div className={viewMode === 'grid' 
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                            : "space-y-4"
                        }>
                            {galeries.data.map((item) => (
                                <Card key={item.id} className={`group border-0 bg-white/80 backdrop-blur-sm ${
                                    viewMode === 'grid' ? 'rounded-3xl' : 'rounded-2xl flex flex-row'
                                }`}>
                                    <CardContent className={`p-0 ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                                        <div className="aspect-video bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center relative overflow-hidden">
                                            {item.type === 'photo' ? (
                                                <img src={`/storage/${item.filePath}`} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center">
                                                        <Video className="h-8 w-8 text-white" />
                                                    </div>
                                                    <span className="text-green-800 font-medium">Video</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-6 flex flex-col items-start space-y-4 flex-1">
                                        <h3 className="font-bold text-xl text-gray-800">{item.title}</h3>
                                        <div className="flex justify-between w-full">
                                            <Button variant="ghost" className="text-green-700" onClick={() => setItemToRestore(item)}>
                                                <RotateCcw className="h-4 w-4 mr-2" />
                                                Pulihkan
                                            </Button>
                                            <Button variant="ghost" className="text-red-600" onClick={() => setItemToDelete(item)}>
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Hapus Permanen
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white/90 rounded-3xl border border-green-100 shadow">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Image className="h-12 w-12 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Tidak Ada Item</h3>
                            <p className="text-gray-600">Tidak ada item dalam arsip galeri.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Dialog Hapus Permanen */}
            <Dialog open={!!itemToDelete} onOpenChange={() => setItemToDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hapus Permanen?</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus permanen <b>{itemToDelete?.title}</b>? Tindakan ini tidak bisa dikembalikan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setItemToDelete(null)}>Batal</Button>
                        <Button variant="destructive" onClick={handleDeletePermanent}>Hapus</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog Restore */}
            <Dialog open={!!itemToRestore} onOpenChange={() => setItemToRestore(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Pulihkan Item</DialogTitle>
                        <DialogDescription>
                            Pulihkan item <b>{itemToRestore?.title}</b> dari arsip?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setItemToRestore(null)}>Batal</Button>
                        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleRestore}>Pulihkan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}