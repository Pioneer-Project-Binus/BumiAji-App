import React, { useState, useMemo } from 'react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Link, useForm, router } from '@inertiajs/react';

export default function Index({categoryArticles, filters, can  }) {
  return (
    <AppHeaderLayout>
        <Table categoryArticles = {categoryArticles} filters={filters} can={can}></Table>
    </AppHeaderLayout>
  );
}

function Table({categoryArticles, filters, can  }){
    return(
        <>
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex flex-row justify-between items-center p-2 h-13 mb-4 gap-10">
                    <h1 className="text-2xl font-bold text-white">Daftar kategori Artikel</h1>
                    <Link
                        href="/category-articles/create"
                        className="bg-green-600 flex justify-center items-center font-bold w-32 h-10 rounded-md"
                    >
                        + Create
                    </Link>
                </div>


                <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white text-base text-gray-700">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-center font-semibold border-b border-gray-300">Nama</th>
                        <th className="px-4 py-3 text-center font-semibold border-b border-gray-300">Deskripsi</th>
                        <th className="px-4 py-3 text-center font-semibold border-b border-gray-300">Jumlah Artikel</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categoryArticles.data.length === 0 ? (
                        <tr>
                        <td colSpan={5} className="text-center py-6 text-gray-500">
                            Tidak ada artikel
                        </td>
                        </tr>
                    ) : (
                        categoryArticles.data.map((categorie) => (
                        <tr key={categorie.id} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3 text-center border-b">{categorie.name}</td>
                            <td className="px-4 py-3 text-center border-b capitalize">{categorie.description}</td>
                            <td className="px-4 py-3 text-center border-b">{categorie.articles_count ? categorie.articles_count : '-'}</td>

                        </tr>
                        ))
                    )}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    );
}
