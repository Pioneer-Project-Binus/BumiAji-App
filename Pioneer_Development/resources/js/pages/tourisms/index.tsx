import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

export interface Tourism {
    id: number;
    name: string;
    slug: string;
    status: string;
    address: string;
    creator?: {
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
    tourisms: PaginationData<Tourism>;
    filters: {
        search?: string;
        status?: string;
    };
    can: {
        create_tourism: boolean;
    };
}

export default function IndexPage({ tourisms, filters, can }: IndexPageProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [filterStatus, setFilterStatus] = useState(filters.status || '');
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
    const { delete: destroy } = useForm();

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearchTerm(value);
        router.get(
            '/tourisms',
            {
                search: value.trim() === '' ? undefined : value,
                status: filterStatus,
            },
            { preserveState: true, replace: true },
        );
    }

    function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        setFilterStatus(value);
        router.get(
            '/tourisms',
            {
                search: searchTerm,
                status: value,
            },
            { preserveState: true, replace: true },
        );
    }

    const allStatuses = ['draft', 'published', 'archived'];

    console.log(can, 'can edit');

    return (
        <AppHeaderLayout>
            <Head title="Tourisms" />
            <div className="mx-auto max-w-6xl p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Daftar Destinasi Wisata</h1>
                    {/* {can.create_tourism && (
                        <Link href="/tourisms/create" className="rounded bg-green-600 px-4 py-2 text-white">
                            + Create
                        </Link>
                    )} */}
                    <Link href="/tourisms/create" className="rounded bg-green-600 px-4 py-2 text-white">
                        + Create
                    </Link>
                </div>

                <div className="mb-6 flex flex-col gap-4 md:flex-row">
                    <input
                        type="text"
                        placeholder="Cari nama destinasi..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full rounded border px-4 py-2"
                    />
                    <select value={filterStatus} onChange={handleStatusChange} className="w-full rounded border px-4 py-2 md:w-auto">
                        <option value="" className="text-black">
                            -- Semua Status --
                        </option>
                        {allStatuses.map((status) => (
                            <option key={status} value={status} className="text-black">
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <table className="min-w-full bg-white text-base text-gray-700">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border-b border-gray-300 px-4 py-3 text-center font-semibold" style={{ fontSize: 14 }}>
                                Nama
                            </th>
                            <th className="border-b border-gray-300 px-4 py-3 text-center font-semibold" style={{ fontSize: 14 }}>
                                Status
                            </th>
                            <th className="border-b border-gray-300 px-4 py-3 text-center font-semibold" style={{ fontSize: 14 }}>
                                Alamat
                            </th>
                            <th className="border-b border-gray-300 px-4 py-3 text-center font-semibold" style={{ fontSize: 14 }}>
                                Dibuat oleh
                            </th>
                            <th className="border-b border-gray-300 px-4 py-3 text-center font-semibold" style={{ fontSize: 14 }}>
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tourisms.data.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-6 text-center">
                                    Tidak ada data
                                </td>
                            </tr>
                        ) : (
                            tourisms.data.map((tourism) => (
                                <tr key={tourism.id}>
                                    <td className="border px-4 py-2">{tourism.name}</td>
                                    <td className="border px-4 py-2 capitalize">{tourism.status}</td>
                                    <td className="border px-4 py-2">{tourism.address}</td>
                                    <td className="border px-4 py-2">{tourism.creator?.name || '-'}</td>
                                    <td className="space-x-2 border px-4 py-2">
                                        <Link href={`/tourisms/${tourism.slug}/edit`} className="text-blue-600">
                                            Edit
                                        </Link>
                                        <button onClick={() => setSelectedSlug(tourism.slug)} className="text-red-600">
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AppHeaderLayout>
    );
}
