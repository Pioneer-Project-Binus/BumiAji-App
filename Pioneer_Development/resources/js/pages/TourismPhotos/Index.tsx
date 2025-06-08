import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

export interface TourismPhoto {
    id: number;
    filePath: string;
    description?: string;
    destination: {
        id: number;
        name: string;
    };
}

export interface PaginationData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

interface IndexPageProps {
    tourismPhotos: PaginationData<TourismPhoto>;
    destinations: { id: number; name: string }[];
    filters: {
        search?: string;
        destination_id?: string;
    };
}

export default function IndexPage({ tourismPhotos, destinations, filters }: IndexPageProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [filterDest, setFilterDest] = useState(filters.destination_id || '');
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const { delete: destroy } = useForm();

    function handleSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearchTerm(value);
        router.get(
            '/tourism-photos',
            { search: value || undefined, destination_id: filterDest || undefined },
            { preserveState: true, replace: true },
        );
    }

    function handleDestChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        setFilterDest(value);
        router.get(
            '/tourism-photos',
            { search: searchTerm || undefined, destination_id: value || undefined },
            { preserveState: true, replace: true },
        );
    }

    function confirmDelete(id: number) {
        setConfirmDeleteId(id);
    }

    function performDelete() {
        if (!confirmDeleteId) return;
        destroy(route('tourism-photos.destroy', confirmDeleteId), {
            preserveState: true,
            onSuccess: () => setConfirmDeleteId(null),
        });
    }

    return (
        <AppHeaderLayout>
            <Head title="Gallery Foto Destinasi" />
            <div className="mx-auto max-w-2xl space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Gallery Foto Destinasi</h1>
                    <Link href="/tourism-photos/create" className="rounded bg-green-600 px-4 py-2 text-white">
                        + Upload Foto
                    </Link>
                </div>

                <div className="flex flex-col gap-4 md:flex-row">
                    <input
                        type="text"
                        placeholder="Cari berdasarkan nama file atau deskripsi..."
                        value={searchTerm}
                        onChange={handleSearchTerm}
                        className="w-full rounded border px-4 py-2"
                    />
                    <select value={filterDest} onChange={handleDestChange} className="w-full rounded border px-4 py-2">
                        <option value="">-- Semua Destinasi --</option>
                        {destinations.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                <table className="min-w-full bg-white text-gray-700">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-center font-semibold">Preview</th>
                            <th className="border px-4 py-2 text-center font-semibold">Destinasi</th>
                            <th className="border px-4 py-2 text-center font-semibold">File Path</th>
                            <th className="border px-4 py-2 text-center font-semibold">Deskripsi</th>
                            <th className="border px-4 py-2 text-center font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tourismPhotos.data.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-6 text-center">
                                    Tidak ada data
                                </td>
                            </tr>
                        ) : (
                            tourismPhotos.data.map((photo) => (
                                <tr key={photo.id}>
                                    <td className="border px-4 py-2 text-center">
                                        <img
                                            src={photo.filePath.startsWith('http') ? photo.filePath : `/storage/${photo.filePath}`}
                                            alt={photo.description || 'Foto Destinasi'}
                                            className="mx-auto h-20 object-cover"
                                        />
                                    </td>
                                    <td className="border px-4 py-2">{photo.destination.name}</td>
                                    <td className="border px-4 py-2 break-all">{photo.filePath}</td>
                                    <td className="border px-4 py-2">{photo.description || '-'}</td>
                                    <td className="space-x-2 border px-4 py-2 text-center">
                                        <Link href={`/tourism-photos/${photo.id}/edit`} className="text-blue-600">
                                            Edit
                                        </Link>
                                        <button onClick={() => confirmDelete(photo.id)} className="text-red-600">
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {tourismPhotos.total > tourismPhotos.per_page && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: tourismPhotos.last_page }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() =>
                                    router.get(
                                        '/tourism-photos',
                                        {
                                            page,
                                            search: searchTerm || undefined,
                                            destination_id: filterDest || undefined,
                                        },
                                        { preserveState: true, replace: true },
                                    )
                                }
                                className={`rounded px-3 py-1 ${page === tourismPhotos.current_page ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal konfirmasi hapus */}
            {confirmDeleteId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="space-y-4 rounded bg-white p-6 shadow-lg">
                        <p>Yakin ingin menghapus foto ini?</p>
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setConfirmDeleteId(null)} className="rounded bg-gray-300 px-4 py-2">
                                Batal
                            </button>
                            <button onClick={performDelete} className="rounded bg-red-600 px-4 py-2 text-white">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppHeaderLayout>
    );
}
