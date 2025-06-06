import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps, type Product } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { FormEventHandler, useState, ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoaderCircle, ImageIcon, ArrowLeft, Trash2, UploadCloud, FileText, Image, ListOrdered } from 'lucide-react';

import photoProductsRoutes from '@/routes/photo-products';
import productsRoutes from '@/routes/products';
import { dashboard } from '@/routes';

const BREADCRUMBS_BASE: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: dashboard().url },
    { title: 'Photo Product Management', href: photoProductsRoutes.index().url },
];

interface CreatePhotoProductForm {
    productId: string | null;
    photos: File[];
    titles: string[];
    displayOrders: (string | number)[];
}

interface Props extends InertiaSharedProps {
    products: Product[];
    selectedProductId?: string | number | null;
}

export default function PhotoProductCreate({ products, selectedProductId }: Props) {
    const { errors: pageErrors } = usePage().props;

    const href = selectedProductId
        ? photoProductsRoutes.create({ query: { productId: selectedProductId } }).url
        : photoProductsRoutes.create().url;

    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    ...BREADCRUMBS_BASE,
    { title: 'Add New Photo(s)', href }
    ]);

    const { data, setData, post, processing, errors, reset } = useForm<Required<CreatePhotoProductForm>>({
        productId: selectedProductId ? String(selectedProductId) : (products.length > 0 ? String(products[0].id) : null),
        photos: [],
        titles: [],
        displayOrders: [],
    });

    const objectUrlsRef = useRef<string[]>([]);

    const photoPreviews = useMemo(() => {
        objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
        const urls = data.photos.map(file => URL.createObjectURL(file));
        objectUrlsRef.current = urls;
        return urls;
    }, [data.photos]);

    useEffect(() => {
        return () => {
            objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
        };
    }, []);

    useEffect(() => {
        if (data.productId) {
            const product = products.find(p => String(p.id) === String(data.productId));
            const newBreadcrumbs = [...BREADCRUMBS_BASE];
            newBreadcrumbs.push({
            title: 'Add New Photo(s)',
            href: photoProductsRoutes.create({ query: { productId: data.productId } }).url,
            });
            setBreadcrumbs(newBreadcrumbs);
        }
    }, [data.productId, products]);


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);
        const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
        if (imageFiles.length === 0) return;

        setData(prev => ({
            ...prev,
            photos: [...prev.photos, ...imageFiles],
            titles: [...prev.titles, ...imageFiles.map(f => f.name.replace(/\.[^/.]+$/, "") || `Photo ${prev.titles.length + 1}`)],
            displayOrders: [...prev.displayOrders, ...imageFiles.map((_, i) => prev.displayOrders.length + i + 1)],
        }));

        e.target.value = '';
    };

    const removePhoto = (index: number) => {
        const removedUrl = objectUrlsRef.current[index];
        if (removedUrl) URL.revokeObjectURL(removedUrl);

        setData(prev => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index),
            titles: prev.titles.filter((_, i) => i !== index),
            displayOrders: prev.displayOrders.filter((_, i) => i !== index),
        }));
    };

    const handleTitleChange = (index: number, value: string) => {
        const newTitles = [...data.titles];
        newTitles[index] = value;
        setData('titles', newTitles);
    };

    const handleDisplayOrderChange = (index: number, value: string) => {
        const newDisplayOrders = [...data.displayOrders];
        newDisplayOrders[index] = value;
        setData('displayOrders', newDisplayOrders);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(photoProductsRoutes.store().url, {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    const parentProductSlug = data.productId ? products.find(p => String(p.id) === String(data.productId))?.slug : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Add Product Photo(s)" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/50 to-blue-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/50">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 lg:py-12">
                    <div className="mb-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-white shadow-2xl">
                                <UploadCloud className="h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Add New Photo(s)
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 text-lg mt-2">Upload images for your products.</p>
                            </div>
                        </div>
                        <Link
                            href={parentProductSlug ? productsRoutes.edit(parentProductSlug).url : photoProductsRoutes.index().url}
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 rounded-xl border hover:shadow-lg transition"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {parentProductSlug ? 'Back to Product Edit' : 'Back to Photo List'}
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow border overflow-hidden">
                        <div className="px-8 py-6 border-b">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center">
                                    <ImageIcon className="h-4 w-4" />
                                </div>
                                <h2 className="text-xl font-bold">Upload Details</h2>
                            </div>
                        </div>

                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div>
                                    <Label htmlFor="productId">Associated Product <span className="text-red-500">*</span></Label>
                                    <Select  value={data.productId || ''} onValueChange={v => setData('productId', v)}>
                                        <SelectTrigger id='productId'>
                                            <SelectValue placeholder="Select a product" />
                                        </SelectTrigger>
                                        <SelectContent >
                                            {products.map(p => (
                                                <SelectItem key={p.id} value={String(p.id)}>{p.productName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.productId || pageErrors?.productId} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="photos">Upload Photos <span className="text-red-500">*</span></Label>
                                    <Input id="photos" type="file" multiple onChange={handleFileChange} />
                                    <InputError message={errors.photos || pageErrors?.photos} className="mt-2" />
                                    {Object.entries(errors)
                                        .filter(([key]) => key.startsWith('photos.'))
                                        .map(([key, msg]) => <InputError key={key} message={msg} className="mt-1" />)}
                                </div>

                                {photoPreviews.length > 0 && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold">Selected Photos:</h3>
                                        {photoPreviews.map((previewUrl, index) => (
                                            <div key={index} className="flex gap-4 p-4 border rounded-lg">
                                                <img src={previewUrl} alt={`Preview ${index + 1}`} className="w-24 h-24 object-cover rounded" />
                                                <div className="flex-grow space-y-2">
                                                    <div>
                                                        <Label htmlFor={`title-${index}`}>Title</Label>
                                                        <Input
                                                            id={`title-${index}`}
                                                            value={data.titles[index] || ''}
                                                            onChange={(e) => handleTitleChange(index, e.target.value)}
                                                        />
                                                        <InputError message={(errors as any)?.[`titles.${index}`]} className="mt-1" />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`displayOrder-${index}`}>Display Order</Label>
                                                        <Input
                                                            id={`displayOrder-${index}`}
                                                            type="number"
                                                            value={data.displayOrders[index] || ''}
                                                            onChange={(e) => handleDisplayOrderChange(index, e.target.value)}
                                                            min="0"
                                                        />
                                                        <InputError message={(errors as any)?.[`displayOrders.${index}`]} className="mt-1" />
                                                    </div>
                                                </div>
                                                <Button variant="ghost" type="button" onClick={() => removePhoto(index)} className="text-red-600">
                                                    <Trash2 />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="pt-8 border-t">
                                    <Button
                                        type="submit"
                                        disabled={processing || data.photos.length === 0 || !data.productId}
                                        className="w-full sm:w-auto"
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="mr-2 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <UploadCloud className="mr-2" />
                                                Upload Photo(s)
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
