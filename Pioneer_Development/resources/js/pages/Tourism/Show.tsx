import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Tourism, TourismPhoto, TourismStatus, InertiaSharedProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import tourismRoute from '@/routes/tourism';
import { dashboard } from '@/routes';
import { format } from 'date-fns';
import { id as localeID } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    MapPin,
    ArrowLeft,
    Edit3,
    Trash2,
    Info,
    Image as ImageIcon,
    User as UserIcon,
    CalendarDays,
    ShieldX,
    TrendingUp,
    FileText,
    Sparkles,
    Ticket,
    Phone,
    Globe,
    Navigation,
    Mountain,
    Clock4,
    CheckCircle,
    X,
    Eye,
    MapPin2,
    Heart,
    Share2,
    Navigation2,
    MapPinCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Props yang diterima dari TourismController@show
interface Props extends InertiaSharedProps {
    tourism: Tourism; // Termasuk relasi photos, creator, updater
}

// Framer Motion Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
    hover: {
        y: -5,
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    }
};

const photoThumbnailVariants = {
    active: {
        scale: 1.05,
        boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.6)", // blue-500 shadow
        transition: {
            duration: 0.2
        }
    },
    inactive: {
        scale: 1,
        boxShadow: "none",
        transition: {
            duration: 0.2
        }
    },
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.2
        }
    }
};

const mainPhotoVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3, ease: "easeOut" }
};

