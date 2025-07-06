import React, { FormEventHandler, useEffect, useMemo, useRef } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

// Layout, Types, and Route Imports
import AppLayout from '@/layouts/app-layout';
import {
    type BreadcrumbItem,
    type InertiaSharedProps,
    type Article,
    type CategoryArticle as Category,
    type Author,
} from '@/types';
import articlesRoute from '@/routes/articles';
import { dashboard } from '@/routes';
import InputError from '@/components/input-error';

// Extend the Window interface for jQuery and Summernote
declare global {
    interface Window {
        jQuery: any;
        $: any;
    }
}

// Component Props
interface Props extends InertiaSharedProps {
    article: Article;
    categories: Category[];
    authors: Author[];
}

// Form Data Structure
interface EditArticleForm {
    title: string;
    content: string;
    featured_image: File | null;
    status: Article['status'];
    category_id: number | string;
    author_id: number | string;
    _method: 'PUT'; // Method spoofing for file uploads
}

export default function ArticleEdit({ article, categories, authors, errors: pageErrors }: Props) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Articles', href: articlesRoute.indexAdmin().url },
        { title: `Edit: ${article.title}`, href: '#' },
    ], [article.title]);

    const { data, setData, post, processing, progress, errors } = useForm<Required<EditArticleForm>>({
        title: article.title || '',
        content: article.content || '',
        featuredImage: null,
        status: article.status,
        category_id: article.category?.id || '',
        author_id: article.author?.id || '',
        _method: 'PUT',
    });

    const summernoteRef = useRef<HTMLTextAreaElement>(null);

    // Effect for initializing and cleaning up Summernote
    useEffect(() => {
        const loadScript = (src: string, onLoad: () => void) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = onLoad;
            document.head.appendChild(script);
            return script;
        };

        const loadStyle = (href: string) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
            return link;
        };

        const initializeSummernote = () => {
            if (summernoteRef.current && window.$) {
                window.$(summernoteRef.current).summernote({
                    height: 300,
                    placeholder: 'Tulis konten artikel yang menarik...',
                    callbacks: {
                        onChange: (contents: string) => setData('content', contents),
                    },
                });
                // Set initial content from props after initialization
                window.$(summernoteRef.current).summernote('code', data.content);
            }
        };

        if (!window.jQuery) {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', () => {
                loadScript('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.js', initializeSummernote);
            });
        } else {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.js', initializeSummernote);
        }

        const summernoteCSS = loadStyle('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.css');

        return () => {
            if (window.$ && summernoteRef.current && window.$(summernoteRef.current).summernote) {
                window.$(summernoteRef.current).summernote('destroy');
            }
            if (document.head.contains(summernoteCSS)) {
                document.head.removeChild(summernoteCSS);
            }
        };
    }, []);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Use `post` for multipart/form-data, but spoof the method to PUT
        post(articlesRoute.update(article.slug).url, {
            onSuccess: () => toast.success('Artikel berhasil diperbarui!'),
            onError: () => toast.error('Gagal memperbarui artikel. Periksa kembali form Anda.'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${article.title}`} />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900">
                <div className="relative z-10 flex justify-center items-center min-h-screen py-12 px-4">
                    <div className="w-full max-w-4xl">
                        {/* Header */}
                        <div className="text-center mb-12">
                             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                                Edit Artikel
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                                Perbarui detail untuk artikel <strong className="font-semibold text-gray-700 dark:text-gray-300">"{article.title}"</strong>.
                            </p>
                        </div>

                        {/* Form Card */}
                        <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-green-100 dark:border-slate-700 space-y-8">
                            
                            {/* Title Field */}
                            <div className="space-y-3">
                                <label htmlFor="title" className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Judul Artikel</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full px-6 py-4 border-2 border-green-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all text-lg"
                                    placeholder="Masukkan judul yang menarik..."
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            {/* Content Field with Summernote */}
                            <div className="space-y-3">
                                <label htmlFor="content" className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Konten Artikel</label>
                                <textarea
                                    ref={summernoteRef}
                                    id="content"
                                    defaultValue={data.content}
                                    className="hidden"
                                />
                                <InputError message={errors.content} className="mt-2" />
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-3">
                                <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Gambar Utama</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                    <div className="aspect-video bg-gray-100 dark:bg-slate-700 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-slate-600">
                                        {data.featuredImage ? (
                                            <img src={URL.createObjectURL(`/storage/${data.featuredImage}`)} alt="Preview Gambar Baru" className="w-full h-full object-cover" />
                                        ) : article.featuredImage ? (
                                            <img src={article.featuredImage} alt="Gambar Saat Ini" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">Tidak ada gambar</div>
                                        )}
                                    </div>
                                    <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-6 text-center hover:border-green-400 transition-all">
                                        <input type="file" id="featuredImage" onChange={(e) => setData('featured_image', e.target.files ? e.target.files[0] : null)} className="hidden" accept="image/*" />
                                        <label htmlFor="featured_image" className="cursor-pointer">
                                            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-2">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            </div>
                                            <p className="text-green-700 font-semibold">Ubah Gambar</p>
                                            <p className="text-sm text-gray-500">Klik atau seret gambar baru</p>
                                        </label>
                                    </div>
                                </div>
                                {progress && <div className="mt-2"><div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div></div></div>}
                                <InputError message={errors.featured_image} className="mt-2" />
                            </div>

                            {/* Meta Fields Grid */}
                            <div className="grid md:grid-cols-3 gap-8">
                                {/* Category */}
                                <div className="space-y-3">
                                    <label htmlFor="category_id" className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Kategori</label>
                                    <select id="category_id" value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} className="w-full px-6 py-4 border-2 border-green-200 rounded-xl text-lg">
                                        <option value="">Pilih Kategori</option>
                                        {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                    </select>
                                    <InputError message={errors.category_id} className="mt-2" />
                                </div>
                                {/* Author */}
                                <div className="space-y-3">
                                    <label htmlFor="author_id" className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Penulis</label>
                                    <select id="author_id" value={data.author_id} onChange={(e) => setData('author_id', e.target.value)} className="w-full px-6 py-4 border-2 border-green-200 rounded-xl text-lg">
                                        <option value="">Pilih Penulis</option>
                                        {authors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}
                                    </select>
                                    <InputError message={errors.author_id} className="mt-2" />
                                </div>
                                {/* Status */}
                                <div className="space-y-3">
                                    <label htmlFor="status" className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Status</label>
                                    <select id="status" value={data.status} onChange={(e) => setData('status', e.target.value as Article['status'])} className="w-full px-6 py-4 border-2 border-green-200 rounded-xl text-lg">
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                            </div>
                            
                            {/* Submit Button */}
                            <div className="pt-4">
                                <button type="submit" disabled={processing} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}