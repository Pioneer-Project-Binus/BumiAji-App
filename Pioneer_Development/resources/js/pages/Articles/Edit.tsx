import {useForm} from "@inertiajs/react"
import React from 'react';
import { Link } from '@inertiajs/react';

export default function Edit({article, categories, authors}){
    const {data, setData, errors, put, processing, progress} = useForm({
        title: article.title||"",
        content: article.content || "",
        featuredImage: null,
        status: article.status,
        categoryId: article.category ? article.category.id : '',
        authorId: "",
    });
    console.log(errors);
    console.log(article.featuredImage);

    return (
        <>
            <Link
            href="/articles"
            className="fixed md:top-5 left-5 top-0 left-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-4 py-2 transition-colors duration-200"
            >
            ← Kembali
            </Link>

            <div className="flex justify-center flex-col items-center">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
                        <h1 className="text-3xl font-bold text-black mb-8 text-center">Tambah Artikel</h1>
                        {!data.featuredImage && article.featuredImage && (
                        <img
                            src={`/storage/${article.featuredImage}`}
                            alt="Preview Gambar Lama"
                            className="w-32 h-32 object-cover mt-2 rounded"
                        />
                        )}

                        {data.featuredImage && (
                        <img
                            src={URL.createObjectURL(data.featuredImage)}
                            alt="Preview Gambar Baru"
                            className="w-32 h-32 object-cover mt-2 rounded"
                        />
                        )}

                        <form className="space-y-6" onSubmit={(e) => {
                            e.preventDefault();
                               put(`/articles/${article.slug}`, {
                                onSuccess: () => alert('Artikel berhasil diperbarui!'),
                                onError: () => alert('Gagal memperbarui artikel.'),
                                });
                            }}>
                            {/* Title Field */}
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-semibold text-black">
                                    Ganti Judul
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-black"
                                    placeholder="Masukkan judul artikel..."
                                    onChange={(e) => setData("title", e.target.value)}
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">Judul artikel tidak boleh kosong.</p>}
                            </div>

                            {/* Content Field */}
                            <div className="space-y-2">
                                <label htmlFor="content" className="block text-sm font-semibold text-black">
                                    Ganti Konten
                                </label>
                                <textarea
                                    name="content"
                                    id="content"
                                    rows="6"
                                    value={data.content}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical text-black"
                                    placeholder="Tulis konten artikel di sini..."
                                    onChange={(e) => setData("content", e.target.value)}
                                />
                                {errors.content && <p className="text-red-500 text-sm mt-1">Konten artikel harus diisi.</p>}
                            </div>

                            {/* Image Upload Field */}
                            <div className="space-y-2">
                                <label htmlFor="image" className="block text-sm font-semibold text-black">
                                    Masukkan Gambar
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                                    <input
                                        type="file"
                                        id="image"
                                        className="w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        accept="image/*"
                                        onChange={e => {
                                            setData('featuredImage', e.target.files[0])
                                        }}
                                    />
                                    {progress && (
                                        <div className="mt-3">
                                            <div className="flex justify-between text-sm text-black mb-1">
                                                <span>Mengupload...</span>
                                                <span>{progress.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                    style={{width: `${progress.percentage}%`}}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.featuredImage && <p className="text-red-500 text-sm mt-1">File gambar utama tidak valid.</p>}
                            </div>

                            {/* Category Field */}
                            <div className="space-y-2">
                                <label htmlFor="kategori" className="block text-sm font-semibold text-black">
                                    Ganti Kategori
                                </label>
                                <select
                                    name="category"
                                    id="kategori"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-black"
                                    onChange={(e) => setData('categoryId', e.target.value)}
                                    value={data.categoryId}
                                >
                                    <option value={categories.id} disabled>
                                    {categories.name}
                                    </option>

                                    {/* List kategori lainnya, kecuali yang sudah dipilih */}
                                    {categories
                                    .filter(cat => cat.id !== categorie.id)
                                    .map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                        </option>
                                    ))
                                    }
                                </select>
                                {errors.categoryId && <p className="text-red-500 text-sm mt-1">Kategori yang dipilih tidak ada.</p>}
                            </div>

                            <div className="space-y-2 mt-6">
                                <label htmlFor="status" className="block text-sm font-semibold text-black">
                                    Ganti Status
                                </label>
                                <select
                                    name="status"
                                    id="status"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-black"
                                    onChange={(e) => setData('status', e.target.value)}
                                    value={data.status}
                                >

                                    <option value={data.status} disabled>
                                    {data.status.charAt(0).toUpperCase() + data.status.slice(1)} {/* Capitalize first letter */}
                                    </option>

                                    {['draft', 'published']
                                    .filter(status => status !== data.status)
                                    .map((status) => (
                                        <option key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {errors.status && <p className="text-red-500 text-sm mt-1">Status tidak valid.</p>}
                                </div>

                            {/* Author Field */}
                                <div className="space-y-2">
                                    <label htmlFor="author" className="block text-sm font-semibold text-black">
                                        Pilih Penulis
                                    </label>
                                    <select
                                        name="author"
                                        id="author"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-black"
                                        value={data.authorId}
                                        onChange={(e) => setData('authorId', e.target.value)}
                                    >
                                        {/* Default pilihan author (disabled) */}
                                        {data.authorId && (
                                        <option value={data.authorId} disabled>
                                            {authors.find(a => a.id === data.authorId)?.name || 'Pilih penulis...'}
                                        </option>
                                        )}

                                        {/* Opsi penulis lain */}
                                        {authors
                                        .filter(a => a.id !== data.authorId)
                                        .map((author) => (
                                            <option key={author.id} value={author.id}>
                                            {author.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.authorId && <p className="text-red-500 text-sm mt-1">Penulis yang dipilih tidak ada.</p>}
                                </div>


                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    {processing ? 'Membuat Artikel...' : 'Buat Artikel'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}
