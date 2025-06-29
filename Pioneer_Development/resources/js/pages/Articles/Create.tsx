import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { Link } from "@inertiajs/react";

// Type definitions
type Category = {
  id: number;
  name: string;
};

type Author = {
  id: number;
  name: string;
};

type Props = {
  categories: Category[];
  authors: Author[];
  errors: Record<string, string>;
};

export default function Create({ categories, authors, errors }: Props) {
  const { data, setData, post, processing, progress } = useForm({
    title: "",
    content: "",
    featuredImage: null as File | null,
    status: "draft",
    categoryId: "",
    authorId: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
      </div>

      {/* Back button with glassmorphism effect */}
      <Link
        href="/articles"
        className="fixed md:top-8 md:left-8 top-4 left-4 z-20 group"
      >
        <div className="bg-white/80 backdrop-blur-md hover:bg-white/90 text-gray-700 hover:text-blue-600 font-semibold rounded-2xl px-6 py-3 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 hover:border-blue-200/50 flex items-center gap-2">
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </div>
      </Link>

      {/* Main content */}
      <div className="flex justify-center items-center min-h-screen py-12 px-4 relative z-10">
        <div className="w-full max-w-3xl">
          {/* Main card with glassmorphism */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">Buat Artikel Baru</h1>
                <p className="text-blue-100 text-lg">Bagikan ide dan cerita menarik Anda</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            </div>

            {/* Image preview section */}
            {data.featuredImage && (
              <div className="px-8 pt-6">
                <div className="relative group">
                  <img
                    src={URL.createObjectURL(data.featuredImage as File)}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            )}

            {/* Form section */}
            <div className="p-8">
              <form
                className="space-y-8"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  post("/articles");
                }}
              >
                {/* Title Field */}
                <div className="group">
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Judul Artikel
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={data.title}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-lg placeholder-gray-400"
                      placeholder="Masukkan judul artikel yang menarik..."
                      onChange={(e) => setData("title", e.target.value)}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-focus-within:from-blue-500/5 group-focus-within:via-purple-500/5 group-focus-within:to-indigo-500/5 transition-all duration-300 pointer-events-none"></div>
                  </div>
                  {errors.title && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.title}
                  </p>}
                </div>

                {/* Content Field */}
                <div className="group">
                  <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Konten Artikel
                  </label>
                  <div className="relative">
                    <textarea
                      name="content"
                      id="content"
                      rows={8}
                      value={data.content}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 resize-vertical text-gray-800 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-lg placeholder-gray-400"
                      placeholder="Tulis konten artikel yang menarik dan informatif di sini..."
                      onChange={(e) => setData("content", e.target.value)}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-indigo-500/0 group-focus-within:from-purple-500/5 group-focus-within:via-pink-500/5 group-focus-within:to-indigo-500/5 transition-all duration-300 pointer-events-none"></div>
                  </div>
                  {errors.content && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.content}
                  </p>}
                </div>

                {/* Image Upload Field */}
                <div className="group">
                  <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    Gambar Utama
                  </label>
                  <div className="relative">
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-indigo-400 transition-all duration-300 bg-gradient-to-br from-gray-50/80 to-indigo-50/80 backdrop-blur-sm hover:from-indigo-50/80 hover:to-purple-50/80 group-hover:shadow-lg">
                      <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <input
                          type="file"
                          id="image"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setData("featuredImage", e.target.files[0]);
                            }
                          }}
                        />
                        <p className="text-gray-700 font-medium mb-2">Klik atau seret gambar ke sini</p>
                        <p className="text-gray-500 text-sm">PNG, JPG, GIF hingga 10MB</p>
                      </div>
                      
                      {progress && (
                        <div className="mt-6">
                          <div className="flex justify-between text-sm text-gray-700 mb-2">
                            <span className="font-medium">Mengupload gambar...</span>
                            <span className="font-bold text-indigo-600">{progress.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                              style={{ width: `${progress.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.featuredImage && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.featuredImage}
                  </p>}
                </div>

                {/* Form grid for selects */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Category Field */}
                  <div className="group">
                    <label htmlFor="kategori" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Kategori
                    </label>
                    <div className="relative">
                      <select
                        name="category"
                        id="kategori"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-800 text-lg appearance-none cursor-pointer"
                        onChange={(e) => setData("categoryId", e.target.value)}
                        value={data.categoryId}
                      >
                        <option value="">Pilih kategori...</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.categoryId && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.categoryId}
                    </p>}
                  </div>

                  {/* Author Field */}
                  <div className="group">
                    <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      Penulis
                    </label>
                    <div className="relative">
                      <select
                        name="author"
                        id="author"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-800 text-lg appearance-none cursor-pointer"
                        onChange={(e) => setData("authorId", e.target.value)}
                        value={data.authorId}
                      >
                        <option value="">Pilih penulis...</option>
                        {authors.map((author) => (
                          <option key={author.id} value={author.id}>
                            {author.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.authorId && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.authorId}
                    </p>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      {processing ? (
                        <>
                          <svg className="animate-spin w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Membuat Artikel...
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Buat Artikel Sekarang
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}