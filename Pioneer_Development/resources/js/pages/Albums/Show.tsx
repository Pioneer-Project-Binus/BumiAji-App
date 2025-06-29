import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { format as formatDate } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';

// --- Route Helpers ---
import { dashboard } from '@/routes';
const albumsRoute = {
    index: () => ({ url: '/admin/albums' }),
    show: (slug: string) => ({ url: `/admin/albums/${slug}` }),
    edit: (slug: string) => ({ url: `/admin/albums/${slug}/edit` }),
    destroy: (slug: string) => ({ url: `/admin/albums/${slug}` }),
};

// --- UI Components & Icons ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    BookImage,
    ArrowLeft,
    Edit3,
    Trash2,
    Info,
    Image as ImageIcon,
    User as UserIcon,
    CalendarDays,
    ShieldX,
    FileText,
    Sparkles,
    Clock4,
    CheckCircle,
    Archive,
    Eye,
} from 'lucide-react';

// --- Type Definitions ---
interface User {
    id: number;
    name: string;
}

interface Galery {
    id: number | string;
    url: string; // Full public URL for the image
    title: string | null;
    display_order: number;
}

type AlbumStatus = 'draft' | 'published' | 'archived';

interface Album {
    id: number | string;
    name: string;
    slug: string;
    description: string | null;
    cover_image_url: string | null;
    status: AlbumStatus;
    createdAt: string;
    updatedAt: string;
    galeries: Galery[];
    creator: User | null;
    updater: User | null;
}

interface Props extends InertiaSharedProps {
    album: Album;
    can: {
        edit_album: boolean;
        delete_album: boolean;
    }
}

// --- Animation Variants (from reference) ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } } };
const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.5 } },
    hover: { y: -5, transition: { duration: 0.2 } }
};
const photoThumbnailVariants = {
    active: { scale: 1.08, boxShadow: "0px 0px 12px rgba(99, 102, 241, 0.7)", zIndex: 10 }, /* indigo-500 */
    inactive: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)", zIndex: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
};
const mainPhotoVariants = {
    initial: { opacity: 0, scale: 0.9, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -10 },
    transition: { duration: 0.3, ease: "easeInOut" }
};

