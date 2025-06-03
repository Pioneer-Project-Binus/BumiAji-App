# BumiAji-App
Pembuatan Website Desa Bumiaji

```Javascript
API Documentation

Respons Inertia/React untuk Setiap Controller

1. `AlbumController` - Contoh Respons Inertia/React

Skenario 1: Respons Data Sukses
 
A. GET Daftar Album (Method `index`)
 Component React (Inertia): `resources/js/Pages/Albums/Index.jsx`
 Props yang diterima:
    {
      albums: { 
        current_page: 1,
        data: [
          {
            id: 1,
            name: "Liburan Musim Panas",
            slug: "liburan-musim-panas",
            description: "Foto-foto dari liburan musim panas 2024.",
            coverImage: "album_covers/uuid_unik.jpg", // path relatif ke storage
            status: "published", // 'draft', 'published', 'archived'
            createdAt: "2024-06-01T00:00:00.000000Z",
            updatedAt: "2024-06-01T00:00:00.000000Z",
            isDeleted: false,
            galerys_count: 5, // Hasil dari withCount('galerys')
            cover_image_url: "http://localhost/storage/album_covers/uuid_unik.jpg" // URL lengkap jika ditambahkan di controller
          },
          // ... album lainnya
        ],
        first_page_url: "http://localhost/albums?page=1",
        from: 1,
        last_page: 3,
        // ... metadata paginasi lainnya (last_page_url, links, next_page_url, path, per_page, prev_page_url, to, total)
      },
      filters: { // Mencerminkan query string dari URL
        search: "Musim Panas", // jika ?search=Musim Panas
        status: "published"    // jika ?status=published
      },
      can: { // Hak akses dari controller
        create_album: true
      },
      auth: { user: { id: 1, name: "Admin User" } },
      flash: { success: null, error: null },
      errors: {} // Kosong saat sukses
    }

B. Menampilkan Detail Album (Method `show`)
 Komponen React (Inertia): `resources/js/Pages/Albums/Show.jsx`
 Props yang diterima:
    {
      album: {
        id: 1,
        name: "Liburan Musim Panas",
        slug: "liburan-musim-panas",
        description: "Foto-foto dari liburan musim panas 2024.",
        coverImage: "album_covers/uuid_unik.jpg",
        status: "published",
        createdAt: "2024-06-01T00:00:00.000000Z",
        updatedAt: "2024-06-01T00:00:00.000000Z",
        isDeleted: false,
        cover_image_url: "http://localhost/storage/album_covers/uuid_unik.jpg",
        galeries: [ // Data relasi 'galeries'
          { id: 10, title: "Foto Pantai", / ... field galeri lainnya ... / },
          { id: 11, title: "Foto Gunung", / ... / }
        ],
        creator: { id: 1, name: "Admin User" }, // Data relasi 'creator'
        updater: null // atau objek user jika ada yang mengupdate
      },
      can: {
        edit_album: true,
        delete_album: true
      },
      auth: { user: { id: 1, name: "Admin User" } },
      flash: { success: null, error: null },
      errors: {}
    }

Skenario 2: Respons Error Validasi (Method `store` atau `update`)
 Komponen React (Inertia): `resources/js/Pages/Albums/Create.jsx` atau `Edit.jsx` (setelah redirect dari controller)
 Props yang diterima:
    
    {
      errors: {
        'name.required' => 'Judul album wajib diisi.',
        'name.string' => 'Judul album harus berupa teks.',
        'name.max' => 'Judul album maksimal 255 karakter.',

        'description.string' => 'Deskripsi harus berupa teks.',
        
        'cover_image.image' => 'Gambar harus berupa file gambar.',
        'cover_image.mimes' => 'Gambar hanya boleh berformat jpeg, png, atau jpg.',
        'cover_image.max' => 'Ukuran gambar maksimal 2MB.',

        'status.required' => 'Status album wajib dipilih.',
        'status.in' => 'Status tidak valid.',
      },
      // Props lain yang relevan untuk halaman Create/Edit, misalnya daftar status
      // statusOptions: ['draft', 'published', 'archived'],
      auth: { user: { id: 1, name: "Admin User" } },
      flash: { error: "Validasi gagal! Silakan periksa kembali input Anda." }
      // Data input sebelumnya (old input) akan otomatis di-repopulate oleh helper form Inertia
    }
    

Skenario 3: Query/Filter (Method `index`)
 Ini sudah tercakup dalam Skenario 1A. Prop `filters` akan berisi parameter query yang aktif dari URL, misalnya:
    
    filters: {
      search: "Nama Album Dicari",
      status: "published"
    }
    

---

2. `ArticleController` - Contoh Respons Inertia/React

Skenario 1: Respons Data Sukses

A. Menampilkan Daftar Artikel (Method `index`)
 Komponen React (Inertia): `resources/js/Pages/Articles/Index.jsx`
 Props yang diterima:
    
    {
      articles: { // Objek paginasi
        current_page: 1,
        data: [
          {
            id: 1,
            title: "Judul Artikel Pertama",
            slug: "judul-artikel-pertama-xyz12",
            content: "<p>Isi konten artikel...</p>",
            featuredImage: "article_images/uuid_gambar.jpg",
            featured_image_url: "http://localhost/storage/article_images/uuid_gambar.jpg", // Jika ditambahkan
            status: "published",
            createdAt: "2024-06-02T00:00:00.000000Z",
            // Relasi
            category: { id: 1, name: "Teknologi" },
            author: { id: 2, name: "Penulis Artikel" },
            creator: { id: 1, name: "Admin User" },
            updater: null
          },
          // ... artikel lainnya
        ],
        // ... metadata paginasi
      },
      categories: [ { id: 1, name: "Teknologi" }, { id: 2, name: "Bisnis" } ], // Untuk filter
      authors: [ { id: 2, name: "Penulis Artikel" }, { id: 3, name: "Kontributor Lain" } ], // Untuk filter
      filters: {
        search: "Judul",
        category: "1", // ID kategori
        status: "published",
        author: "2" // ID author
      },
      // 'can' tidak didefinisikan secara eksplisit di index, tapi bisa ditambahkan untuk tombol "Buat Artikel"
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

B. Menampilkan Detail Artikel (Method `show`)
 Komponen React (Inertia): `resources/js/Pages/Articles/Show.jsx`
 Props yang diterima:
    
    {
      article: {
        id: 1,
        title: "Judul Artikel Pertama",
        slug: "judul-artikel-pertama-xyz12",
        content: "<p>Isi konten artikel...</p>",
        featuredImage: "article_images/uuid_gambar.jpg",
        featured_image_url: "http://localhost/storage/article_images/uuid_gambar.jpg",
        status: "published",
        createdAt: "2024-06-02T00:00:00.000000Z",
        category: { id: 1, name: "Teknologi" },
        author: { id: 2, name: "Penulis Artikel" },
        creator: { id: 1, name: "Admin User" },
        updater: null
      },
      // 'can' bisa ditambahkan di sini jika ada tombol edit/delete di halaman show
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

Skenario 2: Respons Error Validasi (Method `store` atau `update`)
 Komponen React (Inertia): `resources/js/Pages/Articles/Create.jsx` atau `Edit.jsx`
 Props yang diterima:
    
    {
      errors: {
        'title.required' => 'Judul artikel wajib diisi.',
        'title.string' => 'Judul harus berupa teks.',
        'title.max' => 'Judul maksimal 255 karakter.',

        'content.required' => 'Konten artikel wajib diisi.',
        'content.string' => 'Konten harus berupa teks.',
            
        'featuredImage.image' => 'Gambar harus berupa file gambar.',
        'featuredImage.mimes' => 'Format gambar harus jpeg, png, jpg, gif, svg, atau webp.',
        'featuredImage.max' => 'Ukuran gambar maksimal 2MB.',
            
        'status.required' => 'Status wajib dipilih.',
        'status.in' => 'Status tidak valid.',
            
        'categoryId.exists' => 'Kategori tidak ditemukan.',
        'authorId.exists' => 'Penulis tidak ditemukan.',
      },
      categories: [ / ... / ], // Untuk dropdown di form
      authors: [ / ... / ], // Untuk dropdown di form
      auth: { / ... / },
      flash: { error: "Gagal menyimpan artikel!" }
    }
    

Skenario 3: Query/Filter (Method `index`)
 Tercakup di Skenario 1A. Contoh `filters`:
    
    filters: {
      search: "Laravel",
      category: "1",
      status: "draft",
      author: "2"
    }
    

---

3. `CategoryArticleController` - Contoh Respons Inertia/React

Skenario 1: Respons Data Sukses

A. Menampilkan Daftar Kategori Artikel (Method `index`)
 Komponen React (Inertia): `resources/js/Pages/CategoryArticles/Index.jsx`
 Props yang diterima:
    
    {
      categoryArticles: { // Objek paginasi
        data: [
          {
            id: 1,
            name: "Tutorial Pemrograman",
            slug: "tutorial-pemrograman",
            description: "Kumpulan tutorial untuk belajar pemrograman.",
            articles_count: 15, // dari withCount
            createdAt: "2024-01-10T00:00:00.000000Z"
          },
          // ... kategori lainnya
        ],
        // ... metadata paginasi
      },
      filters: {
        search: "Tutorial"
      },
      can: {
        create_category_article: true
      },
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

B. Menampilkan Detail Kategori Artikel (Method `show`)
 Komponen React (Inertia): `resources/js/Pages/CategoryArticles/Show.jsx`
 Props yang diterima:
    
    {
      categoryArticle: {
        id: 1,
        name: "Tutorial Pemrograman",
        slug: "tutorial-pemrograman",
        description: "Kumpulan tutorial untuk belajar pemrograman.",
        articles_count: 15,
        createdAt: "2024-01-10T00:00:00.000000Z",
        // Anda mungkin ingin memuat artikel terkait di sini jika diperlukan
        // articles: [ { id: 101, title: "Belajar React" }, ... ]
      },
      can: {
        edit_category_article: true,
        delete_category_article: true
      },
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

Skenario 2: Respons Error Validasi (Method `store` atau `update`)
 Komponen React (Inertia): `resources/js/Pages/CategoryArticles/Create.jsx` atau `Edit.jsx`
 Props yang diterima:
    
    {
      errors: {
        'name.required' => 'Nama kategori artikel wajib diisi.',
        'name.string' => 'Nama kategori artikel harus berupa teks.',
        'name.max' => 'Nama kategori artikel maksimal 255 karakter.',
        'name.unique' => 'Nama kategori artikel sudah digunakan.',
            
        'description.string' => 'Deskripsi harus berupa teks.',
      },
      auth: { / ... / },
      flash: { error: "Data tidak valid!" }
    }
    

Skenario 3: Query/Filter (Method `index`)
 Tercakup di Skenario 1A. Contoh `filters`:
    
    filters: {
      search: "Berita"
    }
    

---
Lanjutan untuk controller berikutnya akan menyusul. Ini adalah proses yang cukup panjang untuk setiap controller. Saya akan melanjutkannya secara bertahap.

4. `CategoryProductController` - Contoh Respons Inertia/React

Skenario 1: Respons Data Sukses

A. Menampilkan Daftar Kategori Produk (Method `index`)
 Komponen React (Inertia): `resources/js/Pages/CategoryProducts/Index.jsx`
 Props yang diterima:
    
    {
      categoryProducts: { // Objek paginasi
        data: [
          {
            id: 1,
            name: "Elektronik",
            slug: "elektronik-xyz789",
            description: "Berbagai macam barang elektronik.",
            products_count: 25, // dari withCount
            createdAt: "2024-02-15T00:00:00.000000Z"
          },
          // ... kategori produk lainnya
        ],
        // ... metadata paginasi
      },
      filters: {
        search: "Elektronik"
      },
      // 'can' tidak didefinisikan secara eksplisit di controller ini untuk index,
      // tapi bisa ditambahkan jika ada hak akses untuk membuat.
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

B. Menampilkan Detail Kategori Produk (Method `show`)
 Komponen React (Inertia): `resources/js/Pages/CategoryProducts/Show.jsx`
 Props yang diterima:
    
    {
      categoryProduct: {
        id: 1,
        name: "Elektronik",
        slug: "elektronik-xyz789",
        description: "Berbagai macam barang elektronik.",
        products_count: 25,
        createdAt: "2024-02-15T00:00:00.000000Z"
        // Bisa juga memuat produk terkait jika diperlukan
        // products: [ { id: 201, productName: "Laptop ABC" }, ... ]
      },
      // 'can' tidak didefinisikan di controller untuk show,
      // bisa ditambahkan jika ada tombol edit/delete di halaman ini.
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

Skenario 2: Respons Error Validasi (Method `store` atau `update`)
 Komponen React (Inertia): `resources/js/Pages/CategoryProducts/Create.jsx` atau `Edit.jsx`
 Props yang diterima:
    
    {
      errors: {
        'name.required' => 'Nama kategori produk wajib diisi.',
        'name.string' => 'Nama kategori produk harus berupa teks.',
        'name.max' => 'Nama kategori produk maksimal 255 karakter.',
            
        'description.string' => 'Deskripsi harus berupa teks.',
      },
      auth: { / ... / },
      flash: { error: "Penyimpanan gagal, periksa input." }
    }
    

Skenario 3: Query/Filter (Method `index`)
 Tercakup di Skenario 1A. Contoh `filters`:
    
    filters: {
      search: "Pakaian"
    }
    

---

5. `ContactController` - Contoh Respons Inertia/React
(Fokus pada bagian admin, karena `store` publik biasanya hanya redirect back)

Skenario 1: Respons Data Sukses (Admin)

A. Menampilkan Daftar Pesan Kontak (Method `index` - Admin)
 Komponen React (Inertia): `resources/js/Pages/Admin/Contacts/Index.jsx`
 Props yang diterima:
    
    {
      contacts: { // Objek paginasi
        data: [
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "08123456789",
            subject: "Pertanyaan tentang Produk X",
            message: "Saya ingin bertanya lebih lanjut mengenai fitur produk X...",
            slug: "pertanyaan-tentang-produk-x-abc12",
            sentAt: "2024-05-20T14:30:00.000000Z", 
            isDeleted: false
          },
        ],
        
      },
      filters: {
        search: "Produk X"
      },
      auth: { / ... (admin user) ... / },
      flash: { / ... / },
      errors: {}
    }
    

B. Menampilkan Detail Pesan Kontak (Method `show` - Admin)
 Komponen React (Inertia): `resources/js/Pages/Admin/Contacts/Show.jsx`
 Props yang diterima:
    
    {
      contact: {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "08123456789",
        subject: "Pertanyaan tentang Produk X",
        message: "Saya ingin bertanya lebih lanjut mengenai fitur produk X...",
        slug: "pertanyaan-tentang-produk-x-abc12",
        sentAt: "2024-05-20T14:30:00.000000Z",
        isDeleted: false
      },
      auth: { / ... (admin user) ... / },
      flash: { / ... / },
      errors: {}
    }
    

Skenario 2: Respons Error Validasi (Method `store` - Publik)
 Komponen React (Inertia): Halaman form kontak publik (misal `resources/js/Pages/ContactUs.jsx`) setelah redirect.
 Props yang diterima:
    
    {
      errors: {
        'name.required' => 'Nama wajib diisi.',
        'name.string' => 'Nama harus berupa teks.',
        'name.max' => 'Nama maksimal 255 karakter.',
        
        'email.required' => 'Email wajib diisi.',
        'email.email' => 'Format email tidak valid.',
        'email.max' => 'Email maksimal 255 karakter.',
        
        'phone.string' => 'Nomor telepon harus berupa teks.',
        'phone.max' => 'Nomor telepon maksimal 20 karakter.',
        
        'subject.required' => 'Subjek wajib diisi.',
        'subject.string' => 'Subjek harus berupa teks.',
        'subject.max' => 'Subjek maksimal 255 karakter.',
        
        'message.required' => 'Pesan wajib diisi.',
        'message.string' => 'Pesan harus berupa teks.',
      },
      auth: { user: null }, 
      flash: { error: "Pesan gagal dikirim, periksa kembali isian Anda." }
    }
    

Skenario 3: Query/Filter (Method `index` - Admin)
 Tercakup di Skenario 1A. Contoh `filters`:
    
    filters: {
      search: "John Doe"
    }
    

---

6. `GaleryController` - Contoh Respons Inertia/React
(Diasumsikan ejaan "Galery" dan path `admin.galeries.index`)

Skenario 1: Respons Data Sukses

A. Menampilkan Daftar Item Galeri (Method `index`)
 Komponen React (Inertia): `resources/js/Pages/Galeries/Index.jsx` (atau `Admin/Galeries/Index.jsx`)
 Props yang diterima:
    
    {
      galeries: {
        data: [
          {
            id: 1,
            title: "Foto Matahari Terbenam",
            slug: "foto-matahari-terbenam-def34",
            description: "Pemandangan indah di sore hari.",
            type: "photo", 
            filePath: "galery_items/photos/uuid_sunset.jpg",
            thumbnail: "galery_items/thumbnails/uuid_sunset_thumb.jpg",
            displayOrder: 1,
            createdAt: "2024-03-01T00:00:00.000000Z",
            album: { id: 1, name: "Album Alam", slug: "album-alam" },
            creator: { id: 1, name: "Admin User" },
            updater: null,
            file_url: "http://localhost/storage/galery_items/photos/uuid_sunset.jpg",
            thumbnail_url: "http://localhost/storage/galery_items/thumbnails/uuid_sunset_thumb.jpg"
          },
        ],
      },
      albums: [ { id: 1, name: "Album Alam", slug: "album-alam" }, { id: 2, name: "Album Kota", slug: "album-kota" } ], // Untuk filter
      filters: {
        search: "Matahari",
        album_id: "1",
        type: "photo"
      },
      can: {
        create_galery: true
      },
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

B. Menampilkan Detail Item Galeri (Method `show`)
 Komponen React (Inertia): `resources/js/Pages/Galeries/Show.jsx`
 Props yang diterima:
    
    {
      galery: {
        id: 1,
        title: "Foto Matahari Terbenam",
        slug: "foto-matahari-terbenam-def34",
        description: "Pemandangan indah di sore hari.",
        type: "photo",
        filePath: "galery_items/photos/uuid_sunset.jpg",
        thumbnail: "galery_items/thumbnails/uuid_sunset_thumb.jpg",
        displayOrder: 1,
        createdAt: "2024-03-01T00:00:00.000000Z",
        album: { id: 1, name: "Album Alam", slug: "album-alam" },
        creator: { id: 1, name: "Admin User" },
        updater: null,
        file_url: "http://localhost/storage/galery_items/photos/uuid_sunset.jpg",
        thumbnail_url: "http://localhost/storage/galery_items/thumbnails/uuid_sunset_thumb.jpg"
      },
      can: {
        edit_galery: true,
        delete_galery: false 
      },
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

Skenario 2: Respons Error Validasi (Method `store` atau `update`)
 Komponen React (Inertia): `resources/js/Pages/Galeries/Create.jsx` atau `Edit.jsx`
 Props yang diterima:
    
    {
      errors: {
        'title.required' => 'Judul galeri wajib diisi.',
        'title.string' => 'Judul galeri harus berupa teks.',
        'title.max' => 'Judul galeri maksimal 255 karakter.',
        'description.string' => 'Deskripsi harus berupa teks.',
        'type.required' => 'Tipe galeri wajib dipilih.',
        'type.in' => 'Tipe galeri harus berupa "photo" atau "video".',
        'filePath.required_if' => 'File gambar wajib diunggah jika tipe galeri adalah foto.',          'filePath.image' => 'File harus berupa gambar.',
        'filePath.mimes' => 'Format gambar harus berupa jpeg, png, jpg, gif, svg, atau webp.',
       'filePath.max' => 'Ukuran gambar maksimal 4MB.',
        'videoUrl.required_if' => 'URL video wajib diisi jika tipe galeri adalah video.',
        'videoUrl.url' => 'URL video tidak valid.',
        'thumbnail.image' => 'Thumbnail harus berupa gambar.',
        'thumbnail.mimes' => 'Format thumbnail harus berupa jpeg, png, jpg, gif, svg, atau webp.',
        'thumbnail.max' => 'Ukuran thumbnail maksimal 2MB.',
        'displayOrder.integer' => 'Urutan tampilan harus berupa angka.',
        'displayOrder.min' => 'Urutan tampilan minimal 0.',
        'albumId.required' => 'Album wajib dipilih.',
        'albumId.exists' => 'Album yang dipilih tidak valid.',
      },
      albums: [ / ... daftar album untuk dropdown ... / ],
      auth: { / ... / },
      flash: { error: "Gagal menyimpan item galeri!" }
    }
    

Skenario 3: Query/Filter (Method `index`)
 Tercakup di Skenario 1A. Contoh `filters`:
    
    filters: {
      search: "Pemandangan",
      album_id: "2",
      type: "video"
    }
    

---

7. `PhotoProductController` - Contoh Respons Inertia/React

Skenario 1: Respons Data Sukses

A. Menampilkan Daftar Foto Produk (Method `index`)
 Komponen React (Inertia): `resources/js/Pages/PhotoProducts/Index.jsx`
 Props yang diterima:
    
    {
      photoProducts: { 
        data: [
          {
            id: 1,
            productId: 101,
            title: "Tampilan Depan Produk A",
            slug: "tampilan-depan-produk-a-ghi45",
            filePath: "product_photos/uuid_produk_a_depan.jpg",
            displayOrder: 1,
            createdAt: "2024-04-10T00:00:00.000000Z", 
            isDeleted: false,
            product: { id: 101, productName: "Produk A Keren", slug: "produk-a-keren" },
            file_url: "http://localhost/storage/product_photos/uuid_produk_a_depan.jpg" 
          },
        ],
      },
      products: [ { id: 101, productName: "Produk A Keren", slug: "produk-a-keren" }, / ... / ], 
      filters: {
        search: "Depan",
        product_id: "101"
      },
      can: {
        create_photo_product: true
      },
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

B. Menampilkan Detail Foto Produk (Method `show`)
 Komponen React (Inertia): `resources/js/Pages/PhotoProducts/Show.jsx`
 Props yang diterima:
    
    {
      photoProduct: {
        id: 1,
        productId: 101,
        title: "Tampilan Depan Produk A",
        slug: "tampilan-depan-produk-a-ghi45",
        filePath: "product_photos/uuid_produk_a_depan.jpg",
        displayOrder: 1,
        createdAt: "2024-04-10T00:00:00.000000Z",
        isDeleted: false,
        product: { id: 101, productName: "Produk A Keren", slug: "produk-a-keren" },
        file_url: "http://localhost/storage/product_photos/uuid_produk_a_depan.jpg"
      },
      can: {
        edit_photo_product: true 
      },
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

Skenario 2: Respons Error Validasi (Method `store` atau `update`)
 Komponen React (Inertia): `resources/js/Pages/PhotoProducts/Create.jsx` atau `Edit.jsx`
 Props yang diterima (untuk `store` dengan multiple upload):
    
    {
      errors: {
            'productId.required' => 'Produk wajib dipilih.',
            'productId.exists' => 'Produk yang dipilih tidak ditemukan.',
            
            'titles.array' => 'Judul foto harus dalam bentuk array.',
            'titles.*.string' => 'Judul setiap foto harus berupa teks.',
            'titles.*.max' => 'Judul foto tidak boleh lebih dari 255 karakter.',

            'photos.required' => 'Minimal unggah satu foto produk.',
            'photos.array' => 'Format unggahan foto tidak valid.',
            'photos.*.required' => 'Setiap foto produk wajib diunggah.',
            'photos.*.image' => 'File yang diunggah harus berupa gambar.',
            'photos.*.mimes' => 'Format gambar harus jpeg, png, jpg, gif, svg, atau webp.',
            'photos.*.max' => 'Ukuran gambar maksimal adalah 2MB.',

            'displayOrders.array' => 'Urutan tampilan harus berupa array.',
            'displayOrders.*.integer' => 'Urutan tampilan harus berupa angka.',
            'displayOrders.*.min' => 'Urutan tampilan minimal bernilai 0.',
      },
      products: [ / ... daftar produk untuk dropdown ... / ],
      auth: { / ... / },
      flash: { error: "Gagal mengunggah foto produk!" }
    }
    
 Props yang diterima (untuk `update` satu foto):
    
    {
      errors: {
        title: "Judul foto produk tidak boleh kosong.",
        photo: "File yang diunggah bukan gambar yang valid."
      },
      products: [ / ... / ],
      auth: { / ... / },
      flash: { error: "Gagal memperbarui foto produk!" }
    }
    

Skenario 3: Query/Filter (Method `index`)
 Tercakup di Skenario 1A. Contoh `filters`:
    
    filters: {
      search: "Produk A",
      product_id: "101"
    }
    

---

8. `ProductController` - Contoh Respons Inertia/React

Skenario 1: Respons Data Sukses

A. Menampilkan Daftar Produk (Method `index`)
 Komponen React (Inertia): `resources/js/Pages/Products/Index.jsx`
 Props yang diterima:
    
    {
      products: { 
        data: [
          {
            id: 201,
            productName: "Laptop Super Canggih",
            slug: "laptop-super-canggih",
            description: "Laptop dengan spesifikasi terkini untuk profesional.",
            price: 15000000.00,
            stock: 50,
            status: "published", // 'draft', 'published', 'outofstock'
            createdAt: "2024-05-01T00:00:00.000000Z",
            isDeleted: false,
            category: { id: 1, name: "Elektronik" },
            photos: [
              { id: 1, title: "Laptop Tampak Depan", filePath: "product_photos/laptop_depan.jpg", file_url: "..." }
            ]
          },
        ],
      },
      categories: [ { id: 1, name: "Elektronik" }, { id: 2, name: "Fashion" } ], 
      filters: {
        search: "Laptop",
        category: "1",
        status: "published"
      },
      can: {
        create_product: true
      },
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

B. Menampilkan Detail Produk (Method `show`)
 Komponen React (Inertia): `resources/js/Pages/Products/Show.jsx`
 Props yang diterima:
    
    {
      product: {
        id: 201,
        productName: "Laptop Super Canggih",
        slug: "laptop-super-canggih",
        description: "Laptop dengan spesifikasi terkini untuk profesional.",
        price: 15000000.00,
        stock: 50,
        status: "published",
        createdAt: "2024-05-01T00:00:00.000000Z",
        category: { id: 1, name: "Elektronik" },
        photos: [
          { id: 1, title: "Laptop Tampak Depan", filePath: "...", file_url: "...", / ... / },
          { id: 2, title: "Laptop Tampak Samping", filePath: "...", file_url: "...", / ... / }
        ],
        creator: { id: 1, name: "Admin" },
        updater: null
      },
      can: {
        edit_product: true,
        delete_product: true
      },
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

Skenario 2: Respons Error Validasi (Method `store` atau `update`)
 Komponen React (Inertia): `resources/js/Pages/Products/Create.jsx` atau `Edit.jsx`
 Props yang diterima:
    
    {
      errors: {
        'productName.required' => 'Nama produk wajib diisi.',
        'productName.string' => 'Nama produk wajib berupa teks.',
        'productName.unique' => 'Nama produk sudah digunakan.',
        'description.required' => 'Deskripsi produk wajib diisi.',
        'description.string' => 'Deskripsi produk wajib berupa teks.',
        'price.required' => 'Harga produk wajib diisi.',
        'price.numeric' => 'Harga produk harus berupa angka.',
        'stock.required' => 'Stok produk wajib diisi.',
        'stock.integer' => 'Stok produk harus berupa angka.',
        'categoryId.exists' => 'Kategori yang dipilih tidak valid.',
        'status.required' => 'Status produk wajib dipilih.',
        'status.in' => 'Status produk tidak valid.',
      },
      categories: [ / ... daftar kategori untuk dropdown ... / ],
      auth: { / ... / },
      flash: { error: "Gagal menyimpan produk!" }
    }
    

Skenario 3: Query/Filter (Method `index`)
 Tercakup di Skenario 1A. Contoh `filters`:
    
    filters: {
      search: "Canggih",
      category: "1",
      status: "outofstock"
    }
    

---

9. `ProfileVillageController` - Contoh Respons Inertia/React

Skenario 1: Respons Data Sukses

A. Menampilkan Form Edit Profil Desa (Method `showOrCreate`)
 Komponen React (Inertia): `resources/js/Pages/ProfileVillage/Edit.jsx`
 Props yang diterima (jika profil sudah ada):
    
    {
      profileVillage: {
        id: 1, // Hanya ada satu, jadi ID mungkin selalu 1 atau tidak terlalu relevan
        name: "Desa Makmur Jaya",
        history: "Sejarah singkat Desa Makmur Jaya...",
        vision: "Menjadi desa yang mandiri dan sejahtera.",
        mission: "1. Meningkatkan kualitas SDM. 2. Mengembangkan potensi desa.",
        logo: "village_logos/uuid_logo_desa.png",
        logo_url: "http://localhost/storage/village_logos/uuid_logo_desa.png",
        address: "Jl. Raya Desa No. 1, Kecamatan Sejahtera, Kabupaten Sentosa",
        postalCode: "12345",
        phone: "021-555-0101",
        email: "info@desamakmurjaya.go.id",
        website: "https://desamakmurjaya.go.id",
        socialMedia: "{\"instagram\":\"@desamakmurjaya\",\"facebook\":\"Desa Makmur Jaya Official\"}",
        latitude: -7.123456,
        longitude: 110.654321,
        createdBy: { id: 1, name: "Pamong Desa" },
        updatedBy: { id: 1, name: "Pamong Desa" },
        createdAt: "2023-01-01T00:00:00.000000Z",
        updatedAt: "2024-05-20T00:00:00.000000Z"
      },
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    
 Props yang diterima (jika profil belum ada):
    
    {
      profileVillage: null,
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

Skenario 2: Respons Error Validasi (Method `storeOrUpdate`)
 Komponen React (Inertia): `resources/js/Pages/ProfileVillage/Edit.jsx` (setelah redirect)
 Props yang diterima:
    
    {
      errors: {
        'name.required' => 'Nama desa wajib diisi.',
        'name.string' => 'Nama desa harus berupa teks.',
        'name.max' => 'Nama desa maksimal 255 karakter.',

        'history.string' => 'Sejarah harus berupa teks.',

        'vision.string' => 'Visi harus berupa teks.',
        'mission.string' => 'Misi harus berupa teks.',

         'logo.image' => 'Logo harus berupa file gambar.',
         'logo.mimes' => 'Logo harus berformat: jpeg, png, jpg, gif, svg, atau webp.',
        'logo.max' => 'Logo maksimal berukuran 2MB.',

        'address.string' => 'Alamat harus berupa teks.',

        'postalCode.string' => 'Kode pos harus berupa teks.',
        'postalCode.max' => 'Kode pos maksimal 10 karakter.',
        
        'phone.string' => 'Nomor telepon harus berupa teks.',
        'phone.max' => 'Nomor telepon maksimal 20 karakter.',

        'email.email' => 'Format email tidak valid.',
        'email.max' => 'Email maksimal 255 karakter.',

        'website.url' => 'Format website harus berupa URL yang valid.',
        'website.max' => 'URL website maksimal 255 karakter.',

        'socialMedia.string' => 'Media sosial harus berupa teks.',

        'latitude.numeric' => 'Latitude harus berupa angka.',
        'latitude.between' => 'Latitude harus antara -90 hingga 90.',

        'longitude.numeric' => 'Longitude harus berupa angka.',
        'longitude.between' => 'Longitude harus antara -180 hingga 180.',
      },
      auth: { / ... / },
      flash: { error: "Gagal menyimpan profil desa!" }
    }
    

Skenario 3: Query/Filter
 Tidak berlaku untuk controller ini karena biasanya hanya mengelola satu entitas dan tidak ada halaman `index` dengan filter.

---

10. `TestimonialController` - Contoh Respons Inertia/React

Skenario 1: Respons Data Sukses

A. Menampilkan Daftar Testimoni (Method `index` - bisa admin atau publik)
 Komponen React (Inertia Admin): `resources/js/Pages/Admin/Testimonials/Index.jsx`
 Komponen React (Inertia Publik): `resources/js/Pages/Public/Testimonials/Index.jsx`
 Props yang diterima:
    
    {
      testimonials: {
        data: [
          {
            id: 1,
            name: "Budi Sanjaya",
            slug: "budi-sanjaya-jkl56",
            photo: "testimonial_photos/uuid_budi.jpg",
            photo_url: "http://localhost/storage/testimonial_photos/uuid_budi.jpg", 
            rating: 5, // integer 1-5 atau null
            message: "Pelayanan sangat memuaskan! Produk berkualitas tinggi.",
            createdAt: "2024-05-25T09:00:00.000000Z",
            isDeleted: false,
            creator: { id: 1, name: "Admin Input" } 
          },
        ],
      },
      filters: {
        search: "Memuaskan",
        rating: "5"
      },
      can: {
        create_testimonial: true
      },
      auth: { / ... / }, 
      flash: { / ... / },
      errors: {}
    }
    

B. Menampilkan Detail Testimoni (Method `show` - bisa admin atau publik)
 Komponen React (Inertia Admin): `resources/js/Pages/Admin/Testimonials/Show.jsx`
 Komponen React (Inertia Publik): `resources/js/Pages/Public/Testimonials/Show.jsx`
 Props yang diterima:
    
    {
      testimonial: {
        id: 1,
        name: "Budi Sanjaya",
        slug: "budi-sanjaya-jkl56",
        photo: "testimonial_photos/uuid_budi.jpg",
        photo_url: "http://localhost/storage/testimonial_photos/uuid_budi.jpg",
        rating: 5,
        message: "Pelayanan sangat memuaskan! Produk berkualitas tinggi.",
        createdAt: "2024-05-25T09:00:00.000000Z",
        creator: { id: 1, name: "Admin Input" }
      },
      can: { 
        edit_testimonial: true,
        delete_testimonial: true
      },
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

Skenario 2: Respons Error Validasi (Method `store` atau `update` - Admin)
 Komponen React (Inertia): `resources/js/Pages/Admin/Testimonials/Create.jsx` atau `Edit.jsx`
 Props yang diterima:
    
    {
      errors: {
        'name.required' => 'Nama wajib diisi.',
        'name.string' => 'Nama harus berupa teks.',
        'name.max' => 'Nama maksimal 255 karakter.',

        'photo.image' => 'Foto harus berupa file gambar.',
        'photo.mimes' => 'Format foto harus jpeg, png, jpg, gif, svg, atau webp.',
        'photo.max' => 'Ukuran foto maksimal 2MB.',

        'rating.integer' => 'Rating harus berupa angka.',
        'rating.min' => 'Rating minimal adalah 1.',
        'rating.max' => 'Rating maksimal adalah 5.',

        'message.required' => 'Pesan wajib diisi.',
        'message.string' => 'Pesan harus berupa teks.',
      },
      auth: { / ... (admin user) ... / },
      flash: { error: "Gagal menyimpan testimoni!" }
    }
    

Skenario 3: Query/Filter (Method `index`)
 Tercakup di Skenario 1A. Contoh `filters`:
    
    filters: {
      search: "Pelayanan",
      rating: "4"
    }
    

---

11. `TourismController` - Contoh Respons Inertia/React

Skenario 1: Respons Data Sukses

A. Menampilkan Daftar Destinasi Wisata (Method `index`)
 Komponen React (Inertia): `resources/js/Pages/Tourisms/Index.jsx`
 Props yang diterima:
    
    {
      tourisms: {
        data: [
          {
            name: 'Pantai Indah',
            slug: 'pantai-indah',
            description: 'Deskripsi Pantai Indah.',
            address: 'Jl. Pantai No. 1',
            ticketPrice: 'Rp 10.000',
            contactInfo: '081234567890',
            latitude: -6.12345,
            longitude: 106.12345,
            socialMedia: { facebook: 'fb.com/pantaiindah', instagram: '@pantaiindah' },
            status: 'published',
            createdAt: "...",
            // Relasi
            photos: [ { id: 1, filePath: "...", file_url: "..." } ],
            creator: { id: 1, name: "Admin User" },
            updater: null
          }
        ],
      },
      filters: { search: 'Pantai', status: 'published' },
      can: { create_tourism: true },
      auth: { / ... / }, flash: { / ... / }, errors: {}
    }
    

B. Menampilkan Detail Destinasi Wisata (Method `show`)
 Komponen React (Inertia): `resources/js/Pages/Tourisms/Show.jsx`
 Props yang diterima:
    
    {
      tourism: { / ... detail objek tourism seperti di atas ... / },
      can: { edit_tourism: true, delete_tourism: true },
      auth: { / ... / }, flash: { / ... / }, errors: {}
    }
    

Skenario 2: Respons Error Validasi (Method `store` atau `update`)
 Komponen React (Inertia): `resources/js/Pages/Tourisms/Create.jsx` atau `Edit.jsx`
 Props yang diterima:
    
    {
      errors: {
        'name.required' => 'Nama tempat wisata wajib diisi.',
            'name.string' => 'Nama tempat wisata harus berupa teks.',
            'name.max' => 'Nama tempat wisata maksimal 255 karakter.',
            'name.unique' => 'Nama tempat wisata sudah digunakan.',

            'description.required' => 'Deskripsi wajib diisi.',
            'description.string' => 'Deskripsi harus berupa teks.',

            'address.string' => 'Alamat harus berupa teks.',

            'ticketPrice.string' => 'Harga tiket harus berupa teks.',
            'ticketPrice.max' => 'Harga tiket maksimal 255 karakter.',

            'contactInfo.string' => 'Kontak harus berupa teks.',
            'contactInfo.max' => 'Kontak maksimal 255 karakter.',

            'latitude.numeric' => 'Latitude harus berupa angka.',
            'latitude.between' => 'Latitude harus antara -90 hingga 90.',

            'longitude.numeric' => 'Longitude harus berupa angka.',
            'longitude.between' => 'Longitude harus antara -180 hingga 180.',

            'socialMedia.json' => 'Format media sosial harus berupa JSON yang valid.',

            'status.required' => 'Status wajib diisi.',
            'status.in' => 'Status harus salah satu dari: draft, published, atau closed.',
      },
      auth: { / ... / }, flash: { error: "Gagal menyimpan destinasi!" }
    }
    

Skenario 3: Query/Filter (Method `index`)
 Tercakup di Skenario 1A.

---

12. `TourismPhotoController` - Contoh Respons Inertia/React

Skenario 1: Respons Data Sukses

A. Menampilkan Daftar Foto Wisata (Method `index`)
 Komponen React (Inertia): `resources/js/Pages/TourismPhotos/Index.jsx`
 Props yang diterima:
    
    {
      tourismPhotos: { 
        data: [
          {
            id: 1,
            destinationId: 10, 
            filePath: "tourism_photos/uuid_foto_wisata.jpg",
            file_url: "http://localhost/storage/tourism_photos/uuid_foto_wisata.jpg", 
            description: "Pemandangan utama di destinasi X.",
            createdAt: "2024-05-30T10:00:00.000000Z", 
            isDeleted: false,
            // Relasi
            destination: { id: 10, name: "Destinasi Wisata X" }
          },
        ],
      },
      destinations: [ { id: 10, name: "Destinasi Wisata X" }, / ... / ], // Untuk filter
      filters: {
        search: "Pemandangan",
        destination_id: "10"
      },
      auth: { / ... / },
      flash: { / ... / },
      errors: {}
    }
    

B. Menampilkan Detail Foto Wisata (Tidak ada Method `show` di controller ini)
 Jika ada halaman detail untuk satu foto wisata, strukturnya akan mirip dengan `PhotoProductController` Skenario 1B, dengan data `tourismPhoto` sebagai prop utama.

Skenario 2: Respons Error Validasi (Method `store` atau `update`)
 Komponen React (Inertia): `resources/js/Pages/TourismPhotos/Create.jsx` atau `Edit.jsx`
 Props yang diterima (untuk `store` dengan multiple upload):
    
    {
      errors: {
        'destinationId.required' => 'ID destinasi wajib diisi.',
            'destinationId.exists' => 'ID destinasi tidak valid.',

            'photos.required' => 'Foto wajib diunggah.',
            'photos.array' => 'Foto harus berupa array.',

            'photos.*.required' => 'Setiap foto wajib diunggah.',
            'photos.*.image' => 'Setiap file harus berupa gambar.',
            'photos.*.mimes' => 'Format gambar harus jpeg, png, jpg, gif, svg, atau webp.',
            'photos.*.max' => 'Ukuran gambar maksimal 2MB.',

            'description.string' => 'Deskripsi harus berupa teks.',
            'description.max' => 'Deskripsi maksimal 255 karakter.', 
      },
      destinations: [ / ... daftar destinasi untuk dropdown ... / ],
      auth: { / ... / },
      flash: { error: "Gagal mengunggah foto wisata!" }
    }
    
 Props yang diterima (untuk `update` satu foto):
    
    {
      errors: {
        destinationId: "Destinasi wisata tidak boleh kosong.",
        photo: "File yang diunggah harus berupa gambar.",
        description: "Deskripsi foto terlalu panjang."
      },
      destinations: [ / ... / ],
      auth: { / ... / },
      flash: { error: "Gagal memperbarui foto wisata!" }
    }
    

Skenario 3: Query/Filter (Method `index`)
 Tercakup di Skenario 1A. Contoh `filters`:
    
    filters: {
      search: "Air Terjun",
      destination_id: "12"
    }
