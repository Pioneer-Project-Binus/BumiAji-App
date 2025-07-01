<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\CategoryProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage; // Untuk URL gambar
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'photos']) 
            ->where('isDeleted', false)
            ->orderBy('created_at', 'desc'); // Ganti 'createdAt' jika kolom Anda 'createdAt'

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('productName', 'like', "%{$searchTerm}%") // Sesuaikan nama kolom jika berbeda
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        if ($request->has('category')) {
            $categories = is_array($request->category) ? $request->category : [$request->category];
            $query->whereIn('categoryId', $categories);
        }

        if ($request->has('status')) {
            $statuses = is_array($request->status) ? $request->status : [$request->status];
            $query->whereIn('status', $statuses);
        }

        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'name_asc':
                    $query->orderBy('productName', 'asc');
                    break;
                case 'name_desc':
                    $query->orderBy('productName', 'desc');
                    break;
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
            }
        }

        $products = $query->paginate(10);
        $categories = CategoryProduct::where('isDeleted', false)->orderBy('name')->get(['id', 'name']);


        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $products,
                'message' => 'Produk berhasil diambil'
            ]);
        }

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'status', 'sort']),
            'can' => [
                'create_product' => Auth::check() ? Auth::user()->can('create', Product::class) : false,
            ]
        ]);
    }

    public function create()
    {
        $categories = CategoryProduct::where('isDeleted', false)->get();
        return Inertia::render('Products/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'productName' => 'required|string|max:255|unique:products,productName', // Sesuaikan nama kolom & tabel
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoryId' => 'nullable|exists:category_products,id', // Sesuaikan nama tabel
            'status' => 'required|in:ready,outofstock',
            // Tambahkan validasi untuk file foto jika diupload di sini
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

        $product = new Product();
        $product->productName = $request->productName; // Sesuaikan nama kolom

        // Pembuatan slug unik
        $baseSlug = Str::slug($request->productName);
        $slug = $baseSlug;
        $counter = 1;
        while (Product::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }
        $product->slug = $slug;

        $product->description = $request->description;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->categoryId = $request->categoryId;
        $product->status = $request->status;
        $product->createdBy = Auth::id();
        $product->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $product->load('category'),
                'message' => 'Produk berhasil dibuat'
            ], 201);
        }

        return redirect()->route('products.index')->with('success', 'Produk berhasil dibuat.');
    }

    public function show(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $product = Product::with(['category', 'photos', 'creator', 'updater'])
            ->where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $product,
                'message' => 'Produk berhasil diambil'
            ]);
        }
        // Tambahkan URL untuk foto utama jika ada
        // $product->main_image_url = $product->photos->first()->file_path_url ?? null; // Contoh

        return Inertia::render('Products/Show', [
            'product' => $product,
            'can' => [
                 'edit_product' => Auth::user()->can('update', $product),
                 'delete_product' => Auth::user()->can('delete', $product),
            ]
        ]);
    }

    public function edit(string $slug) // Parameter diubah menjadi $slug
    {
        $product = Product::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();
        $categories = CategoryProduct::where('isDeleted', false)->get();
        // $product->main_image_url = ... //

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $product = Product::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            // Sesuaikan nama kolom dan pastikan productName unik kecuali untuk record ini
            'productName' => 'required|string|max:255|unique:products,productName,' . $product->id,
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoryId' => 'nullable|exists:category_products,id', // Sesuaikan nama tabel
            'status' => 'required|in:draft,published,outofstock',
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
        
        if ($product->productName !== $request->productName) {
            $baseSlug = Str::slug($request->productName);
            $newSlug = $baseSlug;
            $counter = 1;
            while (Product::where('slug', $newSlug)->where('id', '!=', $product->id)->exists()) {
                $newSlug = $baseSlug . '-' . $counter++;
            }
            $product->slug = $newSlug;
        }
        $product->productName = $request->productName; // Sesuaikan nama kolom
        $product->description = $request->description;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->categoryId = $request->categoryId;
        $product->status = $request->status;
        $product->updatedBy = Auth::id();
        $product->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $product->load('category'),
                'message' => 'Produk berhasil diperbarui'
            ]);
        }

        return redirect()->route('products.show', $product->slug)->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $product = Product::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        $product->isDeleted = true;
        $product->updatedBy = Auth::id();
        $product->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Produk berhasil dihapus',
            ], 200);
        }

        return redirect()->route('products.index')->with('success', 'Produk berhasil dihapus.');
    }
}