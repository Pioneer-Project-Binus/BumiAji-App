<?php

namespace App\Http\Controllers;

use App\Exports\ProductsExport;
use App\Models\Product;
use App\Models\CategoryProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response; // For streaming response
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'photos'])
            ->where('isDeleted', false);

        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(fn($q) =>
                $q->where('productName', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%")
            );
        }

        if ($request->filled('category')) {
            $query->where('categoryId', $request->category);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $sortColumn = $request->input('sort', 'created_at');
        $sortDirection = $request->input('direction', 'desc');

        $allowedSort = ['productName', 'price', 'stock', 'status', 'created_at', 'category.name'];
        if (!in_array($sortColumn, $allowedSort)) {
            $sortColumn = 'created_at';
        }

        if ($sortColumn === 'category.name') {
            $query->select('products.*')
                ->leftJoin('categoryProducts', 'products.categoryId', '=', 'categoryProducts.id')
                ->orderBy('categoryProducts.name', $sortDirection);
        } else {
            $query->orderBy($sortColumn, $sortDirection);
        }

        $products = $query->paginate(10)->through(fn($product) => [
            'id' => $product->id,
            'slug' => $product->slug,
            'productName' => $product->productName,
            'description' => Str::limit($product->description, 100),
            'price' => $product->price,
            'stock' => $product->stock,
            'status' => $product->status,
            'highlight' => $product->highlight,
            'category' => $product->category ? ['name' => $product->category->name] : null,
            'created_at' => $product->created_at?->toIso8601String(),
            'updated_at' => $product->updated_at?->toIso8601String(),
            'photos' => $product->photos->map(fn($photo) => [
                'id' => $photo->id,
                'filePath' => Storage::url($photo->filePath),
            ]),
        ]);

        $categories = CategoryProduct::where('isDeleted', false)
            ->orderBy('name')
            ->get(['id', 'name']);

        $stats = [
            'total_products' => Product::where('isDeleted', false)->count(),
            'published_products' => Product::where('isDeleted', false)->where('status', 'published')->count(),
            'draft_products' => Product::where('isDeleted', false)->where('status', 'draft')->count(),
            'out_of_stock' => Product::where('isDeleted', false)
                ->where(fn($q) =>
                    $q->where('stock', 0)
                      ->orWhere('status', 'outofstock')
                )->count(),
            'total_value' => Product::where('isDeleted', false)
                ->where('status', 'published')
                ->sum(\DB::raw('price * stock')),
        ];

        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json([
                'success' => true,
                'data' => $products,
                'message' => 'Produk berhasil diambil'
            ]);
        }

        $view = Auth::check() ? 'Products/Index' : 'Products/Public/Index';
        return Inertia::render($view, [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'status', 'sort', 'direction']),
            'stats' => $stats,
            'auth' => Auth::check() ? ['user' => Auth::user()->only(['id', 'name'])] : null,
        ]);
    }

    public function create()
    {
        $categories = CategoryProduct::where('isDeleted', false)->get();
        return Inertia::render('Products/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'productName' => 'required|string|max:255|unique:products,productName',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoryId' => 'nullable|exists:categoryProducts,id',
            'status' => 'required|in:draft,published,outofstock',
            'highlight' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson() && !$request->header('X-Inertia')) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validasi gagal'
                ], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $product = new Product();
        $product->productName = $request->productName;

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
        $product->highlight = $request->boolean('highlight', false);
        $product->createdBy = Auth::id();

        if ($product->highlight) {
            Product::where('highlight', true)->update(['highlight' => false]);
        }

        $product->save();

        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json([
                'success' => true,
                'data' => $product->load('category'),
                'message' => 'Produk berhasil dibuat'
            ], 201);
        }

        return redirect()->route('products.index')->with('success', 'Produk berhasil dibuat.');
    }


    public function show(Request $request, string $slug)
    {
        $product = Product::with(['category', 'photos', 'creator', 'updater'])
            ->where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $productData = [
            'id' => $product->id,
            'slug' => $product->slug,
            'productName' => $product->productName,
            'description' => $product->description,
            'price' => $product->price,
            'stock' => $product->stock,
            'status' => $product->status,
            'highlight' => $product->highlight,
            'category' => $product->category,
            'created_at' => $product->created_at?->toIso8601String(),
            'updated_at' => $product->updated_at?->toIso8601String(),
            'photos' => $product->photos->map(fn($photo) => [
                'id' => $photo->id,
                'filePath' => Storage::url($photo->filePath),
            ]),
            'creator' => $product->creator?->only('name'),
            'updater' => $product->updater?->only('name'),
        ];

        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json([
                'success' => true,
                'data' => $productData,
                'message' => 'Produk berhasil diambil'
            ]);
        }

        $view = Auth::check() ? 'Products/Show' : 'Products/Public/Show';
        return Inertia::render($view, [
            'product' => $productData,
        ]);
    }

    public function edit(string $slug)
    {
        $product = Product::with('photos')
            ->where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $productData = $product->toArray();
        $productData['photos'] = $product->photos->map(fn($photo) => [
            'id' => $photo->id,
            'filePath' => Storage::url($photo->filePath),
            'originalPath' => $photo->filePath,
        ]);

        $categories = CategoryProduct::where('isDeleted', false)->get();

        return Inertia::render('Products/Edit', [
            'product' => $productData,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, string $slug)
    {
        $product = Product::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'productName' => 'required|string|max:255|unique:products,productName,' . $product->id,
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoryId' => 'nullable|exists:categoryProducts,id',
            'status' => 'required|in:draft,published,outofstock',
            'highlight' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson() && !$request->header('X-Inertia')) {
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

        $product->productName = $request->productName;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->categoryId = $request->categoryId;
        $product->status = $request->status;
        $product->highlight = $request->boolean('highlight', false);
        $product->updatedBy = Auth::id();

        if ($product->highlight) {
            Product::where('highlight', true)
                ->where('id', '!=', $product->id)
                ->update(['highlight' => false]);
        }

        $product->save();

        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json([
                'success' => true,
                'data' => $product->load('category'),
                'message' => 'Produk berhasil diperbarui'
            ]);
        }

        return redirect()->route('products.show', $product->slug)
            ->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Request $request, string $slug)
    {
        $product = Product::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $product->isDeleted = true;
        $product->updated_at = now();
        $product->save();

        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json([
                'success' => true,
                'message' => 'Produk berhasil dihapus',
            ], 200);
        }

        return redirect()->route('products.index')
            ->with('success', 'Produk berhasil dihapus.');
    }

    public function archived(Request $request)
    {
        $query = Product::with('category')
            ->where('isDeleted', true);

        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where('productName', 'like', "%{$searchTerm}%");
        }

        $products = $query->paginate(10)->through(fn($product) => [
            'id' => $product->id,
            'slug' => $product->slug,
            'productName' => $product->productName,
            'category' => $product->category ? ['name' => $product->category->name] : null,
            'price' => $product->price,
            'stock' => $product->stock,
            'status' => $product->status,
        ]);

        $categories = CategoryProduct::where('isDeleted', false)->get();

        return Inertia::render('Products/Archived', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    public function restore($slug)
    {
        $product = Product::where('slug', $slug)
            ->where('isDeleted', true)
            ->firstOrFail();

        $product->isDeleted = false;
        $product->updatedBy = Auth::id();
        $product->save();

        return redirect()->back()->with('success', 'Produk berhasil dipulihkan.');
    }

    public function deletePermanent($slug)
    {
        $product = Product::where('slug', $slug)
            ->where('isDeleted', true)
            ->firstOrFail();

        $product->delete();

        return redirect()->back()->with('success', 'Produk berhasil dihapus permanen.');
    }
}
