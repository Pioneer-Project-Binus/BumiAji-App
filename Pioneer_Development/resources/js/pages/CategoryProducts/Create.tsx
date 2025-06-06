// resources/js/Pages/CategoryProducts/Create.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps, type CategoryProduct } from '@/types';
import { Head, Link, useForm, router } from '@inertiajs/react';
import React, { FormEventHandler, useEffect } from 'react';

// UI Components (assuming you have these, similar to your Product create)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle, Tag, ArrowLeft, Sparkles, FileText, CheckCircle } from 'lucide-react'; // Added CheckCircle
import categoryProducts from '@/routes/category-products'; // Updated import
import { toast } from 'sonner'; 
import { dashboard } from '@/routes';

interface CreateCategoryForm {
    name: string;
    description: string;
}

interface Props extends InertiaSharedProps {
    // No specific props needed for create, errors are handled by useForm
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: dashboard().url },
    { title: 'Category Management', href: categoryProducts.index().url },
    { title: 'Add New Category', href: categoryProducts.create().url },
];

export default function CategoryProductCreate({ errors: pageErrors }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateCategoryForm>>({
        name: '',
        description: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(categoryProducts.store().url, {
            onSuccess: () => {
                toast.success('Category created successfully!');
                reset(); // Reset form after successful submission
                // router.visit(categoryProducts.index().url); // Or redirect
            },
            onError: (errs) => {
                console.error(errs);
                toast.error('Failed to create category. Please check the form.');
            },
        });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Add New Category" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/50 to-slate-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-gray-950/50">
                {/* Background Decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-sky-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-lime-400/20 to-emerald-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 lg:py-12">
                    {/* Enhanced Header Section */}
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-white shadow-2xl shadow-sky-500/25">
                                        <Tag className="h-8 w-8" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                        <Sparkles className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                                        Add New Category
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                        Organize your products with a new category.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <Link
                            href={categoryProducts.index().url}
                            className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-0.5 backdrop-blur-sm"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Categories
                        </Link>
                    </div>

                    {/* Enhanced Main Form Card */}
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-sky-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-sky-50/80 to-blue-50/80 dark:from-slate-800/50 dark:to-slate-700/50 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center">
                                    <FileText className="h-4 w-4 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Category Information</h2>
                            </div>
                        </div>

                        <div className="p-8 lg:p-10">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                {/* Category Name */}
                                <div className="group">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Tag className="h-5 w-5 text-sky-500" />
                                        <Label htmlFor="name" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                            Category Name
                                        </Label>
                                    </div>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                        placeholder="e.g., Electronics, Apparel, Books"
                                        required
                                    />
                                    <InputError message={errors.name || pageErrors?.name} className="mt-3 text-red-500 font-medium" />
                                </div>

                                {/* Description */}
                                <div className="group">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FileText className="h-5 w-5 text-indigo-500" />
                                        <Label htmlFor="description" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                            Description (Optional)
                                        </Label>
                                    </div>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="min-h-[120px] text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 resize-none"
                                        placeholder="A brief description of the category..."
                                    />
                                    <InputError message={errors.description || pageErrors?.description} className="mt-3 text-red-500 font-medium" />
                                </div>
                                
                                {/* Enhanced Submit Section */}
                                <div className="pt-8 border-t-2 border-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600">
                                    <div className="flex flex-col sm:flex-row items-center justify-end gap-6">
                                        <Button 
                                            type="submit" 
                                            disabled={processing} 
                                            className="group h-14 px-10 text-lg font-bold bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 hover:from-sky-600 hover:via-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-xl shadow-sky-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-3 h-6 w-6 animate-spin" />
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                                                    Create Category
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