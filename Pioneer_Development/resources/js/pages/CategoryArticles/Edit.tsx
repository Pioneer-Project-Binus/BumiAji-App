import { useForm } from "@inertiajs/react";
import React from "react";
import { Link } from "@inertiajs/react";

type CategoryArticle = {
  slug: string;
  name: string;
  description: string;
};

interface EditProps {
  categoryArticle: CategoryArticle;
}

export default function Edit({ categoryArticle }: EditProps) {
  const { data, setData, errors, put, processing } = useForm({
    name: categoryArticle.name || "",
    description: categoryArticle.description || "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/category-articles/${categoryArticle.slug}`);
  };

  return (
    <>
      <Link
        href="/category-articles"
        className="fixed md:top-5 md:left-5 top-0 left-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-4 py-2 transition-colors duration-200"
      >
        ← Kembali
      </Link>

      <div className="flex justify-center flex-col items-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-black mb-8 text-center">
              Edit Kategori Artikel
            </h1>

            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-black">
                  Masukkan Nama Kategori
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black"
                  placeholder="Masukkan Nama Kategori"
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-semibold text-black">
                  Masukkan Deskripsi Kategori
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={6}
                  value={data.description}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical text-black placeholder-gray-500"
                  placeholder="Tulis deskripsi kategori di sini..."
                  onChange={(e) => setData("description", e.target.value)}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {processing ? "Menyimpan..." : "Update Kategori"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}