import React, { useMemo, useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps } from '@/types';
import { type Galery } from '@/types';
import galeriesRoutes from '@/routes/galeries';
import { dashboard } from '@/routes';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, ArrowLeft, Image as ImageIcon, Video, Tag, Calendar, Hash, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface Props extends InertiaSharedProps {
    galery: Galery;
}

export default function GaleryShow({ galery }: Props) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Galeries', href: galeriesRoutes.indexAdmin().url },
        { title: galery.title, href: galeriesRoutes.show(galery.slug).url, isCurrent: true },
    ], [galery]);

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isPreviewOpen, setPreviewOpen] = useState(false);

    // Handle ESC key untuk menutup preview
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isPreviewOpen) {
                setPreviewOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isPreviewOpen]);

    const handleDelete = () => {
        router.delete(galeriesRoutes.destroy(galery.slug).url, {
            onSuccess: () => {
                toast.success('Item galeri berhasil dihapus.');
                router.visit(galeriesRoutes.indexAdmin().url);
            },
            onError: () => {
                toast.error('Gagal menghapus item galeri.');
            },
            onFinish: () => {
                setDeleteDialogOpen(false);
            },
        });
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'dd MMMM yyyy, HH:mm', { locale: id });
        } catch {
            return 'Tanggal tidak valid';
        }
    };

    const getEmbedUrl = (url: string) => {
        const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        if (youtubeMatch) {
            return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
        }
        return url;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail: ${galery.title}`} />

            <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20 rounded-2xl mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
                <div className="relative px-6 py-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                            {galery.type === 'photo' ? (
                                <ImageIcon className="h-6 w-6 text-white" />
                            ) : (
                                <Video className="h-6 w-6 text-white" />
                            )}
                        </div>
                        <div>
                            <Badge 
                                variant="secondary" 
                                className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200 border-green-200 dark:border-green-800"
                            >
                                {galery.type === 'photo' ? 'Foto' : 'Video'}
                            </Badge>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {galery.title}
                    </h1>
                    <p className="text-green-700 dark:text-green-300 text-lg">
                        {galery.description ? 'Dengan deskripsi lengkap' : 'Galeri media interaktif'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-8">
                    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-green-50/50 dark:from-gray-900 dark:to-green-950/20">
                        <CardContent className="p-0">
                            <div className="relative group">
                                <div className="aspect-video w-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center overflow-hidden">
                                    {galery.type === 'photo' ? (
                                        <img
                                            src={`/storage/${galery.filePath}`}
                                            alt={galery.title}
                                            className="max-h-[60vh] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <iframe
                                            src={getEmbedUrl(galery.filePath)}
                                            title={galery.title}
                                            className="w-full h-full border-0 rounded-lg"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    )}
                                </div>

                                {galery.type === 'photo' && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-4 right-4 flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="bg-white/90 hover:bg-white text-green-700"
                                                onClick={() => setPreviewOpen(true)}
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                Lihat
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {galery.description && (
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50/30 dark:from-gray-900 dark:to-green-950/10">
                            <CardHeader className="border-b border-green-100 dark:border-green-900/20">
                                <CardTitle className="text-2xl text-green-800 dark:text-green-200 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                                    Deskripsi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div
                                    className="prose dark:prose-invert max-w-none prose-headings:text-green-800 dark:prose-headings:text-green-200 prose-links:text-green-600 dark:prose-links:text-green-400"
                                    dangerouslySetInnerHTML={{ __html: galery.description }}
                                />
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="lg:col-span-2">
                    <Card className="sticky top-24 border-0 shadow-xl bg-gradient-to-br from-white via-green-50/50 to-emerald-50/50 dark:from-gray-900 dark:via-green-950/10 dark:to-emerald-950/10">
                        <CardHeader className="border-b border-green-100 dark:border-green-900/20 pb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                                    {galery.type === 'photo' ? (
                                        <ImageIcon className="h-5 w-5 text-white" />
                                    ) : (
                                        <Video className="h-5 w-5 text-white" />
                                    )}
                                </div>
                                <Badge 
                                    variant="outline"
                                    className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-700 capitalize"
                                >
                                    {galery.type === 'photo' ? 'Foto' : 'Video'}
                                </Badge>
                            </div>
                            <CardTitle className="text-2xl text-green-800 dark:text-green-200 leading-tight">
                                {galery.title}
                            </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="space-y-6 py-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
                                    <div className="p-1.5 bg-green-500/10 rounded-md">
                                        <Tag className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-green-800 dark:text-green-200">Urutan Tampilan</p>
                                        <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                                            {galery.displayOrder ?? 'Tidak diatur'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                                    <div className="p-1.5 bg-emerald-500/10 rounded-md">
                                        <Hash className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">Slug</p>
                                        <code className="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded border">
                                            {galery.slug}
                                        </code>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 rounded-lg bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/30">
                                    <div className="p-1.5 bg-teal-500/10 rounded-md">
                                        <Calendar className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-teal-800 dark:text-teal-200">Dibuat</p>
                                        <p className="text-sm text-teal-600 dark:text-teal-400">
                                            {galery.created_at ? formatDate(galery.created_at) : '-'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
                                    <div className="p-1.5 bg-green-500/10 rounded-md">
                                        <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-green-800 dark:text-green-200">Diperbarui</p>
                                        <p className="text-sm text-green-600 dark:text-green-400">
                                            {galery.updated_at ? formatDate(galery.updated_at) : '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        
                        <CardFooter className="flex flex-col gap-3 pt-6 border-t border-green-100 dark:border-green-900/20">
                            <Link href={galeriesRoutes.edit(galery.slug).url} className="w-full">
                                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Galeri
                                </Button>
                            </Link>
                            <Button 
                                variant="destructive" 
                                className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all duration-300" 
                                onClick={() => setDeleteDialogOpen(true)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Hapus Galeri
                            </Button>
                            <Link href={galeriesRoutes.indexAdmin().url} className="w-full">
                                <Button 
                                    variant="outline" 
                                    className="w-full border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-950/20 transition-all duration-300"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Kembali ke Daftar
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* Dialog konfirmasi hapus */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="border-0 shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-red-600 dark:text-red-400 flex items-center gap-2">
                            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                                <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                            </div>
                            Konfirmasi Penghapusan
                        </DialogTitle>
                        <DialogDescription className="pt-4 text-base">
                            Apakah Anda yakin ingin menghapus galeri <strong className="text-red-600 dark:text-red-400">"{galery.title}"</strong>? 
                            <br />
                            <span className="text-red-500 dark:text-red-400 font-medium">Tindakan ini tidak dapat dibatalkan.</span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-3 pt-6">
                        <Button 
                            variant="outline" 
                            onClick={() => setDeleteDialogOpen(false)}
                            className="border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={handleDelete}
                            className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg"
                        >
                            Ya, Hapus Galeri
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog Preview Foto - Improved */}
            <Dialog open={isPreviewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent
                    className="w-screen h-screen max-w-none p-0 border-0 shadow-none bg-transparent backdrop-blur-md flex items-center justify-center"
                    hideClose={true}
                >
                    <div 
                        className="p-8 relative"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setPreviewOpen(false);
                            }
                        }}
                    >
                        {/* Tombol close yang lebih baik */}
                        <button
                            onClick={() => setPreviewOpen(false)}
                            className="absolute top-4 right-4 z-50 bg-white/80 hover:bg-white/90 text-gray-800 p-3 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110 group"
                            aria-label="Tutup preview"
                        >
                            <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Gambar dengan efek shadow dan animasi */}
                        <div className="relative max-w-full max-h-full flex items-center justify-center">
                            <img
                                src={`/storage/${galery.filePath}`}
                                alt={galery.title}
                                className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-2xl transition-all duration-500 ease-out animate-in fade-in-0 zoom-in-95"
                            />
                            
                            {/* Informasi gambar */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-6 rounded-b-xl">
                                <h3 className="text-white text-xl font-semibold mb-2">{galery.title}</h3>
                                {galery.description && (
                                    <p className="text-white/80 text-sm line-clamp-2">{galery.description.replace(/<[^>]*>/g, '')}</p>
                                )}
                            </div>
                        </div>

                        {/* Instruksi untuk user */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            Tekan ESC atau klik di luar gambar untuk menutup
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}