export default function AdminTourismShow({ tourism }: Props) {
    // Menggunakan useMemo untuk mengurutkan foto destinasi berdasarkan displayOrder
    const sortedPhotos = useMemo(() => {
        return tourism.photos?.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) || [];
    }, [tourism.photos]);

    const [currentPhoto, setCurrentPhoto] = useState<TourismPhoto | null>(
        sortedPhotos.length > 0 ? sortedPhotos[0] : null
    );

    // Menggunakan useMemo untuk breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Admin Dashboard', href: dashboard().url },
        { title: 'Manajemen Pariwisata', href: tourismRoute.index().url },
        { title: tourism.name, href: tourismRoute.show(tourism.slug).url },
    ], [tourism.name, tourism.slug]);

    const handleDelete = () => {
        if (confirm(`Anda yakin ingin menghapus destinasi wisata "${tourism.name}"? Ini adalah soft delete.`)) {
            router.delete(tourismRoute.destroy(tourism.slug).url, {
                onSuccess: () => router.visit(tourismRoute.index().url),
            });
        }
    };

    const formatPrice = (price: string) => {
        // Handle cases like "Gratis" or non-numeric values
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            return price; // Return as is if not a number
        }
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(parsedPrice);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return format(new Date(dateString), "d MMMM yyyy, HH:mm", { locale: localeID });
    };

    // Menggunakan useMemo untuk konfigurasi status
    const getStatusConfig = useMemo(() => (status: TourismStatus) => {
        const config = {
            published: {
                label: 'Dipublikasikan',
                className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-500/50',
                icon: <CheckCircle className="h-4 w-4" />
            },
            draft: {
                label: 'Draft',
                className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-500/50',
                icon: <Clock4 className="h-4 w-4" />
            },
            closed: {
                label: 'Tutup',
                className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-500/50',
                icon: <X className="h-4 w-4" />
            }
        };
        return config[status] || config.draft;
    }, []);

    const statusInfo = getStatusConfig(tourism.status);

    // Parse socialMedia JSON string to object
    const socialMedia = useMemo(() => {
        try {
            return tourism.socialMedia ? JSON.parse(tourism.socialMedia) : {};
        } catch (e) {
            console.error("Error parsing social media JSON:", e);
            return {};
        }
    }, [tourism.socialMedia]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Destinasi: ${tourism.name}`} />

            <motion.div
                className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/50 to-cyan-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/50 py-8 lg:py-12"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div
                        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-teal-500/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [360, 180, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-500/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                    {/* Header Section */}
                    <motion.div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" variants={itemVariants}>
                        <div className="flex items-center gap-4">
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white shadow-lg shadow-emerald-500/25">
                                    <Eye className="h-7 w-7" />
                                </div>
                                <motion.div
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sparkles className="h-3 w-3 text-white" />
                                </motion.div>
                            </motion.div>
                            <div>
                                <motion.h1
                                    className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    Detail Destinasi
                                </motion.h1>
                                <motion.p
                                    className="text-slate-500 dark:text-slate-400 mt-1 text-base"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    Melihat informasi untuk: <span className="font-semibold text-slate-700 dark:text-slate-300">"{tourism.name}"</span>
                                </motion.p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    href={tourismRoute.index().url}
                                    className="group flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-slate-200/80 dark:border-slate-700/80 transition-all duration-200 hover:shadow-md backdrop-blur-sm"
                                >
                                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                                    Kembali ke Destinasi
                                </Link>
                            </motion.div>
                            {/* Check can.edit_tourism if needed, assuming admin always can for now */}
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link href={tourismRoute.edit(tourism.slug).url}>
                                    <Button variant="outline" className="bg-yellow-400/20 hover:bg-yellow-500/30 border-yellow-500 text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 dark:border-yellow-600 dark:hover:border-yellow-500 shadow-sm">
                                        <Edit3 className="h-4 w-4 mr-2" /> Edit
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Photo Gallery */}
                        <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
                            <motion.div
                                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 overflow-hidden"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <ImageIcon className="h-5 w-5 text-emerald-500" />
                                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Galeri Foto</h2>
                                    </div>
                                    <AnimatePresence mode="wait">
                                        {currentPhoto ? (
                                            <motion.div
                                                key={currentPhoto.id}
                                                className="mb-4 aspect-square w-full bg-slate-100 dark:bg-slate-700/50 rounded-xl overflow-hidden shadow-inner"
                                                variants={mainPhotoVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                            >
                                                <img
                                                    src={`/storage/${currentPhoto.filePath}`}
                                                    alt={currentPhoto.title || tourism.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="no-image"
                                                className="mb-4 aspect-square w-full flex items-center justify-center bg-slate-100 dark:bg-slate-700/50 rounded-xl text-slate-400 dark:text-slate-500 shadow-inner"
                                                variants={mainPhotoVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                            >
                                                <ImageIcon className="h-16 w-16" />
                                                <p className="ml-2">Tidak ada foto tersedia</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    {sortedPhotos.length > 1 && (
                                        <div className="grid grid-cols-4 gap-3">
                                            {sortedPhotos.map((photo) => (
                                                <motion.button
                                                    key={photo.id}
                                                    onClick={() => setCurrentPhoto(photo)}
                                                    className={`aspect-square rounded-lg overflow-hidden focus:outline-none ring-offset-2 dark:ring-offset-slate-800 focus:ring-2 transition-all duration-150
                                                        ${currentPhoto?.id === photo.id ? 'ring-emerald-500 shadow-md' : 'ring-slate-200 dark:ring-slate-700 hover:ring-emerald-400'}`}
                                                    variants={photoThumbnailVariants}
                                                    initial={false}
                                                    animate={currentPhoto?.id === photo.id ? "active" : "inactive"}
                                                    whileHover="hover"
                                                >
                                                    <img
                                                        src={`/storage/${photo.filePath}`}
                                                        alt={photo.title || `Foto ${photo.id}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </motion.button>
                                            ))}
                                        </div>
                                    )}
                                    {sortedPhotos.length === 0 && !currentPhoto && <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-4">Destinasi ini belum memiliki foto.</p>}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Tourism Information */}
                        <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
                            <motion.div
                                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 overflow-hidden"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <div className="p-6 lg:p-8">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Mountain className="h-6 w-6 text-emerald-500" />
                                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{tourism.name}</h2>
                                    </div>

                                    <div className="mb-6 mt-4">
                                        <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-700 dark:from-emerald-400 dark:to-cyan-500">
                                            Harga Tiket: {formatPrice(tourism.ticketPrice)}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                        <motion.div
                                            className="flex items-center gap-3 p-4 bg-slate-50/70 dark:bg-slate-700/30 rounded-lg border border-slate-200/70 dark:border-slate-600/50"
                                            variants={itemVariants}
                                        >
                                            <MapPinCheck className="h-6 w-6 text-blue-500" />
                                            <div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Alamat</p>
                                                <p className="text-base font-semibold text-slate-700 dark:text-slate-200">{tourism.address || 'N/A'}</p>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            className="flex items-center gap-3 p-4 bg-slate-50/70 dark:bg-slate-700/30 rounded-lg border border-slate-200/70 dark:border-slate-600/50"
                                            variants={itemVariants}
                                        >
                                            {statusInfo.icon}
                                            <div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
                                                <p className={`text-lg font-semibold ${statusInfo.className.split(' ')[1]}`}>{statusInfo.label}</p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    <motion.div className="mb-6 prose prose-slate dark:prose-invert max-w-none" variants={itemVariants}>
                                        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-purple-500"/> Deskripsi
                                        </h3>
                                        <div dangerouslySetInnerHTML={{ __html: tourism.description || '<p>Tidak ada deskripsi yang disediakan.</p>' }} />
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Contact & Social Media Card */}
                            <motion.div
                                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 overflow-hidden"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Phone className="h-5 w-5 text-orange-500" />
                                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Kontak & Media Sosial</h2>
                                    </div>
                                    <ul className="space-y-3 text-sm">
                                        <motion.li className="flex items-center gap-3" variants={itemVariants}>
                                            <strong className="w-28 text-slate-500 dark:text-slate-400">Info Kontak:</strong>
                                            <span className="text-slate-700 dark:text-slate-300">{tourism.contactInfo || 'N/A'}</span>
                                        </motion.li>
                                        <motion.li className="flex items-start gap-3" variants={itemVariants}>
                                            <strong className="w-28 text-slate-500 dark:text-slate-400 shrink-0">Koordinat:</strong>
                                            <div className="text-slate-700 dark:text-slate-300">
                                                Latitude: {tourism.latitude || 'N/A'}<br />
                                                Longitude: {tourism.longitude || 'N/A'}
                                            </div>
                                        </motion.li>
                                        <motion.li className="flex items-start gap-3" variants={itemVariants}>
                                            <strong className="w-28 text-slate-500 dark:text-slate-400 shrink-0">Media Sosial:</strong>
                                            <div className="flex flex-wrap gap-2 text-slate-700 dark:text-slate-300">
                                                {Object.keys(socialMedia).length > 0 ? (
                                                    Object.entries(socialMedia).map(([platform, url]) => (
                                                        <a key={platform} href={url as string} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                                            <Globe className="h-3 w-3 mr-1" /> {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                                        </a>
                                                    ))
                                                ) : (
                                                    <span>N/A</span>
                                                )}
                                            </div>
                                        </motion.li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* Metadata Card */}
                            <motion.div
                                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 overflow-hidden"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Info className="h-5 w-5 text-gray-500" />
                                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Informasi Tambahan</h2>
                                    </div>
                                    <ul className="space-y-3 text-sm">
                                        <motion.li className="flex items-start gap-3" variants={itemVariants}>
                                            <strong className="w-28 text-slate-500 dark:text-slate-400 shrink-0">Dibuat:</strong>
                                            <div className="text-slate-700 dark:text-slate-300">
                                                {formatDate(tourism.createdAt)}
                                                {tourism.creator && <span className="block text-xs text-slate-500 dark:text-slate-400">oleh {tourism.creator.name}</span>}
                                            </div>
                                        </motion.li>
                                        <motion.li className="flex items-start gap-3" variants={itemVariants}>
                                            <strong className="w-28 text-slate-500 dark:text-slate-400 shrink-0">Terakhir Diperbarui:</strong>
                                            <div className="text-slate-700 dark:text-slate-300">
                                                {formatDate(tourism.updatedAt)}
                                                {tourism.updater && <span className="block text-xs text-slate-500 dark:text-slate-400">oleh {tourism.updater.name}</span>}
                                            </div>
                                        </motion.li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* Actions Card (Delete) */}
                            <motion.div
                                className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-xl rounded-2xl shadow-xl border border-red-200/50 dark:border-red-700/30 overflow-hidden"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <motion.div variants={itemVariants}>
                                            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
                                                <ShieldX className="h-5 w-5"/> Zona Bahaya
                                            </h3>
                                            <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">
                                                Menghapus destinasi ini adalah soft delete dan berpotensi dapat dipulihkan.
                                            </p>
                                        </motion.div>
                                        {/* Check can.delete_tourism if needed, assuming admin always can for now */}
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <Button onClick={handleDelete} variant="destructive" className="shadow-md">
                                                <Trash2 className="h-4 w-4 mr-2" /> Hapus Destinasi
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </AppLayout>
    );
}