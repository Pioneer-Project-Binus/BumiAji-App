import { Link, useForm } from '@inertiajs/react';

export default function Create({ categories, authors }) {
    const { data, setData, errors, post, processing, progress } = useForm({
        title: '',
        content: '',
        featuredImage: null,
        status: 'draft',
        categoryId: '',
        authorId: '',
    });

    return (
        <>
            <Link
                href="/articles"
                className="fixed top-0 left-0 left-5 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 md:top-5"
            >
                ← Kembali
            </Link>

            <div className="flex flex-col items-center justify-center">
                <div className="mx-auto max-w-2xl px-4">
                    <div className="flex flex-col items-center rounded-lg bg-white p-8 shadow-md">
                        <h1 className="mb-8 text-center text-3xl font-bold text-black">Tambah Artikel</h1>
                        {data.featuredImage && (
                            <img src={URL.createObjectURL(data.featuredImage)} alt="Preview" className="mt-2 h-32 w-32 rounded object-cover" />
                        )}

                        <form
                            className="space-y-6"
                            onSubmit={(e) => {
                                e.preventDefault();
                                post('/articles');
                            }}
                        >
                            {/* Title Field */}
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-semibold text-black">
                                    Masukkan Judul
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan judul artikel..."
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-500">Judul artikel tidak boleh kosong.</p>}
                            </div>

                            {/* Content Field */}
                            <div className="space-y-2">
                                <label htmlFor="content" className="block text-sm font-semibold text-black">
                                    Masukkan Konten
                                </label>
                                <textarea
                                    name="content"
                                    id="content"
                                    rows="6"
                                    value={data.content}
                                    className="resize-vertical w-full rounded-lg border border-gray-300 px-4 py-3 text-black transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Tulis konten artikel di sini..."
                                    onChange={(e) => setData('content', e.target.value)}
                                />
                                {errors.content && <p className="mt-1 text-sm text-red-500">Konten artikel harus diisi.</p>}
                            </div>

                            {/* Image Upload Field */}
                            <div className="space-y-2">
                                <label htmlFor="image" className="block text-sm font-semibold text-black">
                                    Masukkan Gambar
                                </label>
                                <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-gray-400">
                                    <input
                                        type="file"
                                        id="image"
                                        className="w-full text-sm text-black file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                        accept="image/*"
                                        onChange={(e) => {
                                            setData('featuredImage', e.target.files[0]);
                                        }}
                                    />
                                    {progress && (
                                        <div className="mt-3">
                                            <div className="mb-1 flex justify-between text-sm text-black">
                                                <span>Mengupload...</span>
                                                <span>{progress.percentage}%</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-gray-200">
                                                <div
                                                    className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                                                    style={{ width: `${progress.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.featuredImage && <p className="mt-1 text-sm text-red-500">File gambar utama tidak valid.</p>}
                            </div>

                            {/* Category Field */}
                            <div className="space-y-2">
                                <label htmlFor="kategori" className="block text-sm font-semibold text-black">
                                    Pilih Kategori
                                </label>
                                <select
                                    name="category"
                                    id="kategori"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setData('categoryId', e.target.value)}
                                    value={data.categoryId}
                                >
                                    <option value="">Pilih kategori...</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoryId && <p className="mt-1 text-sm text-red-500">Kategori yang dipilih tidak ada.</p>}
                            </div>

                            {/* Author Field */}
                            <div className="space-y-2">
                                <label htmlFor="author" className="block text-sm font-semibold text-black">
                                    Pilih Penulis
                                </label>
                                <select
                                    name="author"
                                    id="author"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setData('authorId', e.target.value)}
                                    value={data.authorId}
                                >
                                    <option value="">Pilih penulis...</option>
                                    {authors.map((author) => (
                                        <option key={author.id} value={author.id}>
                                            {author.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.authorId && <p className="mt-1 text-sm text-red-500">Penulis yang dipilih tidak ada.</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
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
