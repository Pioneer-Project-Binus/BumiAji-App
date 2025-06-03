<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AlbumController extends Controller
{
    public function index(Request $request)
    {
        $query = Album::withCount('galerys') 
            ->where('isDeleted', false)
            ->orderBy('createdAt', 'desc');

        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $albums = $query->paginate(10);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $albums, 'message' => 'Album berhasil diambil']);
        }

        return Inertia::render('Albums/Index', [
            'albums' => $albums,
            'filters' => $request->only(['search', 'status']),
            'can' => [
                'create_album' => Auth::user()->can('create', Album::class),
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Albums/Create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:albums,name',
            'description' => 'nullable|string',
            'coverImage' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'status' => 'required|in:draft,published,archived',
        ], [
            'name.required' => 'Judul album wajib diisi.',
            'name.string' => 'Judul album harus berupa teks.',
            'name.max' => 'Judul album maksimal 255 karakter.',
            'description.string' => 'Deskripsi harus berupa teks.',
            'cover_image.image' => 'Gambar harus berupa file gambar.',
            'cover_image.mimes' => 'Gambar hanya boleh berformat jpeg, png, atau jpg.',
            'cover_image.max' => 'Ukuran gambar maksimal 2MB.',
            'status.required' => 'Status album wajib dipilih.',
            'status.in' => 'Status tidak valid.',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $album = new Album();
        $album->name = $request->name;

        $baseSlug = Str::slug($request->name);
        $slug = $baseSlug;
        $counter = 1;
        while (Album::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }
        $album->slug = $slug;

        $album->description = $request->description;
        $album->status = $request->status;
        $album->createdBy = Auth::id();

        if ($request->hasFile('coverImage')) {
            $file = $request->file('coverImage');
            $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('album_covers', $uniqueName, 'public');
            $album->coverImage = $filePath;
        }
        $album->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $album, 'message' => 'Album berhasil dibuat'], 201);
        }
        return redirect()->route('albums.index')->with('success', 'Album berhasil dibuat.');
    }

    public function show(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $album = Album::with(['galeries', 'creator', 'updater'])
            ->where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        $album->cover_image_url = $album->coverImage ? Storage::url($album->coverImage) : null;

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $album, 'message' => 'Album berhasil diambil']);
        }
        return Inertia::render('Albums/Show', [
            'album' => $album,
             'can' => [
                'edit_album' => Auth::user()->can('update', $album),
                'delete_album' => Auth::user()->can('delete', $album),
            ]
        ]);
    }

    public function edit(string $slug) // Parameter diubah menjadi $slug
    {
        $album = Album::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();
        $album->cover_image_url = $album->coverImage ? Storage::url($album->coverImage) : null;
        return Inertia::render('Albums/Edit', ['album' => $album]);
    }

    public function update(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $album = Album::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:albums,name',
            'description' => 'nullable|string',
            'coverImage' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'status' => 'required|in:draft,published,archived',
        ], [
            'name.required' => 'Judul album wajib diisi.',
            'name.string' => 'Judul album harus berupa teks.',
            'name.max' => 'Judul album maksimal 255 karakter.',
            'description.string' => 'Deskripsi harus berupa teks.',
            'cover_image.image' => 'Gambar harus berupa file gambar.',
            'cover_image.mimes' => 'Gambar hanya boleh berformat jpeg, png, atau jpg.',
            'cover_image.max' => 'Ukuran gambar maksimal 2MB.',
            'status.required' => 'Status album wajib dipilih.',
            'status.in' => 'Status tidak valid.',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        if ($album->name !== $request->name) {
            $baseSlug = Str::slug($request->name);
            $newSlug = $baseSlug;
            $counter = 1;
            while (Album::where('slug', $newSlug)->where('id', '!=', $album->id)->exists()) {
                $newSlug = $baseSlug . '-' . $counter++;
            }
            $album->slug = $newSlug;
        }
        $album->name = $request->name;
        $album->description = $request->description;
        $album->status = $request->status;
        $album->updatedBy = Auth::id();

        if ($request->hasFile('coverImage')) {
            if ($album->coverImage && Storage::disk('public')->exists($album->coverImage)) {
                Storage::disk('public')->delete($album->coverImage);
            }
            $file = $request->file('coverImage');
            $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('album_covers', $uniqueName, 'public');
            $album->coverImage = $filePath;
        } elseif ($request->input('removeCoverImage')) {
            if ($album->coverImage && Storage::disk('public')->exists($album->coverImage)) {
                Storage::disk('public')->delete($album->coverImage);
            }
            $album->coverImage = null;
        }
        $album->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $album, 'message' => 'Album berhasil diperbarui']);
        }
        return redirect()->route('albums.show', $album->slug)->with('success', 'Album berhasil diperbarui.');
    }

    public function destroy(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $album = Album::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        $album->isDeleted = true;
        $album->updatedBy = Auth::id();
        $album->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Album berhasil dihapus'], 200);
        }
        return redirect()->route('albums.index')->with('success', 'Album berhasil dihapus.');
    }
}