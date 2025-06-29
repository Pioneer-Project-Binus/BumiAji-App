import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useMemo, useState, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import albums from '@/routes/albums';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    LoaderCircle,
    BookImage, // Icon for Albums
    ArrowLeft,
    Sparkles,
    FileText,
    CircleDotDashed, // For status dot
    ImageUp,
    X,
} from 'lucide-react';

const dashboard = {
    url: '/admin/dashboard',
};

// --- Form data structure based on AlbumController ---
interface CreateAlbumForm {
    name: string;
    description: string;
    coverImage: File | null;
    status: 'draft' | 'published' | 'archived';
}

type AlbumStatus = 'draft' | 'published' | 'archived';

interface Props extends InertiaSharedProps {
    // No specific props needed from controller for create page
}

export default function AdminAlbumCreate({ auth }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm<CreateAlbumForm>({
        name: '',
        description: '',
        coverImage: null,
        status: 'draft',
    });
    
    // State for the cover image preview URL
    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    // Memoize breadcrumbs and status options to prevent re-creation on re-renders
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Dashboard', href: dashboard.url },
        { title: 'Album Management', href: albums.index().url },
        { title: 'Create New Album', href: albums.create().url },
    ], []);

    const statusOptions = useMemo(() => [
        { value: 'draft', label: 'Draft', color: 'bg-yellow-500' },
        { value: 'published', label: 'Published', color: 'bg-green-500' },
        { value: 'archived', label: 'Archived', color: 'bg-slate-500' },
    ], []);

    // Handler for cover image changes
    const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('coverImage', file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    // Handler to remove the selected cover image
    const removeCoverImage = () => {
        setData('coverImage', null);
        if (coverPreview) {
            URL.revokeObjectURL(coverPreview);
            setCoverPreview(null);
        }
        // Also reset the file input field
        const fileInput = document.getElementById('coverImage') as HTMLInputElement;
        if(fileInput) fileInput.value = "";
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(albums.store().url, {
            onError: () => {
                // Handle error, e.g., show a toast notification
                console.error("Failed to create album.");
            },
            onSuccess: () => {
                // Reset form on success if needed
                // reset();
            },
        });
    };
    
    // Animation variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Create New Album" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50">
                {/* Background Decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
                </div>

                <motion.div
                    className="relative mx-auto max-w-6xl px-4 sm:px-6 py-8 lg:py-12"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Enhanced Header Section */}
                    <motion.div className="mb-10" variants={itemVariants}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-2xl shadow-blue-500/25">
                                        <BookImage className="h-8 w-8" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                        <Sparkles className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                                        Create New Album
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                        Organize your photos into a beautiful new collection.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={albums.index().url}
                            className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 backdrop-blur-sm"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Albums
                        </Link>
                    </motion.div>

                    {/* Enhanced Main Form Card */}
                    <motion.div
                        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden"
                        variants={itemVariants}
                    >
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-slate-800/50 dark:to-slate-700/50 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                                    <FileText className="h-4 w-4 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Album Details</h2>
                            </div>
                        </div>

                        <div className="p-8 lg:p-10">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <motion.div className="grid grid-cols-1 xl:grid-cols-2 gap-10" variants={containerVariants}>
                                    {/* Left Column */}
                                    <div className="space-y-8">
                                        {/* Album Name */}
                                        <motion.div className="group" variants={itemVariants}>
                                            <div className="flex items-center gap-2 mb-4">
                                                <BookImage className="h-5 w-5 text-blue-500" />
                                                <Label htmlFor="name" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Album Name
                                                </Label>
                                            </div>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="e.g., Summer Vacation 2025"
                                                required
                                            />
                                            <InputError message={errors.name} className="mt-3 text-red-500 font-medium" />
                                        </motion.div>

                                        {/* Description */}
                                        <motion.div className="group" variants={itemVariants}>
                                            <div className="flex items-center gap-2 mb-4">
                                                <FileText className="h-5 w-5 text-teal-500" />
                                                <Label htmlFor="description" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Description
                                                </Label>
                                            </div>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                className="min-h-[220px] text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 resize-y"
                                                placeholder="A short and engaging description of the album..."
                                            />
                                            <InputError message={errors.description} className="mt-3 text-red-500 font-medium" />
                                        </motion.div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-8">
                                        {/* Cover Image */}
                                        <motion.div className="group" variants={itemVariants}>
                                            <div className="flex items-center gap-2 mb-4">
                                                <ImageUp className="h-5 w-5 text-purple-500" />
                                                <Label htmlFor="coverImage" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Cover Image
                                                </Label>
                                            </div>
                                            
                                            {coverPreview ? (
                                                <div className="relative group/preview">
                                                    <img src={coverPreview} alt="Cover preview" className="w-full h-auto object-cover rounded-xl shadow-md border-2 border-slate-200 dark:border-slate-600" />
                                                    <Button type="button" onClick={removeCoverImage} variant="destructive" size="icon" className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 group-hover/preview:opacity-100 transition-opacity bg-black/50 hover:bg-red-600">
                                                        <X className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <label htmlFor="coverImage" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer bg-slate-50/50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <ImageUp className="w-10 h-10 mb-3 text-slate-400" />
                                                        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, GIF, WEBP up to 2MB</p>
                                                    </div>
                                                    <Input id="coverImage" type="file" className="hidden" onChange={handleCoverImageChange} accept="image/png, image/jpeg, image/gif, image/webp, image/svg+xml" />
                                                </label>
                                            )}
                                            <InputError message={errors.coverImage} className="mt-3 text-red-500 font-medium" />
                                        </motion.div>

                                        {/* Status */}
                                        <motion.div className="group" variants={itemVariants}>
                                            <div className="flex items-center gap-2 mb-4">
                                                <CircleDotDashed className="h-5 w-5 text-pink-500" />
                                                <Label htmlFor="status" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Publication Status
                                                </Label>
                                            </div>
                                            <Select value={data.status} onValueChange={(value) => setData('status', value as AlbumStatus)}>
                                                <SelectTrigger className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 hover:border-slate-300 dark:hover:border-slate-500">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl">
                                                    {statusOptions.map(option => (
                                                        <SelectItem key={option.value} value={option.value} className="text-lg py-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-2.5 h-2.5 rounded-full ${option.color}`}></div>
                                                                {option.label}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.status} className="mt-3 text-red-500 font-medium" />
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Enhanced Submit Section */}
                                <motion.div className="pt-8 border-t-2 border-slate-200 dark:border-slate-700" variants={itemVariants}>
                                    <div className="flex flex-col sm:flex-row items-center justify-end gap-6">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="group h-14 px-10 text-lg font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-xl shadow-blue-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-3 h-6 w-6 animate-spin" />
                                                    Creating Album...
                                                </>
                                            ) : (
                                                <>
                                                    <BookImage className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                                                    Create Album
                                                    <Sparkles className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </motion.div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </AppLayout>
    );
}