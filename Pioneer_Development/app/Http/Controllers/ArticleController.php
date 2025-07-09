<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\CategoryArticle;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function landing()
    {
        $highlight = Article::with(['category', 'author'])
            ->where('isDeleted', false)
            ->where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->first();

        $otherArticles = Article::with(['category', 'author'])
            ->where('isDeleted', false)
            ->where('status', 'published')
            ->where('id', '!=', optional($highlight)->id)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        return Inertia::render('Articles/Public/Landing', [
            'highlight' => $highlight,
            'articles' => $otherArticles
        ]);
    }

    public function indexPublic(Request $request)
{
    // Query artikel untuk publik: hanya yang status 'published' dan isDeleted false
    $query = Article::with(['category', 'author'])
        ->where('isDeleted', false)
        ->where('status', 'published')
        ->orderBy('created_at', 'desc');

    // Search filter
    if ($request->filled('search')) {
        $searchTerm = $request->search;
        $query->where(function ($q) use ($searchTerm) {
            $q->where('title', 'like', "%{$searchTerm}%")
              ->orWhere('content', 'like', "%{$searchTerm}%");
        });
    }

    // Category filter
    if ($request->filled('category') && $request->category !== 'Semua Kategori') {
        $query->where('categoryId', $request->category);
    }

    // Pagination
    $articles = $query->paginate(10);

    // Transform the data to match the expected format
    $articles->getCollection()->transform(function ($article) {
        return [
            'id' => $article->id,
            'title' => $article->title,
            'content' => $article->content,
            'slug' => $article->slug,
            'status' => $article->status,
            'featuredImage' => $article->featuredImage,
            'created_at' => $article->created_at->toISOString(),
            'updated_at' => $article->updated_at->toISOString(),
            'category' => [
                'id' => $article->category->id,
                'name' => $article->category->name,
            ],
            'author' => [
                'id' => $article->author->id,
                'name' => $article->author->name,
            ],
            // Add these for backward compatibility
            'date' => $article->created_at->format('d M Y'),
            'createdAt' => $article->created_at->toISOString(),
        ];
    });

    // Ambil artikel terbaru sebagai highlight
    $highlight = Article::with(['category', 'author'])
        ->where('isDeleted', false)
        ->where('status', 'published')
        ->orderBy('created_at', 'desc')
        ->first();

    // Transform highlight data
    if ($highlight) {
        $highlight = [
            'id' => $highlight->id,
            'title' => $highlight->title,
            'content' => $highlight->content,
            'slug' => $highlight->slug,
            'status' => $highlight->status,
            'featuredImage' => $highlight->featuredImage,
            'created_at' => $highlight->created_at->toISOString(),
            'updated_at' => $highlight->updated_at->toISOString(),
            'category' => [
                'id' => $highlight->category->id,
                'name' => $highlight->category->name,
            ],
            'author' => [
                'id' => $highlight->author->id,
                'name' => $highlight->author->name,
            ],
            // Add these for backward compatibility
            'date' => $highlight->created_at->format('d M Y'),
            'createdAt' => $highlight->created_at->toISOString(),
        ];
    }

    // Get categories
    $categories = CategoryArticle::where('isDeleted', false)
        ->orderBy('name')
        ->get(['id', 'name']);

    // API response
    if ($request->wantsJson()) {
        return response()->json([
            'success' => true,
            'data' => $articles,
            'highlight' => $highlight,
            'categories' => $categories,
            'message' => 'Artikel berhasil diambil'
        ]);
    }

    // Web response
    return Inertia::render('Articles/Public/Index', [
        'articles' => $articles,
        'highlight' => $highlight,
        'categories' => $categories,
        'filters' => $request->only(['search', 'category']),
    ]);
}

