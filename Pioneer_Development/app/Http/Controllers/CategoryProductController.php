<?php

// app/Http/Controllers/CategoryProductController.php

namespace App\Http\Controllers;

use App\Models\CategoryProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CategoryProductController extends Controller
{
    // Menampilkan daftar kategori produk
    public function index(Request $request)
    {
        $query = CategoryProduct::withCount('products') // Contoh menghitung relasi
            ->where('isDeleted', false)
            ->orderBy('createdAt', 'desc');

        // Pencarian
        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        $categoryProducts = $query->paginate(10);

        // Respons JSON jika diminta
        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $categoryProducts,
                'message' => 'Data kategori produk berhasil diambil'
            ]);
        }

        // Respons Inertia
        return Inertia::render('CategoryProducts/Index', [
            'categoryProducts' => $categoryProducts,
            'filters' => $request->only(['search'])
        ]);
    }

    // Menampilkan form untuk membuat kategori produk baru
    public function create()
    {
        return Inertia::render('CategoryProducts/Create');
    }

    // Menyimpan kategori produk baru
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
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

        $categoryProduct = new CategoryProduct();
        $categoryProduct->name = $request->name;
        $categoryProduct->slug = Str::slug($request->name) . '-' . Str::random(5);
        $categoryProduct->description = $request->description;
        $categoryProduct->createdBy = Auth::id();
        $categoryProduct->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $categoryProduct,
                'message' => 'Kategori produk berhasil dibuat'
            ], 201);
        }

        return redirect()->route('category-products.index') // Sesuaikan nama route jika perlu
            ->with('success', 'Kategori produk berhasil dibuat.');
    }

    // Menampilkan detail kategori produk
    public function show(Request $request, $id)
    {
        $categoryProduct = CategoryProduct::withCount('products')
            ->where('isDeleted', false)
            ->findOrFail($id);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $categoryProduct,
                'message' => 'Data kategori produk berhasil diambil'
            ]);
        }

        return Inertia::render('CategoryProducts/Show', [
            'categoryProduct' => $categoryProduct
        ]);
    }

    // Menampilkan form untuk mengedit kategori produk
    public function edit($id)
    {
        $categoryProduct = CategoryProduct::where('isDeleted', false)->findOrFail($id);
        return Inertia::render('CategoryProducts/Edit', [
            'categoryProduct' => $categoryProduct
        ]);
    }

    // Memperbarui kategori produk
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), rules: [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
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

        $categoryProduct = CategoryProduct::where('isDeleted', false)->findOrFail($id);

        if ($categoryProduct->name !== $request->name) {
            $categoryProduct->slug = Str::slug($request->name) . '-' . Str::random(5);
        }
        $categoryProduct->name = $request->name;
        $categoryProduct->description = $request->description;
        $categoryProduct->updatedBy = Auth::id();
        $categoryProduct->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $categoryProduct,
                'message' => 'Kategori produk berhasil diperbarui'
            ]);
        }

        return redirect()->route('category-products.index') // Sesuaikan nama route
            ->with('success', 'Kategori produk berhasil diperbarui.');
    }

    // Menghapus kategori produk (soft delete)
    public function destroy(Request $request, $id)
    {
        $categoryProduct = CategoryProduct::where('isDeleted', false)->findOrFail($id);
        $categoryProduct->isDeleted = true;
        $categoryProduct->updatedBy = Auth::id();
        $categoryProduct->save();

        // Opsional: Periksa produk dalam kategori ini dan tangani (misalnya, set categoryId menjadi null)
        // Product::where('categoryId', $id)->update(['categoryId' => null]);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Kategori produk berhasil dihapus'
            ], 200);
        }

        return redirect()->route('category-products.index') // Sesuaikan nama route
            ->with('success', 'Kategori produk berhasil dihapus.');
    }
}