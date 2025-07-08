import React, { FormEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

// Layout, Types, and Route Imports
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps, type CategoryArticle, type Author } from '@/types';
import articles from '@/routes/articles';
import { dashboard } from '@/routes';
import InputError from '@/components/input-error';
import { XCircle } from 'lucide-react';
import 'summernote/dist/summernote-lite.css';
import $ from 'jquery';
import 'summernote/dist/summernote-lite.js';

// --- Impor dari paket NPM untuk Summernote telah dihapus ---

// Memperluas interface Window untuk mengenali jQuery ($) dari CDN
declare global {
    interface Window {
        jQuery: any;
        $: any;
    }
}

// Component Props
interface Props extends InertiaSharedProps {
    categories: CategoryArticle[];
    authors: Author[];
}

// Form Data Structure
interface CreateArticleForm {
    title: string;
    content: string;
    featuredImage: File | null;
    status: 'draft' | 'published';
    categoryId: string;
    author_id: string;
}

export default function ArticleCreate({ categories, authors, errors: pageErrors }: Props) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Articles', href: articles.indexAdmin().url },
        { title: 'Create New Article', href: articles.create().url },
    ], []);

    const { data, setData, post, processing, progress, errors, reset } = useForm<Required<CreateArticleForm>>({
        title: '',
        content: '',
        featuredImage: null,
        status: 'draft',
        categoryId: '',
        author_id: '',
    });
    
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    // Ref untuk textarea yang akan diubah menjadi Summernote
    const summernoteRef = useRef<HTMLTextAreaElement>(null);

    // --- Efek untuk memuat, inisialisasi, dan membersihkan Summernote dari CDN ---
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
                    tooltip: false,
                    toolbar: [
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['font', ['strikethrough', 'superscript', 'subscript']],
                        ['fontsize', ['fontsize']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['height', ['height']],
                        ['insert', ['link', 'picture']],
                        ['view', ['codeview']],
                    ],
                    callbacks: {
                        onChange: (contents: string) => {
                            setData('content', contents);
                        },
                    },
                });
            }
        };

        // Menggunakan versi BS5 agar sesuai dengan tampilan umum
        const summernoteCSS = loadStyle('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs5.min.css');

        // Memuat skrip
        if (!window.jQuery) {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', () => {
                // Skrip Popper.js dan Bootstrap diperlukan oleh Summernote BS5
                loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js', () => {
                    loadScript('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs5.min.js', initializeSummernote);
                });
            });
        } else {
             loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js', () => {
                loadScript('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs5.min.js', initializeSummernote);
            });
        }

        // Fungsi cleanup
        return () => {
            if (window.$ && summernoteRef.current && window.$(summernoteRef.current).data('summernote')) {
                window.$(summernoteRef.current).summernote('destroy');
            }
            if (document.head.contains(summernoteCSS)) {
                document.head.removeChild(summernoteCSS);
            }
            document.head.querySelectorAll('script[src*="jquery"], script[src*="summernote"], script[src*="bootstrap"]').forEach((el) => el.remove());
        };
    }, []);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(articles.store().url, {
            onSuccess: () => {
                toast.success('Artikel berhasil dibuat!');
                reset();
                setImagePreview(null);
                if (summernoteRef.current && window.$) {
                    window.$(summernoteRef.current).summernote('reset');
                }
            },
            onError: () => {
                toast.error('Gagal membuat artikel. Silakan periksa kembali isian form.');
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('featuredImage', file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };
    
    const removeImage = () => {
        setImagePreview(null);
        setData('featuredImage', null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Buat Artikel Baru" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900">
                <div className="relative z-10 flex justify-center items-center min-h-screen py-12 px-4">
                    <div className="w-full max-w-4xl">
                        <div className="text-center mb-12">
                             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
                                 <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                 </svg>
                             </div>
                             <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                                 Buat Artikel Baru
                             </h1>
                             <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                                 Bagikan ide dan cerita menarik Anda kepada dunia.
                             </p>
                         </div>

                        <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-green-100 dark:border-slate-700 space-y-8">
                            
                            {/* Title Field */}
                            <div className="space-y-3">
                                <label htmlFor="title" className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Judul Artikel</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value.slice(0, 100))}
                                    maxLength={100}
                                    className="w-full px-6 py-4 border-2 border-green-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all text-lg"
                                    placeholder="Masukkan judul yang menarik (maksimal 100 karakter)..."
                                />
                                <div className="text-sm text-gray-500 text-right">
                                    {data.title.length}/100 karakter
                                </div>
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            {/* Content Field with Summernote */}
                            <div className="space-y-3">
                                <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Konten Artikel</label>
                                {/* Textarea ini akan digantikan oleh Summernote */}
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
                                <label htmlFor="featuredImage" className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Gambar Utama</label>
                                <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-6 text-center hover:border-green-400 transition-all">
                                    <input
                                        type="file"
                                        id="featuredImage"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    {imagePreview ? (
                                        <div className="relative group">
                                            <img src={imagePreview} alt="Pratinjau Gambar" className="w-full h-auto max-h-80 object-contain rounded-lg" />
                                            <div onClick={removeImage} className="absolute -top-3 -right-3 cursor-pointer bg-red-600 text-white rounded-full p-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <XCircle size={24} />
                                            </div>
                                            <label htmlFor="featuredImage" className="mt-4 inline-block text-green-700 font-semibold cursor-pointer hover:underline">
                                                Ganti gambar
                                            </label>
                                        </div>
                                    ) : (
                                        <label htmlFor="featuredImage" className="cursor-pointer">
                                            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-2">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            </div>
                                            <p className="text-green-700 font-semibold">Klik untuk mengupload</p>
                                            <p className="text-sm text-gray-500">atau seret gambar ke sini</p>
                                        </label>
                                    )}
                                </div>
                                {progress && (
                                    <div className="mt-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div></div>
                                        <p className="text-sm text-right">{progress.percentage}%</p>
                                    </div>
                                )}
                                <InputError message={errors.featuredImage} className="mt-2" />
                            </div>

                            {/* Meta Fields Grid */}
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="space-y-3">
                                    <label htmlFor="categoryId" className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Kategori</label>
                                    <select id="categoryId" value={data.categoryId} onChange={(e) => setData('categoryId', e.target.value)} className="w-full px-6 py-4 border-2 border-green-200 rounded-xl text-lg">
                                        <option value="">Pilih Kategori</option>
                                        {categories.map((cat) => <option key={cat.id} value={String(cat.id)}>{cat.name}</option>)}
                                    </select>
                                    <InputError message={errors.categoryId} className="mt-2" />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="author_id" className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Penulis</label>
                                    <select id="author_id" value={data.author_id} onChange={(e) => setData('author_id', e.target.value)} className="w-full px-6 py-4 border-2 border-green-200 rounded-xl text-lg">
                                        <option value="">Pilih Penulis</option>
                                        {authors.map((author) => <option key={author.id} value={String(author.id)}>{author.name}</option>)}
                                    </select>
                                    <InputError message={errors.author_id} className="mt-2" />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="status" className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Status</label>
                                    <select id="status" value={data.status} onChange={(e) => setData('status', e.target.value as 'draft' | 'published')} className="w-full px-6 py-4 border-2 border-green-200 rounded-xl text-lg">
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                            </div>
                            
                            {/* Submit Button */}
                            <div className="pt-4">
                                <button type="submit" disabled={processing} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
                                    {processing ? 'Membuat Artikel...' : 'Buat Artikel'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}