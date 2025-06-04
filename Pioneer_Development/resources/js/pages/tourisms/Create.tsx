import { Link, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent } from 'react';

interface TourismFormData {
    name: string;
    description: string;
    address: string;
    ticketPrice: string;
    contactInfo: string;
    latitude: string;
    longitude: string;
    socialMedia: string;
    status: 'draft' | 'published' | 'closed';
}

interface CreateProps {}

export default function Create({}: CreateProps) {
    const { data, setData, errors, post, processing, progress } = useForm<TourismFormData>({
        name: '',
        description: '',
        address: '',
        ticketPrice: '',
        contactInfo: '',
        latitude: '',
        longitude: '',
        socialMedia: '',
        status: 'draft',
    });

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setData(e.target.name as keyof TourismFormData, e.target.value);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post('/tourisms');
    }

    return (
        <>
            <Link
                href="/tourisms"
                className="fixed top-0 left-5 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 md:top-5"
            >
                ← Kembali
            </Link>

            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md">
                    <h1 className="mb-8 text-center text-2xl font-bold text-black">Tambah Destinasi Wisata</h1>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-black">
                                Nama Destinasi
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan nama destinasi..."
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-black">
                                Deskripsi
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                value={data.description}
                                onChange={handleChange}
                                className="resize-vertical w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="Tulis deskripsi destinasi..."
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-semibold text-black">
                                Alamat
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={data.address}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan alamat (opsional)"
                            />
                            {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                        </div>

                        {/* Ticket Price */}
                        <div>
                            <label htmlFor="ticketPrice" className="block text-sm font-semibold text-black">
                                Harga Tiket
                            </label>
                            <input
                                id="ticketPrice"
                                name="ticketPrice"
                                type="text"
                                value={data.ticketPrice}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan harga tiket (opsional)"
                            />
                            {errors.ticketPrice && <p className="mt-1 text-sm text-red-500">{errors.ticketPrice}</p>}
                        </div>

                        {/* Contact Info */}
                        <div>
                            <label htmlFor="contactInfo" className="block text-sm font-semibold text-black">
                                Kontak Informasi
                            </label>
                            <input
                                id="contactInfo"
                                name="contactInfo"
                                type="text"
                                value={data.contactInfo}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan kontak (opsional)"
                            />
                            {errors.contactInfo && <p className="mt-1 text-sm text-red-500">{errors.contactInfo}</p>}
                        </div>

                        {/* Latitude */}
                        <div>
                            <label htmlFor="latitude" className="block text-sm font-semibold text-black">
                                Latitude
                            </label>
                            <input
                                id="latitude"
                                name="latitude"
                                type="number"
                                step="any"
                                value={data.latitude}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan latitude (opsional)"
                            />
                            {errors.latitude && <p className="mt-1 text-sm text-red-500">{errors.latitude}</p>}
                        </div>

                        {/* Longitude */}
                        <div>
                            <label htmlFor="longitude" className="block text-sm font-semibold text-black">
                                Longitude
                            </label>
                            <input
                                id="longitude"
                                name="longitude"
                                type="number"
                                step="any"
                                value={data.longitude}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan longitude (opsional)"
                            />
                            {errors.longitude && <p className="mt-1 text-sm text-red-500">{errors.longitude}</p>}
                        </div>

                        {/* Social Media */}
                        <div>
                            <label htmlFor="socialMedia" className="block text-sm font-semibold text-black">
                                Social Media (format JSON)
                            </label>
                            <textarea
                                id="socialMedia"
                                name="socialMedia"
                                rows={3}
                                value={data.socialMedia}
                                onChange={handleChange}
                                className="resize-vertical w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="https://instagram.com/example"
                            />
                            {errors.socialMedia && <p className="mt-1 text-sm text-red-500">{errors.socialMedia}</p>}
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-semibold text-black">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={data.status}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="closed">Closed</option>
                            </select>
                            {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status}</p>}
                        </div>

                        {/* Submit */}
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
                            >
                                {processing ? 'Membuat Destinasi...' : 'Buat Destinasi'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
