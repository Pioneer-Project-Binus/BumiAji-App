import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { usePage, router, Link, Head } from '@inertiajs/react';
import productsRoute from '@/routes/products';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Products } from '@/types';
import banner from '@/assets/banner produk.png';
import Navbar from '@/components/ui/navbar';
interface Category {
  id: string;
  name: string;
}

// Props dari Laravel
interface Props {
  products: {
    data: Products[];
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
  console.log(products)

  const [form, setForm] = useState({
    search: filters.search || '',
    category: Array.isArray(filters.category) ? filters.category : (filters.category ? [filters.category] : []),
    status: Array.isArray(filters.status) ? filters.status : (filters.status ? [filters.status] : []),
    sort: typeof filters.sort === 'string' ? filters.sort : '',
  });

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  
  const closeAllDropdowns = () => {
    setIsCategoryDropdownOpen(false);
    setIsSortDropdownOpen(false);
  };

  // Init AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (filterName: 'category' | 'status', value: string) => {
  setForm((prevForm) => {
    if (filterName === 'category') {
      const isSelected = prevForm.category.includes(value);
      return {
        ...prevForm,
        category: isSelected ? [] : [value], 
      };
    }

    const currentValues = Array.isArray(prevForm[filterName]) ? prevForm[filterName] : [];
    return {
      ...prevForm,
      [filterName]: currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value],
    };
  });
};


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (form.search.trim()) params.append('search', form.search.trim());

    if (form.sort) {
      const [sort, direction] = form.sort.split('_');
      params.append('sort', sort);
      params.append('direction', direction);
    }

    // Only append the first category if multiple are selected, as per current logic
    if (form.category.length > 0) {
      params.append('category', form.category[0]);
    }

    if (form.status.includes('ready')) {
      params.append('stock_min', '1');
    }
    if (form.status.includes('outofstock')) {
      params.append('stock_max', '0');
    }

    router.get(`${productsRoute.indexPublic.url()}?${params.toString()}`, {}, { preserveState: true });
  };

  const sortOptions = [
    { value: 'productName_asc', label: 'Nama A-Z' },
    { value: 'productName_desc', label: 'Nama Z-A' },
    { value: 'price_asc', label: 'Harga Termurah' },
    { value: 'price_desc', label: 'Harga Termahal' },
  ];

  // Function to strip HTML tags and get plain text
  const getPlainText = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  // Function to truncate text
  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 font-sans">
      <Head>
        <title>Daftar Produk - BumiAji Store</title>
        <meta name="description" content="Temukan berbagai produk terbaik di BumiAji Store." />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8" data-aos="fade-down">
          <button
            onClick={() => window.location.href = '/'}
            className="group flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
            aria-label="Go back"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm group-hover:shadow-md transition-shadow duration-200 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="text-sm font-medium">Kembali</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Koleksi Produk</h1>
          <p className="text-gray-600">Temukan produk terbaik pilihan kami</p>
        </div>

        {/* Modern Banner */}
        <div
          className="relative w-full h-80 aspect-[4/1] rounded-2xl overflow-hidden mb-8 shadow-lg bg-gradient-to-r from-gray-900 to-gray-700"
          data-aos="fade-up"
        >
          {/* Gambar background */}
          <img
            src={banner}
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover z-100"
          />

          {/* Overlay semi-transparan */}
          <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm z-10"></div>

          {/* Teks di atas overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-2">Koleksi Terbaru</h2>
              <p className="text-lg opacity-90">Produk berkualitas dengan harga terjangkau</p>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Section - FIXED Z-INDEX */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 relative z-30" data-aos="fade-up">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Search Bar - Full Width */}
            <div className="relative">
              <input
                type="text"
                name="search"
                value={form.search}
                onChange={handleChange}
                placeholder="Cari produk yang Anda inginkan..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                </svg>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Sort - Custom Dropdown - FIXED Z-INDEX */}
              <div className="relative" data-dropdown>
                <button
                  type="button"
                  onClick={() => {
                    closeAllDropdowns();
                    setIsSortDropdownOpen(!isSortDropdownOpen);
                  }}
                  className="group border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center min-w-[140px]"
                >
                  <svg className="h-4 w-4 mr-2 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                  <span className="flex-1 text-left">
                    {form.sort ? sortOptions.find(opt => opt.value === form.sort)?.label : 'Urutkan'}
                  </span>
                  <svg className="ml-2 h-4 w-4 transform transition-transform duration-200 text-gray-400" style={{ transform: isSortDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z" />
                  </svg>
                </button>
                {isSortDropdownOpen && (
                  <div className="absolute z-[9999] mt-2 w-full bg-white shadow-xl rounded-lg py-2 border border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setForm({ ...form, sort: '' });
                        setIsSortDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700 flex items-center"
                    >
                      <svg className="h-4 w-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reset Urutan
                    </button>
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setForm({ ...form, sort: opt.value });
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center ${
                          form.sort === opt.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {opt.value.includes('_asc') ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4 4m0 0l4-4m-4 4V8" />
                          )}
                        </svg>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Kategori - Enhanced - FIXED Z-INDEX */}
              <div className="relative" data-dropdown>
                <button
                  type="button"
                  onClick={() => {
                    closeAllDropdowns();
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  }}
                  className="group border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center min-w-[140px]"
                >
                  <svg className="h-4 w-4 mr-2 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="flex-1 text-left">
                    {form.category.length > 0 ? `${form.category.length} kategori` : 'Kategori'}
                  </span>
                  <svg className="ml-2 h-4 w-4 transform transition-transform duration-200 text-gray-400" style={{ transform: isCategoryDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z" />
                  </svg>
                </button>
                {isCategoryDropdownOpen && (
                  <div className="absolute z-[9999] mt-2 w-64 bg-white shadow-xl rounded-lg py-2 border border-gray-200 max-h-60 overflow-y-auto">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pilih Kategori</span>
                    </div>
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={form.category.includes(cat.id)}
                            onChange={() => handleCheckboxChange('category', cat.id)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          {form.category.includes(cat.id) && (
                            <svg className="absolute inset-0 h-4 w-4 text-blue-600 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="ml-3 text-gray-700 group-hover:text-gray-900">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-200 flex items-center"
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                </svg>
                Cari
              </button>
            </div>
          </form>
        </div>

        {/* Products Grid - REDUCED Z-INDEX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
          {products.data.length > 0 ? (
            products.data.map((product, idx) => (
              <Link
                href={productsRoute.showPublic(product.slug).url}
                key={product.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col relative z-0"
                data-aos="fade-up"
                data-aos-delay={idx * 50}
              >
                <div className="relative bg-gray-100 h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={product.photo}
                    alt={product.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/300x200/F3F4F6/9CA3AF?text=Produk';
                    }}
                  />

                  {/* Category Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                      {product.category?.name || 'Umum'}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
                      {product.productName}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                    {truncateText(getPlainText(product.description))}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
                      Rp {(product.price).toLocaleString('id-ID')}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const phone = '6285850901520';
                        const message = `Halo, saya tertarik dengan produk ${product.productName}`;
                        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                        window.open(url, '_blank');
                      }}
                      
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H18M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      </svg>
                      <span>Pesan</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full" data-aos="fade-up">
              <div className="text-center py-16">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Produk tidak ditemukan</h3>
                <p className="text-gray-600">Coba ubah filter pencarian atau kata kunci Anda</p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        {products.data.length > 0 && (
          <div className="flex justify-center mt-12 relative z-10" data-aos="fade-up">
            <div className="flex items-center space-x-1 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              {products.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url || '#'}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                    link.active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  } ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'}`}
                  data-aos="fade-up"
                  data-aos-delay={idx * 20}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}