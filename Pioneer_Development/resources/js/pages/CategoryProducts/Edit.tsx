// resources/js/Pages/CategoryProductss/Edit.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type CategoryProduct, type InertiaSharedProps } from '@/types';
import { Head, Link, useForm, router } from '@inertiajs/react';
import React, { FormEventHandler, useEffect } from 'react';
// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle, Tag, ArrowLeft, Sparkles, FileText, Edit3, Trash2 } from 'lucide-react'; // Added Edit3, Trash2
import categoryProductss from '@/routes/category-products';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog"
import { dashboard } from '@/routes';

import {
    AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog"

let categoryProductsRoutes = categoryProductss;

interface EditCategoryForm {
    name: string;
    description: string;
}

interface Props extends InertiaSharedProps {
    categoryProduct: CategoryProduct;
}

export default function CategoryProductsEdit({ categoryProduct, errors: pageErrors }: Props) {
    const { data, setData, put, processing, errors, reset } = useForm<Required<EditCategoryForm>>({
        name: categoryProduct.name || '',
        description: categoryProduct.description || '',
    });



    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin Dashboard', href: dashboard().url },
        { title: 'Category Management', href: categoryProductsRoutes.index().url },
        { title: categoryProduct.name, href: categoryProductsRoutes.show(categoryProduct.slug).url },
        { title: 'Edit', href: categoryProductsRoutes.edit(categoryProduct.slug).url },
    ];

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(categoryProductsRoutes.update(categoryProduct.slug).url, {
            onSuccess: () => {
                toast.success('Category updated successfully!');
                // Optionally, redirect or reset form if needed
                // router.visit(categoryProductsRoutes.index().url);
            },
            onError: () => {
                toast.error('Failed to update category. Please check the form.');
            },
        });
    };

    const handleDelete = () => {
        router.delete(categoryProductsRoutes.destroy(categoryProduct.slug).url, {
            onSuccess: () => {
                toast.success('Category deleted successfully!');
                // router.visit(categoryProductsRoutes.index().url); // This will happen automatically on redirect from controller
            },
            onError: () => {
                toast.error('Failed to delete category.');
            },
            preserveScroll: true, // Keep scroll position if deletion happens on the same page (e.g. index)
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin: Edit Category - ${categoryProduct.name}`} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/50 to-slate-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-gray-950/50">
                {/* Background Decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-red-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 lg:py-12">
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 text-white shadow-2xl shadow-yellow-500/25">
                                        <Edit3 className="h-8 w-8" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
                                        Edit Category
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                        Modify the details for "{categoryProduct.name}".
                                    </p>
                                </div>
                            </div>
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="lg" className="group text-base font-semibold">
                                        <Trash2 className="h-5 w-5 mr-2 transition-transform group-hover:rotate-[-10deg]" />
                                        Delete Category
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action will mark the category "{categoryProduct.name}" as deleted.
                                            It won't be permanently removed immediately and might be recoverable, but it will not be available for new products.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDelete}
                                            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                                        >
                                            Yes, Delete Category
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        
                        <Link
                            href={categoryProductsRoutes.index().url}
                            className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-0.5 backdrop-blur-sm"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Categories
                        </Link>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-yellow-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden">
                        <div className="bg-gradient-to-r from-yellow-50/80 to-orange-50/80 dark:from-slate-800/50 dark:to-slate-700/50 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center">
                                    <FileText className="h-4 w-4 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Update Category Information</h2>
                            </div>
                        </div>

                        <div className="p-8 lg:p-10">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                {/* Category Name */}
                                <div className="group">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Tag className="h-5 w-5 text-yellow-500" />
                                        <Label htmlFor="name" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                            Category Name
                                        </Label>
                                    </div>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                        required
                                    />
                                    <InputError message={errors.name || pageErrors?.name} className="mt-3 text-red-500 font-medium" />
                                </div>

                                {/* Description */}
                                <div className="group">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FileText className="h-5 w-5 text-orange-500" />
                                        <Label htmlFor="description" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                            Description (Optional)
                                        </Label>
                                    </div>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="min-h-[120px] text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 resize-none"
                                    />
                                    <InputError message={errors.description || pageErrors?.description} className="mt-3 text-red-500 font-medium" />
                                </div>
                                
                                <div className="pt-8 border-t-2 border-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600">
                                    <div className="flex flex-col sm:flex-row items-center justify-end gap-6">
                                        <Button 
                                            type="submit" 
                                            disabled={processing} 
                                            className="group h-14 px-10 text-lg font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 hover:from-yellow-600 hover:via-orange-600 hover:to-red-700 text-white rounded-xl shadow-xl shadow-yellow-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-3 h-6 w-6 animate-spin" />
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    <Edit3 className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                                                    Update Category
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}