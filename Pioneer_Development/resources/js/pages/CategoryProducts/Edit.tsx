import React, { FormEventHandler, useEffect, useMemo, useRef } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { toast } from 'sonner';

// Import jQuery and Summernote
import $ from 'jquery';
import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite.js';

// Layout dan Tipe Data
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type CategoryProduct, type InertiaSharedProps } from '@/types';
import InputError from '@/components/input-error';
import categoryProductsRoutes from '@/routes/category-products';
import { dashboard } from '@/routes';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle, Tag, ArrowLeft, Sparkles, FileText, Edit3, Trash2, Leaf, TreePine, Zap } from 'lucide-react';

// Imports for AlertDialog from shadcn/ui
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Memperluas interface Window untuk mengenali jQuery ($) dari CDN
declare global {
    interface Window {
        jQuery: any;
        $: any;
    }
}

interface EditCategoryForm {
    name: string;
    description: string;
}

interface Props extends InertiaSharedProps {
    categoryProduct: CategoryProduct;
}

export default function CategoryProductsEdit({ categoryProduct, errors: pageErrors }: Props) {
    const { data, setData, put, processing, errors } = useForm<Required<EditCategoryForm>>({
        name: categoryProduct.name || '',
        description: categoryProduct.description || '',
    });

    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Admin Dashboard', href: dashboard().url },
        { title: 'Category Management', href: categoryProductsRoutes.index().url },
        { title: categoryProduct.name, href: categoryProductsRoutes.show(categoryProduct.slug).url },
        { title: 'Edit', href: categoryProductsRoutes.edit(categoryProduct.slug).url },
    ], [categoryProduct]);

    // Ref untuk textarea yang akan diubah menjadi Summernote
    const summernoteRef = useRef<HTMLTextAreaElement>(null);

    // Efek untuk memuat, inisialisasi, dan membersihkan Summernote dari CDN
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
                // Inisialisasi Summernote
                window.$(summernoteRef.current).summernote({
                    tooltip: false, 
                    height: 300, // Tinggi editor
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
    }, [data.description]); // Tambahkan data.description sebagai dependency agar Summernote terupdate jika data berubah dari luar

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(categoryProductsRoutes.update(categoryProduct.slug).url, {
            onSuccess: () => {
                toast.success('✅ Kategori berhasil diperbarui!');
            },
            onError: () => {
                toast.error('❌ Gagal memperbarui kategori');
            },
        });
    };

    const handleDelete = () => {
        router.delete(categoryProductsRoutes.destroy(categoryProduct.slug).url, {
            onSuccess: () => toast.success('🗑️ Kategori berhasil dihapus!'),
            onError: () => toast.error('❌ Gagal menghapus kategori'),
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin: Edit Category - ${categoryProduct.name}`} />

            <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-green-50/50 to-teal-50/70 dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-900">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                </div>

                <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-8 lg:py-12">
                    <div className="mb-10">
                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-8">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                                    <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white shadow-2xl shadow-emerald-500/25 transform group-hover:scale-105 transition-transform duration-300">
                                        <Edit3 className="h-9 w-9" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <TreePine className="h-5 w-5 text-emerald-600" />
                                        <span className="text-sm font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                                            Manajemen Kategori
                                        </span>
                                    </div>
                                    <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                                        Edit Kategori
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 mt-3 text-lg font-medium">
                                        Perbarui informasi untuk kategori "{categoryProduct.name}"
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button 
                                            variant="destructive" 
                                            size="lg" 
                                            className="group text-base font-bold h-14 px-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transform hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <Trash2 className="h-5 w-5 mr-3 transition-transform group-hover:rotate-[-15deg]" />
                                            Hapus Kategori
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className="text-2xl font-bold text-red-600 flex items-center gap-3">
                                                <Trash2 className="h-6 w-6" />
                                                Konfirmasi Penghapusan
                                            </AlertDialogTitle>
                                            <AlertDialogDescription className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                                Apakah Anda yakin ingin menghapus kategori "{categoryProduct.name}"? 
                                                <br />
                                                <strong className="text-red-600">Tindakan ini tidak dapat dibatalkan.</strong>
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete}>Ya, Hapus Kategori</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                        
                        <Link
                            href={categoryProductsRoutes.index().url}
                            className="group inline-flex items-center gap-3 px-6 py-4 text-base font-bold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 rounded-2xl border-2 border-emerald-200/50 dark:border-slate-700/50 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 backdrop-blur-sm"
                        >
                            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-2" />
                            <span>Kembali ke Daftar Kategori</span>
                        </Link>
                    </div>

                    <div className="mt-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-emerald-500/5 border-2 border-emerald-200/50 dark:border-slate-700/50 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-50/80 via-green-50/80 to-teal-50/80 dark:from-slate-800/50 dark:via-emerald-900/20 dark:to-slate-800/50 px-8 py-6 border-b-2 border-emerald-200/50 dark:border-slate-700/50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                                    <FileText className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                        Informasi Kategori
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                                        Lengkapi form di bawah untuk memperbarui kategori
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 lg:p-12">
                            <form onSubmit={handleSubmit} className="space-y-12">
                                {/* Category Name */}
                                <div className="group space-y-4">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
                                            <Tag className="h-4 w-4 text-white" />
                                        </div>
                                        <Label htmlFor="name" className="text-xl font-bold text-slate-700 dark:text-slate-300">
                                            Nama Kategori
                                        </Label>
                                        <span className="text-red-500 font-bold">*</span>
                                    </div>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama kategori..."
                                        className="h-16 text-lg font-medium border-2 border-slate-200 dark:border-slate-600 rounded-2xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 px-6"
                                        required
                                    />
                                    <InputError message={errors.name || pageErrors?.name} className="mt-3 text-red-500 font-semibold text-base" />
                                </div>

                                {/* Description Field with Summernote */}
                                <div className="group space-y-4">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
                                            <FileText className="h-4 w-4 text-white" />
                                        </div>
                                        <Label htmlFor="description" className="text-xl font-bold text-slate-700 dark:text-slate-300">
                                            Deskripsi Kategori
                                        </Label>
                                        <span className="text-slate-400 text-sm font-medium bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                                            Opsional
                                        </span>
                                    </div>
                                    
                                    {/* Textarea ini akan digantikan oleh Summernote */}
                                    <textarea
                                        ref={summernoteRef}
                                        id="description"
                                        defaultValue={data.description}
                                        className="hidden"
                                    />
                                    <InputError message={errors.description || pageErrors?.description} className="mt-3 text-red-500 font-semibold text-base" />
                                </div>
                                
                                <div className="pt-8 border-t-2 border-dashed border-emerald-200 dark:border-slate-700">
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                        <Button 
                                            type="submit" 
                                            disabled={processing} 
                                            className="group h-16 px-12 text-lg font-bold bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 text-white rounded-2xl shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[240px] relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-3 h-6 w-6 animate-spin relative z-10" />
                                                    <span className="relative z-10">Memperbarui...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Leaf className="mr-3 h-6 w-6 transition-transform group-hover:scale-110 relative z-10" />
                                                    <span className="relative z-10">Perbarui Kategori</span>
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