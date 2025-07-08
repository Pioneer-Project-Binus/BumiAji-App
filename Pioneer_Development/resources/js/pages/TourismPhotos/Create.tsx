import { Link, router, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useRef } from 'react';
import tourismPhotos from '@/routes/tourism-photos';

interface Destination {
    id: number;
    name: string;
}

interface CreateProps {
    destinations: Destination[];
    selectedDestinationId?: number;
}

export default function CreateTourismPhoto({ destinations, selectedDestinationId }: CreateProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { data, setData, errors, post, processing } = useForm<{
        destinationId: string;
        description: string;
        photos: File[] | null;
    }>({
        destinationId: selectedDestinationId ? String(selectedDestinationId) : '',
        description: '',
        photos: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target;
        if (name === 'photos' && files) {
            setData(name, Array.from(files));
        } else {
            setData(name as keyof typeof data, value);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('destinationId', data.destinationId);
        if (data.description) formData.append('description', data.description);
        if (data.photos) {
            data.photos.forEach((file, index) => {
                formData.append(`photos[${index}]`, file);
            });
        }

        router.post(tourismPhotos.store().url, formData, {
            forceFormData: true,
        });
    };

    return (
        <>
            <Link
                href="/tourism-photos"
                className="fixed top-0 left-5 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 md:top-5"
            >
                ← Kembali
            </Link>

            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="mx-auto w-full max-w-2xl rounded-lg bg-white p-8 shadow-md">
                    <h1 className="mb-6 text-center text-2xl font-bold text-black">Upload Foto Wisata</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Destination Select */}
                        <div>
                            <label htmlFor="destinationId" className="block text-sm font-semibold text-black">
                                Pilih Destinasi
                            </label>
                            <select
                                id="destinationId"
                                name="destinationId"
                                value={data.destinationId}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Pilih Destinasi --</option>
                                {destinations.map((dest) => (
                                    <option key={dest.id} value={dest.id}>
                                        {dest.name}
                                    </option>
                                ))}
                            </select>
                            {errors.destinationId && <p className="mt-1 text-sm text-red-500">{errors.destinationId}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-black">
                                Deskripsi (opsional)
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                value={data.description}
                                onChange={handleChange}
                                className="resize-vertical w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="Tulis deskripsi foto..."
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                        </div>

                        {/* Photos Upload */}
                        <div>
                            <label htmlFor="photos" className="block text-sm font-semibold text-black">
                                Unggah Foto
                            </label>
                            <input
                                type="file"
                                id="photos"
                                name="photos"
                                multiple
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleChange}
                                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 text-black file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
                            />
                            {errors.photos && <p className="mt-1 text-sm text-red-500">{errors.photos}</p>}
                        </div>

                        {/* Submit */}
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                            >
                                {processing ? 'Mengunggah...' : 'Unggah Foto'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}