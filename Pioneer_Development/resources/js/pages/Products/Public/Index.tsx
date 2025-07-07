import React, { useState, ChangeEvent, FormEvent } from 'react';
import { usePage, router } from '@inertiajs/react';
import productsRoute from '@/routes/public/products';
import { Link } from '@inertiajs/react';


// Tipe data produk
interface Product {
  id: string;
  productName: string;
  description: string;
  price: string;
  slug: string;
  status: string;
  photos?: { filePath: string }[]; // ✅ Diperbaiki
}

// Tipe data kategori
interface Category {
  id: string;
  name: string;
}

// Props dari Laravel
interface Props {
  products: {
    data: Product[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
  categories: Category[];
  filters: {
    search?: string;
    category?: string;
    status?: string;
    sort?: string;
  };
  [key: string]: any;
}

export default function ProductList() {
  const { products, categories, filters } = usePage<Props>().props;

  const [form, setForm] = useState({
    search: filters.search || '',
    category: Array.isArray(filters.category) ? filters.category : (filters.category ? [filters.category] : []),
    status: Array.isArray(filters.status) ? filters.status : (filters.status ? [filters.status] : []),
    sort: filters.sort || '',
  });

  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const closeAllDropdowns = () => {
    setIsSortDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsStatusDropdownOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (filterName: 'sort' | 'category' | 'status', value: string) => {
    setForm(prevForm => {
      const currentValues = Array.isArray(prevForm[filterName]) ? prevForm[filterName] : (prevForm[filterName] ? [prevForm[filterName]] : []);
      if (currentValues.includes(value)) {
        return { ...prevForm, [filterName]: currentValues.filter(item => item !== value) };
      } else {
        return { ...prevForm, [filterName]: [...currentValues, value] };
      }
    });
  };

    const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (form.search.trim()) params.append('search', form.search.trim());

    // SORT: pisahkan menjadi sort + direction
    if (form.sort) {
        const [sort, direction] = form.sort.split('_');
        params.append('sort', sort);
        params.append('direction', direction);
    }

    // CATEGORY dan STATUS: ambil hanya satu (ambil pertama saja)
    if (form.category.length > 0) {
        params.append('category', form.category[0]);
    }

    if (form.status.includes('ready')) {
    params.append('stock_min', '1'); // artinya stock > 0
    }
    if (form.status.includes('outofstock')) {
    params.append('stock_max', '0'); // artinya stock <= 0
    }


    router.get(`${productsRoute.index.url()}?${params.toString()}`, {}, { preserveState: true });
    };



    const sortOptions = [
    { value: 'productName_asc', label: 'Nama A-Z' },
    { value: 'productName_desc', label: 'Nama Z-A' },
    { value: 'price_asc', label: 'Harga Termurah' },
    { value: 'price_desc', label: 'Harga Termahal' },
    ];


  const statusOptions = [
    { value: 'ready', label: 'Tersedia' },
    { value: 'outofstock', label: 'Stok Habis' },
  ];

  const getButtonText = (filterName: 'sort' | 'category' | 'status', options: { value: string; label: string }[]) => {
    const selected = form[filterName];
    if (!selected || selected.length === 0) {
      return filterName === 'sort' ? 'Sort' : filterName === 'category' ? 'Kategori' : 'Status';
    }
    if (selected.length === 1) {
      return options.find(opt => opt.value === selected[0])?.label || filterName;
    }
    return `${filterName === 'sort' ? 'Sort' : filterName === 'category' ? 'Kategori' : 'Status'} (${selected.length} dipilih)`;
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tombol Kembali */}
        <button
          onClick={() => window.location.href = '/'}
          className="text-gray-600 hover:text-gray-800 mb-6 flex items-center focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Banner */}
        <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-8 overflow-hidden shadow-md">
          <img
            src="https://placehold.co/1200x300/E5E7EB/9CA3AF?text=Banner+Produk"
            alt="Product Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Filter dan Form Pencarian */}
{/* Header dengan Filter dan Pencarian */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Daftar Produk</h2>
          <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Pilihan Sort */}
            <div>
              <select
                name="sort"
                value={form.sort}
                onChange={(e) => setForm({ ...form, sort: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out bg-white"
              >
                <option value="">Sort</option>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Pilihan Kategori dengan Dropdown Interaktif (Checkbox) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { closeAllDropdowns(); setIsCategoryDropdownOpen(!isCategoryDropdownOpen); }}
                className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out bg-white flex items-center justify-between w-full sm:w-auto"
                aria-haspopup="true"
                aria-expanded={isCategoryDropdownOpen}
              >
                {getButtonText('category', categories.map(cat => ({ value: cat.id, label: cat.name })))}
                <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isCategoryDropdownOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {categories.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        role="menuitem"
                      >
                        <input
                          type="checkbox"
                          name="category"
                          value={cat.id}
                          checked={form.category.includes(cat.id)}
                          onChange={() => handleCheckboxChange('category', cat.id)}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                        <span className="ml-2">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pilihan Status dengan Dropdown Interaktif (Checkbox)
            <div className="relative">
              <button
                type="button"
                onClick={() => { closeAllDropdowns(); setIsStatusDropdownOpen(!isStatusDropdownOpen); }}
                className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out bg-white flex items-center justify-between w-full sm:w-auto"
                aria-haspopup="true"
                aria-expanded={isStatusDropdownOpen}
              >
                {getButtonText('status', statusOptions)}
                <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {statusOptions.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        role="menuitem"
                      >
                        <input
                          type="checkbox"
                          name="status"
                          value={option.value}
                          checked={form.status.includes(option.value)}
                          onChange={() => handleCheckboxChange('status', option.value)}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                        <span className="ml-2">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div> */}

            {/* Input Pencarian */}
            <div className="relative flex-1 min-w-full sm:min-w-[180px]">
              <input
                type="text"
                name="search"
                placeholder="Cari produk"
                value={form.search}
                onChange={handleChange}
                className="border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm w-full focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
                aria-label="Cari produk"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Tombol Cari */}
            <button
              type="submit"
              className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-md w-full sm:w-auto"
            >
              Cari
            </button>
          </form>
        </div>

        {/* Garis pemisah */}
        <hr className="border-t border-gray-300 mb-8" />

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.data.length > 0 ? (
            products.data.map((product) => (
              <Link href={`/produk/${product.slug}`} key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 cursor-pointer">
                <div className="bg-gray-100 h-40 rounded-md mb-3 flex items-center justify-center overflow-hidden">
                  {product.photos?.[0]?.filePath ? (
                    <img
                      src={product.photos[0].filePath}
                      alt={product.productName}
                      className="h-full w-full object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/160x160/F3F4F6/9CA3AF?text=Gambar+Produk`;
                      }}
                    />
                  ) : (
                    <img
                      src={`https://placehold.co/160x160/F3F4F6/9CA3AF?text=Gambar+Produk`}
                      alt="Placeholder"
                      className="h-full w-full object-cover rounded-md"
                    />
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="text-center">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{product.productName}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                  </div>
                  <p className="text-black font-bold text-sm mt-10 text-left">
                    Rp {parseInt(product.price).toLocaleString('id-ID')}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              Tidak ada produk yang ditemukan.
            </div>
          )}
        </div>

        {/* Paginasi */}
        <div className="flex justify-center mt-10 space-x-2 flex-wrap">
          {products.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url || '#'}
              dangerouslySetInnerHTML={{ __html: link.label }}
              className={`px-4 py-2 text-sm rounded-md transition duration-150 ease-in-out my-1
                ${
                  link.active
                    ? 'bg-green-700 text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }
                ${link.url === null ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              aria-label={`Go to page ${link.label.replace(/&laquo;|&raquo;|Sebelumnya|Selanjutnya/g, '')}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
