import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useMemo } from 'react';
import { format as formatDate } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { motion } from 'motion/react';
import testimonialsRoute from '@/routes/testimonials';
import type { Variants } from 'framer-motion';

// --- Route Helpers & UI ---
import { dashboard } from '@/routes';
import { Button } from '@/components/ui/button';
import {
    MessageSquare, ArrowLeft, Edit3, Trash2, Info, UserCircle2, User as UserIcon,
    CalendarDays, ShieldX, Star, Quote
} from 'lucide-react';

// --- Type Definitions ---
interface User { id: number; name: string; }
interface Testimonial {
    id: number | string;
    name: string;
    slug: string;
    message: string;
    rating: number | null;
    photo_url: string | null;
    created_at: string;
    updated_at: string;
    creator: User | null;
}
interface Props extends InertiaSharedProps {
    testimonial: Testimonial;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            ease: "easeOut" as const,
            duration: 0.5
        }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            ease: "easeOut" as const,
            duration: 0.5
        }
    },
    hover: {
        y: -5,
        transition: {
            duration: 0.2
        }
    }
};


// --- Star Display Component ---
const StarRatingDisplay = ({ rating }: { rating: number | null }) => {
    return <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className={`h-6 w-6 ${i < (rating || 0) ? 'text-green-400 fill-green-400' : 'text-slate-300 dark:text-slate-600'}`} />)}</div>;
};

export default function AdminTestimonialShow({ testimonial}: Props) {
    const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Testimonials', href: testimonialsRoute.indexAdmin().url },
        { title: testimonial.name, href: testimonialsRoute.showAdmin(testimonial.slug).url },
    ], [testimonial.name]);

    const handleDelete = () => {
        if (confirm(`Delete testimonial from "${testimonial.name}"?`)) {
            router.delete(testimonialsRoute.destroy(testimonial.slug).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Testimonial: ${testimonial.name}`} />
            <motion.div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 dark:from-slate-900 dark:via-green-900/20 dark:to-emerald-900/20 py-8 lg:py-12" initial="hidden" animate="visible" variants={containerVariants}>
                <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-8 flex flex-col sm:flex-row justify-between items-start gap-4">
                        <h1 className="text-3xl font-bold text-green-800 dark:text-green-100">Testimonial Details</h1>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Button asChild variant="outline" className="flex-grow sm:flex-grow-0 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20">
                                <Link href={testimonialsRoute.indexAdmin().url}>
                                    <ArrowLeft className="h-4 w-4 mr-2" />Back to List
                                </Link>
                            </Button>
                           <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                                <Link href={testimonialsRoute.edit(testimonial.slug).url}>
                                    <Edit3 className="h-4 w-4 mr-2" />Edit
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Main Content Card */}
                    <motion.div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-green-200/50 dark:border-green-700/30 overflow-hidden" variants={cardVariants} whileHover="hover">
                        <div className="p-8 space-y-8">
                            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                                {testimonial.photo_url ? (
                                    <img 
                                        src={testimonial.photo_url} 
                                        alt={testimonial.name} 
                                        className="h-28 w-28 rounded-full object-cover shadow-lg ring-4 ring-green-200 dark:ring-green-700"
                                    />
                                ) : (
                                    <UserCircle2 className="h-28 w-28 text-green-300 dark:text-green-600"/>
                                )}
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold text-green-900 dark:text-green-100">{testimonial.name}</h2>
                                    {testimonial.rating && <div className="mt-2"><StarRatingDisplay rating={testimonial.rating}/></div>}
                                </div>
                            </div>
                            <blockquote className="relative p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-500">
                                <Quote className="absolute top-2 left-2 h-8 w-8 text-green-200 dark:text-green-800" />
                                <p className="relative text-lg italic text-green-800 dark:text-green-200">{testimonial.message}</p>
                            </blockquote>
                        </div>
                    </motion.div>
                    
                    {/* Metadata & Actions */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div className="bg-white/90 dark:bg-slate-800/90 p-6 rounded-2xl shadow-lg border border-green-200/50 dark:border-green-700/30" variants={cardVariants}>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-green-700 dark:text-green-300">
                                <Info className="h-5 w-5"/>Metadata
                            </h3>
                            <ul className="text-sm space-y-2 text-green-800 dark:text-green-200">
                                {testimonial.creator && (
                                    <li className="flex justify-between">
                                        <span>Created By:</span>
                                        <strong className="text-green-900 dark:text-green-100">{testimonial.creator.name}</strong>
                                    </li>
                                )}
                                <li className="flex justify-between">
                                    <span>Created At:</span>
                                    <strong className="text-green-900 dark:text-green-100">
                                        {formatDate(new Date(testimonial.created_at), "dd MMM yyyy, HH:mm", { locale: idLocale })}
                                    </strong>
                                </li>
                                <li className="flex justify-between">
                                    <span>Last Updated:</span>
                                    <strong className="text-green-900 dark:text-green-100">
                                        {formatDate(new Date(testimonial.updated_at), "dd MMM yyyy, HH:mm", { locale: idLocale })}
                                    </strong>
                                </li>
                            </ul>
                        </motion.div>
                        <motion.div className="bg-red-50/90 dark:bg-red-900/20 p-6 rounded-2xl shadow-lg border border-red-200/50 dark:border-red-700/30" variants={cardVariants}>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-red-700 dark:text-red-400">
                                <ShieldX className="h-5 w-5"/>Danger Zone
                            </h3>
                            <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-3">This action is a soft delete.</p>
                            <Button onClick={handleDelete} variant="destructive" className="w-full">
                                <Trash2 className="h-4 w-4 mr-2" />Delete Testimonial
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </AppLayout>
    );
}