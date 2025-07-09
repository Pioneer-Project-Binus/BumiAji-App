<?php

namespace App\Http\Controllers;

use App\Models\CategoryProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CategoryProductController extends Controller
{
    public function index(Request $request)
    {
        $query = CategoryProduct::withCount('products')
            ->where('isDeleted', false)
            ->orderBy('created_at', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        $categoryProducts = $query->paginate(10);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $categoryProducts,
                'message' => 'Data kategori produk berhasil diambil'
            ]);
        }

        if (Auth::check()) {
            return Inertia::render('CategoryProducts/Index', [
                'categoryProducts' => $categoryProducts,
                'filters' => $request->only(['search']),
            ]);
        } else {
            return Inertia::render('CategoryProducts/Public/Index', [
                'categoryProducts' => $categoryProducts,
                'filters' => $request->only(['search']),
            ]);
        }
    }

    public function create()
    {
        if (Auth::check()) {
            return Inertia::render('CategoryProducts/Create');
        }

        return redirect()->route('category-products.index');
    }

    public function store(Request $request)
    {
        $messages = [
            'name.required' => 'Nama kategori produk wajib diisi.',
            'name.string' => 'Nama kategori produk harus berupa teks.',
            'name.max' => 'Nama kategori produk tidak boleh lebih dari :max karakter.',
            'name.unique' => 'Nama kategori produk sudah digunakan.',
            'description.string' => 'Deskripsi harus berupa teks.',
        ];

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categoryProducts,name',
            'description' => 'nullable|string',
        ], $messages);

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

        $baseSlug = Str::slug($request->name);
        $slug = $baseSlug;
        $counter = 1;
        while (CategoryProduct::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }
        $categoryProduct->slug = $slug;

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

        return redirect()->route('category-products.index')
            ->with('success', 'Kategori produk berhasil dibuat.');
    }

    public function show(Request $request, string $slug)
    {
        $categoryProduct = CategoryProduct::withCount('products')
            ->where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $categoryProduct,
                'message' => 'Data kategori produk berhasil diambil'
            ]);
        }

        if (Auth::check()) {
            return Inertia::render('CategoryProducts/Show', [
                'categoryProduct' => $categoryProduct
            ]);
        } else {
            return Inertia::render('CategoryProducts/Public/Show', [
                'categoryProduct' => $categoryProduct
            ]);
        }
    }

    public function edit(string $slug)
    {
        $categoryProduct = CategoryProduct::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        if (Auth::check()) {
            return Inertia::render('CategoryProducts/Edit', [
                'categoryProduct' => $categoryProduct
            ]);
        }

        return redirect()->route('category-products.index');
    }

    public function update(Request $request, string $slug)
    {
        $categoryProduct = CategoryProduct::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $messages = [
            'name.required' => 'Nama kategori produk wajib diisi.',
            'name.string' => 'Nama kategori produk harus berupa teks.',
            'name.max' => 'Nama kategori produk tidak boleh lebih dari :max karakter.',
            'name.unique' => 'Nama kategori produk sudah digunakan.',
            'description.string' => 'Deskripsi harus berupa teks.',
        ];

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categoryProducts,name',
            'description' => 'nullable|string',
        ], $messages);

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

        if ($categoryProduct->name !== $request->name) {
            $baseSlug = Str::slug($request->name);
            $newSlug = $baseSlug;
            $counter = 1;
            while (CategoryProduct::where('slug', $newSlug)->where('id', '!=', $categoryProduct->id)->exists()) {
                $newSlug = $baseSlug . '-' . $counter++;
            }
            $categoryProduct->slug = $newSlug;
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

        return redirect()->route('category-products.index')
            ->with('success', 'Kategori produk berhasil diperbarui.');
    }

    public function destroy(Request $request, string $slug)
    {
        $categoryProduct = CategoryProduct::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $categoryProduct->isDeleted = true;
        $categoryProduct->updatedBy = Auth::id();
        $categoryProduct->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Kategori produk berhasil dihapus'
            ], 200);
        }

        return redirect()->route('category-products.index')
            ->with('success', 'Kategori produk berhasil dihapus.');
    }

    public function archivedIndex(Request $request)
    {
        $query = CategoryProduct::withCount('products')
            ->where('isDeleted', true)
            ->orderBy('updated_at', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        $archivedCategories = $query->paginate(10);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $archivedCategories,
                'message' => 'Data kategori produk terarsip berhasil diambil'
            ]);
        }

        return Inertia::render('CategoryProducts/Archived', [
            'categoryProducts' => $archivedCategories,
            'filters' => $request->only(['search']),
        ]);
    }

    public function restore(Request $request, string $slug)
    {
        $categoryProduct = CategoryProduct::where('slug', $slug)
            ->where('isDeleted', true)
            ->firstOrFail();

        $categoryProduct->isDeleted = false;
        $categoryProduct->updatedBy = Auth::id();
        $categoryProduct->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Kategori produk berhasil dipulihkan'
            ]);
        }

        return redirect()->route('category-products.archived')
            ->with('success', 'Kategori produk berhasil dipulihkan.');
    }
    public function deletePermanent(Request $request, string $slug)
    {
        $categoryProduct = CategoryProduct::where('slug', $slug)
            ->where('isDeleted', true)
            ->firstOrFail();

        $categoryProduct->delete(); // benar-benar hapus dari database

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Kategori produk berhasil dihapus permanen'
            ]);
        }

        return redirect()->route('category-products.archived')
            ->with('success', 'Kategori produk berhasil dihapus permanen.');
    }
}