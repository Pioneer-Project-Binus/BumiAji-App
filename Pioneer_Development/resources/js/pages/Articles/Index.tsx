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
                        type="button"
                        onClick={() => {
                            if (confirm('Yakin ingin menghapus artikel ini?')) {
                            destroy(`/articles/${article.slug}`, {
                                method: 'delete',
                                onSuccess: () => alert('Artikel berhasil dihapus!'),
                                onError: () => alert('Gagal menghapus artikel.')
                            });
                            }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md px-4 py-1"
                        >
                        Delete
                        </button>


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
