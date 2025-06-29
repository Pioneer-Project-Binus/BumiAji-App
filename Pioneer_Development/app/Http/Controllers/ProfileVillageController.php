<?php 

namespace App\Http\Controllers;

use App\Models\ProfileVillage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProfileVillageController extends Controller
{

    public function index(Request $request)
    {
        // Ambil semua profil desa yang tidak dihapus, urut berdasarkan created_at terbaru
        $profileVillages = ProfileVillage::where('isDeleted', false)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $profileVillages,
                'message' => 'Daftar profil desa berhasil diambil.'
            ]);
        }
        
        if (Auth::check()) {
            return Inertia::render('ProfileVillage/Index', [
            'profileVillages' => $profileVillages,
            'filters' => $request->only(['search']),
        ]);
        } else {
            return Inertia::render('ProfileVillage/Public/Index', [
            'profileVillages' => $profileVillages,
            'filters' => $request->only(['search']),
        ]);
        }

        
    }

    public function showOrCreate(Request $request)
    {
        $profileVillage = ProfileVillage::first(); // Ambil profil pertama, asumsi hanya satu

        if ($request->wantsJson()) {
            if ($profileVillage) {
                return response()->json(['success' => true, 'data' => $profileVillage, 'message' => 'Profil desa berhasil diambil.']);
            } else {
                return response()->json(['success' => false, 'data' => null, 'message' => 'Profil desa belum ada.'], 404);
            }
        }
        
        return Inertia::render('ProfileVillage/Edit', [ // Atau 'ProfileVillage/Form'
            'profileVillage' => $profileVillage
        ]);
    }


    // Menyimpan atau memperbarui profil desa
    public function storeOrUpdate(Request $request)
    {
        $profileVillage = ProfileVillage::first();
        $isCreating = !$profileVillage;

        $rules = [
            'name' => 'required|string|max:255',
            'history' => 'nullable|string',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'address' => 'nullable|string',
            'postalCode' => 'nullable|string|max:10',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'socialMedia' => 'nullable|string', // Migrasi menggunakan string, bukan JSON
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json(['success' => false, 'errors' => $validator->errors(), 'message' => 'Validasi gagal'], 422);
            }
            return redirect()->back()->withErrors($validator)->withInput();
        }

        if ($isCreating) {
            $profileVillage = new ProfileVillage();
            $profileVillage->createdBy = Auth::id();
        } else {
            $profileVillage->updatedBy = Auth::id();
        }

        $profileVillage->name = $request->name;
        $profileVillage->history = $request->history;
        $profileVillage->vision = $request->vision;
        $profileVillage->mission = $request->mission;
        $profileVillage->address = $request->address;
        $profileVillage->postalCode = $request->postalCode;
        $profileVillage->phone = $request->phone;
        $profileVillage->email = $request->email;
        $profileVillage->website = $request->website;
        $profileVillage->socialMedia = $request->socialMedia; // Jika ingin JSON, ubah migrasi dan parsing di sini
        $profileVillage->latitude = $request->latitude;
        $profileVillage->longitude = $request->longitude;

        if ($request->hasFile('logo')) {
            // Hapus logo lama jika ada dan sedang update
            if (!$isCreating && $profileVillage->logo && Storage::disk('public')->exists($profileVillage->logo)) {
                Storage::disk('public')->delete($profileVillage->logo);
            }
            $file = $request->file('logo');
            $uniqueName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('village_logos', $uniqueName, 'public');
            $profileVillage->logo = $filePath;
        } elseif ($request->input('removeLogo') && !$isCreating) {
             if ($profileVillage->logo && Storage::disk('public')->exists($profileVillage->logo)) {
                Storage::disk('public')->delete($profileVillage->logo);
            }
            $profileVillage->logo = null;
        }

        $profileVillage->save();
        
        $message = $isCreating ? 'Profil desa berhasil dibuat.' : 'Profil desa berhasil diperbarui.';

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'data' => $profileVillage, 'message' => $message], $isCreating ? 201 : 200);
        }
        return redirect()->route('profile-village.show') // Arahkan ke tampilan profil
                         ->with('success', $message);
    }
    
    /*
    public function destroy(Request $request)
    {
        $profileVillage = ProfileVillage::first();
        if ($profileVillage) {
            if ($profileVillage->logo && Storage::disk('public')->exists($profileVillage->logo)) {
                Storage::disk('public')->delete($profileVillage->logo);
            }
            $profileVillage->delete(); // Hard delete

            if ($request->wantsJson()) {
                return response()->json(['success' => true, 'message' => 'Profil desa berhasil dihapus.'], 200);
            }
            return redirect()->route('dashboard') // Atau halaman lain yang sesuai
                             ->with('success', 'Profil desa berhasil dihapus.');
        }

        if ($request->wantsJson()) {
            return response()->json(['success' => false, 'message' => 'Profil desa tidak ditemukan.'], 404);
        }
        return redirect()->back()->with('error', 'Profil desa tidak ditemukan.');
    }
    */
}