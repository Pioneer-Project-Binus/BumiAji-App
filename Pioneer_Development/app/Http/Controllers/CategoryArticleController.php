<?php

namespace App\Http\Controllers;

use App\Models\CategoryArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CategoryArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = CategoryArticle::withCount('articles')
            ->where('isDeleted', false)
            ->orderBy('createdAt', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        $categoryArticles = $query->paginate(10);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $categoryArticles,
                'message' => 'Kategori artikel berhasil diambil'
            ]);
        }

        return Inertia::render('CategoryArticles/Index', [
            'categoryArticles' => $categoryArticles,
            'filters' => $request->only(['search']),
            'can' => [ // Contoh hak akses
                'create_category_article' => Auth::user()->can('create', CategoryArticle::class),
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('CategoryArticles/Create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categoryArticles,name', // Pastikan nama unik
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $categoryArticle = new CategoryArticle();
        $categoryArticle->name = $request->name;

        // Pembuatan slug unik
        $baseSlug = Str::slug($request->name);
        $slug = $baseSlug;
        $counter = 1;
        while (CategoryArticle::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }
        $categoryArticle->slug = $slug;

        $categoryArticle->description = $request->description;
        $categoryArticle->createdBy = Auth::id();
        $categoryArticle->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $categoryArticle, 'message' => 'Kategori artikel berhasil dibuat'], 201);
        }

        return redirect()->route('category-articles.index')->with('success', 'Kategori artikel berhasil dibuat.');
    }

    public function show(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $categoryArticle = CategoryArticle::withCount('articles')
            ->where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $categoryArticle, 'message' => 'Kategori artikel berhasil diambil']);
        }
        return Inertia::render('CategoryArticles/Show', [
            'categoryArticle' => $categoryArticle,
            'can' => [
                 'edit_category_article' => Auth::user()->can('update', $categoryArticle),
                 'delete_category_article' => Auth::user()->can('delete', $categoryArticle),
            ]
        ]);
    }

    public function edit(string $slug) // Parameter diubah menjadi $slug
    {
        $categoryArticle = CategoryArticle::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();
        return Inertia::render('CategoryArticles/Edit', ['categoryArticle' => $categoryArticle]);
    }

    public function update(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $categoryArticle = CategoryArticle::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
             // Pastikan nama unik, kecuali untuk record saat ini
            'name' => 'required|string|max:255|unique:categoryArticles,name,' . $categoryArticle->id,
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Handle slug update jika name berubah
        if ($categoryArticle->name !== $request->name) {
            $baseSlug = Str::slug($request->name);
            $newSlug = $baseSlug;
            $counter = 1;
            while (CategoryArticle::where('slug', $newSlug)->where('id', '!=', $categoryArticle->id)->exists()) {
                $newSlug = $baseSlug . '-' . $counter++;
            }
            $categoryArticle->slug = $newSlug;
        }
        $categoryArticle->name = $request->name;
        $categoryArticle->description = $request->description;
        $categoryArticle->updatedBy = Auth::id();
        $categoryArticle->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $categoryArticle, 'message' => 'Kategori artikel berhasil diperbarui']);
        }
        // Redirect ke index atau show (dengan slug baru jika berubah)
        return redirect()->route('category-articles.index', $categoryArticle->slug)->with('success', 'Kategori artikel berhasil diperbarui.');
    }

    public function destroy(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $categoryArticle = CategoryArticle::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        $categoryArticle->isDeleted = true;
        $categoryArticle->updatedBy = Auth::id();
        $categoryArticle->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Kategori artikel berhasil dihapus'], 200);
        }
        return redirect()->route('category-articles.index')->with('success', 'Kategori artikel berhasil dihapus.');
    }
}
