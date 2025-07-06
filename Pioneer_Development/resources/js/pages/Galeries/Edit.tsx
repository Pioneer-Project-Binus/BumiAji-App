import React, { FormEventHandler, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { type Galery } from '@/types'; // Asumsi Anda punya tipe Galery

// Import jQuery and Summernote directly
import $ from 'jquery';
import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite.js';

// IMPORTANT: Expose jQuery globally for Summernote
window.jQuery = $;
window.$ = $;

// Layout dan Tipe Data
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps } from '@/types';
import galeriesRoutes from '@/routes/galeries';
import { dashboard } from '@/routes';
import InputError from '@/components/input-error';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle, Image as ImageIcon, Video, Tag, GalleryVertical, PlusCircle, Sparkles, Upload, FileText } from 'lucide-react';

// Memperluas interface Window untuk mengenali jQuery ($)
declare global {
    interface Window {
        jQuery: any;
        $: any;
    }
}

// Struktur data form untuk Edit Galeri
interface EditGaleryForm {
    title: string;
    description: string;
    type: 'photo' | 'video';
    filePath: File | null; // Untuk upload foto baru
    videoUrl: string;      // Untuk URL video
    displayOrder: number | '';
}

// Props komponen
interface Props extends InertiaSharedProps {
    galery: Galery;
    errors: {
        title?: string;
        description?: string;
        type?: string;
        filePath?: string;
        videoUrl?: string;
        displayOrder?: string;
    };
}

