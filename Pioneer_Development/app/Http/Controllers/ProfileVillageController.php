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

    public function indexPublic(Request $request)
    {
        $profileVillages = ProfileVillage::where('isDeleted', false)
            ->orderBy('created_at', 'desc');

        return Inertia::render('ProfileVillage/Public/Index', [
            'profileVillages' => $profileVillages,
        ]);
    }

    public function indexAdmin(Request $request)
    {
        $profileVillages = ProfileVillage::where('isDeleted', false)
            ->orderBy('created_at', 'desc');

        return Inertia::render('ProfileVillage/Index', [
            'profileVillages' => $profileVillages,
            'filters' => $request->only(['search']),
        ]);
    }


    public function showOrCreate(Request $request)
    {
        $profileVillage = ProfileVillage::first(); 

        if ($request->wantsJson()) {
            if ($profileVillage) {
                return response()->json(['success' => true, 'data' => $profileVillage, 'message' => 'Profil desa berhasil diambil.']);
            } else {
                return response()->json(['success' => false, 'data' => null, 'message' => 'Profil desa belum ada.'], 404);
            }
        }
        
        return Inertia::render('ProfileVillage/Edit', [
            'profileVillage' => $profileVillage
        ]);
    }

    public function storeOrUpdate(Request $request)
    {
        $profileVillage = ProfileVillage::first();
        $isCreating = !$profileVillage;

        $rules = [
            'name' => 'required|string|max:255',
            'history' => 'nullable|string',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'address' => 'nullable|string',
            'postalCode' => 'nullable|string|max:10',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'socialMedia' => 'nullable|string', 
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ];

        $messages = [
            'name.required' => 'Nama desa wajib diisi.',
            'name.string' => 'Nama desa harus berupa teks.',
            'name.max' => 'Nama desa tidak boleh lebih dari 255 karakter.',

            'history.string' => 'Sejarah desa harus berupa teks.',

            'vision.string' => 'Visi desa harus berupa teks.',

            'mission.string' => 'Misi desa harus berupa teks.',

            'logo.image' => 'Logo harus berupa file gambar.',
            'logo.mimes' => 'Logo harus dalam format: jpeg, png, jpg, gif, svg, atau webp.',
            'logo.max' => 'Ukuran file logo maksimal 2MB.',
            'logo.required' => 'Logo wajib diisi.',

            'address.string' => 'Alamat harus berupa teks.',

            'postalCode.string' => 'Kode pos harus berupa teks.',
            'postalCode.max' => 'Kode pos tidak boleh lebih dari 10 karakter.',

            'phone.string' => 'Nomor telepon harus berupa teks.',
            'phone.max' => 'Nomor telepon tidak boleh lebih dari 20 karakter.',

            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email tidak boleh lebih dari 255 karakter.',

            'website.url' => 'Format URL website tidak valid.',
            'website.max' => 'URL website tidak boleh lebih dari 255 karakter.',

            'socialMedia.string' => 'Link media sosial harus berupa teks.',

            'latitude.numeric' => 'Latitude harus berupa angka.',
            'latitude.between' => 'Latitude harus berada di antara -90 hingga 90.',

            'longitude.numeric' => 'Longitude harus berupa angka.',
            'longitude.between' => 'Longitude harus berada di antara -180 hingga 180.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

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
        $profileVillage->socialMedia = $request->socialMedia;
        $profileVillage->latitude = $request->latitude;
        $profileVillage->longitude = $request->longitude;

        if ($request->hasFile('logo')) {
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
}