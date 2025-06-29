<?php

namespace App\Http\Controllers;

use App\Models\Tourism;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TourismController extends Controller
{
    public function index(Request $request)
    {
        $query = Tourism::with(['photos', 'creator', 'updater'])
            ->where('isDeleted', false)
            ->orderBy('createdAt', 'desc');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                ->orWhere('description', 'like', "%{$searchTerm}%")
                ->orWhere('address', 'like', "%{$searchTerm}%");
            });
        }

        // Status hanya untuk admin (user login)
        if (Auth::check() && $request->has('status')) {
            $query->where('status', $request->status);
        }

        // Kalau public, kita tampilkan hanya yang statusnya aktif (misal)
        if (!Auth::check()) {
            $query->where('status', 'active'); // sesuaikan dengan status yang ingin ditampilkan ke publik
        }

        $tourism = $query->paginate(10);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $tourism, 'message' => 'Destinasi wisata berhasil diambil']);
        }

        if (Auth::check()) {
            // Render untuk admin
            return Inertia::render('Tourism/Index', [
                'tourism' => $tourism,
                'filters' => $request->only(['search', 'status']),
                'can' => [
                    'create_tourism' => Auth::user()->can('create', Tourism::class),
                ]
            ]);
        } else {
            // Render untuk public tanpa login
            return Inertia::render('Tourism/Public/Index', [
                'tourism' => $tourism,
                'filters' => $request->only(['search']),
            ]);
        }
    }

    public function create()
    {
        return Inertia::render('Tourism/Create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:tourism,name',
            'description' => 'required|string',
            'address' => 'nullable|string',
            'ticketPrice' => 'nullable|string|max:255',
            'contactInfo' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'socialMedia' => 'nullable|json',
            'status' => 'required|in:draft,published,closed',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $tourism = new Tourism();
        $tourism->name = $request->name;

        $baseSlug = Str::slug($request->name);
        $slug = $baseSlug;
        $counter = 1;
        while (Tourism::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }
        $tourism->slug = $slug;

        $tourism->description = $request->description;
        $tourism->address = $request->address;
        $tourism->ticketPrice = $request->ticketPrice;
        $tourism->contactInfo = $request->contactInfo;
        $tourism->latitude = $request->latitude;
        $tourism->longitude = $request->longitude;
        $tourism->socialMedia = $request->filled('socialMedia') ? json_decode($request->socialMedia, true) : null;
        $tourism->status = $request->status;
        $tourism->createdBy = Auth::id();
        $tourism->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $tourism, 'message' => 'Destinasi wisata berhasil dibuat'], 201);
        }
        return redirect()->route('tourism.index')->with('success', 'Destinasi wisata berhasil dibuat.');
    }

    public function show(Request $request, string $slug)
    {
        $tourism = Tourism::with(['photos', 'creator', 'updater'])
            ->where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $tourism, 'message' => 'Destinasi wisata berhasil diambil']);
        }

        if (Auth::check()) {
            // Render untuk admin (user login)
            return Inertia::render('Tourism/Show', [
                'tourism' => $tourism,
            ]);
        } else {
            // Render untuk publik (guest)
            return Inertia::render('Tourism/Public/Show', [
                'tourism' => $tourism,
            ]);
        }
    }


    public function edit(string $slug) // Parameter diubah menjadi $slug
    {
        $tourism = Tourism::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();
        return Inertia::render('Tourism/Edit', ['tourism' => $tourism]);
    }

    public function update(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $tourism = Tourism::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:tourism,name,' . $tourism->id,
            'description' => 'required|string',
            'address' => 'nullable|string',
            'ticketPrice' => 'nullable|string|max:255',
            'contactInfo' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'socialMedia' => 'nullable|json',
            'status' => 'required|in:draft,published,closed',
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        if ($tourism->name !== $request->name) {
            $baseSlug = Str::slug($request->name);
            $newSlug = $baseSlug;
            $counter = 1;
            while (Tourism::where('slug', $newSlug)->where('id', '!=', $tourism->id)->exists()) {
                $newSlug = $baseSlug . '-' . $counter++;
            }
            $tourism->slug = $newSlug;
        }
        $tourism->name = $request->name;
        $tourism->description = $request->description;
        $tourism->address = $request->address;
        $tourism->ticketPrice = $request->ticketPrice;
        $tourism->contactInfo = $request->contactInfo;
        $tourism->latitude = $request->latitude;
        $tourism->longitude = $request->longitude;
        $tourism->socialMedia = $request->filled('socialMedia') ? json_decode($request->socialMedia, true) : null;
        $tourism->status = $request->status;
        $tourism->updatedBy = Auth::id();
        $tourism->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $tourism, 'message' => 'Destinasi wisata berhasil diperbarui']);
        }
        return redirect()->route('tourism.show', $tourism->slug)->with('success', 'Destinasi wisata berhasil diperbarui.');
    }

    public function destroy(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $tourism = Tourism::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        $tourism->isDeleted = true;
        $tourism->updatedBy = Auth::id();
        $tourism->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Destinasi wisata berhasil dihapus'], 200);
        }
        return redirect()->route('tourism.index')->with('success', 'Destinasi wisata berhasil dihapus.');
    }
}