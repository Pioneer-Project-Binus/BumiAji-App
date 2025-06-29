import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps } from '@/types';
import { Head, Link, useForm, router } from '@inertiajs/react';
import React, { FormEventHandler, useState, ChangeEvent, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Route Helpers ---
import { dashboard } from '@/routes';
import albumsRoute from '@/routes/albums';
import galeriesRoute from '@/routes/galeries';

// --- UI Components & Icons ---
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    LoaderCircle, ArrowLeft, Save, Trash2, Edit3, GripVertical, Sparkles,
    FileText, Camera, Upload, Image as ImageIcon, AlertCircle, X,
    BookImage, Archive, ImageUp, Info
} from 'lucide-react';

// --- Type Definitions ---
type AlbumStatus = 'draft' | 'published' | 'archived';

interface Galery {
    id: number | string;
    // Assuming 'slug' is not on Galery, will use 'id' for deletion
    title: string | null;
    url: string; // Full public URL for the image
    display_order: number;
}

interface Album {
    id: number | string;
    name: string;
    slug: string;
    description: string | null;
    cover_image_url: string | null;
    status: AlbumStatus;
    galeries: Galery[];
}

interface Props extends InertiaSharedProps {
    album: Album;
}

interface EditAlbumForm {
    name: string;
    description: string;
    status: AlbumStatus;
    coverImage: File | null;
    removeCoverImage: boolean;
    _method: 'PUT'; // Necessary for file uploads with PUT method in Inertia
}

// --- Animation Variants (from reference) ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { y: -5, transition: { duration: 0.2, ease: "easeInOut" } }
};
const photoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
};


