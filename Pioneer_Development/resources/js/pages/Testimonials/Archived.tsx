import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BreadcrumbItem, InertiaSharedProps, PaginatedResponse } from '@/types';
import testimonialsRoute from '@/routes/testimonials';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Pagination from '@/components/pagination';
import { MessageSquare, RefreshCw, Search, FilterX, RotateCcw, Trash2, UserCircle2, Star } from 'lucide-react';
import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/' },
  { title: 'Testimonial Management', href: testimonialsRoute.indexAdmin().url },
  { title: 'Archived Testimonials', href: testimonialsRoute.archived().url },
];

const StarRatingDisplay = ({ rating }: { rating: number | null }) => {
  const totalStars = 5;
  const filledStars = rating || 0;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < filledStars ? 'text-green-400 fill-green-400' : 'text-slate-300 dark:text-slate-600'}`}
        />
      ))}
    </div>
  );
};

interface User { id: number; name: string; }
interface Testimonial {
  id: number;
  slug: string;
  name: string;
  message: string;
  rating: number | null;
  photo_url: string | null;
  createdAt: string;
  creator: User | null;
}

interface Props extends InertiaSharedProps {
  testimonials: PaginatedResponse<Testimonial>;
  filters: { search?: string };
}

export default function ArchivedTestimonialsPage({ testimonials, filters }: Props) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSearch = useCallback(() => {
    router.get(testimonialsRoute.archived().url, { search: searchTerm }, { preserveState: true, replace: true });
  }, [searchTerm]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm !== (filters.search || '')) handleSearch();
    }, 500);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleRestore = (slug: string) => {
    if (confirm('Restore this testimonial?')) {
      router.put(testimonialsRoute.restore(slug).url);
    }
  };

  const handleDeletePermanent = (slug: string) => {
    if (confirm('Permanently delete this testimonial?')) {
      router.delete(testimonialsRoute.deletePermanent(slug).url);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    router.get(testimonialsRoute.archived().url, {}, { replace: true });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Archived Testimonials" />
      <motion.div className="min-h-screen py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div variants={itemVariants} className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Archived Testimonials</h1>
              <p className="text-green-700 dark:text-green-300">Manage deleted testimonials. You can restore or permanently remove them.</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => { setIsRefreshing(true); router.reload({ onFinish: () => setIsRefreshing(false) }); }}
              className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-600 dark:text-green-300 dark:hover:bg-green-900/20"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh
            </Button>
          </div>

          <div className="bg-white/90 dark:bg-green-800/20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-200 dark:border-green-700">
            <Label htmlFor="search" className="text-green-700 dark:text-green-300">Search</Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
              <Input 
                id="search" 
                type="text" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400 dark:border-green-600 dark:focus:border-green-500" 
                placeholder="Search by name or message..." 
              />
            </div>
            <Button 
              onClick={clearSearch} 
              variant="outline" 
              className="mt-3 border-green-300 text-green-700 hover:bg-green-50 dark:border-green-600 dark:text-green-300 dark:hover:bg-green-900/20"
            >
              <FilterX className="mr-2 h-4 w-4" /> Clear
            </Button>
          </div>

          <div className="bg-white/90 dark:bg-green-800/20 backdrop-blur-sm rounded-xl shadow-lg border border-green-200 dark:border-green-700 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-50 dark:bg-green-900/30">
                <tr className="text-xs font-semibold uppercase text-green-700 dark:text-green-300">
                  <th className="p-4 text-left">Author</th>
                  <th className="p-4 text-left">Rating</th>
                  <th className="p-4 text-left">Message</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.data.map(t => (
                  <tr key={t.id} className="hover:bg-green-50 dark:hover:bg-green-900/20 border-b border-green-100 dark:border-green-800">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {t.photo_url ? (
                          <img src={t.photo_url} className="h-10 w-10 rounded-full object-cover border-2 border-green-200 dark:border-green-600" />
                        ) : (
                          <UserCircle2 className="h-10 w-10 text-green-400" />
                        )}
                        <span className="font-medium text-green-900 dark:text-green-100">{t.name}</span>
                      </div>
                    </td>
                    <td className="p-4"><StarRatingDisplay rating={t.rating} /></td>
                    <td className="p-4 text-green-700 dark:text-green-300 truncate max-w-xs">{t.message}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          onClick={() => handleRestore(t.slug)} 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 border-green-300 text-green-700 hover:bg-green-50 dark:border-green-600 dark:text-green-300 dark:hover:bg-green-900/20"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button 
                          onClick={() => handleDeletePermanent(t.slug)} 
                          variant="destructive" 
                          size="icon" 
                          className="h-8 w-8 bg-red-500 hover:bg-red-600 text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {testimonials.data.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-green-800 dark:text-green-200">No Archived Testimonials</h3>
                <p className="text-green-600 dark:text-green-400">Try a different keyword or wait for a deleted testimonial.</p>
              </div>
            )}
          </div>

          {testimonials.data.length > 0 && (
            <motion.div variants={itemVariants} className="flex justify-center pt-6">
              <Pagination links={testimonials.links} />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}