export default function GaleryEdit({ galery, errors: pageErrors }: Props) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Galeries', href: galeriesRoutes.index().url },
        { title: 'Edit Galery Item', href: galeriesRoutes.edit(galery.slug).url },
    ], [galery.slug]);

    const { data, setData, put, processing, reset, clearErrors, errors } = useForm<EditGaleryForm>({
        title: galery.title,
        description: galery.description || '',
        type: galery.type,
        filePath: null, // Set null saat edit
        videoUrl: galery.type === 'video' ? galery.filePath : '',
        displayOrder: galery.displayOrder !== null ? galery.displayOrder : '',
    });

    const summernoteRef = useRef<HTMLTextAreaElement>(null);
    const [isSummernoteReady, setIsSummernoteReady] = useState(false);
    const summernoteInitialized = useRef(false);

    const handleSummernoteChange = useCallback((contents: string) => {
        if (contents !== data.description) {
            setData('description', contents);
        }
    }, [data.description, setData]);

    useEffect(() => {
        if (summernoteRef.current && window.$ && typeof window.$.fn.summernote === 'function' && !summernoteInitialized.current) {
            if (window.$(summernoteRef.current).data('summernote')) {
                window.$(summernoteRef.current).summernote('destroy');
            }

            window.$(summernoteRef.current).summernote({
                tooltip: false,
                height: 300,
                placeholder: 'Tulis deskripsi item galeri dengan detail yang menarik...',
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
                        if (data.description) {
                            window.$(summernoteRef.current).summernote('code', data.description);
                        }
                        setIsSummernoteReady(true);
                        summernoteInitialized.current = true;
                    },
                },
            });
        }

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
    }, []);

    useEffect(() => {
        if (isSummernoteReady && summernoteRef.current && window.$) {
            const currentContent = window.$(summernoteRef.current).summernote('code');
            if (currentContent !== data.description && data.description !== undefined) {
                window.$(summernoteRef.current).summernote('code', data.description);
            }
        }
    }, [data.description, isSummernoteReady]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        let descriptionContent = data.description;
        if (summernoteRef.current && window.$ && isSummernoteReady) {
            descriptionContent = window.$(summernoteRef.current).summernote('code');
        }

        put(galeriesRoutes.update(galery.slug).url, {
            ...data,
            description: descriptionContent,
        }, {
            onSuccess: () => {
                toast.success('Item galeri berhasil diperbarui!');
                clearErrors();
            },
            onError: (formErrors) => {
                console.error("Form errors:", formErrors);
                toast.error('Terjadi kesalahan. Periksa kembali isian form Anda.');
            },
        });
    };

    const handleTypeChange = (newType: 'photo' | 'video') => {
        setData('type', newType);
        if (newType === 'photo') {
            setData('videoUrl', '');
        } else {
            setData('filePath', null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin: Edit ${galery.title}`} />

            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-slate-900 dark:via-emerald-900/20 dark:to-gray-900 relative overflow-hidden">
                {/* Animated Background Elements (sama seperti di Create) */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-300/10 to-emerald-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <div className="relative z-10 flex justify-center items-center min-h-screen py-12 px-4">
                    <div className="w-full max-w-5xl">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl mb-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
                                <GalleryVertical className="w-12 h-12 text-white" />
                            </div>
                            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 animate-pulse">
                                Edit Item Galeri
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                                Ubah detail item galeri agar tetap relevan dan menarik.
                            </p>
                            <div className="flex justify-center mt-6">
                                <div className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-4 py-2 rounded-full">
                                    <Sparkles className="w-5 h-5 text-emerald-600" />
                                    <span className="text-emerald-700 dark:text-emerald-300 font-medium">Sempurnakan Tampilan</span>
                                </div>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-white/90 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-emerald-200/50 dark:border-emerald-700/50 space-y-10 relative overflow-hidden"
                        >
                            {/* Decorative Elements (sama seperti di Create) */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
                            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-xl"></div>
                            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-teal-400/10 to-blue-400/10 rounded-full blur-xl"></div>

                            {/* Title Field */}
                            <div className="space-y-4 group">
                                <Label htmlFor="title" className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3 group-hover:text-emerald-600 transition-colors duration-300">
                                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg"></div>
                                    <FileText className="w-5 h-5" />
                                    Judul Item Galeri
                                </Label>
                                <Input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    className="w-full px-6 py-5 border-2 border-emerald-200 dark:border-slate-600 rounded-2xl focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-500 transition-all duration-300 text-gray-800 dark:text-gray-200 text-lg placeholder-gray-400 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm shadow-inner hover:shadow-lg group-hover:border-emerald-300"
                                    placeholder="Masukkan judul galeri yang menarik..."
                                    required
                                />
                                <InputError message={errors.title || pageErrors?.title} className="mt-2" />
                            </div>

                            {/* Type Selection */}
                            <div className="space-y-4 group">
                                <Label className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3 group-hover:text-teal-600 transition-colors duration-300">
                                    <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full shadow-lg"></div>
                                    <Tag className="w-5 h-5" />
                                    Tipe Galeri
                                </Label>
                                <div className="flex items-center space-x-8">
                                    <div className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200 dark:hover:border-emerald-700">
                                        <input
                                            type="radio"
                                            id="typePhoto"
                                            name="type"
                                            value="photo"
                                            checked={data.type === 'photo'}
                                            onChange={() => handleTypeChange('photo')}
                                            className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-600 dark:bg-slate-700"
                                        />
                                        <Label htmlFor="typePhoto" className="ml-3 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 cursor-pointer">
                                            <ImageIcon className="h-5 w-5 text-emerald-600" />
                                            Foto
                                        </Label>
                                    </div>
                                    <div className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200 dark:hover:border-emerald-700">
                                        <input
                                            type="radio"
                                            id="typeVideo"
                                            name="type"
                                            value="video"
                                            checked={data.type === 'video'}
                                            onChange={() => handleTypeChange('video')}
                                            className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-600 dark:bg-slate-700"
                                        />
                                        <Label htmlFor="typeVideo" className="ml-3 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 cursor-pointer">
                                            <Video className="h-5 w-5 text-emerald-600" />
                                            Video
                                        </Label>
                                    </div>
                                </div>
                                <InputError message={errors.type || pageErrors?.type} className="mt-2" />
                            </div>

                            {/* Conditional File/Video URL Field */}
                            {data.type === 'photo' ? (
                                <div className="space-y-4 group">
                                    <Label htmlFor="filePath" className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3 group-hover:text-emerald-600 transition-colors duration-300">
                                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg"></div>
                                        <Upload className="w-5 h-5" />
                                        Ubah File Foto (Opsional)
                                    </Label>
                                    <div className="relative flex justify-center">
                                        <Input
                                            type="file"
                                            id="filePath"
                                            name="filePath"
                                            placeholder='Pilih file foto baru jika ingin mengubah...'
                                            onChange={(e) => setData('filePath', e.target.files ? e.target.files?.[0] : null)}
                                            className="w-full px-5 pb-8 border-2 border-emerald-200 dark:border-slate-600 rounded-2xl focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-500 transition-all duration-300 text-gray-800 dark:text-gray-200 text-lg placeholder-gray-400 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm shadow-inner hover:shadow-lg group-hover:border-emerald-300 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-emerald-500 file:to-teal-500 file:text-white hover:file:from-emerald-600 hover:file:to-teal-600 file:shadow-lg file:transition-all file:duration-300"
                                            accept="image/*"
                                        />
                                    </div>
                                    <InputError message={errors.filePath || pageErrors?.filePath} className="mt-2" />
                                </div>
                            ) : (
                                <div className="space-y-4 group">
                                    <Label htmlFor="videoUrl" className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3 group-hover:text-teal-600 transition-colors duration-300">
                                        <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full shadow-lg"></div>
                                        <Video className="w-5 h-5" />
                                        URL Video
                                    </Label>
                                    <Input
                                        type="url"
                                        id="videoUrl"
                                        name="videoUrl"
                                        value={data.videoUrl}
                                        onChange={(e) => setData("videoUrl", e.target.value)}
                                        className="w-full px-6 py-5 border-2 border-emerald-200 dark:border-slate-600 rounded-2xl focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-500 transition-all duration-300 text-gray-800 dark:text-gray-200 text-lg placeholder-gray-400 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm shadow-inner hover:shadow-lg group-hover:border-emerald-300"
                                        placeholder="https://www.youtube.com/watch?v=xxxxxxxx"
                                    />
                                    <InputError message={errors.videoUrl || pageErrors?.videoUrl} className="mt-2" />
                                </div>
                            )}

                            {/* Description Field with Summernote */}
                            <div className="space-y-4 group">
                                <Label htmlFor="description" className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3 group-hover:text-teal-600 transition-colors duration-300">
                                    <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full shadow-lg"></div>
                                    <FileText className="w-5 h-5" />
                                    Deskripsi Item Galeri (Opsional)
                                </Label>
                                <div className="relative">
                                    <Textarea
                                        ref={summernoteRef}
                                        id="description"
                                        name="description"
                                        defaultValue={data.description}
                                        className="w-full min-h-[300px] border-2 border-emerald-200 dark:border-slate-600 rounded-2xl focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-500 transition-all duration-300 text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm shadow-inner"
                                        placeholder="Tulis deskripsi item galeri dengan detail yang menarik..."
                                    />
                                </div>
                                <InputError message={errors.description || pageErrors?.description} className="mt-2" />
                            </div>

                            {/* Display Order Field */}
                            <div className="space-y-4 group">
                                <Label htmlFor="displayOrder" className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3 group-hover:text-emerald-600 transition-colors duration-300">
                                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg"></div>
                                    <Tag className="w-5 h-5" />
                                    Urutan Tampilan (Opsional)
                                </Label>
                                <Input
                                    type="number"
                                    id="displayOrder"
                                    name="displayOrder"
                                    value={data.displayOrder}
                                    onChange={(e) => setData("displayOrder", e.target.value === '' ? '' : parseInt(e.target.value))}
                                    className="w-full px-6 py-5 border-2 border-emerald-200 dark:border-slate-600 rounded-2xl focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-500 transition-all duration-300 text-gray-800 dark:text-gray-200 text-lg placeholder-gray-400 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm shadow-inner hover:shadow-lg group-hover:border-emerald-300"
                                    placeholder="1, 2, 3... (semakin kecil, semakin awal)"
                                    min="0"
                                />
                                <InputError message={errors.displayOrder || pageErrors?.displayOrder} className="mt-2" />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-700 hover:via-teal-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-emerald-200/50 focus:ring-offset-2 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 text-xl relative overflow-hidden group"
                                >
                                    {/* Button Animation Effect (sama seperti di Create) */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 flex items-center justify-center">
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="mr-3 h-6 w-6 animate-spin" />
                                                <span className="animate-pulse">Memperbarui Item Galeri...</span>
                                            </>
                                        ) : (
                                            <>
                                                <PlusCircle className="mr-3 h-6 w-6 group-hover:rotate-180 transition-transform duration-300" />
                                                <span>Simpan Perubahan</span>
                                                <Sparkles className="ml-3 h-5 w-5 group-hover:animate-pulse" />
                                            </>
                                        )}
                                    </div>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}