public function indexAdmin(Request $request)
{
    // Query untuk admin bisa lihat semua status
    $query = Article::with(['category', 'author', 'creator', 'updater'])
        ->where('isDeleted', false)
        ->orderBy('created_at', 'desc');

    if ($request->filled('search')) {
        $searchTerm = $request->search;
        $query->where(function ($q) use ($searchTerm) {
            $q->where('title', 'like', "%{$searchTerm}%")
              ->orWhere('content', 'like', "%{$searchTerm}%");
        });
    }

    if ($request->filled('category') && $request->category !== 'Semua Kategori') {
        $query->where('categoryId', $request->category);
    }

    if ($request->filled('status') && $request->status !== 'Semua Status') {
        $query->where('status', $request->status);
    }

    if ($request->filled('author') && $request->author !== 'Semua Penulis') {
        $query->where('authorId', $request->author);
    }

    $articles = $query->paginate(10);

    // Highlight terbaru untuk admin juga (optional)
    $highlight = Article::where('isDeleted', false)
        ->orderBy('created_at', 'desc')
        ->first();

    $categories = CategoryArticle::where('isDeleted', false)->orderBy('name')->get(['id', 'name']);
    $authors = User::orderBy('name')->get(['id', 'name']);

    if ($request->wantsJson()) {
        return response()->json([
            'success' => true,
            'data' => $articles,
            'highlight' => $highlight,
            'message' => 'Artikel berhasil diambil'
        ]);
    }

    return Inertia::render('Articles/Index', [
        'articles' => $articles,
        'highlight' => $highlight,
        'categories' => $categories,
        'authors' => $authors,
        'filters' => $request->only(['search', 'category', 'status', 'author']),
    ]);
}


    public function show(Request $request, $slug)
    {
        $article = Article::with(['category', 'author', 'creator', 'updater'])
            ->where('isDeleted', false)
            ->where('slug', $slug)
            ->firstOrFail();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $article, 'message' => 'Artikel berhasil diambil']);
        }

        $view = Auth::check()
            ? 'Articles/Show'
            : 'Articles/Public/Show';

        return Inertia::render($view, ['article' => $article]);
    }

    public function create()
    {
        $categories = CategoryArticle::where('isDeleted', false)->orderBy('name')->get();
        $authors = User::orderBy('name')->get();
        return Inertia::render('Articles/Create', [
            'categories' => $categories,
            'authors' => $authors
        ]);
    }

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
            $file = $request->file('featuredImage');
            $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('article_images', $uniqueName, 'public');
            $article->featuredImage = $filePath;
        }

        $article->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $article->load(['category', 'author']), 'message' => 'Artikel berhasil dibuat'], 201);
        }

        return redirect()->route('articles.index')->with('success', 'Artikel berhasil dibuat.');
    }

    public function edit($slug)
    {
        $article = Article::where('isDeleted', false)
            ->where('slug', $slug)
            ->firstOrFail();

        $categories = CategoryArticle::where('isDeleted', false)->orderBy('name')->get();
        $authors = User::orderBy('name')->get();

        return Inertia::render('Articles/Edit', [
            'article' => $article,
            'categories' => $categories,
            'authors' => $authors
        ]);
    }

    public function update(Request $request, $slug)
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

        $article = Article::where('isDeleted', false)
            ->where('slug', $slug)
            ->firstOrFail();

        if ($article->title !== $request->title) {
            $article->slug = Str::slug($request->title) . '-' . Str::random(5);
        }

        $article->title = $request->title;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->categoryId = $request->categoryId;
        $article->authorId = $request->authorId ?? $article->authorId;
        $article->updatedBy = Auth::id();

        if ($request->hasFile('featuredImage')) {
            if ($article->featuredImage && Storage::disk('public')->exists($article->featuredImage)) {
                Storage::disk('public')->delete($article->featuredImage);
            }

            $file = $request->file('featuredImage');
            $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('article_images', $uniqueName, 'public');
            $article->featuredImage = $filePath;
        } elseif ($request->input('removeFeaturedImage')) {
            if ($article->featuredImage && Storage::disk('public')->exists($article->featuredImage)) {
                Storage::disk('public')->delete($article->featuredImage);
            }
            $article->featuredImage = null;
        }

        $article->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, '
            data' => $article->load(['category', 'author']), 'message' => 'Artikel berhasil diperbarui']);
        }

            return redirect()->route('articles.index')->with('success', 'Artikel berhasil diperbarui.');
        }

        public function destroy(Request $request, $slug)
        {
            $article = Article::where('slug', $slug)
                ->where('isDeleted', false)
                ->firstOrFail();

            $article->isDeleted = true;
            $article->updatedBy = Auth::id();
            $article->save();

            if ($request->wantsJson()) {
                return response()->json(['success' => true, 'message' => 'Artikel berhasil dihapus'], 200);
            }

            return redirect()->route('articles.index')->with('success', 'Artikel berhasil dihapus.');
        }
    }
