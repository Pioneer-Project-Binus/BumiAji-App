import AppLayout from '@/layouts/app-layout';
// Pastikan tipe ProductPhoto diekspor dari types.ts dan mencakup 'slug' dan 'url'
import { BreadcrumbItem, CategoryProduct, Product, ProductStatus, InertiaSharedProps } from '@/types';
import { Head, Link, useForm, router } from '@inertiajs/react';
import React, { FormEventHandler, useState, ChangeEvent, useEffect, useMemo } from 'react';
// Impor rute yang baru dan yang sudah ada
import {  dashboard } from '@/routes'; // Pastikan path ke file rute benar
import photoProductsRoute from '@/routes/photo-products'; // Pastikan path ke file rute benar
import productsRoute from '@/routes/products'; // Pastikan path ke file rute benar

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
    LoaderCircle, Package, ArrowLeft, Save, ImagePlus, Trash2, Edit3, GripVertical, 
    Sparkles, ShoppingCart, DollarSign, Archive, FileText, Tag, Camera, Upload, 
    Image as ImageIcon, AlertCircle, CheckCircle, X, Eye, Star
} from 'lucide-react';

interface Props extends InertiaSharedProps {
    product: Product; // Pastikan product.photos menyertakan 'id', 'url', 'title', 'displayOrder', dan 'slug' foto
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
    const { data, setData, put, processing, errors } = useForm<Required<EditProductForm>>({
        productName: product.productName || '',
        description: product.description || '',
        price: String(product.price || '0'),
        stock: String(product.stock || '0'),
        categoryId: product.categoryId ? String(product.categoryId) : null,
        status: product.status || 'draft',
    });

