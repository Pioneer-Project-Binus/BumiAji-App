// resources/js/Pages/CategoryArticles/Edit.tsx

import React, { FormEventHandler, useMemo, useRef, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

// Layout dan Tipe Data
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps, type CategoryArticle } from '@/types';
import categoryArticles from '@/routes/category-articles';
import { dashboard } from '@/routes';
import InputError from '@/components/input-error';
import 'summernote/dist/summernote-lite.css';
import $ from 'jquery';
import 'summernote/dist/summernote-lite.js';

// Deklarasi global untuk jQuery dan Summernote
declare global {
    interface Window {
        $: any;
        jQuery: any;
    }
}

// Struktur data form
interface EditCategoryArticleForm {
    name: string;
    description: string;
}

// Props komponen
interface Props extends InertiaSharedProps {
    categoryArticle: CategoryArticle;
}

export default function CategoryArticleEdit({ categoryArticle, errors: pageErrors }: Props) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Article Categories', href: categoryArticles.indexAdmin().url },
        { title: `Edit: ${categoryArticle.name}`, href: categoryArticles.edit(categoryArticle.slug).url },
    ], [categoryArticle]);

    const { data, setData, put, processing, errors } = useForm<Required<EditCategoryArticleForm>>({
        name: categoryArticle.name || '',
        description: categoryArticle.description || '',
    });

    const summernoteRef = useRef<HTMLTextAreaElement>(null);

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

        const initSummernote = () => {
            if (window.$ && summernoteRef.current) {
                // Pastikan Summernote diinisialisasi dengan data yang ada
                window.$(summernoteRef.current).summernote({
                    height: 150,
                    toolbar: [
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['para', ['ul', 'ol']],
                    ],
                    placeholder: 'Tulis deskripsi kategori...',
                    callbacks: {
                        onChange: (contents: string) => {
                            setData('description', contents);
                        },
                    },
                });
                // Set konten awal Summernote
                window.$(summernoteRef.current).summernote('code', data.description);
            }
        };

        const css = loadStyle('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.css');

        if (!window.jQuery) {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', () => {
                loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js', () => {
                    loadScript('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.js', initSummernote);
                });
            });
        } else {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.js', initSummernote);
        }

        return () => {
            if (summernoteRef.current && window.$) {
                window.$(summernoteRef.current).summernote('destroy');
            }
            if (css) document.head.removeChild(css);
            // Hapus juga script yang dimuat secara dinamis
            document.head.querySelectorAll('script[src*="summernote"], script[src*="jquery"], script[src*="bootstrap"]').forEach((s) => s.remove());
        };
    }, []); // Dependency array kosong agar hanya berjalan sekali saat komponen mount

    useEffect(() => {
        if (summernoteRef.current && window.$) {
            window.$(summernoteRef.current).summernote('code', data.description);
        }
    }, [data.description]);


    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(categoryArticles.update(categoryArticle.slug).url, {
            onSuccess: () => {
                toast.success('Kategori berhasil diperbarui!');
            },
            onError: () => {
                toast.error('Terjadi kesalahan. Periksa kembali isian form Anda.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin: Edit ${categoryArticle.name}`} />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900">
                <div className="relative z-10 flex justify-center items-center min-h-screen py-12 px-4">
                    <div className="w-full max-w-4xl">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
                               <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                               </svg>
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                                Edit Kategori Artikel
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                                Perbarui detail untuk kategori <strong className="font-semibold text-gray-700 dark:text-gray-300">{categoryArticle.name}</strong>.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-green-100 dark:border-slate-700 space-y-8"
                        >
                            {/* Name Field */}
                            <div className="space-y-3">
                                <label htmlFor="name" className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Nama Kategori
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="w-full px-6 py-4 border-2 border-green-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 text-gray-800 dark:text-gray-200 text-lg placeholder-gray-400 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm"
                                    placeholder="Masukkan nama kategori yang unik"
                                />
                                <InputError message={errors.name || pageErrors?.name} className="mt-2" />
                            </div>

                            {/* Description Field with Summernote */}
                            <div className="space-y-3">
                                <label htmlFor="description" className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    Deskripsi Kategori
                                </label>
                                <textarea
                                    ref={summernoteRef}
                                    className="hidden text-white" // Sembunyikan textarea karena Summernote akan menginisialisasi sendiri
                                />
                                <InputError message={errors.description || pageErrors?.description} className="mt-2" />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-green-200 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                                >
                                    {processing ? "Menyimpan..." : "Update Kategori"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
