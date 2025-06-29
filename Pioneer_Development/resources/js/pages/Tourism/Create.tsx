import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type ProductStatus, type InertiaSharedProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    LoaderCircle,
    MountainSnow, // Changed from Package to MountainSnow for tourism
    ArrowLeft,
    Sparkles,
    LandPlot, // For address
    Ticket, // For ticket price
    Phone, // For contact info
    Map, // For latitude/longitude
    Share2, // For social media
    FileText,
    CircleDotDashed, // For status dot
} from 'lucide-react';

import tourism from '@/routes/tourism';

const dashboard = {
    url: '/admin/dashboard',
};

interface CreateTourismForm {
    name: string;
    description: string;
    address: string;
    ticketPrice: string;
    contactInfo: string;
    latitude: number | null;
    longitude: number | null;
    socialMedia: string; // Stored as JSON string
    status: 'draft' | 'published' | 'closed';
}

interface Props extends InertiaSharedProps {
    // No categories needed for tourism create based on backend
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: dashboard.url },
    { title: 'Tourism Management', href: tourism.index().url },
    { title: 'Add New Destination', href: tourism.create().url },
];

export default function AdminTourismCreate() {
    const { data, setData, post, processing, errors } = useForm<CreateTourismForm>({
        name: '',
        description: '',
        address: '',
        ticketPrice: '',
        contactInfo: '',
        latitude: null,
        longitude: null,
        socialMedia: '{}', // Initialize as empty JSON array string for social media
        status: 'draft',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(tourism.store().url, {
            onError: () => {
                // Handle error, e.g., show a toast notification
                console.error("Failed to create tourism destination.");
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Add New Tourism Destination" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50">
                {/* Background Decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-8 lg:py-12">
                    {/* Enhanced Header Section */}
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-2xl shadow-blue-500/25">
                                        <MountainSnow className="h-8 w-8" /> {/* Changed icon */}
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                        <Sparkles className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                                        Add New Tourism Destination
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                                        List a new exciting place for visitors
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={tourism.index().url}
                            className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 backdrop-blur-sm"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Tourism Destinations
                        </Link>
                    </div>

                    {/* Enhanced Main Form Card */}
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/5 border border-white/20 dark:border-slate-700/30 overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-slate-800/50 dark:to-slate-700/50 px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                                    <FileText className="h-4 w-4 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Destination Information</h2>
                            </div>
                        </div>

                        <div className="p-8 lg:p-10">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                {/* Enhanced Form Grid */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                                    {/* Left Column */}
                                    <div className="space-y-8">
                                        {/* Name */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <MountainSnow className="h-5 w-5 text-blue-500" /> {/* Changed icon */}
                                                <Label htmlFor="name" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Destination Name
                                                </Label>
                                            </div>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="Enter the destination name..."
                                                required
                                            />
                                            <InputError message={errors.name} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Address */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <LandPlot className="h-5 w-5 text-purple-500" /> {/* New icon for address */}
                                                <Label htmlFor="address" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Address
                                                </Label>
                                            </div>
                                            <Input
                                                id="address"
                                                type="text"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="e.g., Jl. Contoh No. 123, Kota Malang"
                                            />
                                            <InputError message={errors.address} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Ticket Price */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Ticket className="h-5 w-5 text-green-500" /> {/* Changed icon */}
                                                <Label htmlFor="ticketPrice" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Ticket Price (IDR)
                                                </Label>
                                            </div>
                                            <div className="relative">
                                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-bold text-lg">
                                                    Rp
                                                </span>
                                                <Input
                                                    id="ticketPrice"
                                                    type="text" // Changed to text to allow for "Free" or other non-numeric inputs if needed
                                                    value={data.ticketPrice}
                                                    onChange={(e) => setData('ticketPrice', e.target.value)}
                                                    className="h-14 text-lg pl-16 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                    placeholder="e.g., 50.000 or Free"
                                                />
                                            </div>
                                            <InputError message={errors.ticketPrice} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Contact Info */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Phone className="h-5 w-5 text-orange-500" /> {/* New icon for contact info */}
                                                <Label htmlFor="contactInfo" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Contact Information
                                                </Label>
                                            </div>
                                            <Input
                                                id="contactInfo"
                                                type="text"
                                                value={data.contactInfo}
                                                onChange={(e) => setData('contactInfo', e.target.value)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="e.g., +62 812-3456-7890 or email@example.com"
                                            />
                                            <InputError message={errors.contactInfo} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-8">
                                        {/* Description */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <FileText className="h-5 w-5 text-teal-500" /> {/* Changed icon color */}
                                                <Label htmlFor="description" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Description
                                                </Label>
                                            </div>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                className="min-h-[160px] text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 resize-none"
                                                placeholder="Tell visitors what makes this destination special..."
                                                required
                                            />
                                            <InputError message={errors.description} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Latitude */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Map className="h-5 w-5 text-rose-500" /> {/* New icon for latitude */}
                                                <Label htmlFor="latitude" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Latitude
                                                </Label>
                                            </div>
                                            <Input
                                                id="latitude"
                                                type="number"
                                                step="any"
                                                value={data.latitude ?? ''} // Handle null for initial value
                                                onChange={(e) => setData('latitude', parseFloat(e.target.value) || null)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="e.g., -7.9839"
                                                min="-90"
                                                max="90"
                                            />
                                            <InputError message={errors.latitude} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Longitude */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Map className="h-5 w-5 text-rose-500" /> {/* New icon for longitude */}
                                                <Label htmlFor="longitude" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Longitude
                                                </Label>
                                            </div>
                                            <Input
                                                id="longitude"
                                                type="number"
                                                step="any"
                                                value={data.longitude ?? ''} // Handle null for initial value
                                                onChange={(e) => setData('longitude', parseFloat(e.target.value) || null)}
                                                className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400"
                                                placeholder="e.g., 112.6214"
                                                min="-180"
                                                max="180"
                                            />
                                            <InputError message={errors.longitude} className="mt-3 text-red-500 font-medium" />
                                        </div>

                                        {/* Social Media (JSON Textarea) */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Share2 className="h-5 w-5 text-indigo-500" /> {/* New icon for social media */}
                                                <Label htmlFor="socialMedia" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Social Media (JSON Array)
                                                </Label>
                                            </div>
                                            <Textarea
                                                id="socialMedia"
                                                value={data.socialMedia}
                                                onChange={(e) => setData('socialMedia', e.target.value)}
                                                className="min-h-[120px] text-lg font-mono border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 placeholder:text-slate-400 resize-y"
                                                placeholder={`e.g., {"platform": "Instagram", "url": "https://instagram.com/example"}, {"platform": "Facebook", "url": "https://facebook.com/example"}`}
                                            />
                                            <InputError message={errors.socialMedia} className="mt-3 text-red-500 font-medium" />
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2"> 
                                                Enter social media links as a JSON object. Example:
                                                <code className="block mt-1 p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs whitespace-pre-wrap">
                                                    {`{
                                                        "facebook": "https://facebook.com/nama_halaman",
                                                        "instagram": "https://instagram.com/nama_halaman",
                                                        "tiktok": "https://tiktok.com/@nama_halaman",
                                                        "website": "https://example.com",
                                                        "youtube": "https://youtube.com/channel/nama_channel"
                                                    }`
                                                    }
                                                </code>
                                                </p>
                                        </div>

                                        {/* Status */}
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-4">
                                                <CircleDotDashed className="h-5 w-5 text-pink-500" /> {/* Changed icon */}
                                                <Label htmlFor="status" className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                                    Publication Status
                                                </Label>
                                            </div>
                                            <Select value={data.status} onValueChange={(value) => setData('status', value as 'draft' | 'published' | 'closed')}>
                                                <SelectTrigger className="h-14 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 hover:border-slate-300 dark:hover:border-slate-500">
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
                                                    <SelectItem value="closed" className="text-lg py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                            Closed
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.status} className="mt-3 text-red-500 font-medium" />
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Submit Section */}
                                <div className="pt-8 border-t-2 border-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div className="text-slate-600 dark:text-slate-400">
                                            <p className="text-sm">Ready to add this tourism destination?</p>
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="group h-14 px-10 text-lg font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-xl shadow-blue-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-3 h-6 w-6 animate-spin" />
                                                    Creating Destination...
                                                </>
                                            ) : (
                                                <>
                                                    <MountainSnow className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                                                    Create Destination
                                                    <Sparkles className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Additional Tips Card */}
                    <div className="mt-8 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-slate-800/50 dark:to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 dark:border-slate-600/50">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Pro Tips</h3>
                                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                    <li>• Provide accurate details for a better user experience.</li>
                                    <li>• Use clear and engaging descriptions to attract more visitors.</li>
                                    <li>• Double-check latitude and longitude for correct map positioning.</li>
                                    <li>• Ensure social media JSON is correctly formatted.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