export default function AdminAlbumEdit({ album }: Props) {
    const { data, setData, post, processing, errors } = useForm<EditAlbumForm>({
        name: album.name || '',
        description: album.description || '',
        status: album.status || 'draft',
        coverImage: null,
        removeCoverImage: false,
        _method: 'PUT',
    });

    const [coverPreview, setCoverPreview] = useState<string | null>(album.cover_image_url);

    // State for new photo uploads
    const [photoFiles, setPhotoFiles] = useState<File[]>([]);
    const [photoTitles, setPhotoTitles] = useState<string[]>([]);
    const [photoDisplayOrders, setPhotoDisplayOrders] = useState<string[]>([]);
    const [uploadPreviewUrls, setUploadPreviewUrls] = useState<string[]>([]);
    const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
    const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});

    // Effect for Cover Image Preview
    useEffect(() => {
        if (data.coverImage) {
            const newUrl = URL.createObjectURL(data.coverImage);
            setCoverPreview(newUrl);
            return () => URL.revokeObjectURL(newUrl);
        }
    }, [data.coverImage]);

    // Effect for New Gallery Photo Previews
    useEffect(() => {
        if (photoFiles.length === 0) {
            setUploadPreviewUrls([]);
            return;
        }
        const newUrls = photoFiles.map(file => URL.createObjectURL(file));
        setUploadPreviewUrls(newUrls);
        return () => newUrls.forEach(url => URL.revokeObjectURL(url));
    }, [photoFiles]);

    const handleAlbumSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Use `post` because HTML forms don't natively support PUT with multipart/form-data.
        // Inertia handles this by sending a POST request with a hidden `_method` field.
        post(albumsRoute.update(album.slug).url, {
            preserveScroll: true,
            onSuccess: () => {
                // Reset file input after successful upload
                setData('coverImage', null);
            }
        });
    };

    const handleCoverFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData({ ...data, coverImage: e.target.files[0], removeCoverImage: false });
        }
    };
    
    const removeCoverImage = () => {
        setData({ ...data, coverImage: null, removeCoverImage: true });
        setCoverPreview(null);
    };

    const handlePhotoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setPhotoFiles(filesArray);
            setPhotoTitles(filesArray.map(file => file.name.split('.').slice(0, -1).join('.') || file.name));
            setPhotoDisplayOrders(filesArray.map(() => '0'));
        }
    };

    const removeSelectedNewPhoto = (index: number) => {
        setPhotoFiles(prev => prev.filter((_, i) => i !== index));
        setPhotoTitles(prev => prev.filter((_, i) => i !== index));
        setPhotoDisplayOrders(prev => prev.filter((_, i) => i !== index));
    };

    const handlePhotoUploadSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (photoFiles.length === 0) return;

        setIsUploadingPhotos(true);
        setUploadErrors({});

        const formData = new FormData();
        formData.append('album_id', String(album.id));
        photoFiles.forEach((file, index) => {
            formData.append(`photos[${index}][file]`, file);
            formData.append(`photos[${index}][title]`, photoTitles[index] || '');
            formData.append(`photos[${index}][display_order]`, photoDisplayOrders[index] || '0');
        });
        
        router.post(galeriesRoute.store().url, formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPhotoFiles([]);
                setPhotoTitles([]);
                setPhotoDisplayOrders([]);
                router.reload({ only: ['album'], preserveUrl: true });
            },
            onError: (errors) => setUploadErrors(errors as Record<string, string>),
            onFinish: () => setIsUploadingPhotos(false),
        });
    };

    const deletePhoto = (photoId: number | string) => {
        if (confirm('Are you sure you want to delete this photo?')) {
            router.delete(galeriesRoute.destroy(photoId).url, {
                preserveScroll: true,
                onSuccess: () => router.reload({ only: ['album'], preserveUrl: true }),
            });
        }
    };

    const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Album Management', href: albumsRoute.index().url },
        { title: 'Edit Album', href: albumsRoute.edit(album.slug).url },
    ], [album.slug]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin: Edit Album - ${album.name}`} />
            <motion.div
                className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50"
                initial="hidden" animate="visible" variants={containerVariants}
            >
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-12">
                    {/* Header */}
                    <motion.div className="mb-10" variants={itemVariants}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-2xl shadow-blue-500/25">
                                        <Edit3 className="h-8 w-8" />
                                    </div>
                                </motion.div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">Edit Album</h1>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                        Update details for <span className="font-semibold text-blue-600 dark:text-blue-400">"{album.name}"</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Link href={albumsRoute.index().url} className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 backdrop-blur-sm">
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Albums
                        </Link>
                    </motion.div>

                    {/* Album Details Form */}
                    <motion.div className="mb-10" variants={cardVariants} whileHover="hover">
                        <form onSubmit={handleAlbumSubmit} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-slate-800/50 dark:to-slate-700/50 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3"><BookImage className="h-5 w-5 text-blue-500"/>Album Details</h2>
                            </div>
                            <div className="p-8 lg:p-10 grid grid-cols-1 xl:grid-cols-3 gap-10">
                                <div className="xl:col-span-2 space-y-8">
                                    {/* Name & Description */}
                                    <div><Label htmlFor='name' className="text-lg font-bold text-slate-700 dark:text-slate-300">Album Name</Label><Input id="name" type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-2 h-14 text-lg" required /><InputError message={errors.name} className="mt-2" /></div>
                                    <div><Label htmlFor='description' className="text-lg font-bold text-slate-700 dark:text-slate-300">Description</Label><Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} className="mt-2 min-h-[150px] text-lg" /><InputError message={errors.description} className="mt-2" /></div>
                                </div>
                                <div className="space-y-8">
                                    {/* Cover Image & Status */}
                                    <div>
                                        <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Cover Image</Label>
                                        <div className="mt-2 space-y-4">
                                            {coverPreview && (
                                                <div className="relative aspect-video rounded-lg overflow-hidden group">
                                                    <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button type="button" onClick={removeCoverImage} variant="destructive" size="icon"><Trash2 className="h-5 w-5" /></Button>
                                                    </div>
                                                </div>
                                            )}
                                            <Input id="coverImage" type="file" onChange={handleCoverFileChange} accept="image/*" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                            <InputError message={errors.coverImage} />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Status</Label>
                                        <Select value={data.status} onValueChange={(value: AlbumStatus) => setData('status', value)}>
                                            <SelectTrigger className="mt-2 h-14 text-lg"><SelectValue /></SelectTrigger>
                                            <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem><SelectItem value="archived">Archived</SelectItem></SelectContent>
                                        </Select>
                                        <InputError message={errors.status} className="mt-2"/>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 pt-0 flex justify-end">
                                <Button type="submit" className="h-12 px-8 text-lg" disabled={processing}>{processing ? <><LoaderCircle className="w-5 h-5 animate-spin mr-2" /> Saving...</> : <><Save className="w-5 h-5 mr-2" /> Save Changes</>}</Button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Photo Management */}
                    <motion.div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden" variants={cardVariants} whileHover="hover">
                        <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 dark:from-slate-800/50 dark:to-slate-700/50 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3"><Camera className="h-5 w-5 text-emerald-500"/>Photo Gallery Management</h2>
                        </div>
                        <div className="p-8 lg:p-10 space-y-10">
                            {/* Upload New Photos Form */}
                            <motion.div variants={itemVariants}>
                                <form onSubmit={handlePhotoUploadSubmit} className="space-y-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-6">
                                    <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 flex items-center gap-3"><Upload className="h-6 w-6 text-emerald-500"/>Upload New Photos</h3>
                                    <div><Label htmlFor="photos" className="text-lg font-medium">Select Photos (multiple allowed)</Label><Input id="photos" type="file" multiple onChange={handlePhotoFileChange} className="mt-2" accept="image/*" /><InputError message={uploadErrors.photos} className="mt-2" /></div>
                                    {uploadPreviewUrls.length > 0 && (
                                        <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <Label>Upload Previews</Label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-2">
                                                <AnimatePresence>
                                                    {uploadPreviewUrls.map((url, index) => (
                                                        <motion.div key={url} className="relative aspect-square rounded-lg overflow-hidden group" variants={photoVariants} initial="hidden" animate="visible" exit="exit" whileHover="hover">
                                                            <img src={url} className="w-full h-full object-cover" />
                                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Button type="button" onClick={() => removeSelectedNewPhoto(index)} variant="destructive" size="icon"><Trash2 className="h-5 w-5" /></Button></div>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    )}
                                    <Button type="submit" className="w-full h-12 text-lg" disabled={isUploadingPhotos || photoFiles.length === 0}>{isUploadingPhotos ? <><LoaderCircle className="w-5 h-5 animate-spin mr-2" /> Uploading...</> : <><Upload className="w-5 h-5 mr-2" /> Upload Selected Photos</>}</Button>
                                </form>
                            </motion.div>
                            
                            {/* Existing Photos */}
                            <motion.div variants={itemVariants}>
                                <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-6 flex items-center gap-3"><ImageIcon className="h-6 w-6 text-blue-500" /> Existing Photos</h3>
                                {album.galeries && album.galeries.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                        <AnimatePresence>
                                            {album.galeries.sort((a, b) => a.display_order - b.display_order).map((photo) => (
                                                <motion.div key={photo.id} className="relative aspect-video rounded-lg overflow-hidden shadow-xl group border-2 border-slate-100 dark:border-slate-700" variants={photoVariants} initial="hidden" animate="visible" exit="exit" whileHover="hover">
                                                    <img src={photo.url} alt={photo.title || 'Album photo'} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                                                        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <Button type="button" onClick={() => deletePhoto(photo.id)} variant="destructive" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <motion.div className="text-center py-12 bg-slate-50/50 dark:bg-slate-700/50 rounded-xl" initial={{ opacity: 0}} animate={{ opacity: 1 }}>
                                        <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                                        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">This album doesn't have any photos yet.</p>
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