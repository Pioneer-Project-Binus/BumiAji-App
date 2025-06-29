import { useForm } from "@inertiajs/react";
import React from "react";
import { Link } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';

// --- Tipe data ---
interface Category {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
}

interface Article {
  title: string;
  content: string;
  featuredImage: string | null;
  status: string;
  slug: string;
  category: Category | null;
  author?: Author;
}

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface EditProps {
  article: Article;
  categories: Category[];
  authors: Author[];
}

export default function Edit({ article, categories, authors }: EditProps) {
  const { data, setData, errors, put, processing, progress } = useForm<{
    title: string;
    content: string;
    featuredImage: File | null;
    status: string;
    categoryId: number | string;
    authorId: number | string;
  }>({
    title: article.title || "",
    content: article.content || "",
    featuredImage: null,
    status: article.status,
    categoryId: article.category ? article.category.id : "",
    authorId: article.author ? article.author.id : "",
  });

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/dashboard' },
    { title: 'Article Management', href: '/articles' },
    { title: 'Edit Article', href: `/articles/${article.slug}/edit` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Edit Artikel
                </h1>
                <p className="mt-2 text-gray-600">
                  Perbarui informasi artikel dan publikasikan perubahan
                </p>
              </div>
              <Link
                href="/articles"
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-md"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Preview Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview Gambar</h3>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                  {data.featuredImage ? (
                    <img
                      src={URL.createObjectURL(data.featuredImage)}
                      alt="Preview Gambar Baru"
                      className="w-full h-full object-cover"
                    />
                  ) : article.featuredImage ? (
                    <img
                      src={`/storage/${article.featuredImage}`}
                      alt="Preview Gambar Lama"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">Tidak ada gambar</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white">Form Edit Artikel</h2>
                </div>

                <form
                  className="p-6 space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    put(`/articles/${article.slug}`, {
                      onSuccess: () => alert("Artikel berhasil diperbarui!"),
                      onError: () => alert("Gagal memperbarui artikel."),
                    });
                  }}
                >
                  {/* Title */}
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a.997.997 0 01-1.414 0l-7-7A1.997 1.997 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Judul Artikel
                      </span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={data.title}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                      placeholder="Masukkan judul artikel..."
                      onChange={(e) => setData("title", e.target.value)}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Konten Artikel
                      </span>
                    </label>
                    <textarea
                      id="content"
                      rows={8}
                      value={data.content}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-vertical hover:border-gray-400"
                      placeholder="Tulis konten artikel di sini..."
                      onChange={(e) => setData("content", e.target.value)}
                    />
                    {errors.content && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.content}
                      </p>
                    )}
                  </div>

                  {/* Featured Image */}
                  <div className="space-y-2">
                    <label htmlFor="image" className="block text-sm font-semibold text-gray-700">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Gambar Unggulan
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        onChange={(e) => {
                          if (e.target.files) {
                            setData("featuredImage", e.target.files[0]);
                          }
                        }}
                      />
                    </div>
                    {progress && (
                      <div className="mt-3 bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between text-sm text-gray-700 mb-2">
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Mengupload...
                          </span>
                          <span className="font-semibold">{progress.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {errors.featuredImage && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.featuredImage}
                      </p>
                    )}
                  </div>

                  {/* Grid for Category, Status, and Author */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Category */}
                    <div className="space-y-2">
                      <label htmlFor="kategori" className="block text-sm font-semibold text-gray-700">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a.997.997 0 01-1.414 0l-7-7A1.997 1.997 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          Kategori
                        </span>
                      </label>
                      <select
                        id="kategori"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                        value={data.categoryId}
                        onChange={(e) => setData("categoryId", e.target.value)}
                      >
                        <option value="" disabled>Pilih kategori...</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      {errors.categoryId && (
                        <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
                      )}
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <label htmlFor="status" className="block text-sm font-semibold text-gray-700">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Status
                        </span>
                      </label>
                      <select
                        id="status"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                      >
                        {["draft", "published"].map((status) => (
                          <option key={status} value={status}>
                            {status === "draft" ? "Draft" : "Diterbitkan"}
                          </option>
                        ))}
                      </select>
                      {errors.status && (
                        <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                      )}
                    </div>

                    {/* Author */}
                    <div className="space-y-2">
                      <label htmlFor="author" className="block text-sm font-semibold text-gray-700">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Penulis
                        </span>
                      </label>
                      <select
                        id="author"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                        value={data.authorId}
                        onChange={(e) => setData("authorId", e.target.value)}
                      >
                        <option value="" disabled>Pilih penulis...</option>
                        {authors.map((author) => (
                          <option key={author.id} value={author.id}>
                            {author.name}
                          </option>
                        ))}
                      </select>
                      {errors.authorId && (
                        <p className="text-red-500 text-sm mt-1">{errors.authorId}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:transform-none disabled:shadow-none flex items-center justify-center"
                    >
                      {processing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Menyimpan Perubahan...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Simpan Perubahan
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}