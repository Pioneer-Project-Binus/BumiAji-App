import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type CategoryProduct, type ProductStatus, type InertiaSharedProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useRef, useState, useCallback, useEffect } from 'react';
import $ from 'jquery';
import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite.js';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoaderCircle, Package, ArrowLeft, Sparkles, ShoppingCart, DollarSign, Archive, FileText, Tag, Leaf, TreePine, Sprout } from 'lucide-react';
import products from '@/routes/products';
import { dashboard } from '@/routes';

// Declare global $ for TypeScript
declare global {
    interface Window {
        $: typeof $;
    }
}

// Make sure jQuery is available globally
if (typeof window !== 'undefined') {
    window.$ = $;
}

interface CreateProductForm {
    productName: string;
    description: string;
    price: string;
    stock: string;
    categoryId: string | null;
    status: ProductStatus;
}

interface Props extends InertiaSharedProps {
    categories: CategoryProduct[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: dashboard().url },
    { title: 'Product Management', href: products.index().url },
    { title: 'Add New Product', href: products.create().url },
];

export default function AdminProductCreate({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm<Required<CreateProductForm>>({
        productName: '',
        description: '',
        price: '',
        stock: '',
        categoryId: null,
        status: 'draft',
    });

    const summernoteRef = useRef<HTMLTextAreaElement>(null);
    const [isSummernoteReady, setIsSummernoteReady] = useState(false);
    const summernoteInitialized = useRef(false);

    // Callback untuk menghandle perubahan konten Summernote
    const handleSummernoteChange = useCallback((contents: string) => {
        // Hanya update jika konten benar-benar berbeda
        if (contents !== data.description) {
            setData('description', contents);
        }
    }, [data.description, setData]);

    // Effect untuk inisialisasi Summernote - hanya sekali
    useEffect(() => {
        if (summernoteRef.current && window.$ && typeof window.$.fn.summernote === 'function' && !summernoteInitialized.current) {
            // Hancurkan instance yang ada jika ada
            if (window.$(summernoteRef.current).data('summernote')) {
                window.$(summernoteRef.current).summernote('destroy');
            }

            // Inisialisasi Summernote
            window.$(summernoteRef.current).summernote({
                tooltip: false,
                height: 300,
                placeholder: 'Tell customers what makes this product special...',
                toolbar: [
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['font', ['strikethrough', 'superscript', 'subscript']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['height', ['height']],
                    ['insert', ['link', 'picture', 'video']],
                    ['view', ['fullscreen', 'codeview']],
                ],
                callbacks: {
                    onChange: handleSummernoteChange,
                    onInit: function() {
                        // Set konten awal jika ada
                        if (data.description) {
                            window.$(summernoteRef.current).summernote('code', data.description);
                        }
                        setIsSummernoteReady(true);
                        summernoteInitialized.current = true;
                    },
                },
            });
        }

        // Cleanup function
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
    }, []); // Empty dependency array - hanya dijalankan sekali

    // Effect untuk update konten Summernote ketika data.description berubah dari luar (seperti reset form)
    useEffect(() => {
        if (isSummernoteReady && summernoteRef.current && window.$) {
            const currentContent = window.$(summernoteRef.current).summernote('code');
            // Hanya update jika konten berbeda dan tidak kosong
            if (currentContent !== data.description && data.description !== undefined) {
                window.$(summernoteRef.current).summernote('code', data.description);
            }
        }
    }, [data.description, isSummernoteReady]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(products.store().url, {
            onError: () => {
                // Handle error
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Add New Product" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/50 to-teal-100/80 dark:from-slate-950 dark:via-green-950/30 dark:to-emerald-950/50">
                {/* Background Decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-400/20 to-green-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-300/10 to-green-400/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-8 lg:py-12">
                    {/* Enhanced Header Section */}
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 text-white shadow-2xl shadow-green-500/25">
                                        <Package className="h-8 w-8" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                        <Sparkles className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                                        Add New Product
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                        Create a fresh and appealing product for your store
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={products.index().url}
                            className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-0.5 backdrop-blur-sm"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Products
                        </Link>
                    </div>

                    {/* Enhanced Main Form Card */}
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-green-500/10 border border-white/20 dark:border-slate-700/30 overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-slate-800/50 dark:to-green-900/30 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                                    <FileText className="h-4 w-4 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Product Information</h2>
                            </div>
                        </div>

                        <div className="p-8 lg:p-10">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                {/* Enhanced Form Grid */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                                    {/* Left Column */}
                                    <div className="space-y-8">
                                        {/* Product Name */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Leaf className="h-5 w-5 text-green-500" />
                                                <Label htmlFor="productName" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Product Name
                                                </Label>
                                            </div>
                                            <Input
                                                id="productName"
                                                type="text"
                                                value={data.productName}
                                                onChange={(e) => setData('productName', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="Enter an amazing product name..."
                                                required
                                            />
                                            <InputError message={errors.productName} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Price */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <DollarSign className="h-5 w-5 text-emerald-500" />
                                                <Label htmlFor="price" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Price (IDR)
                                                </Label>
                                            </div>
                                            <div className="relative">
                                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-bold text-lg">
                                                    Rp
                                                </span>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    value={data.price}
                                                    onChange={(e) => setData('price', e.target.value)}
                                                    className="h-14 text-lg pl-16 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                    placeholder="0"
                                                    required
                                                    min="0"
                                                />
                                            </div>
                                            <InputError message={errors.price} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Stock */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Archive className="h-5 w-5 text-teal-500" />
                                                <Label htmlFor="stock" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Stock Quantity
                                                </Label>
                                            </div>
                                            <Input
                                                id="stock"
                                                type="number"
                                                value={data.stock}
                                                onChange={(e) => setData('stock', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="Available quantity"
                                                required
                                                min="0"
                                            />
                                            <InputError message={errors.stock} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-8">
                                        {/* Description with Summernote */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <TreePine className="h-5 w-5 text-green-600" />
                                                <Label htmlFor="description" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Product Description
                                                </Label>
                                            </div>
                                            <div className="relative">
                                                <textarea
                                                    ref={summernoteRef}
                                                    id="description"
                                                    value={data.description}
                                                    onChange={(e) => setData('description', e.target.value)}
                                                    className="hidden"
                                                    required
                                                />
                                                {/* Fallback textarea jika Summernote tidak tersedia */}
                                                {!isSummernoteReady && (
                                                    <Textarea
                                                        value={data.description}
                                                        onChange={(e) => setData('description', e.target.value)}
                                                        className="min-h-[300px] text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 resize-none"
                                                        placeholder="Tell customers what makes this product special..."
                                                        required
                                                    />
                                                )}
                                            </div>
                                            <InputError message={errors.description} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Category */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Tag className="h-5 w-5 text-emerald-600" />
                                                <Label htmlFor="categoryId" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Category
                                                </Label>
                                            </div>
                                            <Select value={data.categoryId || 'none'} onValueChange={(value) => setData('categoryId', value === 'none' ? null : value)}>
                                                <SelectTrigger className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 hover:border-slate-300 dark:hover:border-slate-500">
                                                    <SelectValue placeholder="Select category (optional)" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl">
                                                    <SelectItem value="none" className="text-lg py-3">
                                                        <em>No Category</em>
                                                    </SelectItem>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={String(category.id)} className="text-lg py-3">
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.categoryId} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Status */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Sprout className="h-5 w-5 text-teal-600" />
                                                <Label htmlFor="status" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Publication Status
                                                </Label>
                                            </div>
                                            <Select value={data.status} onValueChange={(value) => setData('status', value as ProductStatus)}>
                                                <SelectTrigger className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 hover:border-slate-300 dark:hover:border-slate-500">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl">
                                                    <SelectItem value="draft" className="text-lg py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                                            Draft
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="published" className="text-lg py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                            Published
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="outofstock" className="text-lg py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                            Out of Stock
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.status} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Submit Section */}
                                <div className="pt-8 border-t border-gradient-to-r from-green-200/50 to-emerald-200/50 dark:from-slate-700 dark:to-slate-600">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div className="text-slate-600 dark:text-slate-400">
                                            <p className="text-sm">Ready to add this fresh product to your store?</p>
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="group h-14 px-10 text-lg font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-xl shadow-green-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-3 h-6 w-6 animate-spin" />
                                                    Creating Product...
                                                </>
                                            ) : (
                                                <>
                                                    <Package className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                                                    Create Product
                                                    <Leaf className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Enhanced Tips Card with Green Theme */}
                    <div className="mt-8 bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-slate-800/50 dark:to-green-900/30 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50 dark:border-slate-600/50">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                                <TreePine className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Growth Tips</h3>
                                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                    <li>• Use engaging product names that capture attention and improve search visibility</li>
                                    <li>• Create rich, detailed descriptions using the editor to help customers make informed decisions</li>
                                    <li>• Set competitive prices and maintain accurate stock levels for better customer experience</li>
                                    <li>• Choose appropriate categories to help customers find your products easily</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Summernote Styling */}
            <style jsx>{`
                .note-editor {
                    border-radius: 12px !important;
                    border: 2px solid rgb(226 232 240) !important;
                    background: rgba(248 250 252 / 0.5) !important;
                    backdrop-filter: blur(4px) !important;
                    transition: all 0.3s ease !important;
                }

                .note-editor:focus-within {
                    border-color: rgb(34 197 94) !important;
                    box-shadow: 0 0 0 4px rgba(34 197 94 / 0.2) !important;
                    background: white !important;
                }

                .note-toolbar {
                    background: linear-gradient(to right, rgba(240 253 244 / 0.8), rgba(236 253 245 / 0.8)) !important;
                    border-bottom: 1px solid rgba(34 197 94 / 0.2) !important;
                    border-radius: 12px 12px 0 0 !important;
                }

                .note-editing-area {
                    border-radius: 0 0 12px 12px !important;
                }

                .note-btn {
                    border-radius: 6px !important;
                    transition: all 0.2s ease !important;
                }

                .note-btn:hover {
                    background: rgba(34 197 94 / 0.1) !important;
                    color: rgb(34 197 94) !important;
                }

                .note-btn.active {
                    background: rgb(34 197 94) !important;
                    color: white !important;
                }

                .dark .note-editor {
                    border-color: rgb(75 85 99) !important;
                    background: rgba(51 65 85 / 0.5) !important;
                }

                .dark .note-editor:focus-within {
                    border-color: rgb(34 197 94) !important;
                    background: rgb(51 65 85) !important;
                }

                .dark .note-toolbar {
                    background: linear-gradient(to right, rgba(51 65 85 / 0.5), rgba(15 23 42 / 0.3)) !important;
                    border-bottom-color: rgba(34 197 94 / 0.2) !important;
                }
            `}</style>
        </AppLayout>
    );
}
