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
    /**
     * Display a listing of the tourism resources for authenticated administrators.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response|\Illuminate\Http\JsonResponse
     */
    public function indexAdmin(Request $request)
    {
        // Ensure only authenticated users can access this method
        if (!Auth::check()) {
            // If not authenticated, redirect to the public index
            return redirect()->route('tourism.public.index');
        }

        $query = Tourism::with(['photos', 'creator', 'updater'])
            ->where('isDeleted', false)
            ->orderBy('created_at', 'desc');

        // Apply search filter if present
        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%")
                  ->orWhere('address', 'like', "%{$searchTerm}%");
            });
        }

        // Apply status filter for admin users
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $tourism = $query->paginate(10);

        // Return JSON response for API requests
        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $tourism, 'message' => 'Destinasi wisata berhasil diambil']);
        }

        // Render Inertia page for web requests (admin view)
        return Inertia::render('Tourism/Index', [
            'tourism' => $tourism,
            'filters' => $request->only(['search', 'status']),
            'can' => [
                'create_tourism' => Auth::user()->can('create', Tourism::class),
            ]
        ]);
    }

    /**
     * Display a listing of the tourism resources for public (non-authenticated) users.
     * This method only shows 'published' tourism.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response|\Illuminate\Http\JsonResponse
     */
    public function indexPublic(Request $request)
    {
        $query = Tourism::with(['photos', 'creator', 'updater'])
            ->where('isDeleted', false)
            ->where('status', 'published') // Only show published items for public view
            ->orderBy('created_at', 'desc');

        // Apply search filter if present
        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%")
                  ->orWhere('address', 'like', "%{$searchTerm}%");
            });
        }

        $tourism = $query->paginate(10);

        // Return JSON response for API requests
        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $tourism, 'message' => 'Destinasi wisata berhasil diambil']);
        }

        // Render Inertia page for web requests (public view)
        return Inertia::render('Tourism/Public/Index', [
            'tourism' => $tourism,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new tourism resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        // This method should typically be protected by middleware (e.g., 'auth')
        return Inertia::render('Tourism/Create');
    }

    /**
     * Store a newly created tourism resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $messages = [
            'name.required' => 'Nama destinasi wisata wajib diisi.',
            'name.string' => 'Nama destinasi wisata harus berupa teks.',
            'name.max' => 'Nama destinasi wisata tidak boleh lebih dari :max karakter.',
            'name.unique' => 'Nama destinasi wisata ini sudah ada.',
            'description.required' => 'Deskripsi destinasi wisata wajib diisi.',
            'description.string' => 'Deskripsi destinasi wisata harus berupa teks.',
            'address.string' => 'Alamat harus berupa teks.',
            'ticketPrice.string' => 'Harga tiket harus berupa teks.',
            'ticketPrice.max' => 'Harga tiket tidak boleh lebih dari :max karakter.',
            'contactInfo.string' => 'Informasi kontak harus berupa teks.',
            'contactInfo.max' => 'Informasi kontak tidak boleh lebih dari :max karakter.',
            'latitude.numeric' => 'Latitude harus berupa angka.',
            'latitude.between' => 'Latitude harus antara :min dan :max.',
            'longitude.numeric' => 'Longitude harus berupa angka.',
            'longitude.between' => 'Longitude harus antara :min dan :max.',
            'socialMedia.json' => 'Social media harus berupa format JSON yang valid.',
            'status.required' => 'Status wajib diisi.',
            'status.in' => 'Status harus salah satu dari: draft, published, atau closed.',
        ];

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
        ], $messages);

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
        return redirect()->route('tourism.indexAdmin')->with('success', 'Destinasi wisata berhasil dibuat.');
    }

    /**
     * Display the specified tourism resource for authenticated administrators.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $slug
     * @return \Inertia\Response|\Illuminate\Http\JsonResponse
     */
    public function showAdmin(Request $request, string $slug)
    {
        // Ensure only authenticated users can access this method
        if (!Auth::check()) {
            // If not authenticated, redirect to the public show
            return redirect()->route('tourism.public.show', $slug);
        }

        $tourism = Tourism::with(['photos', 'creator', 'updater'])
            ->where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $tourism, 'message' => 'Destinasi wisata berhasil diambil']);
        }

        return Inertia::render('Tourism/Show', [
            'tourism' => $tourism,
        ]);
    }

    /**
     * Display the specified tourism resource for public (non-authenticated) users.
     * This method only shows 'published' tourism.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $slug
     * @return \Inertia\Response|\Illuminate\Http\JsonResponse
     */
    public function showPublic(Request $request, string $slug)
    {
        $tourism = Tourism::with(['photos', 'creator', 'updater'])
            ->where('slug', $slug)
            ->where('isDeleted', false)
            ->where('status', 'published') // Only show published items for public view
            ->firstOrFail();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $tourism, 'message' => 'Destinasi wisata berhasil diambil']);
        }

        return Inertia::render('Tourism/Public/Show', [
            'tourism' => $tourism,
        ]);
    }

    /**
     * Show the form for editing the specified tourism resource.
     *
     * @param  string  $slug
     * @return \Inertia\Response
     */
    public function edit(string $slug)
    {
        // This method should typically be protected by middleware (e.g., 'auth')
        $tourism = Tourism::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();
        return Inertia::render('Tourism/Edit', ['tourism' => $tourism]);
    }

    /**
     * Update the specified tourism resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $slug
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, string $slug)
    {
        $tourism = Tourism::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $messages = [
            'name.required' => 'Nama destinasi wisata wajib diisi.',
            'name.string' => 'Nama destinasi wisata harus berupa teks.',
            'name.max' => 'Nama destinasi wisata tidak boleh lebih dari :max karakter.',
            'name.unique' => 'Nama destinasi wisata ini sudah ada.',
            'description.required' => 'Deskripsi destinasi wisata wajib diisi.',
            'description.string' => 'Deskripsi destinasi wisata harus berupa teks.',
            'address.string' => 'Alamat harus berupa teks.',
            'ticketPrice.string' => 'Harga tiket harus berupa teks.',
            'ticketPrice.max' => 'Harga tiket tidak boleh lebih dari :max karakter.',
            'contactInfo.string' => 'Informasi kontak harus berupa teks.',
            'contactInfo.max' => 'Informasi kontak tidak boleh lebih dari :max karakter.',
            'latitude.numeric' => 'Latitude harus berupa angka.',
            'latitude.between' => 'Latitude harus antara :min dan :max.',
            'longitude.numeric' => 'Longitude harus berupa angka.',
            'longitude.between' => 'Longitude harus antara :min dan :max.',
            'socialMedia.json' => 'Social media harus berupa format JSON yang valid.',
            'status.required' => 'Status wajib diisi.',
            'status.in' => 'Status harus salah satu dari: draft, published, atau closed.',
        ];

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
        ], $messages);

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
        return redirect()->route('tourism.showAdmin', $tourism->slug)->with('success', 'Destinasi wisata berhasil diperbarui.');
    }

    /**
     * Remove the specified tourism resource from storage (soft delete).
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $slug
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, string $slug)
    {
        $tourism = Tourism::where('slug', $slug)
            ->where('isDeleted', false)
            ->firstOrFail();

        $tourism->isDeleted = true;
        $tourism->updatedBy = Auth::id();
        $tourism->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Destinasi wisata berhasil dihapus'], 200);
        }
        return redirect()->route('tourism.indexAdmin')->with('success', 'Destinasi wisata berhasil dihapus.');
    }

    /**
     * Display a listing of the archived tourism resources.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response|\Illuminate\Http\JsonResponse
     */
    public function archivedIndex(Request $request)
    {
        // This method should typically be protected by middleware (e.g., 'auth')
        $query = Tourism::with(['photos', 'creator', 'updater'])
            ->where('isDeleted', true)
            ->orderBy('created_at', 'desc'); // Changed from createdAt to created_at for consistency with Laravel conventions

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%")
                  ->orWhere('address', 'like', "%{$searchTerm}%");
            });
        }

        $tourism = $query->paginate(10);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $tourism]);
        }

        return Inertia::render('Tourism/Archived', [
            'tourism' => $tourism,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Restore a soft-deleted tourism resource.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\RedirectResponse
     */
    public function restore(string $slug)
    {
        // This method should typically be protected by middleware (e.g., 'auth')
        $tourism = Tourism::where('slug', $slug)
            ->where('isDeleted', true)
            ->firstOrFail();

        $tourism->isDeleted = false;
        $tourism->updatedBy = Auth::id();
        $tourism->save();

        return redirect()->route('tourism.archivedIndex')->with('success', 'Data destinasi berhasil dipulihkan.');
    }

    /**
     * Permanently delete a tourism resource.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deletePermanent(string $slug)
    {
        // This method should typically be protected by middleware (e.g., 'auth') and authorization
        $tourism = Tourism::where('slug', $slug)
            ->where('isDeleted', true)
            ->firstOrFail();

        $tourism->delete(); // Hard delete from DB

        return redirect()->route('tourism.archivedIndex')->with('success', 'Data destinasi berhasil dihapus permanen.');
    }
}