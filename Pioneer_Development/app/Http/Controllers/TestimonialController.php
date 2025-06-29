<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use App\Models\User; // Walaupun tidak ada relasi author, creator tetap User
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    // Menampilkan daftar testimoni (bisa untuk publik atau admin)
    public function index(Request $request)
    {
        $query = Testimonial::with('creator')
            ->where('isDeleted', false)
            ->orderBy('createdAt', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                ->orWhere('message', 'like', "%{$searchTerm}%");
            });
        }
        if ($request->filled('rating')) {
            $query->where('rating', $request->rating);
        }

        $testimonials = $query->paginate(10);

        // Tambahkan URL foto jika ada
        $testimonials->getCollection()->transform(function ($testimonial) {
            $testimonial->photo_url = $testimonial->photo ? Storage::url($testimonial->photo) : null;
            return $testimonial;
        });

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $testimonials, 'message' => 'Testimoni berhasil diambil']);
        }

        if (Auth::check()) {
            // User sudah login, render halaman admin
            return Inertia::render('Testimonials/Index', [
                'testimonials' => $testimonials,
                'filters' => $request->only(['search', 'rating']),
                'can' => [
                    'create_testimonial' => Auth::user()->can('create', Testimonial::class),
                ],
            ]);
        } else {
            return Inertia::render('Public/Testimonials/Index', [
                'testimonials' => $testimonials,
                'filters' => $request->only(['search', 'rating']),
            ]);
        }
    }


    // Menampilkan form untuk membuat testimoni baru (untuk admin)
    public function create()
    {
        return Inertia::render('Testimonials/Create'); // Sesuaikan path view admin
    }

    // Menyimpan testimoni baru (untuk admin)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'rating' => 'nullable|integer|min:1|max:5',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $testimonial = new Testimonial();
        $testimonial->name = $request->name;

        // Pembuatan slug unik
        $baseSlug = Str::slug($request->name);
        $slug = $baseSlug;
        $counter = 1;
        while (Testimonial::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . ($counter++);
        }
        $testimonial->slug = $slug;

        $testimonial->rating = $request->rating;
        $testimonial->message = $request->message;
        $testimonial->createdBy = Auth::id(); // Diasumsikan admin yang input

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('testimonial_photos', $uniqueName, 'public');
            $testimonial->photo = $filePath;
        }
        $testimonial->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $testimonial, 'message' => 'Testimoni berhasil dibuat'], 201);
        }
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimoni berhasil dibuat.'); // Arahkan ke index admin
    }

    // Menampilkan detail testimoni berdasarkan slug (bisa untuk publik atau admin)
    public function show(Request $request, string $slug)
    {
        $testimonial = Testimonial::with('creator')
            ->where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();
            
        $testimonial->photo_url = $testimonial->photo ? Storage::url($testimonial->photo) : null;

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $testimonial, 'message' => 'Testimoni berhasil diambil']);
        }

        if (Auth::check()) {
            // Render admin component kalau sudah login
            return Inertia::render('Testimonials/Show', [
                'testimonial' => $testimonial,
            ]);
        } else {
            // Render public component kalau belum login
            return Inertia::render('Testimonials/Public/Show', [
                'testimonial' => $testimonial,
            ]);
        }
    }


    // Menampilkan form untuk mengedit testimoni (untuk admin)
    public function edit(string $slug) // Parameter diubah menjadi $slug
    {
        $testimonial = Testimonial::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();
        $testimonial->photo_url = $testimonial->photo ? Storage::url($testimonial->photo) : null;
        return Inertia::render('Testimonials/Edit', ['testimonial' => $testimonial]); // Sesuaikan path view admin
    }

    // Memperbarui testimoni (untuk admin)
    public function update(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $testimonial = Testimonial::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'rating' => 'nullable|integer|min:1|max:5',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Handle slug update jika name berubah
        if ($testimonial->name !== $request->name) {
            $baseSlug = Str::slug($request->name);
            $newSlug = $baseSlug;
            $counter = 1;
            while (Testimonial::where('slug', $newSlug)->where('id', '!=', $testimonial->id)->exists()) {
                $newSlug = $baseSlug . '-' . ($counter++);
            }
            $testimonial->slug = $newSlug;
        }
        $testimonial->name = $request->name;
        $testimonial->rating = $request->rating;
        $testimonial->message = $request->message;
        // Migrasi tidak memiliki updatedBy, jadi tidak di-set.
        // Jika ditambahkan, $testimonial->updatedBy = Auth::id();

        if ($request->hasFile('photo')) {
            if ($testimonial->photo && Storage::disk('public')->exists($testimonial->photo)) {
                Storage::disk('public')->delete($testimonial->photo);
            }
            $file = $request->file('photo');
            $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('testimonial_photos', $uniqueName, 'public');
            $testimonial->photo = $filePath;
        } elseif ($request->input('removePhoto')) {
             if ($testimonial->photo && Storage::disk('public')->exists($testimonial->photo)) {
                Storage::disk('public')->delete($testimonial->photo);
            }
            $testimonial->photo = null;
        }
        $testimonial->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $testimonial, 'message' => 'Testimoni berhasil diperbarui']);
        }
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimoni berhasil diperbarui.'); // Arahkan ke index admin
    }

    // Menghapus testimoni (untuk admin)
    public function destroy(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $testimonial = Testimonial::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        // Opsional: Hapus file fisik foto jika ada
        // if ($testimonial->photo && Storage::disk('public')->exists($testimonial->photo)) {
        //     Storage::disk('public')->delete($testimonial->photo);
        // }
            
        $testimonial->isDeleted = true;
        // Migrasi tidak memiliki updatedBy
        // $testimonial->updatedBy = Auth::id();
        $testimonial->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Testimoni berhasil dihapus'], 200);
        }
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimoni berhasil dihapus.'); // Arahkan ke index admin
    }
}