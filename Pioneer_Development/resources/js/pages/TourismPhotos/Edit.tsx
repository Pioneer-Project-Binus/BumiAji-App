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

        try {
            if (data.socialMedia) {
                JSON.parse(data.socialMedia);
            }
        } catch (error) {
            alert('Format Social Media harus berupa JSON yang valid.');
            return;
        }

        put(route('tourisms.update', tourism.slug), {
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
                            <InputField
                                label="Nama Destinasi"
                                required
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                placeholder="Masukkan nama destinasi wisata"
                            />

                            {/* Description */}
                            <TextareaField
                                label="Deskripsi"
                                required
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                error={errors.description}
                                placeholder="Deskripsikan destinasi wisata"
                            />

                            {/* Address */}
                            <InputField
                                label="Alamat"
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                error={errors.address}
                                placeholder="Alamat lengkap destinasi (opsional)"
                            />

                            {/* Ticket Price */}
                            <InputField
                                label="Harga Tiket"
                                id="ticketPrice"
                                value={data.ticketPrice}
                                onChange={(e) => setData('ticketPrice', e.target.value)}
                                error={errors.ticketPrice}
                                placeholder="Harga tiket (opsional)"
                            />

                            {/* Contact Info */}
                            <InputField
                                label="Info Kontak"
                                id="contactInfo"
                                value={data.contactInfo}
                                onChange={(e) => setData('contactInfo', e.target.value)}
                                error={errors.contactInfo}
                                placeholder="Nomor telepon atau email (opsional)"
                            />

                            {/* Latitude */}
                            <InputField
                                label="Latitude"
                                id="latitude"
                                type="number"
                                value={data.latitude}
                                onChange={(e) => setData('latitude', e.target.value === '' ? '' : parseFloat(e.target.value))}
                                error={errors.latitude}
                                placeholder="Contoh: -6.914744 (opsional)"
                            />

                            {/* Longitude */}
                            <InputField
                                label="Longitude"
                                id="longitude"
                                type="number"
                                value={data.longitude}
                                onChange={(e) => setData('longitude', e.target.value === '' ? '' : parseFloat(e.target.value))}
                                error={errors.longitude}
                                placeholder="Contoh: 107.609810 (opsional)"
                            />

                            {/* Social Media */}
                            <TextareaField
                                label="Social Media (Format JSON)"
                                id="socialMedia"
                                value={data.socialMedia}
                                onChange={(e) => setData('socialMedia', e.target.value)}
                                error={errors.socialMedia}
                                placeholder={`Contoh:\n{\n  "instagram": "https://instagram.com/example",\n  "facebook": "https://facebook.com/example"\n}`}
                            />

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

function InputField({
    id,
    label,
    value,
    onChange,
    error,
    placeholder,
    type = 'text',
    required = false,
}: {
    id: string;
    label: string;
    value: any;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    error?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
}) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block font-semibold text-black">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

function TextareaField({
    id,
    label,
    value,
    onChange,
    error,
    placeholder,
    required = false,
}: {
    id: string;
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    error?: string;
    placeholder?: string;
    required?: boolean;
}) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block font-semibold text-black">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                id={id}
                rows={4}
                value={value}
                onChange={onChange}
                className="resize-vertical w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
