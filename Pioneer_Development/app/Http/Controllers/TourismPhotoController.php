<?php

namespace App\Http\Controllers;

use App\Models\PhotoTourism; // Nama model yang benar
use App\Models\Tourism;      // Untuk menghubungkan
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TourismPhotoController extends Controller
{
    // Index bisa menampilkan foto untuk destinasi wisata tertentu
    public function index(Request $request)
    {
        $query = PhotoTourism::with('destination') 
            ->where('isDeleted', false)
            ->orderBy('created_at', 'desc'); 

        if ($request->has('destinationId')) {
            $query->where('destinationId', $request->destinationId);
        }
         if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where('filePath', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%")
                  ->orWhereHas('destination', function($q) use ($searchTerm){
                      $q->where('name', 'like', "%{$searchTerm}%");
                  });
        }


        $tourismPhotos = $query->paginate(10);
        $destinations = Tourism::where('isDeleted', false)->orderBy('name')->get(['id', 'name']);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $tourismPhotos, 'message' => 'Foto wisata berhasil diambil']);
        }

        if (Auth::check()) {
            return Inertia::render('TourismPhotos/Index', [
                'tourismPhotos' => $tourismPhotos,
                'destinations' => $destinations,
                'filters' => $request->only(['search', 'destination_id'])
            ]);
        } else {
            return Inertia::render('TourismPhotos/Public/Index', [
                'tourismPhotos' => $tourismPhotos,
                'destinations' => $destinations,
                'filters' => $request->only(['search', 'destination_id'])
            ]);
        }
    }

    // Menampilkan form untuk membuat foto wisata baru
    public function create(Request $request)
    {
        $destinations = Tourism::where('isDeleted', false)->orderBy('name')->get(['id', 'name']);
        $destinationId = $request->get('destinationId');

        return Inertia::render('TourismPhotos/Create', [
            'destinations' => $destinations,
            'selectedDestinationId' => $destinationId
        ]);
    }

    // Menyimpan foto wisata baru
    public function store(Request $request)
    {
        $messages = [
            'destinationId.required' => 'Destinasi wisata wajib dipilih.',
            'destinationId.exists' => 'Destinasi wisata yang dipilih tidak valid.',

            'photos.required' => 'Minimal satu foto harus diunggah.',
            'photos.array' => 'Format foto tidak valid.',

            'photos.*.required' => 'Setiap foto wajib diunggah.',
            'photos.*.image' => 'Setiap file harus berupa gambar.',
            'photos.*.mimes' => 'Format gambar harus jpeg, png, jpg, gif, svg, atau webp.',
            'photos.*.max' => 'Ukuran masing-masing gambar tidak boleh melebihi 2MB (2048 KB).',

            'description.string' => 'Deskripsi harus berupa teks.',
            'description.max' => 'Deskripsi tidak boleh lebih dari :max karakter.',
        ];

        $validator = Validator::make($request->all(), [
            'destinationId' => 'required|exists:tourism,id', 
            'photos' => 'required|array',
            'photos.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'description' => 'nullable|string|max:255',
        ], $messages);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }
        
        $createdPhotos = [];
        if($request->hasFile('photos')){
            foreach ($request->file('photos') as $file) {
                $originalName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $uniqueName = Str::uuid() . '.' . $extension;
                $filePath = $file->storeAs('tourism_photos', $uniqueName, 'public');
                $tourismPhoto = new PhotoTourism();
                $tourismPhoto->slug = Str::slug(pathinfo($originalName, PATHINFO_FILENAME) . '-' . now()->timestamp);
                $tourismPhoto->destinationId = $request->destinationId;
                $tourismPhoto->filePath = $filePath;
                $tourismPhoto->description = $request->description; 
                $tourismPhoto->createdBy = Auth::id();
                $tourismPhoto->created_at = now(); 
                $tourismPhoto->save();
                $createdPhotos[] = $tourismPhoto;
            }
        }

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $createdPhotos, 'message' => 'Foto wisata berhasil diunggah'], 201);
        }
        return redirect()->route('tourism.edit', $request->destinationId)->with('success', 'Foto wisata berhasil diunggah.');
    }
    
    // Menampilkan form untuk mengedit foto wisata
    public function edit($slug)
    {
        $tourismPhoto = PhotoTourism::where('isDeleted', false)->findOrFail($slug);
        $destinations = Tourism::where('isDeleted', false)->orderBy('name')->get(['id', 'name']);

        return Inertia::render('TourismPhotos/Edit', [
            'tourismPhoto' => $tourismPhoto,
            'destinations' => $destinations
        ]);
    }

    // Memperbarui foto wisata
    public function update(Request $request, $slug)
    {
        $messages = [
            'destinationId.required' => 'Destinasi wisata wajib dipilih.',
            'destinationId.exists' => 'Destinasi wisata yang dipilih tidak valid.',

            'photos.required' => 'Minimal satu foto harus diunggah.',
            'photos.array' => 'Format foto tidak valid.',

            'photos.*.required' => 'Setiap foto wajib diunggah.',
            'photos.*.image' => 'Setiap file harus berupa gambar.',
            'photos.*.mimes' => 'Format gambar harus jpeg, png, jpg, gif, svg, atau webp.',
            'photos.*.max' => 'Ukuran masing-masing gambar tidak boleh melebihi 2MB (2048 KB).',

            'description.string' => 'Deskripsi harus berupa teks.',
            'description.max' => 'Deskripsi tidak boleh lebih dari :max karakter.',
        ];

        $validator = Validator::make($request->all(), [
            'destinationId' => 'required|exists:tourism,id', 
            'photos' => 'required|array',
            'photos.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'description' => 'nullable|string|max:255',
        ], $messages);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $tourismPhoto = PhotoTourism::where('isDeleted', false)->findOrFail($slug);
        
        if($request->has('destinationId')){
            $tourismPhoto->destinationId = $request->destinationId;
        }
        $tourismPhoto->description = $request->filled('description') ? $request->description : $tourismPhoto->description;
        
        if ($request->hasFile('photo')) {
            if ($tourismPhoto->filePath && Storage::disk('public')->exists($tourismPhoto->filePath)) {
                Storage::disk('public')->delete($tourismPhoto->filePath);
            }
            $file = $request->file('photo');
            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $uniqueName = Str::uuid() . '.' . $extension;
            $filePath = $file->storeAs('tourism_photos', $uniqueName, 'public');
            $tourismPhoto->filePath = $filePath;
        }
        
        $tourismPhoto->updatedBy = Auth::id();
        $tourismPhoto->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $tourismPhoto, 'message' => 'Foto wisata berhasil diperbarui']);
        }
        return redirect()->route('tourism.edit', $tourismPhoto->destinationId)->with('success', 'Foto wisata berhasil diperbarui.');
    }

    // Menghapus foto wisata (soft delete)
    public function destroy(Request $request, $slug)
    {
        $tourismPhoto = PhotoTourism::where('isDeleted', false)->findOrFail($slug);

        if ($request->input('delete_file', false)) {
             if ($tourismPhoto->filePath && Storage::disk('public')->exists($tourismPhoto->filePath)) {
                Storage::disk('public')->delete($tourismPhoto->filePath);
            }
        }

        $tourismPhoto->isDeleted = true;
        $tourismPhoto->updatedBy = Auth::id(); 
        $tourismPhoto->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Foto wisata berhasil dihapus'], 200);
        }
        return redirect()->back()->with('success', 'Foto wisata berhasil dihapus.');
    }

    // Menampilkan daftar foto wisata yang sudah dihapus (arsip)
    public function archivedIndex(Request $request)
    {
        $query = PhotoTourism::with('destination')
            ->where('isDeleted', true)
            ->orderBy('updated_at', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where('filePath', 'like', "%{$searchTerm}%")
                ->orWhere('description', 'like', "%{$searchTerm}%")
                ->orWhereHas('destination', function($q) use ($searchTerm){
                    $q->where('name', 'like', "%{$searchTerm}%");
                });
        }

        $tourismPhotos = $query->paginate(10);

        return Inertia::render('TourismPhotos/Archived', [
            'tourismPhotos' => $tourismPhotos,
            'filters' => $request->only(['search']),
        ]);
    }

    // Mengembalikan (restore) foto wisata yang diarsipkan
    public function restore($slug)
    {
        $tourismPhoto = PhotoTourism::where('isDeleted', true)->findOrFail($slug);
        $tourismPhoto->isDeleted = false;
        $tourismPhoto->updatedBy = Auth::id();
        $tourismPhoto->save();

        return redirect()->back()->with('success', 'Foto wisata berhasil dipulihkan.');
    }

    // Menghapus permanen foto wisata dari arsip
    public function deletePermanent($slug)
    {
        $tourismPhoto = PhotoTourism::where('isDeleted', true)->findOrFail($slug);

        if ($tourismPhoto->filePath && Storage::disk('public')->exists($tourismPhoto->filePath)) {
            Storage::disk('public')->delete($tourismPhoto->filePath);
        }

        $tourismPhoto->delete();

        return redirect()->back()->with('success', 'Foto wisata berhasil dihapus permanen.');
    }

}
