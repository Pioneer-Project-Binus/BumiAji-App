<?php

namespace App\Http\Controllers;

use App\Models\Galery; // Pastikan nama model ini benar (Galery atau Gallery)
use App\Models\Album;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GaleryController extends Controller
{
    // Menampilkan daftar item galeri (untuk admin)
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
        if ($request->filled('album_id')) { // Gunakan filled untuk memeriksa jika ada nilainya
            $query->where('albumId', $request->album_id);
        }
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $galeries = $query->paginate(10);
        $albums = Album::where('isDeleted', false)->orderBy('name')->get(['id', 'name', 'slug']); // Tambahkan slug album untuk filter jika perlu

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $galeries, 'message' => 'Item galeri berhasil diambil']);
        }

        return Inertia::render('Galeries/Index', [
            'galeries' => $galeries,
            'albums' => $albums,
            'filters' => $request->only(['search', 'album_id', 'type']),
            'can' => [
                'create_galery' => Auth::user()->can('create', Galery::class),
            ]
        ]);
    }

    // Menampilkan form untuk membuat item galeri baru (untuk admin)
    public function create(Request $request)
    {
        $albums = Album::where('isDeleted', false)->orderBy('name')->get(['id', 'name']);
        $albumId = $request->get('album_id');
        return Inertia::render('Galeries/Create', [
            'albums' => $albums,
            'selectedAlbumId' => $albumId,
        ]);
    }

    // Menyimpan item galeri baru (untuk admin)
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
        ], [
            'title.required' => 'Judul galeri wajib diisi.',
            'title.string' => 'Judul galeri harus berupa teks.',
            'title.max' => 'Judul galeri maksimal 255 karakter.',
            'description.string' => 'Deskripsi harus berupa teks.',
            'type.required' => 'Tipe galeri wajib dipilih.',
            'type.in' => 'Tipe galeri harus berupa "photo" atau "video".',
            'filePath.required_if' => 'File gambar wajib diunggah jika tipe galeri adalah foto.',
            'filePath.image' => 'File harus berupa gambar.',
            'filePath.mimes' => 'Format gambar harus berupa jpeg, png, jpg, gif, svg, atau webp.',
            'filePath.max' => 'Ukuran gambar maksimal 4MB.',
            'videoUrl.required_if' => 'URL video wajib diisi jika tipe galeri adalah video.',
            'videoUrl.url' => 'URL video tidak valid.',
            'thumbnail.image' => 'Thumbnail harus berupa gambar.',
            'thumbnail.mimes' => 'Format thumbnail harus berupa jpeg, png, jpg, gif, svg, atau webp.',
            'thumbnail.max' => 'Ukuran thumbnail maksimal 2MB.',
            'displayOrder.integer' => 'Urutan tampilan harus berupa angka.',
            'displayOrder.min' => 'Urutan tampilan minimal 0.',
            'albumId.required' => 'Album wajib dipilih.',
            'albumId.exists' => 'Album yang dipilih tidak valid.',
        ]);


        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $galery = new Galery();
        $galery->title = $request->title;

        // Pembuatan slug unik global untuk Galery
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
            $filePathVal = $file->storeAs('galery_items/photos', $uniqueName, 'public'); // Path penyimpanan diubah
            $galery->filePath = $filePathVal;
        } elseif ($request->type === 'video' && $request->filled('videoUrl')) {
            $galery->filePath = $request->videoUrl;
        }

        if ($request->hasFile('thumbnail')) {
            $thumbFile = $request->file('thumbnail');
            $thumbUniqueName = Str::uuid() . '.' . $thumbFile->getClientOriginalExtension();
            $thumbPath = $thumbFile->storeAs('galery_items/thumbnails', $thumbUniqueName, 'public'); // Path penyimpanan diubah
            $galery->thumbnail = $thumbPath;
        } elseif ($request->type === 'photo' && isset($galery->filePath) && !$request->hasFile('thumbnail')) {
            // Jika foto dan tidak ada thumbnail khusus, bisa dipertimbangkan untuk tidak set thumbnail
            // atau menggunakan path foto itu sendiri jika frontend bisa handle
            // $galery->thumbnail = $galery->filePath; // Hati-hati jika filePath adalah video URL
        }

        $galery->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $galery->load('album'), 'message' => 'Item galeri berhasil dibuat'], 201);
        }
        // Redirect ke index galeri dengan filter album yang relevan
        return redirect()->route('admin.galeries.index', ['album_id' => $galery->albumId])->with('success', 'Item galeri berhasil dibuat.');
    }

    // Menampilkan detail item galeri berdasarkan slug (bisa untuk publik atau admin)
    public function show(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $galery = Galery::with(['album', 'creator', 'updater'])
            ->where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        // Tambahkan URL untuk file dan thumbnail jika ada
        if ($galery->type === 'photo' && $galery->filePath) {
            $galery->file_url = Storage::url($galery->filePath);
        } else if ($galery->type === 'video') {
            $galery->file_url = $galery->filePath; // filePath berisi URL video
        }
        if ($galery->thumbnail) {
            $galery->thumbnail_url = Storage::url($galery->thumbnail);
        }


        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $galery, 'message' => 'Item galeri berhasil diambil']);
        }
        
        return Inertia::render('Galeries/Show', [ // Atau Public/Galeries/Show
            'galery' => $galery,
            'can' => [
                'edit_galery' => Auth::check() && Auth::user()->can('update', $galery),
                'delete_galery' => Auth::check() && Auth::user()->can('delete', $galery),
            ]
        ]);
    }

    // Menampilkan form untuk mengedit item galeri (untuk admin)
    public function edit(string $slug) // Parameter diubah menjadi $slug
    {
        $galery = Galery::with('album')
            ->where('slug', $slug) // Cari berdasarkan slug
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

    // Memperbarui item galeri (untuk admin)
    public function update(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $galery = Galery::where('slug', $slug) // Cari berdasarkan slug
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
        ], [
            'title.required' => 'Judul galeri wajib diisi.',
            'title.string' => 'Judul galeri harus berupa teks.',
            'title.max' => 'Judul galeri maksimal 255 karakter.',
            'description.string' => 'Deskripsi harus berupa teks.',
            'type.required' => 'Tipe galeri wajib dipilih.',
            'type.in' => 'Tipe galeri harus berupa "photo" atau "video".',
            'filePath.required' => 'File gambar wajib diunggah.',
            'filePath.image' => 'File harus berupa gambar.',
            'filePath.mimes' => 'Format gambar harus berupa jpeg, png, jpg, gif, svg, atau webp.',
            'filePath.max' => 'Ukuran gambar maksimal 4MB.',
            'videoUrl.required' => 'URL video wajib diisi.',
            'videoUrl.url' => 'URL video tidak valid.',
            'thumbnail.image' => 'Thumbnail harus berupa gambar.',
            'thumbnail.mimes' => 'Format thumbnail harus berupa jpeg, png, jpg, gif, svg, atau webp.',
            'thumbnail.max' => 'Ukuran thumbnail maksimal 2MB.',
            'displayOrder.integer' => 'Urutan tampilan harus berupa angka.',
            'displayOrder.min' => 'Urutan tampilan minimal 0.',
            'albumId.required' => 'Album wajib dipilih.',
            'albumId.exists' => 'Album yang dipilih tidak valid.',
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

        // Handle slug update jika title berubah
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

        // Penanganan filePath (upload foto atau URL video)
        if ($request->type === 'photo' && $request->hasFile('filePath')) {
            if ($galery->filePath && Storage::disk('public')->exists($galery->filePath)) {
                Storage::disk('public')->delete($galery->filePath);
            }
            $file = $request->file('filePath');
            $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePathVal = $file->storeAs('galery_items/photos', $uniqueName, 'public');
            $galery->filePath = $filePathVal;
        } elseif ($request->type === 'video' && $request->filled('videoUrl')) {
            // Jika sebelumnya foto dan ada file, hapus file lama
            if ($galery->type === 'photo' && $galery->filePath && Storage::disk('public')->exists($galery->filePath)) {
                Storage::disk('public')->delete($galery->filePath);
            }
            $galery->filePath = $request->videoUrl;
        } elseif ($request->type === 'photo' && !$request->hasFile('filePath') && $galery->type === 'video' && $galery->filePath) {
            // Beralih dari video ke foto tanpa file baru, filePath perlu di-null-kan
             $galery->filePath = null;
        }


        // Penanganan thumbnail
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

    // Menghapus item galeri (untuk admin)
    public function destroy(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $galery = Galery::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();
        
        // Opsional: Hapus file fisik dari storage
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