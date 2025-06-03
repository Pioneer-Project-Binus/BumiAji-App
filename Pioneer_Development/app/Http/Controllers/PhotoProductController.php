<?php

namespace App\Http\Controllers;

use App\Models\PhotoProducts;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PhotoProductController extends Controller
{
    // Index untuk admin, mungkin difilter berdasarkan produk
    public function index(Request $request)
    {
        $query = PhotoProducts::with('product')
            ->where('isDeleted', false);
            // Migrasi PhotoProduct Anda menggunakan `createdAt`, bukan `createdAt`
            // ->orderBy('createdAt', 'desc'); // Sesuaikan dengan nama kolom timestamp Anda

        if ($request->filled('product_id')) {
            $query->where('productId', $request->product_id);
        }
        if ($request->has('search')) {
            $searchTerm = $request->search;
            // Pencarian bisa berdasarkan title foto jika sudah ditambahkan
            $query->where(function($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('filePath', 'like', "%{$searchTerm}%")
                  ->orWhereHas('product', function($subQ) use ($searchTerm){
                      $subQ->where('productName', 'like', "%{$searchTerm}%");
                  });
            });
        }

        $photoProducts = $query->paginate(10);
        $products = Product::where('isDeleted', false)->orderBy('productName')->get(['id', 'productName', 'slug']);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $photoProducts,
                'message' => 'Foto produk berhasil diambil'
            ]);
        }
        
        return Inertia::render('PhotoProducts/Index', [
            'photoProducts' => $photoProducts,
            'products' => $products,
            'filters' => $request->only(['search', 'product_id']),
            'can' => [
                'create_photo_product' => Auth::user()->can('create', PhotoProducts::class),
            ]
        ]);
    }

    public function create(Request $request)
    {
        $products = Product::where('isDeleted', false)->orderBy('productName')->get(['id', 'productName', 'slug']);
        $productId = $request->get('product_id');

        return Inertia::render('PhotoProducts/Create', [
            'products' => $products,
            'selectedProductId' => $productId
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'productId' => 'required|exists:products,id',
            'titles' => 'nullable|array',
            'titles.*' => 'nullable|string|max:255',
            'photos' => 'required|array',
            'photos.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'displayOrders' => 'nullable|array',
            'displayOrders.*' => 'nullable|integer|min:0',
        ], [
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
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validasi gagal'
                ], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $createdPhotos = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $index => $file) {
                $photoProduct = new PhotoProducts();
                $photoProduct->productId = $request->productId;
                
                // Gunakan title dari input, atau buat title default jika ada multiple upload
                $photoTitle = $request->input("titles.{$index}") ?? $request->title . ($index > 0 ? " - " . ($index + 1) : "");
                if (is_array($request->title) && isset($request->title[$index])) {
                    $photoTitle = $request->title[$index];
                } else if (!is_array($request->title) && $index == 0) {
                    $photoTitle = $request->title;
                } else {
                    $originalNameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                    $photoTitle = $originalNameWithoutExt; // Default ke nama file jika tidak ada title spesifik per foto
                }
                $photoProduct->title = $photoTitle;


                // Pembuatan slug unik global untuk PhotoProduct
                $baseSlug = Str::slug($photoProduct->title ?: Str::random(10)); // Fallback jika title kosong
                $slug = $baseSlug;
                $counter = 1;
                while (PhotoProducts::where('slug', $slug)->exists()) {
                    $slug = $baseSlug . '-' . $counter++;
                }
                $photoProduct->slug = $slug;

                $originalName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $uniqueName = Str::uuid() . '.' . $extension;
                $filePath = $file->storeAs('product_photos', $uniqueName, 'public');
                $photoProduct->filePath = $filePath;
                
                $photoProduct->displayOrder = $request->input("displayOrders.{$index}") ?? $request->displayOrder ?? (PhotoProducts::where('productId', $request->productId)->where('isDeleted', false)->max('displayOrder') + 1);
                $photoProduct->createdBy = Auth::id();
                $photoProduct->save();
                $createdPhotos[] = $photoProduct;
            }
        }

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $createdPhotos,
                'message' => 'Foto produk berhasil diunggah'
            ], 201);
        }
        
        $product = Product::find($request->productId);
        return redirect()->route('admin.products.edit', $product->slug) // Redirect ke edit produk induk menggunakan slug produk
            ->with('success', 'Foto produk berhasil diunggah.');
    }

    // Menampilkan detail foto produk berdasarkan slug (jika ada halaman publik/admin terpisah)
    public function show(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $photoProduct = PhotoProducts::with('product')
            ->where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();
        
        $photoProduct->file_url = $photoProduct->filePath ? Storage::url($photoProduct->filePath) : null;

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $photoProduct,
                'message' => 'Foto produk berhasil diambil'
            ]);
        }

        return Inertia::render('PhotoProducts/Show', [
            'photoProduct' => $photoProduct,
            'can' => [
                'edit_photo_product' => Auth::check() && Auth::user()->can('update', $photoProduct),
            ]
        ]);
    }

    public function edit(string $slug) // Parameter diubah menjadi $slug
    {
        $photoProduct = PhotoProducts::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();
        $products = Product::where('isDeleted', false)->orderBy('productName')->get(['id', 'productName', 'slug']);
        
        $photoProduct->file_url = $photoProduct->filePath ? Storage::url($photoProduct->filePath) : null;

        return Inertia::render('PhotoProducts/Edit', [
            'photoProduct' => $photoProduct,
            'products' => $products
        ]);
    }

    public function update(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $photoProduct = PhotoProducts::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'productId' => 'required|exists:products,id',
            'titles' => 'nullable|array',
            'titles.*' => 'nullable|string|max:255',
            'photos' => 'required|array',
            'photos.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'displayOrders' => 'nullable|array',
            'displayOrders.*' => 'nullable|integer|min:0',
        ], [
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
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validasi gagal'
                ], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        if ($request->has('productId')) {
            $photoProduct->productId = $request->productId;
        }
        
        // Handle slug update jika title berubah
        if ($photoProduct->title !== $request->title) {
            $baseSlug = Str::slug($request->title ?: Str::random(10));
            $newSlug = $baseSlug;
            $counter = 1;
            while (PhotoProducts::where('slug', $newSlug)->where('id', '!=', $photoProduct->id)->exists()) {
                $newSlug = $baseSlug . '-' . $counter++;
            }
            $photoProduct->slug = $newSlug;
        }
        $photoProduct->title = $request->title;
        
        if ($request->filled('displayOrder')) {
            $photoProduct->displayOrder = $request->displayOrder;
        }

        if ($request->hasFile('photo')) {
            if ($photoProduct->filePath && Storage::disk('public')->exists($photoProduct->filePath)) {
                Storage::disk('public')->delete($photoProduct->filePath);
            }
            $file = $request->file('photo');
            $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('product_photos', $uniqueName, 'public');
            $photoProduct->filePath = $filePath;
        }
        
        $photoProduct->updatedBy = Auth::id();
        $photoProduct->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $photoProduct,
                'message' => 'Foto produk berhasil diperbarui'
            ]);
        }
        
        $product = Product::find($photoProduct->productId);
        return redirect()->route('admin.products.edit', $product->slug) // Redirect ke edit produk induk
            ->with('success', 'Foto produk berhasil diperbarui.');
    }

    public function destroy(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $photoProduct = PhotoProducts::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();
        
        $productId = $photoProduct->productId; // Simpan productId untuk redirect

        if ($request->input('delete_file', false)) { 
            if ($photoProduct->filePath && Storage::disk('public')->exists($photoProduct->filePath)) {
                 Storage::disk('public')->delete($photoProduct->filePath);
            }
        }

        $photoProduct->isDeleted = true;
        $photoProduct->updatedBy = Auth::id();
        $photoProduct->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Foto produk berhasil dihapus'
            ], 200);
        }
        
        $product = Product::find($productId);
        // Redirect kembali ke halaman edit produk induknya, atau ke index foto produk
        return redirect()->route('admin.products.edit', $product->slug)
            ->with('success', 'Foto produk berhasil dihapus.');
    }
}