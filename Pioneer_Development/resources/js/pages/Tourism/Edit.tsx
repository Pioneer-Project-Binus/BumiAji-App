import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Tourism, TourismStatus, InertiaSharedProps } from '@/types';
import { Head, Link, useForm, router } from '@inertiajs/react';
import React, { FormEventHandler, useState, ChangeEvent, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { dashboard } from '@/routes';
import tourismRoute from '@/routes/tourism';
import tourismPhotosRoute from '@/routes/tourism-photos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    LoaderCircle, MapPin, ArrowLeft, Save, ImagePlus, Trash2, Edit3, GripVertical,
    Sparkles, Compass, DollarSign, Clock, FileText, Tag, Camera, Upload,
    Image as ImageIcon, AlertCircle, CheckCircle, X, Eye, Star, Phone,
    Globe, Navigation, Mountain, Waves, Trees, Users, Calendar, Clock4,
    Ticket, MapPinCheckIcon, Info, Heart, Share2, Navigation2,
    MapPinCheck
} from 'lucide-react';

interface Props extends InertiaSharedProps {
    tourism: Tourism;
}

interface EditTourismForm {
    name: string;
    description: string;
    address: string;
    ticketPrice: string;
    contactInfo: string;
    latitude: string;
    longitude: string;
    socialMedia: string;
    status: TourismStatus;
}

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

const photoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
    visible: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    hover: {
        scale: 1.05,
        rotateY: 5,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        rotateY: -90,
        transition: {
            duration: 0.3
        }
    }
};

