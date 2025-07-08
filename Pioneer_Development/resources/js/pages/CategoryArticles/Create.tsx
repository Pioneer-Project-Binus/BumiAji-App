// resources/js/Pages/CategoryArticles/Create.tsx

import React, { FormEventHandler, useEffect, useMemo, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

// Layout dan Komponen
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps } from '@/types';
import categoryArticles from '@/routes/category-articles';
import { dashboard } from '@/routes';
import InputError from '@/components/input-error';
import 'summernote/dist/summernote-lite.css';
import $ from 'jquery';
import 'summernote/dist/summernote-lite.js';

declare global {
    interface Window {
        $: any;
        jQuery: any;
    }
}

interface CreateCategoryArticleForm {
    name: string;
    description: string;
}

interface Props extends InertiaSharedProps {}

export default function CategoryArticleCreate({ errors: pageErrors }: Props) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Article Categories', href: categoryArticles.indexAdmin().url },
        { title: 'Add New Category', href: categoryArticles.create().url },
    ], []);

    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateCategoryArticleForm>>({
        name: '',
        description: '',
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
            document.head.querySelectorAll('script[src*="summernote"], script[src*="jquery"], script[src*="bootstrap"]').forEach((s) => s.remove());
        };
    }, []);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(categoryArticles.store().url, {
            onSuccess: () => {
                toast.success('Kategori berhasil dibuat!');
                reset();
                if (summernoteRef.current && window.$) {
                    window.$(summernoteRef.current).summernote('reset');
                }
            },
            onError: () => {
                toast.error('Gagal menyimpan. Coba lagi.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Kategori Artikel" />
            
            {/* Hero Section with Gradient Background */}
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-teal-300 rounded-full opacity-25 blur-lg animate-pulse delay-300"></div>
                    <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-200 rounded-full opacity-15 blur-2xl animate-pulse delay-700"></div>
                </div>

                <div className="relative z-10 py-12 px-6 max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                            Tambah Kategori Artikel
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Buat kategori baru untuk mengorganisir artikel Anda dengan lebih baik
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6">
                            <h2 className="text-2xl font-semibold text-white flex items-center">
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Informasi Kategori
                            </h2>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            {/* Name Field */}
                            <div className="group">
                                <label htmlFor="name" className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    Nama Kategori
                                </label>
                                <div className="relative">
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 text-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-gray-50 hover:bg-white group-hover:border-emerald-300"
                                        placeholder="Masukkan nama kategori..."
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <InputError message={errors.name || pageErrors?.name} className="mt-3" />
                            </div>

                            {/* Description Field */}
                            <div className="group">
                                <label htmlFor="description" className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                    Deskripsi
                                </label>
                                <div className="relative">
                                    <div className="border-2 border-gray-200 rounded-2xl focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100 transition-all duration-300 bg-gray-50 hover:bg-white group-hover:border-emerald-300 overflow-hidden">
                                        <textarea 
                                            ref={summernoteRef} 
                                            defaultValue={data.description} 
                                            className="hidden" 
                                        />
                                    </div>
                                </div>
                                <InputError message={errors.description || pageErrors?.description} className="mt-3" />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Simpan Kategori
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Help Text */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Pastikan nama kategori unik dan deskripsi yang jelas untuk memudahkan pengelolaan artikel
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}