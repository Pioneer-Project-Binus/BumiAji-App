import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps,  } from '@/types';
import { type PhotoProduct, type Product } from '@/types/types-photoProducts';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { FormEventHandler, useState, ChangeEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoaderCircle, ImageIcon, ArrowLeft, Save, UploadCloud, FileText, ListOrdered, Image as ImageIconPreview } from 'lucide-react';

import photoProductsRoutes from '@/routes/photo-products';
import adminProducts from '@/routes/products';
import { dashboard } from '@/routes';

const BREADCRUMBS_BASE: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: dashboard().url },
    { title: 'Photo Product Management', href: photoProductsRoutes.index().url },
];

interface EditPhotoProductForm {
    productId: string | null;
    title: string;
    photo: File | null; // Single file for update
    displayOrder: string | number;
    _method: 'PUT'; // For Laravel method spoofing with POST
}

interface Props extends InertiaSharedProps {
    photoProduct: PhotoProduct;
    products: Product[];
}

export default function PhotoProductEdit({ photoProduct, products }: Props) {
    const { errors: pageErrors } = usePage().props;
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
        ...BREADCRUMBS_BASE,
        // Dynamic breadcrumb for the specific photo if needed
        { title: photoProduct.title, href: photoProductsRoutes.show(photoProduct.slug).url },
        { title: 'Edit Photo', href: photoProductsRoutes.edit(photoProduct.slug).url },
    ]);
    
    const { data, setData, post, processing, errors, reset } = useForm<Required<EditPhotoProductForm>>({
        productId: String(photoProduct.productId),
        title: photoProduct.title,
        photo: null,
        displayOrder: photoProduct.displayOrder,
        _method: 'PUT',
    });

    const [photoPreview, setPhotoPreview] = useState<string | null>(photoProduct.file_url || null);

    useEffect(() => {
        const product = products.find(p => String(p.id) === String(data.productId));
        const newBreadcrumbs = [...BREADCRUMBS_BASE];
        if (product) {
            // newBreadcrumbs.push({ title: `Product: ${product.productName}`, href: adminProducts.edit(product.slug).url });
        }
        newBreadcrumbs.push({ title: data.title || 'Untitled Photo', href: photoProductsRoutes.show(photoProduct.slug).url }); // Use current title or slug
        newBreadcrumbs.push({ title: 'Edit Photo', href: photoProductsRoutes.edit(photoProduct.slug).url });
        setBreadcrumbs(newBreadcrumbs);
    }, [data.productId, data.title, products, photoProduct.slug]);


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('photo', file);
            setPhotoPreview(URL.createObjectURL(file));
        } else {
            setData('photo', null);
            setPhotoPreview(photoProduct.file_url || null); // Revert to original if selection is cleared
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // For PUT with file uploads, Inertia's post method correctly handles FormData
        // The '_method': 'PUT' field will be included.
        post(photoProductsRoutes.update(photoProduct.slug).url, {
            forceFormData: true, // Ensure FormData is used for file upload
            onError: (formErrors) => {
                // console.error("Form submission error:", formErrors);
            },
            preserveScroll: true,
        });
    };
    
    const parentProductSlug = data.productId ? products.find(p => String(p.id) === String(data.productId))?.slug : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin: Edit Photo - ${photoProduct.title}`} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/50 to-blue-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/50">
                <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-8 lg:py-12">
                     <div className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                             <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-white shadow-2xl shadow-blue-500/25">
                                    <ImageIcon className="h-8 w-8" />
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                                        Edit Photo
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                        Update details for "{photoProduct.title}".
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Link
                            href={parentProductSlug ? adminProducts.edit(parentProductSlug).url : photoProductsRoutes.index().url}
                            className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 backdrop-blur-sm"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                             {parentProductSlug ? 'Back to Product Edit' : 'Back to Photo List'}
                        </Link>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden">
                        <div className="bg-gradient-to-r from-sky-50/80 to-blue-50/80 dark:from-slate-800/50 dark:to-slate-700/50 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center">
                                    <FileText className="h-4 w-4 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Photo Details</h2>
                            </div>
                        </div>

                        <div className="p-8 lg:p-10">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <Label htmlFor="productId" className="block text-lg font-bold text-slate-700 dark:text-slate-300 mb-3">
                                        Associated Product <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.productId || ''}
                                        onValueChange={(value) => setData('productId', value)}
                                    >
                                        <SelectTrigger className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm focus:border-blue-500">
                                            <SelectValue placeholder="Select a product" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md">
                                            {products.map((product) => (
                                                <SelectItem key={product.id} value={String(product.id)} className="text-lg py-3">
                                                    {product.productName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.productId || pageErrors?.productId} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="title" className="block text-lg font-bold text-slate-700 dark:text-slate-300 mb-3">
                                        Photo Title <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm focus:border-blue-500"
                                        placeholder="Enter photo title"
                                    />
                                    <InputError message={errors.title || pageErrors?.title} className="mt-2" />
                                </div>
                                
                                <div>
                                    <Label htmlFor="displayOrder" className="block text-lg font-bold text-slate-700 dark:text-slate-300 mb-3">
                                        Display Order
                                    </Label>
                                    <Input
                                        id="displayOrder"
                                        type="number"
                                        value={data.displayOrder}
                                        onChange={(e) => setData('displayOrder', e.target.value)}
                                        className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm focus:border-blue-500"
                                        placeholder="e.g., 1, 2, 3"
                                        min="0"
                                    />
                                    <InputError message={errors.displayOrder || pageErrors?.displayOrder} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="photo" className="block text-lg font-bold text-slate-700 dark:text-slate-300 mb-3">
                                        Replace Photo (Optional)
                                    </Label>
                                    <div className="flex items-center gap-6">
                                        {photoPreview ? (
                                            <img src={photoPreview} alt="Current photo" className="w-32 h-32 object-cover rounded-xl shadow-md border border-slate-200 dark:border-slate-600" />
                                        ) : (
                                            <div className="w-32 h-32 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-500 border border-dashed border-slate-300 dark:border-slate-600">
                                                <ImageIconPreview size={48} />
                                            </div>
                                        )}
                                        <Input
                                            id="photo"
                                            type="file"
                                            onChange={handleFileChange}
                                            className="block w-full text-lg text-slate-700 dark:text-slate-300 file:mr-4 file:py-3 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-800/50 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-700/60 cursor-pointer border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 p-0 focus:border-blue-500"
                                        />
                                    </div>
                                     <InputError message={errors.photo || pageErrors?.photo} className="mt-2" />
                                </div>


                                <div className="pt-8 border-t-2 border-slate-200/80 dark:border-slate-700/50">
                                    <div className="flex flex-col sm:flex-row items-center justify-end gap-6">
                                        <Button
                                            type="submit"
                                            disabled={processing || !data.productId}
                                            className="group h-14 px-10 text-lg font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-xl shadow-blue-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none min-w-[220px]"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-3 h-6 w-6 animate-spin" />
                                                    Saving Changes...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                                                    Save Changes
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                     {!data.productId && <p className="text-sm text-red-500 mt-4 text-right">Associated product is required.</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}