import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useState, ChangeEvent, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import $ from 'jquery';
import type { Variants } from 'framer-motion';

// --- Summernote Imports ---
import 'summernote/dist/summernote-lite.js';
import 'summernote/dist/summernote-lite.css';
// Import your custom styles for Summernote

// --- Route Helpers & UI ---
import { dashboard } from '@/routes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle, MessageSquare, ArrowLeft, Save, Star, ImageUp, Trash2, FileText, Leaf } from 'lucide-react';
import testimonialsRoute from '@/routes/testimonials';

// Declare global $ for TypeScript
declare global {
    interface Window {
        $: any;
    }
}

// Make sure jQuery is available globally
if (typeof window !== 'undefined') {
    window.$ = $;
}

// --- Type Definitions ---
interface CreateTestimonialForm {
    name: string;
    message: string;
    rating: number;
    photo: File | null;
}

const containerVariants: Variants = { 
    hidden: { opacity: 0 }, 
    visible: { 
        opacity: 1, 
        transition: { 
            staggerChildren: 0.1,
            duration: 0.6
        } 
    } 
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring' as const, // tambahkan 'as const' agar dikenali sebagai literal
            stiffness: 100,
            damping: 15
        }
    }
};

// --- Star Rating Display Component (Always 5 stars) ---
const StarRatingDisplay = () => {
    return (
        <div>
            <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 200,
                        damping: 15
                    }}
                    className="p-1"
                >
                    <Star className="h-8 w-8 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                </motion.div>
            ))}
        </div>
            <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">
                Perfect Rating
            </span>
        </div>
    );
};

