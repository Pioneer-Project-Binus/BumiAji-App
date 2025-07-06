<?php

namespace App\Http\Controllers;

use App\Models\Galery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule; // <-- TAMBAHKAN INI
use Inertia\Inertia;

class GaleryController extends Controller
{
    // ... (metode indexAdmin, indexPublic, create tidak berubah) ...
    public function indexAdmin(Request $request)
    {
        $query = Galery::where('isDeleted', false)
            ->orderBy('displayOrder', 'asc')
            ->orderBy('created_at', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $galeries = $query->paginate(10);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $galeries, 'message' => 'Item galeri berhasil diambil']);
        }

        return Inertia::render('Galeries/Index', [
            'galeries' => $galeries,
            'filters' => $request->only(['search', 'type']),
        ]);
    }

    public function indexPublic(Request $request)
    {
        $query = Galery::where('isDeleted', false)
            ->orderBy('displayOrder', 'asc')
            ->orderBy('created_at', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $galeries = $query->paginate(10);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $galeries, 'message' => 'Item galeri berhasil diambil']);
        }

        return Inertia::render('Galeries/Public/Index', [
            'galeries' => $galeries,
        ]);
    }

    public function create()
    {
        return Inertia::render('Galeries/Create');
    }


    public function store(Request $request)
    {
        // --- TAMBAHKAN PESAN KESALAHAN INI ---
        $messages = [
            'displayOrder.integer' => 'Urutan tampilan harus berupa angka.',
            'displayOrder.min' => 'Urutan tampilan tidak boleh kurang dari 0.',
            'displayOrder.unique' => 'Nomor urutan ini sudah digunakan. Silakan pilih nomor lain.',
            'title.required' => 'Judul tidak boleh kosong.',
            'type.required' => 'Tipe galeri harus dipilih.',
            'filePath.required_if' => 'File foto wajib diunggah untuk tipe foto.',
            'filePath.image' => 'File yang diunggah harus berupa gambar.',
            'filePath.max' => 'Ukuran file foto tidak boleh lebih dari 4MB.',
            'videoUrl.required_if' => 'URL video wajib diisi untuk tipe video.',
            'videoUrl.url' => 'Format URL video tidak valid.',
        ];

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:photo,video',
            'filePath' => 'required_if:type,photo|nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
            'videoUrl' => 'required_if:type,video|nullable|url',
            'displayOrder' => [
                'nullable',
                'integer',
                'min:0',
                Rule::unique('galeries')->where(function ($query) {
                    return $query->where('isDeleted', false);
                }),
            ],
        ], $messages); // <-- Sisipkan variabel $messages di sini

        if ($validator->fails()) {
            return $request->wantsJson()
                ? response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422)
                : redirect()->back()->withErrors($validator)->withInput();
        }

        // ... (sisa kode store tidak berubah)
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
        $galery->displayOrder = $request->filled('displayOrder')
            ? $request->displayOrder
            : (Galery::where('isDeleted', false)->max('displayOrder') + 1);
        $galery->createdBy = Auth::id();

        if ($request->type === 'photo' && $request->hasFile('filePath')) {
            $file = $request->file('filePath');
            $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $galery->filePath = $file->storeAs('galery_items/photos', $uniqueName, 'public');
        } elseif ($request->type === 'video' && $request->filled('videoUrl')) {
            $galery->filePath = $request->videoUrl;
        }

        $galery->save();

        return $request->wantsJson()
            ? response()->json(['success' => true, 'data' => $galery, 'message' => 'Item galeri berhasil dibuat'], 201)
            : redirect()->route('galeries.index')->with('success', 'Item galeri berhasil dibuat.');
    }

    // ... (metode showAdmin, showPublic, edit tidak berubah) ...
    public function showAdmin(Request $request, string $slug)
    {
        $galery = Galery::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $galery->file_url = $galery->type === 'photo' && $galery->filePath
            ? Storage::url($galery->filePath)
            : ($galery->type === 'video' ? $galery->filePath : null);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $galery, 'message' => 'Item galeri berhasil diambil']);
        }

        return Inertia::render('Galeries/Show', ['galery' => $galery]);
    }

    public function showPublic(Request $request, string $slug)
    {
        $galery = Galery::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $galery->file_url = $galery->type === 'photo' && $galery->filePath
            ? Storage::url($galery->filePath)
            : ($galery->type === 'video' ? $galery->filePath : null);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $galery, 'message' => 'Item galeri berhasil diambil']);
        }

        return Inertia::render('Galeries/Public/Show', ['galery' => $galery]);
    }

    public function edit(string $slug)
    {
        $galery = Galery::where('slug', $slug)->where('isDeleted', false)->firstOrFail();

        $galery->file_url = $galery->type === 'photo' && $galery->filePath
            ? Storage::url($galery->filePath)
            : null;

        return Inertia::render('Galeries/Edit', ['galery' => $galery]);
    }


    public function update(Request $request, string $slug)
    {
        $galery = Galery::where('slug', $slug)->where('isDeleted', false)->firstOrFail();

        $messages = [
            'displayOrder.integer' => 'Urutan tampilan harus berupa angka.',
            'displayOrder.min' => 'Urutan tampilan tidak boleh kurang dari 0.',
            'displayOrder.unique' => 'Nomor urutan ini sudah digunakan. Silakan pilih nomor lain.',
            'title.required' => 'Judul tidak boleh kosong.',
            'type.required' => 'Tipe galeri harus dipilih.',
            'filePath.image' => 'File yang diunggah harus berupa gambar.',
            'filePath.max' => 'Ukuran file foto tidak boleh lebih dari 4MB.',
            'videoUrl.url' => 'Format URL video tidak valid.',
        ];

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:photo,video',
            'filePath' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
            'videoUrl' => 'nullable|url',
            'displayOrder' => [
                'nullable',
                'integer',
                'min:0',
                Rule::unique('galeries')->where(function ($query) {
                    return $query->where('isDeleted', false);
                })->ignore($galery->id),
            ],
        ], $messages); // <-- Sisipkan variabel $messages di sini

        $validator->sometimes('filePath', 'required', function ($input) use ($galery, $request) {
            return $input->type === 'photo' && empty($request->file('filePath')) && empty($galery->filePath);
        });
        $validator->sometimes('videoUrl', 'required', function ($input) use ($galery) {
            return $input->type === 'video' && empty($input->videoUrl) && empty($galery->filePath);
        });

        if ($validator->fails()) {
            return $request->wantsJson()
                ? response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422)
                : redirect()->back()->withErrors($validator)->withInput();
        }

        // ... (sisa kode update tidak berubah)
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
        $galery->updatedBy = Auth::id();

        if ($request->type === 'photo') {
            if ($request->hasFile('filePath')) {
                if ($galery->filePath && $galery->type === 'photo' && Storage::disk('public')->exists($galery->filePath)) {
                    Storage::disk('public')->delete($galery->filePath);
                }
                $file = $request->file('filePath');
                $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
                $galery->filePath = $file->storeAs('galery_items/photos', $uniqueName, 'public');
            } elseif ($galery->type === 'video') {
                 $galery->filePath = null;
            }
        } elseif ($request->type === 'video') {
            if ($request->filled('videoUrl')) {
                if ($galery->type === 'photo' && $galery->filePath && Storage::disk('public')->exists($galery->filePath)) {
                    Storage::disk('public')->delete($galery->filePath);
                }
                $galery->filePath = $request->videoUrl;
            }
        }
        
        $galery->save();

        return $request->wantsJson()
            ? response()->json(['success' => true, 'data' => $galery, 'message' => 'Item galeri berhasil diperbarui'])
            : redirect()->route('galeries.index')->with('success', 'Item galeri berhasil diperbarui.');
    }

    // ... (metode destroy tidak berubah) ...
    public function destroy(Request $request, string $slug)
    {
        $galery = Galery::where('slug', $slug)->where('isDeleted', false)->firstOrFail();

        if ($galery->filePath && $galery->type === 'photo' && Storage::disk('public')->exists($galery->filePath)) {
            Storage::disk('public')->delete($galery->filePath);
        }

        $galery->isDeleted = true;
        $galery->updatedBy = Auth::id();
        $galery->save();

        return $request->wantsJson()
            ? response()->json(['success' => true, 'message' => 'Item galeri berhasil dihapus'], 200)
            : redirect()->route('galeries.index')->with('success', 'Item galeri berhasil dihapus.');
    }
}