export default function AdminAlbumShow({ album, can }: Props) {
    const sortedPhotos = useMemo(() => {
        return album.galeries?.sort((a, b) => a.display_order - b.display_order) || [];
    }, [album.galeries]);

    const [currentPhoto, setCurrentPhoto] = useState<Galery | null>(
        sortedPhotos.length > 0 ? sortedPhotos[0] : null
    );

    const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Album Management', href: albumsRoute.index().url },
        { title: album.name, href: albumsRoute.show(album.slug).url },
    ], [album.name, album.slug]);

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete the album "${album.name}"? This is a soft delete.`)) {
            router.delete(albumsRoute.destroy(album.slug).url, {
                onSuccess: () => router.visit(albumsRoute.index().url),
            });
        }
    };
    
    const getStatusConfig = useMemo(() => (status: AlbumStatus) => {
        const config = {
            published: { label: 'Published', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300', icon: <CheckCircle className="h-4 w-4" /> },
            draft: { label: 'Draft', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300', icon: <Clock4 className="h-4 w-4" /> },
            archived: { label: 'Archived', className: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300', icon: <Archive className="h-4 w-4" /> }
        };
        return config[status] || config.draft;
    }, []);

    const statusInfo = getStatusConfig(album.status);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Album: ${album.name}`} />

            <motion.div
                className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50 py-8 lg:py-12"
                initial="hidden" animate="visible" variants={containerVariants}
            >
                <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <motion.div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Eye className="h-7 w-7" />
                            </motion.div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Album Details</h1>
                                <p className="text-slate-500 dark:text-slate-400 mt-1">Viewing information for <span className="font-semibold text-slate-700 dark:text-slate-300">"{album.name}"</span></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Link href={albumsRoute.index().url} className="group flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-slate-200/80 dark:border-slate-700/80 transition-all duration-200 hover:shadow-md backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back to Albums
                            </Link>
                            {can.edit_album && (
                                <Link href={albumsRoute.edit(album.slug).url}>
                                    <Button variant="outline" className="bg-yellow-400/20 hover:bg-yellow-500/30 border-yellow-500 text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 dark:border-yellow-600 dark:hover:border-yellow-500 shadow-sm">
                                        <Edit3 className="h-4 w-4 mr-2" /> Edit
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </motion.div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Photo Gallery */}
                        <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
                            <motion.div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 overflow-hidden" variants={cardVariants} whileHover="hover">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-3 mb-4"><ImageIcon className="h-5 w-5 text-blue-500" /> Photo Gallery</h2>
                                    <AnimatePresence mode="wait">
                                        {currentPhoto ? (
                                            <motion.div key={currentPhoto.id} className="mb-4 aspect-square w-full bg-slate-100 dark:bg-slate-700/50 rounded-xl overflow-hidden shadow-inner" {...mainPhotoVariants}>
                                                <img src={currentPhoto.url} alt={currentPhoto.title || album.name} className="w-full h-full object-cover" />
                                            </motion.div>
                                        ) : (
                                            <motion.div key="no-photo" className="mb-4 aspect-square w-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-700/50 rounded-xl text-slate-400 dark:text-slate-500 shadow-inner" {...mainPhotoVariants}>
                                                <ImageIcon className="h-16 w-16" />
                                                <p className="mt-2 font-medium">No Photos in Gallery</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    {sortedPhotos.length > 1 && (
                                        <div className="grid grid-cols-4 gap-3">
                                            {sortedPhotos.map((photo) => (
                                                <motion.button key={photo.id} onClick={() => setCurrentPhoto(photo)} className="aspect-square rounded-lg overflow-hidden focus:outline-none ring-offset-2 dark:ring-offset-slate-800 focus:ring-2 transition-all duration-150" variants={photoThumbnailVariants} initial={false} animate={currentPhoto?.id === photo.id ? "active" : "inactive"} whileHover="hover">
                                                    <img src={photo.url} alt={photo.title || `Photo ${photo.id}`} className="w-full h-full object-cover" />
                                                </motion.button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Album Information */}
                        <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
                            <motion.div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 overflow-hidden" variants={cardVariants} whileHover="hover">
                                <div className="p-6 lg:p-8">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{album.name}</h2>
                                        <Badge className={`text-sm ${statusInfo.className}`}>{statusInfo.icon} <span className="ml-1.5">{statusInfo.label}</span></Badge>
                                    </div>
                                    <div className="prose prose-slate dark:prose-invert max-w-none mt-4">
                                        {album.description ? <div dangerouslySetInnerHTML={{ __html: album.description }} /> : <p>No description provided.</p>}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 overflow-hidden" variants={cardVariants} whileHover="hover">
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-3 mb-4"><Info className="h-5 w-5 text-gray-500" />Metadata</h3>
                                    <ul className="space-y-4 text-sm">
                                        {album.cover_image_url && (
                                            <li className="flex items-start gap-4">
                                                <strong className="w-32 text-slate-500 dark:text-slate-400 shrink-0">Cover Image:</strong>
                                                <img src={album.cover_image_url} alt="Album Cover" className="w-24 h-24 rounded-md object-cover border dark:border-slate-700"/>
                                            </li>
                                        )}
                                        <li className="flex items-center gap-4"><strong className="w-32 text-slate-500 dark:text-slate-400 shrink-0">Created At:</strong> <span className="text-slate-700 dark:text-slate-300">{formatDate(new Date(album.createdAt), "d MMMM yyyy, HH:mm", { locale: idLocale })}</span></li>
                                        {album.creator && <li className="flex items-center gap-4"><strong className="w-32 text-slate-500 dark:text-slate-400 shrink-0">Created By:</strong> <span className="text-slate-700 dark:text-slate-300">{album.creator.name}</span></li>}
                                        <li className="flex items-center gap-4"><strong className="w-32 text-slate-500 dark:text-slate-400 shrink-0">Last Updated:</strong> <span className="text-slate-700 dark:text-slate-300">{formatDate(new Date(album.updatedAt), "d MMMM yyyy, HH:mm", { locale: idLocale })}</span></li>
                                        {album.updater && <li className="flex items-center gap-4"><strong className="w-32 text-slate-500 dark:text-slate-400 shrink-0">Updated By:</strong> <span className="text-slate-700 dark:text-slate-300">{album.updater.name}</span></li>}
                                    </ul>
                                </div>
                            </motion.div>

                           {can.delete_album && (
                                <motion.div className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-xl rounded-2xl shadow-xl border border-red-200/50 dark:border-red-700/30 overflow-hidden" variants={cardVariants} whileHover="hover">
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 flex items-center gap-2"><ShieldX className="h-5 w-5" /> Danger Zone</h3>
                                                <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">Deleting this album is a soft delete and can potentially be restored.</p>
                                            </div>
                                            <Button onClick={handleDelete} variant="destructive" className="shadow-md">
                                                <Trash2 className="h-4 w-4 mr-2" /> Delete Album
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                           )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </AppLayout>
    );
}