<?php

namespace App\Http\Controllers;

use App\Models\Galery;
use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GaleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Galery::with(['album', 'creator', 'updater'])
            ->where('isDeleted', false)
            ->orderBy('displayOrder', 'asc')
            ->orderBy('createdAt', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        if ($request->filled('album_id')) {
            $query->where('albumId', $request->album_id);
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $galeries = $query->paginate(10);
        $albums = Album::where('isDeleted', false)->orderBy('name')->get(['id', 'name', 'slug']);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $galeries, 'message' => 'Item galeri berhasil diambil']);
        }

        $props = [
            'galeries' => $galeries,
            'albums' => $albums,
            'filters' => $request->only(['search', 'album_id', 'type']),
            'can' => [
                'create_galery' => Auth::check() && Auth::user()->can('create', Galery::class),
            ]
        ];

        if (Auth::check()) {
            return Inertia::render('Galeries/Index', $props);
        } else {
            return Inertia::render('Galeries/Public/Index', $props);
        }
    }

    public function create(Request $request)
    {
        $albums = Album::where('isDeleted', false)->orderBy('name')->get(['id', 'name']);
        $albumId = $request->get('album_id');
        return Inertia::render('Galeries/Create', [
            'albums' => $albums,
            'selectedAlbumId' => $albumId,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:photo,video',
            'filePath' => 'required_if:type,photo|nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
            'videoUrl' => 'required_if:type,video|nullable|url',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'displayOrder' => 'nullable|integer|min:0',
            'albumId' => 'required|exists:albums,id',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $galery = new Galery();
        $galery->title = $request->title;

        $baseSlug = Str::slug($request->title);
        $slug = $baseSlug;
        $counter = 1;
        while (Galery::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }
        $galery->slug = $slug;

        $galery->description = $request->description;
        $galery->type = $request->type;
        $galery->displayOrder = $request->filled('displayOrder') ? $request->displayOrder : (Galery::where('albumId', $request->albumId)->where('isDeleted', false)->max('displayOrder') + 1);
        $galery->albumId = $request->albumId;
        $galery->createdBy = Auth::id();

        if ($request->type === 'photo' && $request->hasFile('filePath')) {
            $file = $request->file('filePath');
            $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePathVal = $file->storeAs('galery_items/photos', $uniqueName, 'public');
            $galery->filePath = $filePathVal;
        } elseif ($request->type === 'video' && $request->filled('videoUrl')) {
            $galery->filePath = $request->videoUrl;
        }

        if ($request->hasFile('thumbnail')) {
            $thumbFile = $request->file('thumbnail');
            $thumbUniqueName = Str::uuid() . '.' . $thumbFile->getClientOriginalExtension();
            $thumbPath = $thumbFile->storeAs('galery_items/thumbnails', $thumbUniqueName, 'public');
            $galery->thumbnail = $thumbPath;
        }

        $galery->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $galery->load('album'), 'message' => 'Item galeri berhasil dibuat'], 201);
        }

        return redirect()->route('admin.galeries.index', ['album_id' => $galery->albumId])->with('success', 'Item galeri berhasil dibuat.');
    }

    public function show(Request $request, string $slug)
    {
        $galery = Galery::with(['album', 'creator', 'updater'])
            ->where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        if ($galery->type === 'photo' && $galery->filePath) {
            $galery->file_url = Storage::url($galery->filePath);
        } else if ($galery->type === 'video') {
            $galery->file_url = $galery->filePath;
        }
        if ($galery->thumbnail) {
            $galery->thumbnail_url = Storage::url($galery->thumbnail);
        }

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $galery, 'message' => 'Item galeri berhasil diambil']);
        }

        return Inertia::render('Galeries/Show', [
            'galery' => $galery,
            'can' => [
                'edit_galery' => Auth::check() && Auth::user()->can('update', $galery),
                'delete_galery' => Auth::check() && Auth::user()->can('delete', $galery),
            ]
        ]);
    }

    public function edit(string $slug)
    {
        $galery = Galery::with('album')
            ->where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();
            
        $albums = Album::where('isDeleted', false)->orderBy('name')->get(['id', 'name']);

        if ($galery->type === 'photo' && $galery->filePath) {
            $galery->file_url = Storage::url($galery->filePath);
        }
        if ($galery->thumbnail) {
            $galery->thumbnail_url = Storage::url($galery->thumbnail);
        }

        return Inertia::render('Galeries/Edit', [
            'galery' => $galery,
            'albums' => $albums
        ]);
    }

    public function update(Request $request, string $slug)
    {
        $galery = Galery::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:photo,video',
            'filePath' => 'nullable|image_if:type,photo|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
            'videoUrl' => 'nullable|url_if:type,video',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'displayOrder' => 'nullable|integer|min:0',
            'albumId' => 'required|exists:albums,id',
        ]);
        $validator->sometimes(['filePath'], 'required', function ($input) use ($galery) {
            return $input->type === 'photo' && !$input->hasFile('filePath') && !$galery->filePath;
        });
        $validator->sometimes(['videoUrl'], 'required', function ($input) use ($galery) {
            return $input->type === 'video' && empty($input->videoUrl) && ($galery->type !== 'video' || !$galery->filePath);
        });

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        if ($galery->title !== $request->title) {
            $baseSlug = Str::slug($request->title);
            $newSlug = $baseSlug;
            $counter = 1;
            while (Galery::where('slug', $newSlug)->where('id', '!=', $galery->id)->exists()) {
                $newSlug = $baseSlug . '-' . $counter++;
            }
            $galery->slug = $newSlug;
        }

        $galery->title = $request->title;
        $galery->description = $request->description;
        $galery->type = $request->type;
        $galery->displayOrder = $request->filled('displayOrder') ? $request->displayOrder : $galery->displayOrder;
        $galery->albumId = $request->albumId;
        $galery->updatedBy = Auth::id();

        if ($request->type === 'photo' && $request->hasFile('filePath')) {
            if ($galery->filePath && Storage::disk('public')->exists($galery->filePath)) {
                Storage::disk('public')->delete($galery->filePath);
            }
            $file = $request->file('filePath');
            $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePathVal = $file->storeAs('galery_items/photos', $uniqueName, 'public');
            $galery->filePath = $filePathVal;
        } elseif ($request->type === 'video' && $request->filled('videoUrl')) {
            if ($galery->type === 'photo' && $galery->filePath && Storage::disk('public')->exists($galery->filePath)) {
                Storage::disk('public')->delete($galery->filePath);
            }
            $galery->filePath = $request->videoUrl;
        } elseif ($request->type === 'photo' && !$request->hasFile('filePath') && $galery->type === 'video' && $galery->filePath) {
            $galery->filePath = null;
        }

        if ($request->hasFile('thumbnail')) {
            if ($galery->thumbnail && Storage::disk('public')->exists($galery->thumbnail)) {
                Storage::disk('public')->delete($galery->thumbnail);
            }
            $thumbFile = $request->file('thumbnail');
            $thumbUniqueName = Str::uuid() . '.' . $thumbFile->getClientOriginalExtension();
            $thumbPath = $thumbFile->storeAs('galery_items/thumbnails', $thumbUniqueName, 'public');
            $galery->thumbnail = $thumbPath;
        } elseif ($request->input('removeThumbnail')) {
            if ($galery->thumbnail && Storage::disk('public')->exists($galery->thumbnail)) {
                Storage::disk('public')->delete($galery->thumbnail);
            }
            $galery->thumbnail = null;
        }

        $galery->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $galery->load('album'), 'message' => 'Item galeri berhasil diperbarui']);
        }

        return redirect()->route('admin.galeries.index', ['album_id' => $galery->albumId])->with('success', 'Item galeri berhasil diperbarui.');
    }

    public function destroy(Request $request, string $slug)
    {
        $galery = Galery::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();
        
        if ($galery->filePath && $galery->type === 'photo' && Storage::disk('public')->exists($galery->filePath)) {
            Storage::disk('public')->delete($galery->filePath);
        }
        if ($galery->thumbnail && Storage::disk('public')->exists($galery->thumbnail)) {
            Storage::disk('public')->delete($galery->thumbnail);
        }

        $galery->isDeleted = true;
        $galery->updatedBy = Auth::id();
        $galery->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Item galeri berhasil dihapus'], 200);
        }

        return redirect()->route('admin.galeries.index', ['album_id' => $galery->albumId])->with('success', 'Item galeri berhasil dihapus.');
    }
}
