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
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $tourisms = $query->paginate(10);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $tourisms, 'message' => 'Destinasi wisata berhasil diambil']);
        }

        return Inertia::render('Tourisms/Index', [
            'tourisms' => $tourisms,
            'filters' => $request->only(['search', 'status']),
            'can' => [
                'create_tourism' => Auth::user()->can('create', Tourism::class),
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Tourisms/Create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:tourisms,name',
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
        return redirect()->route('tourisms.index')->with('success', 'Destinasi wisata berhasil dibuat.');
    }

    public function show(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $tourism = Tourism::with(['photos', 'creator', 'updater'])
            ->where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $tourism, 'message' => 'Destinasi wisata berhasil diambil']);
        }
        return Inertia::render('Tourisms/Show', [
            'tourism' => $tourism,
            'can' => [
                'edit_tourism' => Auth::user()->can('update', $tourism),
                'delete_tourism' => Auth::user()->can('delete', $tourism),
            ]
        ]);
    }

    public function edit(string $slug) // Parameter diubah menjadi $slug
    {
        $tourism = Tourism::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();
        return Inertia::render('Tourisms/Edit', ['tourism' => $tourism]);
    }

    public function update(Request $request, string $slug) // Parameter diubah menjadi $slug
    {
        $tourism = Tourism::where('slug', $slug) // Cari berdasarkan slug
            ->where('isDeleted', false)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:tourisms,name,' . $tourism->id,
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
        return redirect()->route('tourisms.show', $tourism->slug)->with('success', 'Destinasi wisata berhasil diperbarui.');
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
        return redirect()->route('tourisms.index')->with('success', 'Destinasi wisata berhasil dihapus.');
    }
}