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
    // Biasanya hanya ada satu profil desa, jadi index mungkin tidak umum,
    // lebih ke arah menampilkan atau mengedit satu-satunya entri.
    // Jika Anda berencana memiliki banyak profil (misalnya untuk sub-desa), maka index relevan.
    // Untuk contoh ini, kita asumsikan hanya ada satu profil yang bisa diedit.
    
    // Menampilkan profil desa (jika ada) atau form create/edit
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

        $messages = [
            'name.required' => 'Nama desa wajib diisi.',
            'name.string' => 'Nama desa harus berupa teks.',
            'name.max' => 'Nama desa maksimal 255 karakter.',

            'history.string' => 'Sejarah harus berupa teks.',

            'vision.string' => 'Visi harus berupa teks.',
            'mission.string' => 'Misi harus berupa teks.',

            'logo.image' => 'Logo harus berupa file gambar.',
            'logo.mimes' => 'Logo harus berformat: jpeg, png, jpg, gif, svg, atau webp.',
            'logo.max' => 'Logo maksimal berukuran 2MB.',

            'address.string' => 'Alamat harus berupa teks.',

            'postalCode.string' => 'Kode pos harus berupa teks.',
            'postalCode.max' => 'Kode pos maksimal 10 karakter.',

            'phone.string' => 'Nomor telepon harus berupa teks.',
            'phone.max' => 'Nomor telepon maksimal 20 karakter.',

            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email maksimal 255 karakter.',

            'website.url' => 'Format website harus berupa URL yang valid.',
            'website.max' => 'URL website maksimal 255 karakter.',

            'socialMedia.string' => 'Media sosial harus berupa teks.',

            'latitude.numeric' => 'Latitude harus berupa angka.',
            'latitude.between' => 'Latitude harus antara -90 hingga 90.',

            'longitude.numeric' => 'Longitude harus berupa angka.',
            'longitude.between' => 'Longitude harus antara -180 hingga 180.',
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
    
    // Tidak ada 'destroy' karena migrasi ProfileVillage tidak memiliki 'isDeleted'
    // Jika ingin ada, tambahkan 'isDeleted' dan metode destroy.
    // Jika profil desa dimaksudkan untuk dihapus secara permanen:
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