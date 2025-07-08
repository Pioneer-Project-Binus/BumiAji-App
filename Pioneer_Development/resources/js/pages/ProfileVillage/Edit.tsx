import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type InertiaSharedProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useRef, useState, useCallback, useEffect } from 'react';
import $ from 'jquery';
import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite.js';
import profileVillageRoute from '@/routes/profile-village';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle, MapPin, ArrowLeft, Sparkles, Building, Globe, Phone, Mail, Image, FileText, Map, TreePine, Leaf, Users, Heart } from 'lucide-react';
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

interface CreateProfileVillageForm {
    name: string;
    history: string;
    vision: string;
    mission: string;
    logo: File | null;
    address: string;
    postalCode: string;
    phone: string;
    email: string;
    website: string;
    socialMedia: string;
    latitude: string;
    longitude: string;
}

interface Props extends InertiaSharedProps {
    profileVillage?: any;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: dashboard().url },
    { title: 'Profile Village', href: '/profile-village' },
    { title: 'Create Village Profile', href: '/profile-village/create' },
];

export default function ProfileVillageCreate({ profileVillage }: Props) {
    const { data, setData, post, processing, errors } = useForm<CreateProfileVillageForm>({
        name: profileVillage?.name || '',
        history: profileVillage?.history || '',
        vision: profileVillage?.vision || '',
        mission: profileVillage?.mission || '',
        logo: null,
        address: profileVillage?.address || '',
        postalCode: profileVillage?.postalCode || '',
        phone: profileVillage?.phone || '',
        email: profileVillage?.email || '',
        website: profileVillage?.website || '',
        socialMedia: profileVillage?.socialMedia || '',
        latitude: profileVillage?.latitude || '',
        longitude: profileVillage?.longitude || '',
    });

    const summernoteHistoryRef = useRef<HTMLTextAreaElement>(null);
    const summernoteVisionRef = useRef<HTMLTextAreaElement>(null);
    const summernoteMissionRef = useRef<HTMLTextAreaElement>(null);
    const [isSummernoteReady, setIsSummernoteReady] = useState(false);
    const summernoteInitialized = useRef(false);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(profileVillage?.logoUrl || null);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('logo', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setLogoPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSummernoteChange = useCallback((field: keyof CreateProfileVillageForm) => {
        return (contents: string) => {
            if (contents !== data[field]) {
                setData(field, contents);
            }
        };
    }, [data, setData]);

    useEffect(() => {
        if (window.$ && typeof window.$.fn.summernote === 'function' && !summernoteInitialized.current) {
            const initializeSummernote = (ref: React.RefObject<HTMLTextAreaElement>, field: keyof CreateProfileVillageForm, placeholder: string) => {
                if (ref.current) {
                    if (window.$(ref.current).data('summernote')) {
                        window.$(ref.current).summernote('destroy');
                    }
                    window.$(ref.current).summernote({
                        tooltip: false,
                        height: 250,
                        placeholder: placeholder,
                        toolbar: [
                            ['style', ['bold', 'italic', 'underline', 'clear']],
                            ['font', ['strikethrough']],
                            ['fontsize', ['fontsize']],
                            ['para', ['ul', 'ol', 'paragraph']],
                            ['insert', ['link']],
                            ['view', ['fullscreen']],
                        ],
                        callbacks: {
                            onChange: handleSummernoteChange(field),
                            onInit: function() {
                                if (data[field]) {
                                    window.$(ref.current!).summernote('code', data[field] as string);
                                }
                            },
                        },
                    });
                }
            };

            initializeSummernote(summernoteHistoryRef, 'history', 'Tell the story of your village...');
            initializeSummernote(summernoteVisionRef, 'vision', 'Describe your village vision...');
            initializeSummernote(summernoteMissionRef, 'mission', 'Outline your village mission...');

            setIsSummernoteReady(true);
            summernoteInitialized.current = true;
        }

        return () => {
            if (window.$ && summernoteInitialized.current) {
                try {
                    [summernoteHistoryRef, summernoteVisionRef, summernoteMissionRef].forEach(ref => {
                        if (ref.current && window.$(ref.current).data('summernote')) {
                            window.$(ref.current).summernote('destroy');
                        }
                    });
                } catch (error) {
                    console.warn('Error destroying Summernote:', error);
                }
                summernoteInitialized.current = false;
                setIsSummernoteReady(false);
            }
        };
    }, []);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Penting: Gunakan _method: 'PUT' untuk update karena form HTML tidak mendukung PUT secara native
        const formData = {
            ...data,
            ...(profileVillage ? { _method: 'PUT' } : {}),
        };
        post(profileVillageRoute.storeOrUpdate().url, {
            forceFormData: true, // Diperlukan untuk upload file
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={profileVillage ? 'Edit Village Profile' : 'Create Village Profile'} />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/50 to-teal-100/80 dark:from-slate-950 dark:via-green-950/30 dark:to-emerald-950/50">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-400/20 to-green-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-12">
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 text-white shadow-2xl shadow-green-500/25">
                                        <MapPin className="h-8 w-8" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                        <Sparkles className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                                        {profileVillage ? 'Edit' : 'Create'} Village Profile
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                        {profileVillage ? 'Update your village information' : 'Build your village digital presence'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/profile-village"
                            className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-0.5 backdrop-blur-sm"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Village Profile
                        </Link>
                    </div>

                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-green-500/10 border border-white/20 dark:border-slate-700/30 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-slate-800/50 dark:to-green-900/30 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                                    <Building className="h-4 w-4 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Village Information</h2>
                            </div>
                        </div>

                        <div className="p-8 lg:p-10">
                            <form onSubmit={handleSubmit} className="space-y-12">
                                {/* Basic Information Section */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3 pb-4 border-b border-green-200/50 dark:border-slate-700/50">
                                        <Users className="h-6 w-6 text-green-600" />
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Basic Information</h3>
                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                        {/* Village Name */}
                                        <div className="xl:col-span-2">
                                            <div className="flex items-center gap-2 mb-4">
                                                <TreePine className="h-5 w-5 text-green-500" />
                                                <Label htmlFor="name" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Village Name
                                                </Label>
                                            </div>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="Enter village name..."
                                                required
                                            />
                                            <InputError message={errors.name} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Logo Upload */}
                                        <div className="xl:col-span-2">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Image className="h-5 w-5 text-emerald-500" />
                                                <Label htmlFor="logo" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Village Logo
                                                </Label>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="flex-1">
                                                    <Input
                                                        id="logo"
                                                        type="file"
                                                        ref={logoInputRef}
                                                        onChange={handleLogoChange}
                                                        accept="image/*"
                                                        className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                                    />
                                                    <InputError message={errors.logo} className="mt-3 text-red-500 font-medium" />
                                                </div>
                                                {logoPreview && (
                                                    <div className="w-16 h-16 rounded-xl border-2 border-green-200 dark:border-green-700 overflow-hidden bg-slate-100 dark:bg-slate-700">
                                                        <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Vision, Mission, History Section */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3 pb-4 border-b border-green-200/50 dark:border-slate-700/50">
                                        <Heart className="h-6 w-6 text-green-600" />
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Vision, Mission & History</h3>
                                    </div>

                                    <div className="space-y-8">
                                        {/* History */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <FileText className="h-5 w-5 text-green-600" />
                                                <Label htmlFor="history" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Village History
                                                </Label>
                                            </div>
                                            <textarea
                                                ref={summernoteHistoryRef}
                                                id="history"
                                                value={data.history}
                                                onChange={(e) => setData('history', e.target.value)}
                                                className="hidden"
                                            />
                                            <InputError message={errors.history} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Vision */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <Sparkles className="h-5 w-5 text-emerald-600" />
                                                <Label htmlFor="vision" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Village Vision
                                                </Label>
                                            </div>
                                            <textarea
                                                ref={summernoteVisionRef}
                                                id="vision"
                                                value={data.vision}
                                                onChange={(e) => setData('vision', e.target.value)}
                                                className="hidden"
                                            />
                                            <InputError message={errors.vision} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Mission */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <Leaf className="h-5 w-5 text-teal-600" />
                                                <Label htmlFor="mission" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Village Mission
                                                </Label>
                                            </div>
                                            <textarea
                                                ref={summernoteMissionRef}
                                                id="mission"
                                                value={data.mission}
                                                onChange={(e) => setData('mission', e.target.value)}
                                                className="hidden"
                                            />
                                            <InputError message={errors.mission} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information Section */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3 pb-4 border-b border-green-200/50 dark:border-slate-700/50">
                                        <Phone className="h-6 w-6 text-green-600" />
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Contact & Location</h3>
                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                        {/* Address */}
                                        <div className="xl:col-span-2">
                                            <Label htmlFor="address" className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                                <MapPin className="h-5 w-5 text-green-500" /> Address
                                            </Label>
                                            <Textarea
                                                id="address"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                className="h-24 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 resize-none"
                                                placeholder="Enter village address..."
                                            />
                                            <InputError message={errors.address} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Postal Code */}
                                        <div>
                                            <Label htmlFor="postalCode" className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                                <Mail className="h-5 w-5 text-emerald-500" /> Postal Code
                                            </Label>
                                            <Input
                                                id="postalCode" type="text" value={data.postalCode} onChange={(e) => setData('postalCode', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="Enter postal code..."
                                            />
                                            <InputError message={errors.postalCode} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <Label htmlFor="phone" className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                                <Phone className="h-5 w-5 text-teal-500" /> Phone Number
                                            </Label>
                                            <Input
                                                id="phone" type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="Enter phone number..."
                                            />
                                            <InputError message={errors.phone} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <Label htmlFor="email" className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                                <Mail className="h-5 w-5 text-green-600" /> Email Address
                                            </Label>
                                            <Input
                                                id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="Enter email address..."
                                            />
                                            <InputError message={errors.email} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Website */}
                                        <div>
                                            <Label htmlFor="website" className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                                <Globe className="h-5 w-5 text-emerald-600" /> Website
                                            </Label>
                                            <Input
                                                id="website" type="url" value={data.website} onChange={(e) => setData('website', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="https://village-website.com"
                                            />
                                            <InputError message={errors.website} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Social Media */}
                                        <div className="xl:col-span-2">
                                            <Label htmlFor="socialMedia" className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                                <Users className="h-5 w-5 text-teal-600" /> Social Media Links
                                            </Label>
                                            <Textarea
                                                id="socialMedia"
                                                value={data.socialMedia}
                                                onChange={(e) => setData('socialMedia', e.target.value)}
                                                className="h-24 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 resize-none"
                                                placeholder="e.g. instagram: https://..., facebook: https://..."
                                            />
                                            <InputError message={errors.socialMedia} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Latitude */}
                                        <div>
                                            <Label htmlFor="latitude" className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                                <Map className="h-5 w-5 text-green-500" /> Latitude
                                            </Label>
                                            <Input
                                                id="latitude" type="text" value={data.latitude} onChange={(e) => setData('latitude', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="-7.983908"
                                            />
                                            <InputError message={errors.latitude} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Longitude */}
                                        <div>
                                            <Label htmlFor="longitude" className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                                <Map className="h-5 w-5 text-teal-500" /> Longitude
                                            </Label>
                                            <Input
                                                id="longitude" type="text" value={data.longitude} onChange={(e) => setData('longitude', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="112.621391"
                                            />
                                            <InputError message={errors.longitude} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                    </div>
                                </div>

                                {/* Form Submission */}
                                <div className="pt-8 border-t-2 border-green-200/50 dark:border-slate-700/50">
                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="group h-14 px-10 text-lg font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-xl shadow-green-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                                        >
                                            {processing ? (
                                                <><LoaderCircle className="mr-3 h-6 w-6 animate-spin" />Processing...</>
                                            ) : (
                                                <>{profileVillage ? 'Update' : 'Save'} Profile</>
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