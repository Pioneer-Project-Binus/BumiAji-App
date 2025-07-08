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
    public function indexPublic(Request $request)
    {
        $query = CategoryArticle::withCount('articles')
            ->where('isDeleted', false)
            ->orderBy('created_at', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        $categoryArticles = $query->paginate(10);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $categoryArticles,
                'message' => 'Kategori artikel berhasil diambil (Publik)'
            ]);
        }

        return Inertia::render('CategoryArticles/Public/Index', [
            'categoryArticles' => $categoryArticles,
            'filters' => $request->only(['search']),
        ]);
    }

    public function indexAdmin(Request $request)
    {
        $query = CategoryArticle::withCount('articles')
            ->where('isDeleted', false)
            ->orderBy('created_at', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        $categoryArticles = $query->paginate(10);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $categoryArticles,
                'message' => 'Kategori artikel berhasil diambil (Admin)'
            ]);
        }

        return Inertia::render('CategoryArticles/Index', [
            'categoryArticles' => $categoryArticles,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(Request $request)
    {
        if (Auth::check()) {
            return Inertia::render('CategoryArticles/Create');
        }

        return redirect()->route('category-articles.index');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categoryArticles,name',
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

    }

    public function showPublic(Request $request, string $slug)
{
    $categoryArticle = CategoryArticle::withCount('articles')
        ->where('slug', $slug)
        ->where('isDeleted', false)
        ->firstOrFail();

    if ($request->wantsJson()) {
        return response()->json([
            'success' => true,
            'data' => $categoryArticle,
            'message' => 'Kategori artikel berhasil diambil (Publik)'
        ]);
    }

    return Inertia::render('CategoryArticles/Public/Show', [
        'categoryArticle' => $categoryArticle
    ]);
    }

    public function showAdmin(Request $request, string $slug)
    {
        $categoryArticle = CategoryArticle::withCount('articles')
            ->where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $categoryArticle,
                'message' => 'Kategori artikel berhasil diambil (Admin)'
            ]);
        }

        return Inertia::render('CategoryArticles/Show', [
            'categoryArticle' => $categoryArticle
        ]);
    }


    public function edit(string $slug)
    {
        $categoryArticle = CategoryArticle::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        if (Auth::check()) {
            return Inertia::render('CategoryArticles/Edit', ['categoryArticle' => $categoryArticle]);
        }
    }

    public function update(Request $request, string $slug)
    {
        $categoryArticle = CategoryArticle::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categoryArticles,name,' . $categoryArticle->id,
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

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

        return redirect()->route('category-articles.show', $categoryArticle->slug)->with('success', 'Kategori artikel berhasil diperbarui.');
    }

    public function destroy(Request $request, string $slug)
    {
        $categoryArticle = CategoryArticle::where('slug', $slug)
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

    public function archivedIndex(Request $request)
    {
        $query = CategoryArticle::where('isDeleted', true)
            ->orderBy('created_at', 'desc');

        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        $categoryArticles = $query->paginate(10)->withQueryString();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $categoryArticles,
                'message' => 'Data kategori terarsip berhasil diambil'
            ]);
        }

        return Inertia::render('CategoryArticles/Archived', [
            'categoryArticles' => $categoryArticles,
            'filters' => $request->only(['search']),
        ]);
    }

    public function restore(Request $request, string $slug)
    {
        $categoryArticle = CategoryArticle::where('slug', $slug)
            ->where('isDeleted', true)
            ->firstOrFail();

        $categoryArticle->isDeleted = false;
        $categoryArticle->updatedBy = Auth::id();
        $categoryArticle->save();

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Kategori artikel berhasil dipulihkan'
            ]);
        }

        return redirect()->route('category-articles.archived')->with('success', 'Kategori artikel berhasil dipulihkan.');
    }

    public function deletePermanent(Request $request, string $slug)
    {
        $categoryArticle = CategoryArticle::where('slug', $slug)
            ->where('isDeleted', true)
            ->firstOrFail();

        $categoryArticle->delete(); // Hapus dari database

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Kategori artikel berhasil dihapus permanen'
            ]);
        }

        return redirect()->route('category-articles.archived')->with('success', 'Kategori artikel dihapus permanen.');
    }
}