    const [photoFiles, setPhotoFiles] = useState<File[]>([]);
    const [photoTitles, setPhotoTitles] = useState<string[]>([]);
    const [photoDisplayOrders, setPhotoDisplayOrders] = useState<string[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
    const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});

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

    const handleProductSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(productsRoute.update(product.slug).url, { // Menggunakan PUT untuk update produk
            preserveScroll: true,
        });
    };

    const handlePhotoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setPhotoFiles(filesArray);
            setPhotoTitles(filesArray.map(file => file.name.split('.').slice(0, -1).join('.') || file.name));
            setPhotoDisplayOrders(filesArray.map(() => '0'));
        } else {
            setPhotoFiles([]);
            setPhotoTitles([]);
            setPhotoDisplayOrders([]);
        }
    };

    const handlePhotoDisplayOrdersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const ordersArray = value.split(',').map(s => s.trim()).filter(s => s !== '');
        setPhotoDisplayOrders(ordersArray);
    };

    const handlePhotoFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhotoFiles(Array.from(e.target.files));
        }
        };



    const handlePhotoUploadSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (photoFiles.length === 0) {
            alert('Silakan pilih foto untuk diunggah.');
            return;
        }

        setIsUploadingPhotos(true);
        setUploadErrors({});

        const formData = new FormData();
        formData.append('productId', String(product.id));

        // Gunakan 1 title dan displayOrder global
        formData.append('title', (photoTitles && photoTitles.length > 0 ? photoTitles.join(',') : 'Foto Produk'));
        formData.append('displayOrder', (photoDisplayOrders && photoDisplayOrders.length > 0 ? photoDisplayOrders.join(',') : '0'));


        // Kirim semua file sebagai array photos[]
        photoFiles.forEach((file) => {
            formData.append('photos[]', file);
        });

        router.post(photoProductsRoute.store().url, formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPhotoFiles([]);
                setPhotoTitles([]); // <-- ubah ke array kosong
                setPhotoDisplayOrders(['0']); // <-- ini array dengan satu string '0', sesuai tipe
                router.reload({ only: ['product'], preserveUrl: true });
            },
            onError: (errors) => {
                const typedErrors = errors as Record<string, string>;
                setUploadErrors(typedErrors);

                if (typedErrors['photos']) {
                    setUploadErrors(prev => ({ ...prev, photos: typedErrors['photos'] }));
                }
            },
            onFinish: () => setIsUploadingPhotos(false),
        });
    };



    // Menggunakan slug foto untuk menghapus, sesuai PhotoProductController@destroy
    const deletePhoto = (photoSlug: string) => { 
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
                // onError bisa ditambahkan untuk menangani kegagalan penghapusan
            });
        }
    };

    const removeSelectedPhoto = (index: number) => {
        setPhotoFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setPhotoTitles(prevTitles => prevTitles.filter((_, i) => i !== index));
        setPhotoDisplayOrders(prevOrders => prevOrders.filter((_, i) => i !== index));
    };

    const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [
        { title: 'Dasbor Admin', href: dashboard().url },
        { title: 'Manajemen Produk', href: productsRoute.index().url },
        { title: 'Edit Produk', href: productsRoute.edit(product.slug).url },
    ], [product.slug]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>{`Admin: Edit Produk - ${product.productName}`}</title>
                <meta name="description" content={`Halaman untuk mengedit detail produk: ${product.productName}. Kelola stok, harga, kategori, foto, dan atribut lainnya.`} />
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50">
                {/* ... (bagian dekorasi background tetap sama) ... */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl opacity-70"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl opacity-70"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-500/10 rounded-full blur-3xl opacity-50"></div>
                </div>


                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-12">
                    {/* ... (bagian header halaman tetap sama) ... */}
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 text-white shadow-2xl shadow-purple-500/25">
                                        <Edit3 className="h-8 w-8" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                        <Sparkles className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent leading-tight">
                                        Edit Produk
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                        Perbarui detail untuk <span className="font-semibold text-purple-600 dark:text-purple-400">"{product.productName}"</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <Link
                            href={productsRoute.index().url}
                            className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5 backdrop-blur-sm"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Kembali ke Produk
                        </Link>
                    </div>

                    {/* Form Detail Produk (Sama seperti sebelumnya, karena ini untuk ProductController) */}
                    <div className="mb-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden">
                        {/* ... (Card Header Detail Produk tetap sama) ... */}
                         <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-slate-800/50 dark:to-slate-700/50 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center"><Package className="h-4 w-4 text-white" /></div>
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Detail Produk</h2>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Mode Edit</span>
                                </div>
                            </div>
                        </div>
                        {/* ... (Isi Form Detail Produk tetap sama) ... */}
                        <div className="p-8 lg:p-10">
                            <form onSubmit={handleProductSubmit} className="space-y-10">
                                {/* ... (Semua field productName, price, stock, description, category, status tetap sama) ... */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                                    {/* Kolom Kiri */}
                                    <div className="space-y-8">
                                        {/* Nama Produk */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Package className="h-5 w-5 text-purple-500" /><Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Nama Produk</Label>
                                            </div>
                                            <Input id="productName" type="text" value={data.productName} onChange={(e) => setData('productName', e.target.value)} className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400" placeholder="Masukkan nama produk..." required />
                                            <InputError message={errors.productName} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                        {/* Harga */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <DollarSign className="h-5 w-5 text-green-500" /><Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Harga (IDR)</Label>
                                            </div>
                                            <div className="relative">
                                                <span className="z-10 absolute left-5 top-1/2 -translate-y-1/2 text-red-500 dark:text-slate-400 font-bold text-lg">Rp</span>
                                                <Input id="price" type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} className="h-14 text-lg pl-16 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400" placeholder="0" required min="0" />
                                            </div>
                                            <InputError message={errors.price} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                        {/* Stok */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Archive className="h-5 w-5 text-orange-500" /><Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Jumlah Stok</Label>
                                            </div>
                                            <Input id="stock" type="number" value={data.stock} onChange={(e) => setData('stock', e.target.value)} className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400" placeholder="Jumlah tersedia" required min="0" />
                                            <InputError message={errors.stock} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                    </div>
                                    {/* Kolom Kanan */}
                                    <div className="space-y-8">
                                        {/* Deskripsi */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <FileText className="h-5 w-5 text-blue-500" /><Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Deskripsi Produk</Label>
                                            </div>
                                            <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} className="min-h-[160px] text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 resize-none" placeholder="Jelaskan produk Anda secara detail..." required />
                                            <InputError message={errors.description} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                        {/* Kategori */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Tag className="h-5 w-5 text-indigo-500" /><Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Kategori</Label>
                                            </div>
                                            <Select 
                                                value={data.categoryId === null ? TANPA_KATEGORI_VALUE : data.categoryId} 
                                                onValueChange={(value) => setData('categoryId', value === TANPA_KATEGORI_VALUE ? null : value)}
                                            >
                                                <SelectTrigger className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 hover:border-slate-300 dark:hover:border-slate-500">
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
                                                <ShoppingCart className="h-5 w-5 text-pink-500" /><Label className="text-lg font-bold text-slate-700 dark:text-slate-300">Status Publikasi</Label>
                                            </div>
                                            <Select value={data.status} onValueChange={(value) => setData('status', value as ProductStatus)}>
                                                <SelectTrigger className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 hover:border-slate-300 dark:hover:border-slate-500">
                                                    <SelectValue placeholder="Pilih status" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl">
                                                    <SelectItem value="draft" className="text-lg py-3"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div>Draft</div></SelectItem>
                                                    <SelectItem value="published" className="text-lg py-3"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div>Dipublikasikan</div></SelectItem>
                                                    <SelectItem value="outofstock" className="text-lg py-3"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div>Stok Habis</div></SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.status} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                    </div>
                                </div>
                                {/* Tombol Submit */}
                                <div className="pt-8 border-t-2 border-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div className="text-slate-600 dark:text-slate-400"><p className="text-sm">Simpan perubahan untuk memperbarui produk</p></div>
                                        <Button type="submit" disabled={processing} className="group h-14 px-10 text-lg font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-600 hover:from-purple-600 hover:via-pink-600 hover:to-rose-700 text-white rounded-xl shadow-xl shadow-purple-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]">
                                            {processing ? (<><LoaderCircle className="mr-3 h-6 w-6 animate-spin" />Menyimpan...</>) : (<><Save className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />Simpan Perubahan<CheckCircle className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" /></>)}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Manajemen Foto Produk (Menggunakan PhotoProductController) */}
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden">
                        {/* ... (Header Foto Produk tetap sama) ... */}
                        <div className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-slate-800/50 dark:to-slate-700/50 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center"><Camera className="h-4 w-4 text-white" /></div>
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Foto Produk</h2>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30">
                                    <ImageIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" /><span className="text-sm font-medium text-blue-700 dark:text-blue-300">{product.photos?.length || 0} Foto</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 lg:p-10">
                            {/* ... (Form Unggah Foto Baru tetap sama, onSubmit mengarah ke handlePhotoUploadSubmit) ... */}
                            <div className="mb-12 relative">
                                <div className="bg-gradient-to-br from-slate-50/80 to-blue-50/80 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl border-2 border-dashed border-blue-300/50 dark:border-blue-600/50 p-8 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-700/50">
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center"><Upload className="h-8 w-8 text-white" /></div>
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Unggah Foto Baru</h3>
                                        <p className="text-slate-600 dark:text-slate-400">Tambahkan visual yang menarik untuk produk Anda.</p>
                                    </div>
                                    <form onSubmit={handlePhotoUploadSubmit} className="space-y-6">
                                        {/* Input File */}
                                        <div>
                                            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Pilih Foto (bisa lebih dari satu)
                                            </Label>
                                            <Input
                                                id="photoFiles"
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handlePhotoFileChange}
                                                className="mt-1 block w-full"
                                            />
                                            {uploadErrors.photos && (
                                                <InputError
                                                    message={Array.isArray(uploadErrors.photos) ? uploadErrors.photos.join(', ') : uploadErrors.photos}
                                                />
                                            )}
                                        </div>

                                        {/* Input Judul */}
                                        <div>
                                            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Judul Foto
                                            </Label>
                                            <Input
                                                id="photoTitle"
                                                type="text"
                                                value={photoTitles} 
                                                onChange={handlePhotoFileChange}
                                                placeholder="Judul untuk semua foto"
                                                className="mt-1 block w-full"
                                            />
                                            {uploadErrors.title && <InputError message={uploadErrors.title} />}
                                        </div>

                                        {/* Input Display Order */}
                                        <div>
                                            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Urutan Tampil (semua)
                                            </Label>
                                            <Input
                                                id="photoDisplayOrder"
                                                type="number"
                                                value={photoDisplayOrders.join(', ')} 
                                                onChange={handlePhotoDisplayOrdersChange}
                                                placeholder="0"
                                                min="0"
                                                className="mt-1 block w-full"
                                            />
                                            {uploadErrors.displayOrder && <InputError message={uploadErrors.displayOrder} />}
                                        </div>

                                        {/* Preview Foto */}
                                        {previewUrls.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Preview Foto Terpilih</h4>
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
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Tombol Submit */}
                                        <div className="pt-4">
                                            <Button
                                                type="submit"
                                                disabled={isUploadingPhotos || photoFiles.length === 0}
                                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isUploadingPhotos ? 'Mengunggah...' : 'Unggah Foto'}
                                            </Button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            {/* Galeri Foto Saat Ini */}
                            {/* Pastikan product.photos[index].slug tersedia dan benar */}
                            {product.photos && product.photos.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center"><Star className="h-3 w-3 text-white" /></div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Foto Saat Ini</h3>
                                        <div className="flex-1 h-px bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800"></div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {product.photos.map((photo) => ( // `photo` adalah objek ProductPhoto
                                            <div key={photo.id} className="group relative bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 dark:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-300 dark:hover:border-purple-600 hover:-translate-y-2">
                                                <div className="relative mb-4 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                                                    <img src={`/storage/${photo.filePath}`} alt={photo.title || `Foto produk ${photo.id}`} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                                            <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm"><GripVertical className="h-3 w-3 text-white" /><span className="text-xs font-medium text-white">Urutan: {photo.displayOrder || 0}</span></div>
                                                            {/* Menggunakan photo.slug untuk deletePhoto */}
                                                            <button onClick={() => deletePhoto(photo.slug)} className="w-8 h-8 bg-red-500/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm" title="Hapus foto"><Trash2 className="h-4 w-4" /></button>
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-3 left-3 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">{photo.displayOrder || 0}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{photo.title || `Foto ${photo.id}`}</h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* ... (Kondisi Jika Tidak Ada Foto tetap sama) ... */}
                             {(!product.photos || product.photos.length === 0) && (
                                <div className="text-center py-16">
                                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center"><ImageIcon className="h-12 w-12 text-slate-400 dark:text-slate-500" /></div>
                                    <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">Belum Ada Foto</h3>
                                    <p className="text-slate-500 dark:text-slate-500 mb-6">Unggah foto untuk menampilkan produk Anda.</p>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg"><AlertCircle className="h-4 w-4" />Gunakan form unggah di atas untuk menambahkan foto.</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}