import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, CategoryProduct, Product, ProductStatus, InertiaSharedProps, ProductPhoto } from '@/types';
import { Head, Link, useForm, router } from '@inertiajs/react';
import React, { FormEventHandler, useState, ChangeEvent, useEffect, useMemo, useCallback, useRef } from 'react';
import { dashboard } from '@/routes';
import photoProductsRoute from '@/routes/photo-products';
import productsRoute from '@/routes/products';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    LoaderCircle, Package, ArrowLeft, Save, Trash2, Edit3, GripVertical,
    Sparkles, ShoppingCart, DollarSign, Archive, FileText, Tag, Camera, Upload,
    Image as ImageIcon, AlertCircle, CheckCircle, Star, Leaf, X
} from 'lucide-react';

// Extend the Window interface to recognize jQuery ($) if loaded from a CDN
declare global {
    interface Window {
        jQuery: any;
        $: any;
    }
}

interface Props extends InertiaSharedProps {
    product: Product & { photos: ProductPhoto[] };
    categories: CategoryProduct[];
}

interface EditProductForm {
    productName: string;
    description: string;
    price: string;
    stock: string;
    categoryId: string | null;
    status: ProductStatus;
}

const TANPA_KATEGORI_VALUE = "__TANPA_KATEGORI_DIPILIH__";

