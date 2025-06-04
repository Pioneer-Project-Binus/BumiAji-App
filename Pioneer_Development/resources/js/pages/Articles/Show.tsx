import React from 'react';
import { Link } from '@inertiajs/react';

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
};

type ShowProps = {
  article: Article;
};

export default function Show({ article }: ShowProps) {
  return (
    <>
      <Link
        href="/articles"
        className="fixed md:top-5 left-5 top-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-4 py-2 transition-colors duration-200"
      >
        ← Kembali
      </Link>

      <div className="flex justify-center flex-col items-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-black mb-8 text-center">Detail Artikel</h1>

            {/* Gambar */}
            {article.featuredImage && (
              <img
                src={`/storage/${article.featuredImage}`}
                alt="Gambar Artikel"
                className="w-32 h-32 object-cover mt-2 rounded mb-4"
              />
            )}

            {/* Judul */}
            <div className="w-full mb-4">
              <h2 className="text-lg font-semibold text-black">Judul</h2>
              <p className="text-gray-800">{article.title}</p>
            </div>

            {/* Konten */}
            <div className="w-full mb-4">
              <h2 className="text-lg font-semibold text-black">Konten</h2>
              <p className="text-gray-800 whitespace-pre-line">{article.content}</p>
            </div>

            {/* Kategori */}
            <div className="w-full mb-4">
              <h2 className="text-lg font-semibold text-black">Kategori</h2>
              <p className="text-gray-800">{article.category?.name || '-'}</p>
            </div>

            {/* Status */}
            <div className="w-full mb-4">
              <h2 className="text-lg font-semibold text-black">Status</h2>
              <p className="text-gray-800 capitalize">{article.status}</p>
            </div>

            {/* Penulis */}
            <div className="w-full mb-4">
              <h2 className="text-lg font-semibold text-black">Penulis</h2>
              <p className="text-gray-800">{article.author?.name || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