export default function AdminTourismEdit({ tourism }: Props) {
    const { data, setData, put, processing, errors } = useForm<Required<EditTourismForm>>({
        name: tourism.name || '',
        description: tourism.description || '',
        address: tourism.address || '',
        ticketPrice: tourism.ticketPrice || '',
        contactInfo: tourism.contactInfo || '',
        latitude: tourism.latitude ? String(tourism.latitude) : '',
        longitude: tourism.longitude ? String(tourism.longitude) : '',
        socialMedia: tourism.socialMedia ? JSON.stringify(tourism.socialMedia) : '',
        status: tourism.status || 'draft',
    });

    const [photoFiles, setPhotoFiles] = useState<File[]>([]);
    const [photoTitles, setPhotoTitles] = useState<string[]>([]);
    const [photoDisplayOrders, setPhotoDisplayOrders] = useState<string[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
    const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (photoFiles.length === 0) {
            setPreviewUrls([]);
            return;
        }
        const newPreviewUrls = photoFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(newPreviewUrls);
        return () => {
            newPreviewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [photoFiles]);

    const handleTourismSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(tourismRoute.update(tourism.slug).url, {
            preserveScroll: true,
        });
    };

    const handlePhotoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setPhotoFiles(filesArray);
            setPhotoTitles(filesArray.map(file => file.name.split('.').slice(0, -1).join('.') || file.name));
            setPhotoDisplayOrders(filesArray.map(() => '0'));
        } else {
            setPhotoFiles([]);
            setPhotoTitles([]);
            setPhotoDisplayOrders([]);
        }
    };

    const handlePhotoDisplayOrdersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const ordersArray = value.split(',').map(s => s.trim()).filter(s => s !== '');
        setPhotoDisplayOrders(ordersArray);
    };

    const handlePhotoUploadSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (photoFiles.length === 0) {
            alert('Silakan pilih foto untuk diunggah.');
            return;
        }

        setIsUploadingPhotos(true);
        setUploadErrors({});

        const formData = new FormData();
        formData.append('tourismId', String(tourism.id));
        formData.append('title', (photoTitles && photoTitles.length > 0 ? photoTitles.join(',') : 'Foto Destinasi Wisata'));
        formData.append('displayOrder', (photoDisplayOrders && photoDisplayOrders.length > 0 ? photoDisplayOrders.join(',') : '0'));
        photoFiles.forEach((file) => {
            formData.append('photos[]', file);
        });

        router.post(tourismPhotosRoute.store().url, formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPhotoFiles([]);
                setPhotoTitles([]);
                setPhotoDisplayOrders(['0']);
                router.reload({ only: ['tourism'], preserveUrl: true });
            },
            onError: (errors) => {
                const typedErrors = errors as Record<string, string>;
                setUploadErrors(typedErrors);
                if (typedErrors['photos']) {
                    setUploadErrors(prev => ({ ...prev, photos: typedErrors['photos'] }));
                }
            },
            onFinish: () => setIsUploadingPhotos(false),
        });
    };

    const deletePhoto = (photoSlug: string) => {
        if (!photoSlug) {
            console.error("Slug foto tidak ditemukan untuk dihapus.");
            alert("Gagal menghapus foto: slug tidak valid.");
            return;
        }
        if (confirm('Anda yakin ingin menghapus foto ini?')) {
            router.delete(tourismPhotosRoute.destroy(photoSlug).url, {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ['tourism'], preserveUrl: true });
                },
            });
        }
    };

    const removeSelectedPhoto = (index: number) => {
        setPhotoFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setPhotoTitles(prevTitles => prevTitles.filter((_, i) => i !== index));
        setPhotoDisplayOrders(prevOrders => prevOrders.filter((_, i) => i !== index));
    };

    const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [
        { title: 'Dasboard Admin', href: dashboard().url },
        { title: 'Manajemen Pariwisata', href: tourismRoute.index().url },
        { title: 'Edit Destinasi', href: tourismRoute.edit(tourism.slug).url },
    ], [tourism.slug]);

    const getStatusConfig = (status: TourismStatus) => {
        switch (status) {
            case 'published':
                return { color: 'green', icon: CheckCircle, label: 'Dipublikasikan' };
            case 'closed':
                return { color: 'red', icon: X, label: 'Tutup' };
            default:
                return { color: 'yellow', icon: Clock4, label: 'Draft' };
        }
    };

    const statusConfig = getStatusConfig(data.status);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>{`Admin: Edit Destinasi - ${tourism.name}`}</title>
                <meta name="description" content={`Halaman untuk mengedit detail destinasi wisata: ${tourism.name}. Kelola informasi, foto, dan atribut lainnya.`} />
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <motion.div
                className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/50 to-cyan-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/50"
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
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-12">
                    {/* Header Section */}
                    <motion.div className="mb-10" variants={itemVariants}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    className="relative"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-2xl shadow-emerald-500/25">
                                        <Edit3 className="h-8 w-8" />
                                    </div>
                                    <motion.div
                                        className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Sparkles className="h-3 w-3 text-white" />
                                    </motion.div>
                                </motion.div>
                                <div>
                                    <motion.h1
                                        className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        Edit Destinasi
                                    </motion.h1>
                                    <motion.p
                                        className="text-slate-600 dark:text-slate-400 mt-2 text-lg"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                    >
                                        Perbarui detail untuk <span className="font-semibold text-emerald-600 dark:text-emerald-400">"{tourism.name}"</span>
                                    </motion.p>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href={tourismRoute.index().url}
                                className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5 backdrop-blur-sm"
                            >
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Kembali ke Destinasi
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Form Detail Tourism */}
                    <motion.div
                        className="mb-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 dark:from-slate-800/50 dark:to-slate-700/50 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center"
                                        whileHover={{ rotate: 180 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <MapPinCheck className="h-4 w-4 text-white" />
                                    </motion.div>
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Detail Destinasi</h2>
                                </div>
                                <motion.div
                                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <motion.div
                                        className="w-2 h-2 rounded-full bg-emerald-500"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Mode Edit</span>
                                </motion.div>
                            </div>
                        </div>
                        <div className="p-8 lg:p-10">
                            <form onSubmit={handleTourismSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                                    {/* Kolom Kiri */}
                                    <motion.div
                                        className="space-y-8"
                                        variants={itemVariants}
                                    >
                                        {/* Nama Destinasi */}
                                        <motion.div
                                            className="group"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex items-center gap-2 mb-4">
                                                <Mountain className="h-5 w-5 text-emerald-500" />
                                                <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Nama Destinasi</Label>
                                            </div>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="Masukkan nama destinasi wisata..."
                                                required
                                            />
                                            <InputError message={errors.name} className="mt-3 text-red-500 font-medium" />
                                        </motion.div>

                                        {/* Harga Tiket */}
                                        <motion.div
                                            className="group"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex items-center gap-2 mb-4">
                                                <Ticket className="h-5 w-5 text-green-500" />
                                                <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Harga Tiket</Label>
                                            </div>
                                            <div className="relative">
                                                <span className="z-10 absolute left-5 top-1/2 -translate-y-1/2 text-green-500 dark:text-slate-400 font-bold text-lg">Rp</span>
                                                <Input
                                                    id="ticketPrice"
                                                    type="text"
                                                    value={data.ticketPrice}
                                                    onChange={(e) => setData('ticketPrice', e.target.value)}
                                                    className="h-14 text-lg pl-16 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                    placeholder="10.000 / Gratis / Sesuai paket"
                                                />
                                            </div>
                                            <InputError message={errors.ticketPrice} className="mt-3 text-red-500 font-medium" />
                                        </motion.div>

                                        {/* Alamat */}
                                        <motion.div
                                            className="group"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex items-center gap-2 mb-4">
                                                <MapPinCheckIcon className="h-5 w-5 text-blue-500" />
                                                <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Alamat</Label>
                                            </div>
                                            <Textarea
                                                id="address"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                className="min-h-[120px] text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 resize-none"
                                                placeholder="Masukkan alamat lengkap destinasi..."
                                            />
                                            <InputError message={errors.address} className="mt-3 text-red-500 font-medium" />
                                        </motion.div>

                                        {/* Koordinat */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <motion.div
                                                className="group"
                                                whileHover={{ x: 5 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Navigation className="h-5 w-5 text-purple-500" />
                                                    <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Latitude</Label>
                                                </div>
                                                <Input
                                                    id="latitude"
                                                    type="number"
                                                    step="any"
                                                    value={data.latitude}
                                                    onChange={(e) => setData('latitude', e.target.value)}
                                                    className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                    placeholder="-7.2575"
                                                />
                                                <InputError message={errors.latitude} className="mt-3 text-red-500 font-medium" />
                                            </motion.div>
                                            <motion.div
                                                className="group"
                                                whileHover={{ x: 5 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Navigation2 className="h-5 w-5 text-indigo-500" />
                                                    <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Longitude</Label>
                                                </div>
                                                <Input
                                                    id="longitude"
                                                    type="number"
                                                    step="any"
                                                    value={data.longitude}
                                                    onChange={(e) => setData('longitude', e.target.value)}
                                                    className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                    placeholder="110.4037"
                                                />
                                                <InputError message={errors.longitude} className="mt-3 text-red-500 font-medium" />
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Kolom Kanan */}
                                    <motion.div
                                        className="space-y-8"
                                        variants={itemVariants}
                                    >
                                        {/* Deskripsi */}
                                        <motion.div
                                            className="group"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex items-center gap-2 mb-4">
                                                <FileText className="h-5 w-5 text-blue-500" />
                                                <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Deskripsi Destinasi</Label>
                                            </div>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                className="min-h-[200px] text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 resize-none"
                                                placeholder="Jelaskan keindahan dan daya tarik destinasi ini..."
                                                required
                                            />
                                            <InputError message={errors.description} className="mt-3 text-red-500 font-medium" />
                                        </motion.div>

                                        {/* Kontak Info */}
                                        <motion.div
                                            className="group"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex items-center gap-2 mb-4">
                                                <Phone className="h-5 w-5 text-orange-500" />
                                                <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Informasi Kontak</Label>
                                            </div>
                                            <Input
                                                id="contactInfo"
                                                type="text"
                                                value={data.contactInfo}
                                                onChange={(e) => setData('contactInfo', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="Nomor telepon / email / website"
                                            />
                                            <InputError message={errors.contactInfo} className="mt-3 text-red-500 font-medium" />
                                        </motion.div>

                                        {/* Social Media */}
                                        <motion.div
                                            className="group"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex items-center gap-2 mb-4">
                                                <Globe className="h-5 w-5 text-pink-500" />
                                                <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Media Sosial (JSON)</Label>
                                            </div>
                                            <Textarea
                                                id="socialMedia"
                                                value={data.socialMedia}
                                                onChange={(e) => setData('socialMedia', e.target.value)}
                                                className="min-h-[100px] text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 resize-none"
                                                placeholder='{"facebook": "facebook.com/namadestinasi", "instagram": "instagram.com/namadestinasi"}'
                                            />
                                            <InputError message={errors.socialMedia} className="mt-3 text-red-500 font-medium" />
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                                Masukkan dalam format JSON. Contoh: {`"facebook": "url_facebook", "instagram": "url_instagram"`}
                                            </p>
                                        </motion.div>

                                        {/* Status */}
                                        <motion.div
                                            className="group"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex items-center gap-2 mb-4">
                                                <Info className="h-5 w-5 text-gray-500" />
                                                <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Status</Label>
                                            </div>
                                            <Select
                                                value={data.status}
                                                onValueChange={(value: TourismStatus) => setData('status', value)}
                                            >
                                                <SelectTrigger className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-gray-500 focus:ring-4 focus:ring-gray-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500">
                                                    <SelectValue placeholder="Pilih Status" />
                                                </SelectTrigger>
                                                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                                                    <SelectItem value="draft" className="text-lg">Draft</SelectItem>
                                                    <SelectItem value="published" className="text-lg">Dipublikasikan</SelectItem>
                                                    <SelectItem value="closed" className="text-lg">Tutup</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.status} className="mt-3 text-red-500 font-medium" />
                                        </motion.div>
                                    </motion.div>
                                </div>

                                {/* Form Actions */}
                                <motion.div variants={itemVariants} className="flex justify-end pt-6 border-t border-slate-200 dark:border-slate-700">
                                    <Button
                                        type="submit"
                                        className="relative group h-12 px-8 text-lg font-semibold rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:from-emerald-600 hover:to-cyan-600 hover:scale-105 active:scale-95"
                                        disabled={processing}
                                    >
                                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100 animate-pulse"></span>
                                        <span className="relative flex items-center gap-3">
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="w-5 h-5 animate-spin" />
                                                    Menyimpan...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-5 h-5" />
                                                    Simpan Perubahan
                                                </>
                                            )}
                                        </span>
                                    </Button>
                                </motion.div>
                            </form>
                        </div>
                    </motion.div>

                    {/* Photo Management Section */}
                    <motion.div
                        className="mb-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-slate-800/50 dark:to-slate-700/50 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center"
                                    whileHover={{ rotateY: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Camera className="h-4 w-4 text-white" />
                                </motion.div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Manajemen Foto Destinasi</h2>
                            </div>
                        </div>
                        <div className="p-8 lg:p-10 space-y-8">
                            {/* Upload New Photos */}
                            <motion.div variants={itemVariants}>
                                <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-6 flex items-center gap-3">
                                    <Upload className="h-6 w-6 text-blue-500" /> Unggah Foto Baru
                                </h3>
                                <form onSubmit={handlePhotoUploadSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="photos" className="block text-lg font-medium text-slate-700 dark:text-slate-300 mb-3">Pilih Foto (Dapat Lebih dari Satu)</Label>
                                            <Input
                                                id="photos"
                                                type="file"
                                                multiple
                                                onChange={handlePhotoFileChange}
                                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer dark:file:bg-slate-700 dark:file:text-slate-200 dark:hover:file:bg-slate-600"
                                                accept="image/*"
                                            />
                                            {uploadErrors.photos && <InputError message={uploadErrors.photos} className="mt-3 text-red-500 font-medium" />}
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                                Format yang didukung: JPG, PNG, GIF. Ukuran maksimum: 5MB per foto.
                                            </p>
                                        </div>
                                        <div>
                                            <Label htmlFor="photoTitles" className="block text-lg font-medium text-slate-700 dark:text-slate-300 mb-3">Judul Foto (Opsional, pisahkan dengan koma)</Label>
                                            <Input
                                                id="photoTitles"
                                                type="text"
                                                value={photoTitles.join(', ')}
                                                onChange={(e) => setPhotoTitles(e.target.value.split(',').map(s => s.trim()))}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="Contoh: Pemandangan Pantai, Suasana Sunset"
                                            />
                                            <InputError message={uploadErrors.title} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="photoDisplayOrders" className="block text-lg font-medium text-slate-700 dark:text-slate-300 mb-3">Urutan Tampilan (Opsional, pisahkan dengan koma)</Label>
                                        <Input
                                            id="photoDisplayOrders"
                                            type="text"
                                            value={photoDisplayOrders.join(', ')}
                                            onChange={handlePhotoDisplayOrdersChange}
                                            className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                            placeholder="Contoh: 1, 2, 3 (sesuai urutan foto)"
                                        />
                                        <InputError message={uploadErrors.displayOrder} className="mt-3 text-red-500 font-medium" />
                                    </div>

                                    {previewUrls.length > 0 && (
                                        <motion.div
                                            className="mt-6 border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-700/50"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <h4 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Pratinjau Foto yang Dipilih:</h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                                <AnimatePresence>
                                                    {previewUrls.map((url, index) => (
                                                        <motion.div
                                                            key={url}
                                                            className="relative aspect-video rounded-lg overflow-hidden shadow-md group"
                                                            variants={photoVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            whileHover="hover"
                                                        >
                                                            <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                <Button
                                                                    type="button"
                                                                    onClick={() => removeSelectedPhoto(index)}
                                                                    className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                                                                >
                                                                    <Trash2 className="h-5 w-5" />
                                                                </Button>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="relative group h-12 px-8 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-600 hover:to-indigo-600 hover:scale-105 active:scale-95 w-full md:w-auto"
                                        disabled={isUploadingPhotos || photoFiles.length === 0}
                                    >
                                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100 animate-pulse"></span>
                                        <span className="relative flex items-center gap-3">
                                            {isUploadingPhotos ? (
                                                <>
                                                    <LoaderCircle className="w-5 h-5 animate-spin" />
                                                    Mengunggah...
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="w-5 h-5" />
                                                    Unggah Foto
                                                </>
                                            )}
                                        </span>
                                    </Button>
                                </form>
                            </motion.div>

                            <div className="h-px bg-slate-200 dark:bg-slate-700 my-8" />

                            {/* Existing Photos */}
                            <motion.div variants={itemVariants}>
                                <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-6 flex items-center gap-3">
                                    <ImageIcon className="h-6 w-6 text-green-500" /> Foto yang Sudah Ada
                                </h3>
                                {tourism.photos && tourism.photos.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                        <AnimatePresence>
                                            {tourism.photos.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)).map((photo) => (
                                                <motion.div
                                                    key={photo.slug}
                                                    className="relative aspect-video rounded-lg overflow-hidden shadow-xl group cursor-pointer border-2 border-slate-100 dark:border-slate-700 transform hover:scale-105 transition-transform duration-300"
                                                    variants={photoVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    whileHover="hover"
                                                    onClick={() => window.open(photo.url, '_blank')}
                                                >
                                                    <img src={photo.url} alt={photo.title || 'Destinasi Wisata'} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                                        <h4 className="text-white text-base font-semibold truncate">{photo.title}</h4>
                                                        <p className="text-slate-300 text-sm flex items-center gap-1">
                                                            <GripVertical className="h-4 w-4" /> Urutan: {photo.displayOrder}
                                                        </p>
                                                        <div className="flex justify-end mt-2">
                                                            <Button
                                                                type="button"
                                                                onClick={(e) => { e.stopPropagation(); deletePhoto(photo.slug); }}
                                                                className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                                                            >
                                                                <Trash2 className="h-5 w-5" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <motion.div
                                        className="text-center py-12 bg-slate-50/50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                                        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">Belum ada foto yang diunggah untuk destinasi ini.</p>
                                        <p className="text-slate-500 dark:text-slate-400 mt-2">Gunakan formulir di atas untuk menambahkan foto.</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
}