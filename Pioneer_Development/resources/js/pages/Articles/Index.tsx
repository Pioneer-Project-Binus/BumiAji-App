import React, { useState, useMemo } from 'react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Link, useForm } from '@inertiajs/react';


export default function IndexPage({ articles, categories, authors, filters }) {
  return (
    <AppHeaderLayout>
      <Table articles={articles} categories={categories} authors={authors} filters={filters} />
    </AppHeaderLayout>
  );
}

function Table({ articles, categories, authors, filters }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [selectedArticleSlug, setSelectedArticleSlug] = useState(null);



    const filteredArticles = useMemo(() => {
    return articles.data.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus ? article.status === filterStatus : true;
      const matchesCategory = filterCategory
        ? article.category && article.category.id.toString() === filterCategory
        : true;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [articles.data, searchTerm, filterStatus, filterCategory]);

  const {delete: destroy} = useForm();
  console.log(articles);



  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-row justify-between items-center p-2 h-13 mb-4">
        <h1 className="text-2xl font-bold text-white">Daftar Artikel</h1>
        <Link
          href="/articles/create"
          className="bg-green-600 flex justify-center items-center font-bold w-32 h-10 rounded-md"
        >
          + Create
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari judul artikel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Filter Status --</option>
          {[...new Set(articles.data.map((a) => a.status))].map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Filter Kategori --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-base text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-center font-semibold border-b border-gray-300">Judul</th>
              <th className="px-4 py-3 text-center font-semibold border-b border-gray-300">Status</th>
              <th className="px-4 py-3 text-center font-semibold border-b border-gray-300">Kategori</th>
              <th className="px-4 py-3 text-center font-semibold border-b border-gray-300">Penulis</th>
              <th className="px-4 py-3 text-center font-semibold border-b border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Tidak ada artikel
                </td>
              </tr>
            ) : (
              filteredArticles.map((article) => (

                <tr key={article.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-center border-b">{article.title}</td>
                  <td className="px-4 py-3 text-center border-b capitalize">{article.status}</td>
                  <td className="px-4 py-3 text-center border-b">{article.category ? article.category.name : '-'}</td>
                  <td className="px-4 py-3 text-center border-b">{article.author ? article.author.name : '-'}</td>
                  <td className="px-4 py-3 border-b">
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                        <Link href="#"className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md px-4 py-1">
                            Detail
                        </Link>
                        <Link  href={`/articles/${article.slug}/edit`} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-1">
                            Edit
                        </Link>
                        <button
                        onClick={() => setSelectedArticleSlug(article.slug)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                        Hapus Artikel
                        </button>


                        {/* Modal Konfirmasi */}
                        {selectedArticleSlug === article.slug && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                            <h2 className="text-lg font-bold mb-2">Konfirmasi</h2>
                            <p>Yakin ingin menghapus artikel ini?</p>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                onClick={() => setSelectedArticleSlug(null)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                Batal
                                </button>
                                <button
                                onClick={() => {
                                    destroy(`/articles/${article.slug}`, {
                                    method: 'delete',
                                    onSuccess: () => {
                                        setSelectedArticleSlug(null);
                                        setShowSuccessModal(true); // Sukses akan muncul
                                    },
                                    onError: () => {
                                        setSelectedArticleSlug(null);
                                        setShowErrorModal(true);
                                    }
                                    });
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                Hapus
                                </button>
                            </div>
                            </div>
                        </div>
                        )}


                        {/* Modal Sukses */}
                        {showSuccessModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                            <h2 className="text-lg font-bold mb-2">Berhasil</h2>
                            <p>Artikel berhasil dihapus!</p>
                            <div className="mt-4 flex justify-end">
                                <button
                                onClick={() => setShowSuccessModal(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                Tutup
                                </button>
                            </div>
                            </div>
                        </div>
                        )}

                        {/* Modal Gagal */}
                        {showErrorModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                            <h2 className="text-lg font-bold mb-2">Gagal</h2>
                            <p>Gagal menghapus artikel.</p>
                            <div className="mt-4 flex justify-end">
                                <button
                                onClick={() => setShowErrorModal(false)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                Tutup
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
