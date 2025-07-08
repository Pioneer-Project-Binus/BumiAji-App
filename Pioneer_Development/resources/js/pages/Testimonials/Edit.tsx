import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useState, ChangeEvent, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';

// --- Route Helpers & UI ---
import { dashboard } from '@/routes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle, MessageSquare, ArrowLeft, Save, Star, ImageUp, Trash2, Edit3 } from 'lucide-react';
import testimonialsRoute from '@/routes/testimonials';
import type { Variants } from 'framer-motion';

// --- Type Definitions ---
interface Testimonial {
    id: number | string;
    name: string;
    slug: string;
    message: string;
    rating: number | null;
    photo_url: string | null;
}
interface Props extends InertiaSharedProps {
    testimonial: Testimonial;
}
interface EditTestimonialForm {
    name: string;
    message: string;
    rating: number;
    photo: File | null;
    removePhoto: boolean;
    _method: 'PUT';
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring' },
    },
};

interface StarRatingInputProps {
    rating: number;
    setRating: (rating: number) => void;
}

const StarRatingInput = ({ rating, setRating }: StarRatingInputProps) => {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <motion.button type="button" key={ratingValue} onClick={() => setRating(ratingValue)} onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(0)} whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }} className="p-1 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-full">
                        <Star className={`h-8 w-8 transition-all ${ratingValue <= (hover || rating) ? 'text-green-500 fill-green-500' : 'text-slate-300 dark:text-slate-600'}`} />
                    </motion.button>
                );
            })}
        </div>
    );
};

export default function AdminTestimonialEdit({ testimonial }: Props) {
    const { data, setData, post, processing, errors } = useForm<Required<EditTestimonialForm>>({
        name: testimonial.name,
        message: testimonial.message,
        rating: testimonial.rating || 5,
        photo: null,
        removePhoto: false,
        _method: 'PUT',
    });
    
    const [photoPreview, setPhotoPreview] = useState<string | null>(testimonial.photo_url);

    useEffect(() => {
        if (data.photo) {
            const previewUrl = URL.createObjectURL(data.photo);
            setPhotoPreview(previewUrl);
            return () => URL.revokeObjectURL(previewUrl);
        }
    }, [data.photo]);

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData(d => ({ ...d, photo: file, removePhoto: false }));
        }
    };

    const removePhoto = () => {
        setData(d => ({ ...d, photo: null, removePhoto: true }));
        setPhotoPreview(null);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Inertia uses POST for file uploads, with _method spoofing
        post(`/admin/testimonials/${testimonial.slug}`, {
            preserveScroll: true,
        });
    };
    
    const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Testimonials', href: testimonialsRoute.indexAdmin().url },
        { title: 'Edit Testimonial', href: testimonialsRoute.edit(testimonial.slug).url },
    ], []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Testimonial: ${testimonial.name}`} />
            <motion.div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 dark:from-slate-900 dark:via-emerald-900/20 dark:to-green-900/20" initial="hidden" animate="visible" variants={containerVariants}>
                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 lg:py-12">
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-10">
                        <div className="flex items-center gap-4 mb-8">
                             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-2xl shadow-green-500/30"><Edit3 className="h-8 w-8" /></div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Edit Testimonial</h1>
                                <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">Update details for "{testimonial.name}"</p>
                            </div>
                        </div>
                        <Button asChild variant="outline" className="border-green-200 hover:bg-green-50 hover:border-green-300 dark:border-green-700 dark:hover:bg-green-900/20">
                            <Link href={testimonialsRoute.indexAdmin().url} className="group">
                                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Back to List
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Form Card */}
                    <motion.form variants={itemVariants} onSubmit={handleSubmit} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-green-500/10 border border-green-100 dark:border-green-800/30 overflow-hidden">
                        <div className="p-8 lg:p-10 space-y-8">
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                                {/* Photo & Rating */}
                                <div className="space-y-6 flex flex-col items-center text-center">
                                    <Label className="text-lg font-bold text-green-800 dark:text-green-200">Photo & Rating</Label>
                                    {photoPreview ? (
                                        <div className="relative group">
                                            <img src={photoPreview} className="h-32 w-32 rounded-full object-cover shadow-lg ring-4 ring-green-200 dark:ring-green-700" />
                                            <Button type="button" onClick={removePhoto} variant="destructive" size="icon" className="absolute top-0 right-0 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600">
                                                <Trash2 className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    ) : (
                                        <label htmlFor="photo" className="h-32 w-32 rounded-full bg-green-50 dark:bg-green-900/20 flex flex-col items-center justify-center cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/40 border-2 border-dashed border-green-300 dark:border-green-700 transition-colors">
                                            <ImageUp className="h-8 w-8 text-green-400"/>
                                            <span className="text-xs text-green-500 mt-1">Upload Photo</span>
                                        </label>
                                    )}
                                    <Input id="photo" type="file" onChange={handlePhotoChange} className="hidden" accept="image/*" />
                                    <InputError message={errors.photo} />
                                    <StarRatingInput rating={data.rating} setRating={r => setData('rating', r)} />
                                    <InputError message={errors.rating} />
                                </div>
                                {/* Name & Message */}
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <Label htmlFor="name" className="text-lg font-bold text-green-800 dark:text-green-200">Author's Name</Label>
                                        <Input 
                                            id="name" 
                                            value={data.name} 
                                            onChange={e => setData('name', e.target.value)} 
                                            required 
                                            className="mt-2 h-12 text-lg border-green-200 focus:border-green-400 focus:ring-green-400 dark:border-green-700 dark:focus:border-green-500"
                                        />
                                        <InputError message={errors.name} className="mt-2"/>
                                    </div>
                                    <div>
                                        <Label htmlFor="message" className="text-lg font-bold text-green-800 dark:text-green-200">Message</Label>
                                        <Textarea 
                                            id="message" 
                                            value={data.message} 
                                            onChange={e => setData('message', e.target.value)} 
                                            required 
                                            className="mt-2 min-h-[160px] text-lg border-green-200 focus:border-green-400 focus:ring-green-400 dark:border-green-700 dark:focus:border-green-500"
                                        />
                                        <InputError message={errors.message} className="mt-2"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 pt-0 flex justify-end">
                            <Button 
                                type="submit" 
                                className="h-12 px-8 text-lg bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transition-all duration-200" 
                                disabled={processing}
                            >
                                {processing ? 
                                    <>
                                        <LoaderCircle className="w-5 h-5 animate-spin mr-2"/> 
                                        Saving...
                                    </> : 
                                    <>
                                        <Save className="w-5 h-5 mr-2"/> 
                                        Save Changes
                                    </>
                                }
                            </Button>
                        </div>
                    </motion.form>
                </div>
            </motion.div>
        </AppLayout>
    );
}