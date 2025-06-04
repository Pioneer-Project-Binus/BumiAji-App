import React, { useState, useMemo } from 'react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Link, useForm, router } from '@inertiajs/react';

type Article = {
  id: number;
  title: string;
  status: string;
  slug: string;
  category?: {
    id: number;
    name: string;
  };
  author?: {
    name: string;
  };
};

type Category = {
  id: number;
  name: string;
};

type Author = {
  name: string;
};

type Filters = {
  search?: string;
  status?: string;
  category?: string;
};

type PaginatedArticles = {
  data: Article[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
};

type IndexPageProps = {
  articles: PaginatedArticles;
  categories: Category[];
  authors: Author[];
  filters: Filters;
};

export default function IndexPage({ articles, categories, authors, filters }: IndexPageProps) {
  return (
    <AppHeaderLayout>
      <Table articles={articles} categories={categories} authors={authors} filters={filters} />
    </AppHeaderLayout>
  );
}

function Table({ articles, categories, authors, filters }: IndexPageProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [filterStatus, setFilterStatus] = useState(filters.status || '');
  const [filterCategory, setFilterCategory] = useState(filters.category || '');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  const allStatuses = ['draft', 'published', 'archived'];

  const { delete: destroy } = useForm();

  const filteredArticles = useMemo(() => {
    return articles.data.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus ? article.status === filterStatus : true;
      const matchesCategory = filterCategory ? article.category?.id.toString() === filterCategory : true;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [articles.data, searchTerm, filterStatus, filterCategory]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchTerm(value);

    router.get(
      '/articles',
      {
        search: value.trim() === '' ? undefined : value,
        status: filterStatus,
        category: filterCategory,
      },
      {
        preserveState: true,
        replace: true,
      }
    );
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setFilterStatus(value);

    router.get(
      '/articles',
      {
        search: searchTerm,
        status: value,
        category: filterCategory,
      },
      { preserveState: true, replace: true }
    );
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setFilterCategory(value);

    router.get(
      '/articles',
      {
        search: searchTerm,
        status: filterStatus,
        category: value,
      },
      { preserveState: true, replace: true }
    );
  }

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
          onChange={handleSearchChange}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filterStatus}
          onChange={handleStatusChange}
          className="px-4 py-2 rounded-md border text-black bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Filter Status --</option>
          {allStatuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filterCategory}
          onChange={handleCategoryChange}
          className="px-4 py-2 rounded-md border text-black bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <td className="px-4 py-3 text-center border-b">{article.category?.name || '-'}</td>
                  <td className="px-4 py-3 text-center border-b">{article.author?.name || '-'}</td>
                  <td className="px-4 py-3 border-b">
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                      <Link href={`/articles/${article.slug}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md px-4 py-1">
                        Detail
                      </Link>
                      <Link href={`/articles/${article.slug}/edit`} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-1">
                        Edit
                      </Link>
                      <button
                        onClick={() => setSelectedArticleSlug(article.slug)}
                        className="bg-red-600 hover:bg-red-700 font-bold text-white px-4 py-2 rounded-xl cursor-pointer"
                      >
                        Hapus
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
                                      setShowSuccessModal(true);
                                    },
                                    onError: () => {
                                      setSelectedArticleSlug(null);
                                      setShowErrorModal(true);
                                    },
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
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="py-12 px-4 flex flex-wrap justify-center items-center gap-2">
          {articles.links.map((link, idx) => (
            <span key={idx}>
              {link.url ? (
                <Link
                  href={link.url}
                  className={`p-2 ${link.active ? 'text-blue-500 font-bold' : 'text-gray-600'}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ) : (
                <span
                  className={`p-2 ${link.active ? 'text-blue-500 font-bold' : 'text-gray-400'}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