export default function AdminProductEdit({ product, categories }: Props) {
    const descriptionEditorRef = useRef<HTMLTextAreaElement>(null);
    const { data, setData, put, processing, errors } = useForm<Required<EditProductForm>>({
        productName: product.productName || '',
        description: product.description || '',
        price: String(product.price || '0'),
        stock: String(product.stock || '0'),
        categoryId: product.categoryId ? String(product.categoryId) : null,
        status: product.status || 'draft',
    });

    const [photoFiles, setPhotoFiles] = useState<File[]>([]);
    const [photoTitle, setPhotoTitle] = useState<string>('');
    const [photoDisplayOrder, setPhotoDisplayOrder] = useState<string>('0');
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
    const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});

    // Effect for initializing and destroying Summernote editor
    useEffect(() => {
        const loadScript = (src: string, onLoad: () => void, onError?: () => void) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = onLoad;
            script.onerror = onError || (() => console.error(`Failed to load script: ${src}`));
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
            if (descriptionEditorRef.current && window.$) {
                window.$(descriptionEditorRef.current).summernote({
                    tooltip: false,
                    height: 300,
                    placeholder: 'Jelaskan produk Anda secara detail...',
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
                        }
                    }
                });
            }
        };

        const summernoteCSS = loadStyle('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs5.min.css');
        const bootstrapCSS = loadStyle('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css');


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
            if (window.$ && descriptionEditorRef.current && window.$(descriptionEditorRef.current).data('summernote')) {
                window.$(descriptionEditorRef.current).summernote('destroy');
            }
            // Clean up loaded scripts and styles
            document.head.querySelectorAll('script[src*="jquery"], script[src*="summernote"], script[src*="bootstrap"]').forEach(el => el.remove());
            if (document.head.contains(summernoteCSS)) document.head.removeChild(summernoteCSS);
            if (document.head.contains(bootstrapCSS)) document.head.removeChild(bootstrapCSS);
        };
    }, []);

    useEffect(() => {
        if (photoFiles.length === 0) {
            setPreviewUrls([]);
            return;
        }

        const newPreviewUrls = photoFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(newPreviewUrls);

        return () => {
            newPreviewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [photoFiles]);

    const handleProductSubmit: FormEventHandler = useCallback((e) => {
        e.preventDefault();
        put(productsRoute.update(product.slug).url, {
            preserveScroll: true,
        });
    }, [put, product.slug]);

    const handlePhotoFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setPhotoFiles(filesArray);
        } else {
            setPhotoFiles([]);
        }
    }, []);

    const handlePhotoUploadSubmit: FormEventHandler = useCallback((e) => {
        e.preventDefault();

        if (photoFiles.length === 0) {
            alert('Silakan pilih foto untuk diunggah.');
            return;
        }

        setIsUploadingPhotos(true);
        setUploadErrors({});

        const formData = new FormData();
        formData.append('productId', String(product.id));
        formData.append('title', photoTitle || 'Foto Produk');
        formData.append('displayOrder', photoDisplayOrder || '0');

        photoFiles.forEach((file) => {
            formData.append('photos[]', file);
        });

        router.post(photoProductsRoute.store().url, formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPhotoFiles([]);
                setPhotoTitle('');
                setPhotoDisplayOrder('0');
                router.reload({ only: ['product'], preserveUrl: true });
            },
            onError: (errors) => {
                const typedErrors = errors as Record<string, string>;
                setUploadErrors(typedErrors);
            },
            onFinish: () => setIsUploadingPhotos(false),
        });
    }, [photoFiles, photoTitle, photoDisplayOrder, product.id]);

    const deletePhoto = useCallback((photoSlug: string) => {
        if (!photoSlug) {
            console.error("Slug foto tidak ditemukan untuk dihapus.");
            alert("Gagal menghapus foto: slug tidak valid.");
            return;
        }
        if (confirm('Anda yakin ingin menghapus foto ini?')) {
            router.delete(photoProductsRoute.destroy(photoSlug).url, {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ['product'], preserveUrl: true });
                },
            });
        }
    }, []);

    const removeSelectedPhoto = useCallback((index: number) => {
        setPhotoFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    }, []);

    const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [
        { title: 'Dasbor Admin', href: dashboard().url },
        { title: 'Manajemen Produk', href: productsRoute.indexAdmin().url },
        { title: 'Edit Produk', href: productsRoute.edit(product.slug).url },
    ], [product.slug]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>{`Admin: Edit Produk - ${product.productName}`}</title>
                <meta name="description" content={`Halaman untuk mengedit detail produk: ${product.productName}. Kelola stok, harga, kategori, foto, dan atribut lainnya.`} />
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/50 to-emerald-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/50">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full blur-3xl opacity-70"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-teal-500/20 rounded-full blur-3xl opacity-70"></div>
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-12">
                    {/* Header Section */}
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white shadow-2xl shadow-emerald-500/25">
                                        <Edit3 className="h-8 w-8" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full flex items-center justify-center">
                                        <Sparkles className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                                        Edit Produk
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                        Perbarui detail untuk <span className="font-semibold text-emerald-600 dark:text-emerald-400">"{product.productName}"</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={productsRoute.indexAdmin().url}
                            className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5 backdrop-blur-sm"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Kembali ke Produk
                        </Link>
                    </div>

                    {/* Product Form */}
                    <div className="mb-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-50/80 to-green-50/80 dark:from-slate-800/50 dark:to-slate-700/50 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
                                        <Package className="h-4 w-4 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Detail Produk</h2>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 lg:p-10">
                            <form onSubmit={handleProductSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                                    {/* Left Column */}
                                    <div className="space-y-8">
                                        {/* Product Name */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Package className="h-5 w-5 text-emerald-500" />
                                                <Label htmlFor="productName" className="text-lg font-bold text-slate-700 dark:text-slate-300">Nama Produk</Label>
                                            </div>
                                            <Input
                                                id="productName"
                                                type="text"
                                                value={data.productName}
                                                onChange={(e) => setData('productName', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="Masukkan nama produk..."
                                                required
                                            />
                                            <InputError message={errors.productName} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Price */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <DollarSign className="h-5 w-5 text-green-500" />
                                                <Label htmlFor="price" className="text-lg font-bold text-slate-700 dark:text-slate-300">Harga (IDR)</Label>
                                            </div>
                                            <div className="relative">
                                                <span className="z-10 absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500 dark:text-slate-400 font-bold text-lg">Rp</span>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    value={data.price}
                                                    onChange={(e) => setData('price', e.target.value)}
                                                    className="h-14 text-lg pl-16 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
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
                                                <Label htmlFor="stock" className="text-lg font-bold text-slate-700 dark:text-slate-300">Jumlah Stok</Label>
                                            </div>
                                            <Input
                                                id="stock"
                                                type="number"
                                                value={data.stock}
                                                onChange={(e) => setData('stock', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="Jumlah tersedia"
                                                required
                                                min="0"
                                            />
                                            <InputError message={errors.stock} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-8">
                                        {/* Description */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <FileText className="h-5 w-5 text-emerald-500" />
                                                <Label htmlFor="description" className="text-lg font-bold text-slate-700 dark:text-slate-300">Deskripsi Produk</Label>
                                            </div>
                                            <textarea
                                                ref={descriptionEditorRef}
                                                id="description"
                                                defaultValue={data.description}
                                                className="hidden" // Hide original textarea
                                            />
                                            <InputError message={errors.description} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Category */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Tag className="h-5 w-5 text-green-500" />
                                                <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Kategori</Label>
                                            </div>
                                            <Select
                                                value={data.categoryId === null ? TANPA_KATEGORI_VALUE : data.categoryId}
                                                onValueChange={(value) => setData('categoryId', value === TANPA_KATEGORI_VALUE ? null : value)}
                                            >
                                                <SelectTrigger className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 hover:border-slate-300 dark:hover:border-slate-500">
                                                    <SelectValue placeholder="Pilih kategori (opsional)" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl">
                                                    <SelectItem value={TANPA_KATEGORI_VALUE} className="text-lg py-3">
                                                        <em>Tanpa Kategori</em>
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
                                                <ShoppingCart className="h-5 w-5 text-teal-500" />
                                                <Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Status Publikasi</Label>
                                            </div>
                                            <Select value={data.status} onValueChange={(value) => setData('status', value as ProductStatus)}>
                                                <SelectTrigger className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 hover:border-slate-300 dark:hover:border-slate-500">
                                                    <SelectValue placeholder="Pilih status" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl">
                                                    <SelectItem value="draft" className="text-lg py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>Draft
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="published" className="text-lg py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>Dipublikasikan
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="outofstock" className="text-lg py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>Stok Habis
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.status} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-8 border-t-2 border-slate-200/50 dark:border-slate-700/50">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div className="text-slate-600 dark:text-slate-400">
                                            <p className="text-sm">Simpan perubahan untuk memperbarui produk</p>
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="group h-14 px-10 text-lg font-bold bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 text-white rounded-xl shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                                        >
                                            {processing ? (
                                                <><LoaderCircle className="mr-3 h-6 w-6 animate-spin" />Menyimpan...</>
                                            ) : (
                                                <><Save className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />Simpan Perubahan</>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Photo Management */}
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-50/80 to-green-50/80 dark:from-slate-800/50 dark:to-slate-700/50 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
                                        <Camera className="h-4 w-4 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Foto Produk</h2>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30">
                                    <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                        {product.photos?.length || 0} Foto
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 lg:p-10">
                            {/* Photo Upload Form */}
                            <div className="mb-12 relative">
                                <div className="bg-gradient-to-br from-slate-50/80 to-emerald-50/80 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl border-2 border-dashed border-emerald-300/50 dark:border-emerald-600/50 p-8 transition-all duration-300 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-slate-700/50">
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
                                            <Upload className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Unggah Foto Baru</h3>
                                        <p className="text-slate-600 dark:text-slate-400">Tambahkan visual yang menarik untuk produk Anda.</p>
                                    </div>

                                    <form onSubmit={handlePhotoUploadSubmit} className="space-y-6">
                                        {/* File Input */}
                                        <div>
                                            <Label htmlFor="photoFiles" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Pilih Foto (bisa lebih dari satu)
                                            </Label>
                                            <Input
                                                id="photoFiles"
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handlePhotoFileChange}
                                                className="h-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                                            />
                                            {uploadErrors.photos && (
                                                <InputError message={uploadErrors.photos} className="mt-2" />
                                            )}
                                        </div>

                                        {/* Title Input - Fixed */}
                                        <div>
                                            <Label htmlFor="photoTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Judul Foto (untuk semua foto yang diunggah)
                                            </Label>
                                            <Input
                                                id="photoTitle"
                                                type="text"
                                                value={photoTitle}
                                                onChange={(e) => setPhotoTitle(e.target.value)}
                                                placeholder="Judul untuk semua foto"
                                                className="h-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                                            />
                                            {uploadErrors.title && <InputError message={uploadErrors.title} className="mt-2" />}
                                        </div>

                                        {/* Display Order Input - Fixed */}
                                        <div>
                                            <Label htmlFor="photoDisplayOrder" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Urutan Tampil (untuk semua foto)
                                            </Label>
                                            <Input
                                                id="photoDisplayOrder"
                                                type="number"
                                                value={photoDisplayOrder}
                                                onChange={(e) => setPhotoDisplayOrder(e.target.value)}
                                                placeholder="0"
                                                min="0"
                                                className="h-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                                            />
                                            {uploadErrors.displayOrder && <InputError message={uploadErrors.displayOrder} className="mt-2" />}
                                        </div>

                                        {/* Preview Photos */}
                                        {previewUrls.length > 0 && (
                                            <div className="pt-4">
                                                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Pratinjau Foto Terpilih</h4>
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                    {previewUrls.map((url, index) => (
                                                        <div key={index} className="relative group">
                                                            <img
                                                                src={url}
                                                                alt={`Preview ${index + 1}`}
                                                                className="w-full h-32 object-cover rounded-lg shadow"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeSelectedPhoto(index)}
                                                                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full text-xs hover:bg-red-700 transition-all group-hover:opacity-100 opacity-80"
                                                                title="Hapus"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <div className="pt-4 flex justify-end">
                                            <Button
                                                type="submit"
                                                disabled={isUploadingPhotos || photoFiles.length === 0}
                                                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isUploadingPhotos ? 'Mengunggah...' : 'Unggah Foto'}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Existing Photos Gallery */}
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">Foto Saat Ini</h3>
                                {product.photos && product.photos.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {product.photos.sort((a,b) => a.displayOrder - b.displayOrder).map((photo) => (
                                            <div key={photo.id} className="group relative bg-white/60 dark:bg-slate-700/60 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-300 dark:hover:border-emerald-600 hover:-translate-y-1">
                                                <div className="relative mb-4 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                                                    <img src={photo.filePath} alt={photo.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                                    <div className="absolute top-3 right-3">
                                                        <button onClick={() => deletePhoto(photo.slug)} className="w-8 h-8 bg-red-500/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm" title="Hapus foto">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{photo.title}</h4>
                                                    <div className="inline-flex items-center gap-2 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-600/50 rounded-full">
                                                        <GripVertical className="h-3 w-3" />
                                                        <span>Urutan: {photo.displayOrder}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                                        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                                            <ImageIcon className="h-12 w-12 text-slate-400 dark:text-slate-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">Belum Ada Foto</h3>
                                        <p className="text-slate-500 dark:text-slate-500">Gunakan form di atas untuk menambahkan foto produk.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
