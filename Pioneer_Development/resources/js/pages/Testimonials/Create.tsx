import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useState, ChangeEvent, useMemo } from 'react';
import { motion } from 'framer-motion';

// --- Route Helpers & UI ---
import { dashboard } from '@/routes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle, MessageSquare, ArrowLeft, Sparkles, Save, Star, ImageUp, Trash2 } from 'lucide-react';
import testimonialsRoute from '@/routes/testimonials';

// --- Type Definitions ---
interface CreateTestimonialForm {
    name: string;
    message: string;
    rating: number;
    photo: File | null;
}

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring' } } };

// --- Star Rating Input Component ---
const StarRatingInput = ({ rating, setRating }: { rating: number, setRating: (r: number) => void }) => {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <motion.button
                        type="button"
                        key={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <Star className={`h-8 w-8 transition-all duration-200 ${ratingValue <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} />
                    </motion.button>
                );
            })}
        </div>
    );
};

export default function AdminTestimonialCreate() {
    const { data, setData, post, processing, errors, reset } = useForm<CreateTestimonialForm>({
        name: '',
        message: '',
        rating: 5,
        photo: null,
    });
    
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('photo', file);
            const previewUrl = URL.createObjectURL(file);
            setPhotoPreview(previewUrl);
        }
    };

    const removePhoto = () => {
        setData('photo', null);
        if (photoPreview) {
            URL.revokeObjectURL(photoPreview);
            setPhotoPreview(null);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(testimonialsRoute.store().url, {
            onSuccess: () => reset(),
        });
    };
    
    const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Testimonial Management', href: testimonialsRoute.index().url },
        { title: 'Add New Testimonial', href: '#' },
    ], []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Add Testimonial" />
            <motion.div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-purple-950/50" initial="hidden" animate="visible" variants={containerVariants}>
                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 lg:py-12">
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-2xl"><MessageSquare className="h-8 w-8" /></div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Add New Testimonial</h1>
                                <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">Create a new user testimonial to display.</p>
                            </div>
                        </div>
                        <Link href={testimonialsRoute.index().url} className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 hover:bg-white dark:bg-slate-800/70 dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all hover:shadow-lg backdrop-blur-sm"><ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Testimonials</Link>
                    </motion.div>

                    {/* Form Card */}
                    <motion.form variants={itemVariants} onSubmit={handleSubmit} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border-white/20 dark:border-slate-700/30 overflow-hidden">
                        <div className="p-8 lg:p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                                {/* Photo & Rating */}
                                <div className="space-y-6 flex flex-col items-center text-center">
                                    <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Author Photo & Rating</Label>
                                    {photoPreview ? (
                                        <div className="relative group"><img src={photoPreview} className="h-32 w-32 rounded-full object-cover shadow-lg" /><Button type="button" onClick={removePhoto} variant="destructive" size="icon" className="absolute top-0 right-0 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-4 w-4"/></Button></div>
                                    ) : (
                                        <label htmlFor="photo" className="h-32 w-32 rounded-full bg-slate-100 dark:bg-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors border-2 border-dashed"><ImageUp className="h-8 w-8 text-slate-400"/><span className="text-xs text-slate-500 mt-1">Upload Photo</span></label>
                                    )}
                                    <Input id="photo" type="file" onChange={handlePhotoChange} className="hidden" accept="image/*" />
                                    <InputError message={errors.photo} />
                                    <StarRatingInput rating={data.rating} setRating={r => setData('rating', r)} />
                                    <InputError message={errors.rating} />
                                </div>
                                {/* Name & Message */}
                                <div className="md:col-span-2 space-y-6">
                                    <div><Label htmlFor="name" className="text-lg font-bold">Author's Name</Label><Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required className="mt-2 h-12 text-lg"/><InputError message={errors.name} className="mt-2"/></div>
                                    <div><Label htmlFor="message" className="text-lg font-bold">Message</Label><Textarea id="message" value={data.message} onChange={e => setData('message', e.target.value)} required className="mt-2 min-h-[160px] text-lg"/><InputError message={errors.message} className="mt-2"/></div>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 pt-0 flex justify-end">
                            <Button type="submit" className="h-12 px-8 text-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" disabled={processing}>{processing ? <><LoaderCircle className="w-5 h-5 animate-spin mr-2"/> Creating...</> : <><Save className="w-5 h-5 mr-2"/> Create Testimonial</>}</Button>
                        </div>
                    </motion.form>
                </div>
            </motion.div>
        </AppLayout>
    );
}

