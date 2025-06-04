import { Link, useForm } from '@inertiajs/react';
import React from 'react';

interface SocialMedia {
    [key: string]: string;
}

interface Tourism {
    id: number;
    slug: string;
    name: string;
    description: string;
    address?: string | null;
    ticketPrice?: string | null;
    contactInfo?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    socialMedia?: SocialMedia | null;
    status: 'draft' | 'published' | 'closed';
}

interface Props {
    tourism: Tourism;
}

export default function EditPage({ tourism }: Props) {
    const initialSocialMedia = tourism.socialMedia ? JSON.stringify(tourism.socialMedia, null, 2) : '';

    const { data, setData, errors, put, processing } = useForm({
        name: tourism.name,
        description: tourism.description,
        address: tourism.address || '',
        ticketPrice: tourism.ticketPrice || '',
        contactInfo: tourism.contactInfo || '',
        latitude: tourism.latitude ?? '',
        longitude: tourism.longitude ?? '',
        socialMedia: initialSocialMedia,
        status: tourism.status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/tourisms/${tourism.slug}`, {
            onSuccess: () => alert('Destinasi wisata berhasil diperbarui!'),
            onError: () => alert('Gagal memperbarui destinasi wisata.'),
        });
    };

    return (
        <>
            <Link
                href="/tourisms"
                className="fixed top-0 left-0 left-5 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 md:top-5"
            >
                ← Kembali
            </Link>

            <div className="mt-16 flex flex-col items-center justify-center">
                <div className="w-full max-w-3xl px-4">
                    <div className="flex flex-col rounded-lg bg-white p-8 shadow-md">
                        <h1 className="mb-8 text-center text-3xl font-bold text-black">Edit Destinasi Wisata</h1>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="block font-semibold text-black">
                                    Nama Destinasi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan nama destinasi wisata"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label htmlFor="description" className="block font-semibold text-black">
                                    Deskripsi <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    rows={5}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="resize-vertical w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Deskripsikan destinasi wisata"
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <label htmlFor="address" className="block font-semibold text-black">
                                    Alamat
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Alamat lengkap destinasi (opsional)"
                                />
                                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                            </div>

                            {/* Ticket Price */}
                            <div className="space-y-2">
                                <label htmlFor="ticketPrice" className="block font-semibold text-black">
                                    Harga Tiket
                                </label>
                                <input
                                    id="ticketPrice"
                                    type="text"
                                    value={data.ticketPrice}
                                    onChange={(e) => setData('ticketPrice', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Harga tiket (opsional)"
                                />
                                {errors.ticketPrice && <p className="mt-1 text-sm text-red-600">{errors.ticketPrice}</p>}
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-2">
                                <label htmlFor="contactInfo" className="block font-semibold text-black">
                                    Info Kontak
                                </label>
                                <input
                                    id="contactInfo"
                                    type="text"
                                    value={data.contactInfo}
                                    onChange={(e) => setData('contactInfo', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nomor telepon atau email (opsional)"
                                />
                                {errors.contactInfo && <p className="mt-1 text-sm text-red-600">{errors.contactInfo}</p>}
                            </div>

                            {/* Latitude */}
                            <div className="space-y-2">
                                <label htmlFor="latitude" className="block font-semibold text-black">
                                    Latitude
                                </label>
                                <input
                                    id="latitude"
                                    type="number"
                                    step="any"
                                    value={data.latitude}
                                    onChange={(e) => setData('latitude', e.target.value === '' ? '' : parseFloat(e.target.value))}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Contoh: -6.914744 (opsional)"
                                />
                                {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
                            </div>

                            {/* Longitude */}
                            <div className="space-y-2">
                                <label htmlFor="longitude" className="block font-semibold text-black">
                                    Longitude
                                </label>
                                <input
                                    id="longitude"
                                    type="number"
                                    step="any"
                                    value={data.longitude}
                                    onChange={(e) => setData('longitude', e.target.value === '' ? '' : parseFloat(e.target.value))}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Contoh: 107.609810 (opsional)"
                                />
                                {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>}
                            </div>

                            {/* Social Media */}
                            <div className="space-y-2">
                                <label htmlFor="socialMedia" className="block font-semibold text-black">
                                    Social Media (Format JSON)
                                </label>
                                <textarea
                                    id="socialMedia"
                                    rows={4}
                                    value={data.socialMedia}
                                    onChange={(e) => setData('socialMedia', e.target.value)}
                                    className="resize-vertical w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    placeholder={`Contoh:\n{\n  "instagram": "https://instagram.com/example",\n  "facebook": "https://facebook.com/example"\n}`}
                                />
                                {errors.socialMedia && <p className="mt-1 text-sm text-red-600">{errors.socialMedia}</p>}
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <label htmlFor="status" className="block font-semibold text-black">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="closed">Closed</option>
                                </select>
                                {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
