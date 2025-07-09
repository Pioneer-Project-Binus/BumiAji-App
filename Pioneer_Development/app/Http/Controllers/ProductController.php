<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\CategoryProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;

class ProductController extends Controller
{
    /**
     * Builds the base query for fetching products with filters and sorting.
     * This private method avoids code duplication between indexAdmin and indexPublic.
     */
    private function buildProductQuery(Request $request): Builder
    {
        $query = Product::with(['category', 'photos'])
            ->where('isDeleted', false);

        // Filtering
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

        // Sorting
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

        return $query;
    }

    /**
     * Display a paginated list of products for the public.
     * Only shows 'published' products.
     */
    public function indexPublic(Request $request)
    {
        $query = $this->buildProductQuery($request)->where('status', 'published');

        $products = $query->paginate(12)->through(fn($product) => [
            'id' => $product->id,
            'slug' => $product->slug,
            'productName' => $product->productName,
            'description' => Str::limit($product->description, 100),
            'waNumber' => $product->waNumber,
            'price' => $product->price,
            'status' => $product->status,
            'highlight' => $product->highlight,
            'category' => $product->category ? ['name' => $product->category->name] : null,
            'photo' => $product->photos->first() ? Storage::url($product->photos->first()->filePath) : null,
        ]);

        $categories = CategoryProduct::where('isDeleted', false)
            ->orderBy('name')
            ->get(['id', 'name']);

        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json([
                'success' => true,
                'data' => $products,
                'message' => 'Produk berhasil diambil'
            ]);
        }