export default function AdminTestimonialCreate() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateTestimonialForm>>({
        name: '',
        message: '',
        rating: 5, // Always 5
        photo: null,
    });
    
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const summernoteRef = useRef<HTMLTextAreaElement>(null);
    const [isSummernoteReady, setIsSummernoteReady] = useState(false);
    const summernoteInitialized = useRef(false);

    const handleSummernoteChange = useCallback((contents: string) => {
        if (contents !== data.message) {
            setData('message', contents);
        }
    }, [data.message, setData]);

    useEffect(() => {
        if (summernoteRef.current && window.$ && typeof window.$.fn.summernote === 'function' && !summernoteInitialized.current) {
            if (window.$(summernoteRef.current).data('summernote')) {
                window.$(summernoteRef.current).summernote('destroy');
            }

            window.$(summernoteRef.current).summernote({
                tooltip: false,
                height: 200,
                placeholder: 'Enter the testimonial message here...',
                toolbar: [
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['view', ['codeview']],
                ],
                callbacks: {
                    onChange: handleSummernoteChange,
                    onInit: function() {
                        if (data.message) {
                            window.$(summernoteRef.current).summernote('code', data.message);
                        }
                        setIsSummernoteReady(true);
                        summernoteInitialized.current = true;
                    },
                },
            });
        }

        return () => {
            if (summernoteRef.current && window.$ && summernoteInitialized.current) {
                try {
                    if (window.$(summernoteRef.current).data('summernote')) {
                        window.$(summernoteRef.current).summernote('destroy');
                    }
                } catch (error) {
                    console.warn('Error destroying Summernote:', error);
                }
                summernoteInitialized.current = false;
                setIsSummernoteReady(false);
            }
        };
    }, []);

    useEffect(() => {
        if (isSummernoteReady && summernoteRef.current && window.$) {
            const currentContent = window.$(summernoteRef.current).summernote('code');
            if (currentContent !== data.message && data.message !== undefined) {
                window.$(summernoteRef.current).summernote('code', data.message);
            }
        }
    }, [data.message, isSummernoteReady]);

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
            onSuccess: () => {
                reset();
                if (summernoteRef.current && window.$) {
                    window.$(summernoteRef.current).summernote('reset');
                }
            },
        });
    };
    
    const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Testimonial Management', href: testimonialsRoute.indexAdmin().url },
        { title: 'Add New Testimonial', href: testimonialsRoute.create().url },
    ], []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Add Testimonial" />
            <motion.div 
                className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 dark:from-green-950 dark:via-emerald-950/50 dark:to-teal-950/30" 
                initial="hidden" 
                animate="visible" 
                variants={containerVariants}
            >
                {/* Floating Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute -top-20 -left-20 w-80 h-80 bg-green-200/20 dark:bg-green-800/20 rounded-full blur-3xl"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-800/20 rounded-full blur-3xl"
                        animate={{
                            x: [0, -30, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 lg:py-12">
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-10">
                        <div className="flex items-center gap-4 mb-8">
                            <motion.div 
                                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-2xl ring-4 ring-green-200/50 dark:ring-green-800/50"
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <MessageSquare className="h-8 w-8" />
                            </motion.div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    Add New Testimonial
                                </h1>
                                <p className="text-green-700 dark:text-green-300 mt-2 text-lg font-medium">
                                    Create a new user testimonial to showcase excellence
                                </p>
                            </div>
                        </div>
                        <Link 
                            href={testimonialsRoute.indexAdmin().url} 
                            className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-green-700 dark:text-green-200 bg-white/80 hover:bg-white dark:bg-green-800/80 dark:hover:bg-green-800 rounded-xl border border-green-200/50 dark:border-green-700/50 transition-all hover:shadow-lg backdrop-blur-sm ring-1 ring-green-100/50 dark:ring-green-900/50"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
                            Back to Testimonials
                        </Link>
                    </motion.div>

                    {/* Form Card */}
                    <motion.form 
                        variants={itemVariants} 
                        onSubmit={handleSubmit} 
                        className="bg-white/90 dark:bg-green-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-200/30 dark:border-green-700/30 overflow-hidden ring-1 ring-green-100/50 dark:ring-green-800/50"
                    >
                        <div className="p-8 lg:p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                                {/* Photo & Rating */}
                                <motion.div 
                                    className="space-y-6 flex flex-col items-center text-center"
                                    variants={itemVariants}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        <Label className="text-lg font-bold text-green-700 dark:text-green-300">
                                            Author Photo & Rating
                                        </Label>
                                    </div>
                                    
                                    {photoPreview ? (
                                        <motion.div 
                                            className="relative group"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 200 }}
                                        >
                                            <img 
                                                src={photoPreview} 
                                                alt="Preview" 
                                                className="h-32 w-32 rounded-full object-cover shadow-xl ring-4 ring-green-200/50 dark:ring-green-800/50" 
                                            />
                                            <Button 
                                                type="button" 
                                                onClick={removePhoto} 
                                                variant="destructive" 
                                                size="icon" 
                                                className="absolute -top-2 -right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                            >
                                                <Trash2 className="h-4 w-4"/>
                                            </Button>
                                        </motion.div>
                                    ) : (
                                        <motion.label 
                                            htmlFor="photo" 
                                            className="h-32 w-32 rounded-full bg-green-100 dark:bg-green-800 flex flex-col items-center justify-center cursor-pointer hover:bg-green-200 dark:hover:bg-green-700 transition-all duration-300 border-2 border-dashed border-green-300 dark:border-green-600 hover:border-green-400 dark:hover:border-green-500 shadow-lg"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <ImageUp className="h-8 w-8 text-green-500 dark:text-green-400"/>
                                            <span className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                                                Upload Photo
                                            </span>
                                        </motion.label>
                                    )}
                                    
                                    <Input 
                                        id="photo" 
                                        type="file" 
                                        onChange={handlePhotoChange} 
                                        className="hidden" 
                                        accept="image/*" 
                                    />
                                    <InputError message={errors.photo} />
                                    
                                    <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-xl border border-green-200/50 dark:border-green-700/50">
                                        <StarRatingDisplay />
                                    </div>
                                </motion.div>

                                {/* Name & Message */}
                                <motion.div 
                                    className="md:col-span-2 space-y-6"
                                    variants={itemVariants}
                                >
                                    <div>
                                        <Label 
                                            htmlFor="name" 
                                            className="text-lg font-bold flex items-center gap-2 mb-3 text-green-700 dark:text-green-300"
                                        >
                                            <Leaf className="h-5 w-5" />
                                            Author's Name
                                        </Label>
                                        <Input 
                                            id="name" 
                                            value={data.name} 
                                            onChange={e => setData('name', e.target.value)} 
                                            required 
                                            className="h-12 text-lg border-green-200 dark:border-green-700 focus:border-green-400 focus:ring-green-400 dark:focus:border-green-500 dark:focus:ring-green-500 bg-white/80 dark:bg-green-900/50"
                                            placeholder="Enter the author's full name"
                                        />
                                        <InputError message={errors.name} className="mt-2"/>
                                    </div>
                                    
                                    <div>
                                        <Label 
                                            htmlFor="message" 
                                            className="text-lg font-bold flex items-center gap-2 mb-3 text-green-700 dark:text-green-300"
                                        >
                                            <FileText className="h-5 w-5" /> 
                                            Testimonial Message
                                        </Label>
                                        <div className="mt-2">
                                            <textarea
                                                ref={summernoteRef}
                                                id="message"
                                                value={data.message}
                                                onChange={(e) => setData('message', e.target.value)}
                                                className="hidden"
                                                required
                                            />
                                            {/* Fallback textarea if Summernote fails to load */}
                                            {!isSummernoteReady && (
                                                <Textarea
                                                    value={data.message}
                                                    onChange={(e) => setData('message', e.target.value)}
                                                    required
                                                    className="min-h-[200px] text-lg border-green-200 dark:border-green-700 focus:border-green-400 focus:ring-green-400 dark:focus:border-green-500 dark:focus:ring-green-500 bg-white/80 dark:bg-green-900/50"
                                                    placeholder="Enter the testimonial message here..."
                                                />
                                            )}
                                        </div>
                                        <InputError message={errors.message} className="mt-2"/>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        
                        <div className="px-8 pb-8 pt-0 flex justify-end bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/30 dark:to-emerald-900/30">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button 
                                    type="submit" 
                                    className="h-12 px-8 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-xl font-semibold ring-2 ring-green-300/50 dark:ring-green-700/50 hover:ring-green-400/50 dark:hover:ring-green-600/50" 
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <LoaderCircle className="w-5 h-5 animate-spin mr-2"/> 
                                            Creating Testimonial...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5 mr-2"/> 
                                            Create Testimonial
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </div>
                    </motion.form>
                </div>
            </motion.div>
        </AppLayout>
    );
}