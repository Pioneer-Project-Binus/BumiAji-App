import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaSharedProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useMemo } from 'react';
import { format as formatDate } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { motion } from 'motion/react';

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
    createdAt: string;
    updatedAt: string;
    creator: User | null;
}
interface Props extends InertiaSharedProps {
    testimonial: Testimonial;
    can: { edit_testimonial: boolean; delete_testimonial: boolean; };
}

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } } };
const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.5 } },
    hover: { y: -5, transition: { duration: 0.2 } }
};

// --- Star Display Component ---
const StarRatingDisplay = ({ rating }: { rating: number | null }) => {
    return <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className={`h-6 w-6 ${i < (rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} />)}</div>;
};

export default function AdminTestimonialShow({ testimonial, can }: Props) {
    const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Testimonials', href: `/admin/testimonials` },
        { title: testimonial.name, href: '#' },
    ], [testimonial.name]);

    const handleDelete = () => {
        if (confirm(`Delete testimonial from "${testimonial.name}"?`)) {
            router.delete(`/admin/testimonials/${testimonial.slug}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Testimonial: ${testimonial.name}`} />
            <motion.div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 dark:from-slate-900 py-8 lg:py-12" initial="hidden" animate="visible" variants={containerVariants}>
                <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-8 flex flex-col sm:flex-row justify-between items-start gap-4">
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Testimonial Details</h1>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Button asChild variant="outline" className="flex-grow sm:flex-grow-0"><Link href="/admin/testimonials"><ArrowLeft className="h-4 w-4 mr-2" />Back to List</Link></Button>
                            {can.edit_testimonial && <Button asChild><Link href={`/admin/testimonials/${testimonial.slug}/edit`}><Edit3 className="h-4 w-4 mr-2" />Edit</Link></Button>}
                        </div>
                    </motion.div>

                    {/* Main Content Card */}
                    <motion.div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border-white/20 dark:border-slate-700/30 overflow-hidden" variants={cardVariants} whileHover="hover">
                        <div className="p-8 space-y-8">
                            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                                {testimonial.photo_url ? <img src={testimonial.photo_url} alt={testimonial.name} className="h-28 w-28 rounded-full object-cover shadow-lg"/> : <UserCircle2 className="h-28 w-28 text-slate-300"/>}
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{testimonial.name}</h2>
                                    {testimonial.rating && <div className="mt-2"><StarRatingDisplay rating={testimonial.rating}/></div>}
                                </div>
                            </div>
                            <blockquote className="relative p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl border-l-4 border-purple-400">
                                <Quote className="absolute top-2 left-2 h-8 w-8 text-purple-200 dark:text-purple-900" />
                                <p className="relative text-lg italic text-slate-700 dark:text-slate-300">{testimonial.message}</p>
                            </blockquote>
                        </div>
                    </motion.div>
                    
                    {/* Metadata & Actions */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div className="bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl shadow-lg" variants={cardVariants}>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3"><Info className="h-5 w-5"/>Metadata</h3>
                            <ul className="text-sm space-y-2">
                                {testimonial.creator && <li className="flex justify-between"><span>Created By:</span><strong>{testimonial.creator.name}</strong></li>}
                                <li className="flex justify-between"><span>Created At:</span><strong>{formatDate(new Date(testimonial.createdAt), "dd MMM yyyy, HH:mm", { locale: idLocale })}</strong></li>
                                <li className="flex justify-between"><span>Last Updated:</span><strong>{formatDate(new Date(testimonial.updatedAt), "dd MMM yyyy, HH:mm", { locale: idLocale })}</strong></li>
                            </ul>
                        </motion.div>
                        {can.delete_testimonial && (
                            <motion.div className="bg-red-50/80 dark:bg-red-900/20 p-6 rounded-2xl shadow-lg" variants={cardVariants}>
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-red-700 dark:text-red-400"><ShieldX className="h-5 w-5"/>Danger Zone</h3>
                                <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-3">This action is a soft delete.</p>
                                <Button onClick={handleDelete} variant="destructive" className="w-full">
                                    <Trash2 className="h-4 w-4 mr-2" />Delete Testimonial
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AppLayout>
    );
}

