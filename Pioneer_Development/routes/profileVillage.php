<?php

use App\Http\Controllers\ProfileVillageController;
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK UNTUK MENAMPILKAN PROFIL DESA ---
Route::get('profil-desa', [ProfileVillageController::class, 'showOrCreate'])->name('public.profile-village.show'); 
// Method showOrCreate akan menampilkan data jika ada, atau halaman "belum ada data" jika form editnya ada di admin.
// Atau buat method khusus `publicShow` di controller jika `showOrCreate` lebih ditujukan untuk admin membuat data pertama kali.

// --- RUTE ADMIN UNTUK MANAJEMEN PROFIL DESA ---
Route::middleware('auth')->group(function () {
    Route::get('profile-village/edit', [ProfileVillageController::class, 'showOrCreate'])->name('profile-village.edit'); // Halaman untuk mengedit/membuat
    Route::post('profile-village', [ProfileVillageController::class, 'storeOrUpdate'])->name('profile-village.storeOrUpdate');
    // Route::delete('profile-village', [ProfileVillageController::class, 'destroy'])->name('profile-village.destroy'); // Jika ada fitur hapus
});