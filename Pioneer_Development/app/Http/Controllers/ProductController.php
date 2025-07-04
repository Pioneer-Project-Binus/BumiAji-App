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
        // Base query
        $query = Product::with(['category', 'photos'])
            ->where('isDeleted', false);

        // Apply search filter
        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('productName', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        // Apply category filter
        if ($request->filled('category')) {
            $query->where('categoryId', $request->category);
        }

        // Apply status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Apply sorting
        $sortColumn = $request->input('sort', 'createdAt'); // Default sort column
        $sortDirection = $request->input('direction', 'desc'); // Default sort direction

        // Validate sort column to prevent SQL injection if directly used or map to actual db columns
        $allowedSortColumns = ['productName', 'price', 'stock', 'status', 'createdAt', 'category.name']; // Add 'category.name'
        if (!in_array($sortColumn, $allowedSortColumns)) {
            $sortColumn = 'createdAt'; // Fallback to default
        }

        if ($sortColumn === 'category.name') {
            // Sorting by related table column requires a join or subquery approach
            // For simplicity, if you often sort by category name, consider denormalizing category_name on products table
            // Or use a join:
            $query->select('products.*') // Avoid ambiguity with category.id if it exists
                  ->leftJoin('categoryProducts', 'products.categoryId', '=', 'categoryProducts.id')
                  ->orderBy('categoryProducts.name', $sortDirection);
        } else {
             $query->orderBy($sortColumn, $sortDirection);
        }


        $products = $query->paginate(10)->through(function ($product) {
            return [
                'id' => $product->id,
                'slug' => $product->slug,
                'productName' => $product->productName,
                'description' => Str::limit($product->description, 100), // Limit description for index view
                'price' => $product->price,
                'stock' => $product->stock,
                'status' => $product->status,
                'category' => $product->category ? ['name' => $product->category->name] : null,
                'createdAt' => $product->createdAt ? $product->createdAt->toIso8601String() : null,
                'updatedAt' => $product->updatedAt ? $product->updatedAt->toIso8601String() : null,
                'photos' => $product->photos->map(function ($photo) {
                    return [
                        'id' => $photo->id,
                        'filePath' => Storage::url($photo->filePath),
                    ];
                }),
            ];
        });

        $categories = CategoryProduct::where('isDeleted', false)->orderBy('name')->get(['id', 'name']);

        $stats = null; // Initialize stats
        if ($request->user()->can('viewAny', Product::class)) { // Example authorization for stats
            $stats = [
                'total_products' => Product::where('isDeleted', false)->count(),
                'published_products' => Product::where('isDeleted', false)->where('status', 'published')->count(),
                'draft_products' => Product::where('isDeleted', false)->where('status', 'draft')->count(),
                'out_of_stock' => Product::where('isDeleted', false)
                    ->where(function($query) {
                        $query->where('stock', 0)
                            ->orWhere('status', 'outofstock');
                    })->count(),
                'total_value' => Product::where('isDeleted', false)
                    ->where('status', 'published')
                    ->sum(\DB::raw('price * stock')),
            ];
        }


        if ($request->wantsJson() && !$request->header('X-Inertia')) { // Differentiate API calls from Inertia calls
            return response()->json([
                'success' => true,
                'data' => $products,
                'message' => 'Produk berhasil diambil'
            ]);
        }

        if (Auth::check()) {
            return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'status', 'sort', 'direction']),
            'stats' => $stats,
            'auth' => [ // Send relevant auth data if needed by frontend components
                'user' => Auth::user() ? [
                    'id' => Auth::user()->id,
                    'name' => Auth::user()->name,
                    // Add other user properties needed
                ] : null,
            ],
        ]);
        } else {
            return Inertia::render('Products/Public/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'status', 'sort', 'direction']),
            'stats' => $stats,
        ]);
        }


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
            'productName' => 'required|string|max:255|unique:products,productName',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoryId' => 'nullable|exists:categoryProducts,id',
            'status' => 'required|in:draft,published,outofstock',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()  && !$request->header('X-Inertia')) {
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
        $product->createdBy = Auth::id();
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

        // Transform data for frontend consistency if needed (similar to index)
        $productData = [
            'id' => $product->id,
            'slug' => $product->slug,
            'productName' => $product->productName,
            'description' => $product->description,
            'price' => $product->price,
            'stock' => $product->stock,
            'status' => $product->status,
            'category' => $product->category,
            'createdAt' => $product->createdAt ? $product->createdAt->toIso8601String() : null,
            'updatedAt' => $product->updatedAt ? $product->updatedAt->toIso8601String() : null,
            'photos' => $product->photos->map(function ($photo) {
                return [
                    'id' => $photo->id,
                    'filePath' => Storage::url($photo->filePath),
                ];
            }),
            'creator' => $product->creator ? ['name' => $product->creator->name] : null, // Example
            'updater' => $product->updater ? ['name' => $product->updater->name] : null, // Example
            // 'can' => [
            //     'edit_product' => Auth::user()->can('update', $product),
            //     'delete_product' => Auth::user()->can('delete', $product),
            // ]
        ];


        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json([
                'success' => true,
                'data' => $productData,
                'message' => 'Produk berhasil diambil'
            ]);
        }

        if (Auth::check()) {
            return Inertia::render('Products/Show', [
            'product' => $productData,
            ]);
        } else {
           return Inertia::render('Products/Public/Show', [
            'product' => $productData,
            ]);
        }


    }

    public function edit(string $slug)
    {
        $product = Product::with('photos')
            ->where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        // Transform data for edit form if needed
        $productData = $product->toArray();
        $productData['photos'] = $product->photos->map(function ($photo) {
            return [
                'id' => $photo->id,
                'filePath' => Storage::url($photo->filePath), // URL for display
                'originalPath' => $photo->filePath // Original path if needed for deletion/update
            ];
        });


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
        $product->updatedBy = Auth::id();
        $product->save();

        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json([
                'success' => true,
                'data' => $product->load('category'),
                'message' => 'Produk berhasil diperbarui'
            ]);
        }

        return redirect()->route('products.show', $product->slug)->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Request $request, string $slug)
    {
        $product = Product::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $product->isDeleted = true;
        $product->deletedBy = Auth::id(); // Assuming you have a deletedBy field
        $product->deletedAt = now();   // Assuming you have a deletedAt field (for soft deletes)
        // $product->updatedBy = Auth::id(); // This might also be set by model events
        $product->save();

        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json([
                'success' => true,
                'message' => 'Produk berhasil dihapus',
            ], 200);
        }

        return redirect()->route('products.index')->with('success', 'Produk berhasil dihapus.');
    }

    // NEW EXPORT METHOD
    public function export(Request $request)
{
    $filters = $request->only(['search', 'category', 'status', 'sort', 'direction']);

    $fileName = 'products_export_' . date('YmdHis') . '.csv';

    return Excel::download(new ProductsExport($filters), $fileName, Excel::CSV);

}
}
