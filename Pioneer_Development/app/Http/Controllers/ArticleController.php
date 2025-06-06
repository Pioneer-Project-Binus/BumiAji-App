<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\CategoryArticle;
use App\Models\User; // Untuk author
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArticleController extends Controller
{
    // Menampilkan daftar artikel
    public function index(Request $request)
    {
        $query = Article::with(['category', 'author', 'creator', 'updater']) 
            ->where('isDeleted', false)
            ->orderBy('createdAt', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('content', 'like', "%{$searchTerm}%");
            });
        }
        if ($request->has('category')) {
            $query->where('categoryId', $request->category);
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        if ($request->has('author')) {
            $query->where('authorId', $request->author);
        }

        $articles = $query->paginate(10);
        $categories = CategoryArticle::where('isDeleted', false)->orderBy('name')->get(['id', 'name']);
        $authors = User::orderBy('name')->get(['id', 'name']); // Asumsi Anda memiliki model User

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $articles,
                'message' => 'Artikel berhasil diambil'
            ]);
        }

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
            'categories' => $categories,
            'authors' => $authors,
            'filters' => $request->only(['search', 'category', 'status', 'author'])
        ]);
    }

    // Menampilkan form untuk membuat artikel baru
    public function create()
    {
        $categories = CategoryArticle::where('isDeleted', false)->orderBy('name')->get();
        $authors = User::orderBy('name')->get(); // Asumsi model User untuk author
        return Inertia::render('Articles/Create', [
            'categories' => $categories,
            'authors' => $authors
        ]);
    }

    // Menyimpan artikel baru
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'featuredImage' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'status' => 'required|in:draft,published,archived',
            'categoryId' => 'nullable|exists:categoryArticles,id',
            'authorId' => 'nullable|exists:users,id', 
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $article = new Article();
        $article->title = $request->title;
        $article->slug = Str::slug($request->title) . '-' . Str::random(5);
        $article->content = $request->content;
        $article->status = $request->status;
        $article->categoryId = $request->categoryId;
        $article->authorId = $request->authorId ?? Auth::id();
        $article->createdBy = Auth::id();

        if ($request->hasFile('featuredImage')) {
            // Logika upload file
            $file = $request->file('featuredImage');
            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $uniqueName = Str::uuid() . '.' . $extension;
            $filePath = $file->storeAs('article_images', $uniqueName, 'public');
            $article->featuredImage = $filePath;
        }
        $article->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $article->load(['category', 'author']), 'message' => 'Artikel berhasil dibuat'], 201);
        }
        return redirect()->route('articles.index')->with('success', 'Artikel berhasil dibuat.');
    }

    // Menampilkan detail artikel
    public function show(Request $request, $id)
    {
        $article = Article::with(['category', 'author', 'creator', 'updater'])
            ->where('isDeleted', false)
            ->findOrFail($id);
        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $article, 'message' => 'Artikel berhasil diambil']);
        }
        return Inertia::render('Articles/Show', ['article' => $article]);
    }

    // Menampilkan form untuk mengedit artikel
    public function edit($id)
    {
        $article = Article::where('isDeleted', false)->findOrFail($id);
        $categories = CategoryArticle::where('isDeleted', false)->orderBy('name')->get();
        $authors = User::orderBy('name')->get();
        return Inertia::render('Articles/Edit', [
            'article' => $article,
            'categories' => $categories,
            'authors' => $authors
        ]);
    }

    // Memperbarui artikel
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'featuredImage' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048', // Untuk gambar baru
            'status' => 'required|in:draft,published,archived',
            'categoryId' => 'nullable|exists:categoryArticles,id',
            'authorId' => 'nullable|exists:users,id',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $article = Article::where('isDeleted', false)->findOrFail($id);
        if ($article->title !== $request->title) {
            $article->slug = Str::slug($request->title) . '-' . Str::random(5);
        }
        $article->title = $request->title;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->categoryId = $request->categoryId;
        $article->authorId = $request->authorId ?? $article->authorId; // Pertahankan yang lama jika tidak disediakan
        $article->updatedBy = Auth::id();

        if ($request->hasFile('featuredImage')) {
            // Hapus file lama jika ada
            if ($article->featuredImage && Storage::disk('public')->exists($article->featuredImage)) {
                Storage::disk('public')->delete($article->featuredImage);
            }
            // Logika upload file
            $file = $request->file('featuredImage');
            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $uniqueName = Str::uuid() . '.' . $extension;
            $filePath = $file->storeAs('article_images', $uniqueName, 'public');
            $article->featuredImage = $filePath;
        } elseif ($request->input('removeFeaturedImage')) { // Tambahkan cara untuk menghapus gambar
            if ($article->featuredImage && Storage::disk('public')->exists($article->featuredImage)) {
                Storage::disk('public')->delete($article->featuredImage);
            }
            $article->featuredImage = null;
        }

        $article->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $article->load(['category', 'author']), 'message' => 'Artikel berhasil diperbarui']);
        }
        return redirect()->route('articles.index')->with('success', 'Artikel berhasil diperbarui.');
    }

    // Menghapus artikel (soft delete)
    public function destroy(Request $request, $id)
    {
        $article = Article::where('isDeleted', false)->findOrFail($id);
        $article->isDeleted = true;
        $article->updatedBy = Auth::id();
        $article->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Artikel berhasil dihapus'], 200);
        }
        return redirect()->route('articles.index')->with('success', 'Artikel berhasil dihapus.');
    }
}