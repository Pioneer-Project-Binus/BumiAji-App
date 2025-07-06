import React, { FormEventHandler, useEffect, useMemo, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import 'summernote/dist/summernote-lite.css';
import $ from 'jquery';
import 'summernote/dist/summernote-lite.js';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps } from '@/types';
import categoryProducts from '@/routes/category-products';
import { dashboard } from '@/routes';
import InputError from '@/components/input-error';

declare global {
    interface Window {
        jQuery: any;
        $: any;
    }
}

interface CreateCategoryProductForm {
    name: string;
    description: string;
}

interface Props extends InertiaSharedProps {}

export default function CategoryProductCreate({ errors: pageErrors }: Props) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Product Categories', href: categoryProducts.index().url },
        { title: 'Add New Category', href: categoryProducts.create().url },
    ], []);

    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateCategoryProductForm>>({
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

        const initializeSummernote = () => {
            if (summernoteRef.current && window.$) {
                const $editor = window.$(summernoteRef.current);

                if ($editor.data('summernote')) {
                    $editor.summernote('destroy');
                }

                $editor.summernote({
                    tooltip: false,
                    height: 300,
                    placeholder: 'Tulis deskripsi kategori produk...',
                    toolbar: [
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['font', ['strikethrough', 'superscript', 'subscript']],
                        ['fontsize', ['fontsize']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['height', ['height']],
                        ['insert', ['link', 'picture', 'video']],
                        ['view', ['codeview']],
                    ],
                    callbacks: {
                        onChange: (contents: string) => {
                            setData('description', contents);
                        },
                    },
                });
            }
        };

        const summernoteCSS = loadStyle('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs5.min.css');

        if (!window.jQuery) {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', () => {
                loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js', () => {
                    loadScript('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs5.min.js', initializeSummernote);
                });
            });
        } else {
            loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js', () => {
                loadScript('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs5.min.js', initializeSummernote);
            });
        }

        return () => {
            if (window.$ && summernoteRef.current && window.$(summernoteRef.current).data('summernote')) {
                window.$(summernoteRef.current).summernote('destroy');
            }
            if (document.head.contains(summernoteCSS)) {
                document.head.removeChild(summernoteCSS);
            }
            document.head.querySelectorAll('script[src*="jquery"], script[src*="summernote"], script[src*="bootstrap"]').forEach((el) => el.remove());
        };
    }, []); // ⚠️ ONLY RUN ONCE

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(categoryProducts.store().url, {
            onSuccess: () => {
                toast.success('Kategori berhasil dibuat!');
                reset();
                if (summernoteRef.current && window.$) {
                    window.$(summernoteRef.current).summernote('reset');
                }
            },
            onError: () => {
                toast.error('Terjadi kesalahan. Periksa kembali isian form Anda.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Tambah Kategori Produk" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900">
                <div className="relative z-10 flex justify-center items-center min-h-screen py-12 px-4">
                    <div className="w-full max-w-4xl">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                                </svg>
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                                Tambah Kategori Produk
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                                Buat kategori baru untuk mengorganisir produk dengan lebih baik
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-green-100 dark:border-slate-700 space-y-8">
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

                            <div className="space-y-3">
                                <label className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    Deskripsi Kategori
                                </label>
                                <textarea
                                    ref={summernoteRef}
                                    id="description"
                                    defaultValue={data.description}
                                    className="hidden"
                                />
                                <InputError message={errors.description || pageErrors?.description} className="mt-2" />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-green-200 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                                >
                                    {processing ? "Membuat Kategori..." : "Buat Kategori Baru"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