        return Inertia::render('Products/Public/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'sort', 'direction']),
        ]);
    }

    /**
     * Display a paginated list of products for the admin dashboard.
     * Shows products with any status and includes stats.
     */
    public function indexAdmin(Request $request)
    {
        $query = $this->buildProductQuery($request);

        $products = $query->paginate(10)->through(fn($product) => [
            'id' => $product->id,
            'slug' => $product->slug,
            'productName' => $product->productName,
            'price' => $product->price,
            'waNumber' => $product->waNumber,
            'stock' => $product->stock,
            'status' => $product->status,
            'highlight' => $product->highlight,
            'category' => $product->category ? ['name' => $product->category->name] : null,
            'created_at' => $product->created_at?->toIso8601String(),
            'photo' => $product->photos->first() ? Storage::url($product->photos->first()->filePath) : null,
        ]);

        $categories = CategoryProduct::where('isDeleted', false)
            ->orderBy('name')
            ->get(['id', 'name']);

        $stats = [
            'total_products' => Product::where('isDeleted', false)->count(),
            'published_products' => Product::where('isDeleted', false)->where('status', 'published')->count(),
            'draft_products' => Product::where('isDeleted', false)->where('status', 'draft')->count(),
            'out_of_stock' => Product::where('isDeleted', false)->where(fn($q) => $q->where('stock', 0)->orWhere('status', 'outofstock'))->count(),
            'total_value' => Product::where('isDeleted', false)->where('status', 'published')->sum(\DB::raw('price * stock')),
        ];

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'status', 'sort', 'direction']),
            'stats' => $stats,
        ]);
    }

    /**
     * Display a single product for public view.
     */
    public function showPublic(Request $request, string $slug)
    {
        $product = Product::with(['category', 'photos'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->where('isDeleted', false)
            ->firstOrFail();

        $productData = [
            'id' => $product->id,
            'slug' => $product->slug,
            'productName' => $product->productName,
            'description' => $product->description,
            'waNumber' => $product->waNumber,
            'price' => $product->price,
            'stock' => $product->stock,
            'status' => $product->status,
            'category' => $product->category,
            'photos' => $product->photos->map(fn($photo) => [
                'id' => $photo->id,
                'filePath' => Storage::url($photo->filePath),
            ]),
        ];
        
        // Fetch related products from the same category
        $relatedProducts = Product::with('photos')
            ->where('categoryId', $product->categoryId)
            ->where('id', '!=', $product->id)
            ->where('status', 'published')
            ->where('isDeleted', false)
            ->limit(4)
            ->get()->map(fn($p) => [
                'slug' => $p->slug,
                'productName' => $p->productName,
                'price' => $p->price,
                'photo' => $p->photos->first() ? Storage::url($p->photos->first()->filePath) : null,
            ]);

        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json([
                'success' => true,
                'data' => $productData,
                'message' => 'Produk berhasil diambil'
            ]);
        }

        return Inertia::render('Products/Public/Show', [
            'product' => $productData,
            'relatedProducts' => $relatedProducts,
        ]);
    }

    /**
     * Display a single product for admin view with detailed info.
     */
    public function showAdmin(Request $request, string $slug)
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
            'waNumber' => $product->waNumber,
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

        return Inertia::render('Products/Show', [
            'product' => $productData,
        ]);
    }

    public function create()
    {
        $categories = CategoryProduct::where('isDeleted', false)->orderBy('name')->get();
        return Inertia::render('Products/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $messages = [
            'productName.required' => 'Nama produk wajib diisi.',
            'productName.unique' => 'Nama produk sudah digunakan.',
            'description.required' => 'Deskripsi produk wajib diisi.',
            'waNumber.string' => 'Nomor WhatsApp harus berupa teks.',
            'waNumber.max' => 'Nomor WhatsApp tidak boleh lebih dari 20 karakter.',
            'waNumber.regex' => 'Nomor WhatsApp hanya boleh berisi angka dan boleh diawali dengan tanda +.',
            'price.required' => 'Harga produk wajib diisi.',
            'price.numeric' => 'Harga harus berupa angka.',
            'stock.required' => 'Stok produk wajib diisi.',
            'categoryId.required' => 'Kategori produk wajib diisi.',
            'status.in' => 'Status harus berupa draft, published, atau outofstock.',
        ];

        $validator = Validator::make($request->all(), [
            'productName' => 'required|string|max:255|unique:products,productName',
            'description' => 'required|string',
            'waNumber' => 'nullable|string|max:20|regex:/^\+?[0-9]+$/',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoryId' => 'required|exists:categoryProducts,id',
            'status' => 'required|in:draft,published,outofstock',
            'highlight' => 'nullable|boolean',
        ], $messages);

        if ($validator->fails()) {
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
        $product->waNumber = $request->waNumber;
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

        return redirect()->route('products.admin.index')->with('success', 'Produk berhasil dibuat.');
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
            'title' => $photo->title,
            'displayOrder' => $photo->displayOrder,
            'slug' => $photo->slug,
        ]);

        $categories = CategoryProduct::where('isDeleted', false)->orderBy('name')->get();

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

        $messages = [
            'productName.required' => 'Nama produk wajib diisi.',
            'productName.unique' => 'Nama produk sudah digunakan.',
            'description.required' => 'Deskripsi produk wajib diisi.',
            'waNumber.string' => 'Nomor WhatsApp harus berupa teks.',
            'waNumber.max' => 'Nomor WhatsApp tidak boleh lebih dari 20 karakter.',
            'waNumber.regex' => 'Nomor WhatsApp hanya boleh berisi angka dan boleh diawali dengan tanda +.',
            'price.required' => 'Harga produk wajib diisi.',
            'price.numeric' => 'Harga harus berupa angka.',
            'stock.required' => 'Stok produk wajib diisi.',
            'categoryId.required' => 'Kategori produk wajib diisi.',
            'status.in' => 'Status harus berupa draft, published, atau outofstock.',
        ];

        $validator = Validator::make($request->all(), [
            'productName' => 'required|string|max:255|unique:products,productName',
            'description' => 'required|string',
            'waNumber' => 'nullable|string|max:20|regex:/^\+?[0-9]+$/',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoryId' => 'required|exists:categoryProducts,id',
            'status' => 'required|in:draft,published,outofstock',
            'highlight' => 'nullable|boolean',
        ], $messages);

        if ($validator->fails()) {
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
        $product->waNumber = $request->waNumber;
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

        return redirect()->route('products.admin.show', $product->slug)
            ->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Request $request, string $slug)
    {
        $product = Product::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $product->isDeleted = true;
        $product->updatedBy = Auth::id(); // Keep track of who deleted it
        $product->save();

        return redirect()->route('products.admin.index')
            ->with('success', 'Produk berhasil diarsipkan.');
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
        ]);

        return Inertia::render('Products/Archived', [
            'products' => $products,
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
        
        // Manually delete related photos from storage
        foreach ($product->photos as $photo) {
            if (Storage::disk('public')->exists($photo->filePath)) {
                Storage::disk('public')->delete($photo->filePath);
            }
        }

        $product->delete(); // This will also delete related photos from the database due to cascading constraints

        return redirect()->back()->with('success', 'Produk berhasil dihapus permanen.');
    }
}
