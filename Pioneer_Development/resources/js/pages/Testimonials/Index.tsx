    import AppLayout from '@/layouts/app-layout';
    import { BreadcrumbItem, InertiaSharedProps, PaginatedData } from '@/types';
    import { Head, Link, router } from '@inertiajs/react';
    import React, { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react';
    import { motion } from 'framer-motion';

    // --- Route Helpers ---
    import { dashboard } from '@/routes';
    import testimonialsRoute from '@/routes/testimonials';

    // --- UI Components ---
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import Pagination from '@/components/pagination';

    // --- Utils & Icons ---
    import { format as formatDateFns } from 'date-fns';
    import { id as idLocale } from 'date-fns/locale';
    import {
        MessageSquare, RefreshCw, PlusCircle, Eye, Edit3, Trash2, FilterX,
        Search, Star, UserCircle2, TrendingUp, TrendingDown
    } from 'lucide-react';

    // --- Type Definitions ---
    interface User {
        id: number;
        name: string;
    }

    interface Testimonial {
        id: number | string;
        slug: string;
        name: string;
        message: string;
        rating: number | null;
        photo_url: string | null;
        createdAt: string; // ISO Date string
        creator: User | null;
    }

    interface Props extends InertiaSharedProps {
        testimonials: PaginatedData<Testimonial>;
        filters: {
            search?: string;
            rating?: string;
            sort?: string;
            direction?: 'asc' | 'desc';
        };
        can: {
            create_testimonial: boolean;
        };
    }

    // --- Animation Variants ---
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Testimonial Management', href: testimonialsRoute.index().url },
    ];

    const ALL_RATINGS_VALUE = "__ALL_RATINGS__";

    // --- Star Display Component ---
    const StarRatingDisplay = ({ rating }: { rating: number | null }) => {
        const totalStars = 5;
        const filledStars = rating || 0;
        return (
            <div className="flex items-center">
                {[...Array(totalStars)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${i < filledStars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
                    />
                ))}
            </div>
        );
    };

    export default function AdminTestimonialIndex({ testimonials: testimonialsData, filters, can }: Props) {
        const [searchTerm, setSearchTerm] = useState(filters.search || '');
        const [selectedRating, setSelectedRating] = useState(filters.rating || '');
        const [isRefreshing, setIsRefreshing] = useState(false);

        const handleFilterChange = useCallback(() => {
            router.get(testimonialsRoute.index().url, {
                search: searchTerm,
                rating: selectedRating,
                sort: filters.sort,
                direction: filters.direction,
            }, { preserveState: true, replace: true, preserveScroll: true });
        }, [searchTerm, selectedRating, filters.sort, filters.direction]);

        useEffect(() => {
            const delayDebounceFn = setTimeout(() => {
                if (searchTerm !== (filters.search || '')) handleFilterChange();
            }, 500);
            return () => clearTimeout(delayDebounceFn);
        }, [searchTerm, filters.search, handleFilterChange]);
        
        useEffect(() => {
            if (selectedRating !== (filters.rating || '')) handleFilterChange();
        }, [selectedRating, filters.rating, handleFilterChange]);

        const clearFilters = useCallback(() => {
            setSearchTerm('');
            setSelectedRating('');
            router.get(testimonialsRoute.index().url, {}, { preserveState: true, replace: true, preserveScroll: true });
        }, []);

        const handleSort = useCallback((column: string) => {
            const newDirection = filters.sort === column && filters.direction === 'asc' ? 'desc' : 'asc';
            router.get(testimonialsRoute.index().url, { ...filters, search: searchTerm, rating: selectedRating, sort: column, direction: newDirection }, { preserveState: true, replace: true });
        }, [searchTerm, selectedRating, filters]);

        const handleDelete = useCallback((testimonial: Testimonial) => {
            if (confirm(`Are you sure you want to delete the testimonial from "${testimonial.name}"?`)) {
                router.delete(testimonialsRoute.destroy(testimonial.slug).url, { preserveScroll: true });
            }
        }, []);

        const handleRefresh = useCallback(() => {
            setIsRefreshing(true);
            router.reload({ onFinish: () => setIsRefreshing(false) });
        }, []);

        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Admin: Testimonial Management" />
                <motion.div className="min-h-screen py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" initial="hidden" animate="visible" variants={containerVariants}>
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Header */}
                        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"><MessageSquare className="h-7 w-7" /></div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Testimonial Management</h1>
                                    <p className="text-slate-600 dark:text-slate-400 mt-1">Manage feedback and testimonials from users.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button onClick={handleRefresh} variant="outline" size="sm" disabled={isRefreshing} className="bg-white/70 dark:bg-slate-800/70"><RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh</Button>
                                {can.create_testimonial && <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg"><Link href={testimonialsRoute.create().url}><PlusCircle className="h-4 w-4 mr-2" /> Add Testimonial</Link></Button>}
                            </div>
                        </motion.div>

                        {/* Filters */}
                        <motion.div variants={itemVariants} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-white/20 dark:border-slate-700/50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div><Label htmlFor="search">Search</Label><div className="relative mt-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input id="search" type="text" placeholder="Search by name or message..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-white/50 dark:bg-slate-900/50"/></div></div>
                                <div><Label htmlFor="rating">Rating</Label><Select value={selectedRating || ALL_RATINGS_VALUE} onValueChange={v => setSelectedRating(v === ALL_RATINGS_VALUE ? "" : v)}><SelectTrigger id="rating" className="mt-1 bg-white/50 dark:bg-slate-900/50"><SelectValue placeholder="All Ratings" /></SelectTrigger><SelectContent><SelectItem value={ALL_RATINGS_VALUE}>All Ratings</SelectItem><SelectItem value="5">5 Stars</SelectItem><SelectItem value="4">4 Stars</SelectItem><SelectItem value="3">3 Stars</SelectItem><SelectItem value="2">2 Stars</SelectItem><SelectItem value="1">1 Star</SelectItem></SelectContent></Select></div>
                                <div className="flex items-end"><Button onClick={clearFilters} variant="outline" className="w-full bg-white/50 dark:bg-slate-900/50"><FilterX className="h-4 w-4 mr-2" /> Clear Filters</Button></div>
                            </div>
                        </motion.div>
                        
                        {/* Data Table */}
                        <motion.div variants={itemVariants} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border-white/20 dark:border-slate-700/50 overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        {[{key: 'name', label: 'Author'}, {key: 'rating', label: 'Rating'}, {key: 'message', label: 'Message'}, {key: 'createdAt', label: 'Date'}].map(col => (
                                            <th key={col.key} className="p-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50" onClick={() => handleSort(col.key)}>
                                                <div className="flex items-center gap-1.5">{col.label} {filters.sort === col.key && (filters.direction === 'asc' ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />)}</div>
                                            </th>
                                        ))}
                                        <th className="p-4 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {testimonialsData.data.map((testimonial) => (
                                        <tr key={testimonial.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                                            <td className="p-4"><div className="flex items-center gap-3">{testimonial.photo_url ? <img src={testimonial.photo_url} alt={testimonial.name} className="h-10 w-10 rounded-full object-cover"/> : <UserCircle2 className="h-10 w-10 text-slate-300"/>}<span className="font-medium text-slate-900 dark:text-slate-100">{testimonial.name}</span></div></td>
                                            <td className="p-4"><StarRatingDisplay rating={testimonial.rating} /></td>
                                            <td className="p-4 text-sm text-slate-600 dark:text-slate-300 max-w-sm truncate">{testimonial.message}</td>
                                            <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{formatDateFns(new Date(testimonial.createdAt), "dd MMM yyyy", { locale: idLocale })}</td>
                                            <td className="p-4 text-right"><div className="flex items-center justify-end gap-2"><Button asChild variant="outline" size="icon" className="h-8 w-8"><Link href={testimonialsRoute.show(testimonial.slug).url}><Eye className="h-4 w-4"/></Link></Button><Button asChild variant="outline" size="icon" className="h-8 w-8"><Link href={testimonialsRoute.edit(testimonial.slug).url}><Edit3 className="h-4 w-4"/></Link></Button><Button onClick={() => handleDelete(testimonial)} variant="destructive" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4"/></Button></div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {testimonialsData.data.length === 0 && <div className="text-center py-12"><MessageSquare className="h-16 w-16 text-slate-400 mx-auto mb-4" /><h3 className="text-lg font-medium">No Testimonials Found</h3><p className="text-slate-500 mt-1">Try adjusting your filters or add a new testimonial.</p></div>}
                        </motion.div>
                        {testimonialsData.data.length > 0 && <motion.div variants={itemVariants} className="flex justify-center pt-6"><Pagination links={testimonialsData.links} /></motion.div>}
                    </div>
                </motion.div>
            </AppLayout>
        );
    }