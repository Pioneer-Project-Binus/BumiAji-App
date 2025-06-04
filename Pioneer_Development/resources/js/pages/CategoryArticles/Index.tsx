import React, { useState } from 'react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Link, router } from '@inertiajs/react';

type ArticleCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  articles_count?: number;
};

type CategoryArticles = {
  data: ArticleCategory[];
};

type Filters = {
  search?: string;
};

type Props = {
  categoryArticles: CategoryArticles;
  filters: Filters;
  can: any;
};

export default function Index({ categoryArticles, filters, can }: Props) {
  return (
    <AppHeaderLayout>
      <Table categoryArticles={categoryArticles} filters={filters} can={can} />
    </AppHeaderLayout>
  );
}

type TableProps = Props;

function Table({ categoryArticles, filters }: TableProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [search, setSearch] = useState<string>(filters.search || '');

  const handleDelete = (slug: string) => {
    router.delete(`/category-articles/${slug}`, {
      onSuccess: () => {
        setSelectedSlug(null);
      },
      onError: () => {
        alert('Gagal menghapus kategori artikel');
      },
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/category-articles', { search }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center p-2 h-13 mb-4 gap-4">
        <h1 className="text-2xl font-bold text-white">Daftar Kategori Artikel</h1>

        {/* Form Search */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded border bg-white border-gray-300 focus:ring focus:ring-blue-400 text-black"
            placeholder="Cari kategori..."
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Cari
          </button>
        </form>

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
              <th className="px-4 py-3 text-center font-semibold border-b">Nama</th>
              <th className="px-4 py-3 text-center font-semibold border-b">Deskripsi</th>
              <th className="px-4 py-3 text-center font-semibold border-b">Jumlah Artikel</th>
              <th className="px-4 py-3 text-center font-semibold border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categoryArticles.data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Tidak ada kategori ditemukan.
                </td>
              </tr>
            ) : (
              categoryArticles.data.map((categorie) => (
                <tr key={categorie.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-center border-b">{categorie.name}</td>
                  <td className="px-4 py-3 text-center border-b capitalize">{categorie.description}</td>
                  <td className="px-4 py-3 text-center border-b">
                    {categorie.articles_count ?? '-'}
                  </td>
                  <td className="px-4 py-3 border-b">
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                      <Link
                        href={`/category-articles/${categorie.slug}/edit`}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-1"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setSelectedSlug(categorie.slug)}
                        className="bg-red-600 hover:bg-red-700 font-bold text-white px-4 py-2 rounded-xl"
                      >
                        Hapus
                      </button>

                      {/* Modal Konfirmasi */}
                      {selectedSlug === categorie.slug && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                            <h2 className="text-lg font-bold mb-2">Konfirmasi</h2>
                            <p>Yakin ingin menghapus kategori ini?</p>
                            <div className="mt-4 flex justify-end space-x-2">
                              <button
                                onClick={() => setSelectedSlug(null)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                              >
                                Batal
                              </button>
                              <button
                                onClick={() => handleDelete(categorie.slug)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
