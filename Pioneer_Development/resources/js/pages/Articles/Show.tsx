import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

type Category = {
  id: number;
  name: string;
};

type Author = {
  id: number;
  name: string;
};

type Article = {
  title: string;
  content: string;
  featuredImage?: string | null;
  status: 'draft' | 'published';
  category?: Category | null;
  author?: Author | null;
  slug: string;
  created_at?: string;
  updated_at?: string;
};

type BreadcrumbItem = {
  title: string;
  href: string;
};

type ShowProps = {
  article: Article;
};

export default function Show({ article }: ShowProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/dashboard' },
    { title: 'Artikel Management', href: '/articles' },
    { title: 'Detail Artikel', href: `/articles/${article.slug}` },
  ];

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    if (status === 'published') {
      return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
    }
    return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Detail Artikel</h1>
                <p className="text-gray-600">Informasi lengkap artikel yang dipilih</p>
              </div>
              <Link
                href="/articles"
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Daftar
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Featured Image Section */}
            {article.featuredImage && (
              <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                <img
                  src={`/storage/${article.featuredImage}`}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}

            <div className="p-8">
              {/* Title and Status */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight flex-1 mr-4">
                    {article.title}
                  </h2>
                  <div className={getStatusBadge(article.status)}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      article.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    {article.status === 'published' ? 'Dipublikasi' : 'Draft'}
                  </div>
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-b border-gray-200 pb-6">
                  {article.author && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium">{article.author.name}</span>
                    </div>
                  )}
                  
                  {article.category && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                        {article.category.name}
                      </span>
                    </div>
                  )}

                  {article.created_at && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(article.created_at)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="prose prose-lg max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Konten Artikel
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {article.content}
                  </p>
                </div>
              </div>

              {/* Additional Information Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Penulis
                  </h4>
                  <p className="text-gray-700 font-medium">
                    {article.author?.name || 'Tidak ada penulis'}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Kategori
                  </h4>
                  <p className="text-gray-700 font-medium">
                    {article.category?.name || 'Tidak ada kategori'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/articles/${article.slug}/edit`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Artikel
                  </Link>
                  
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}