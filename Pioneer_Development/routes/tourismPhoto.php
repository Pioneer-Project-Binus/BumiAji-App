<?php

use App\Http\Controllers\TourismPhotoController;
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK (JIKA ADA UNTUK FOTO WISATA INDIVIDUAL) ---
// Biasanya foto wisata ditampilkan di halaman detail destinasi induknya.
Route::get('foto-wisata/{slug}', [TourismPhotoController::class, 'show'])->name('public.tourism-photos.show');


// --- RUTE ADMIN UNTUK MANAJEMEN FOTO WISATA ---
Route::middleware('auth')->group(function () {
    // Index bisa untuk semua foto atau difilter berdasarkan destination_id (dikirim via query string)
    Route::get('tourism-photos', [TourismPhotoController::class, 'index'])->name('tourism-photos.index');
    // Saat create, Anda mungkin ingin mengirimkan destination_id atau destination_slug sebagai query parameter
    Route::get('tourism-photos/create', [TourismPhotoController::class, 'create'])->name('tourism-photos.create');
    Route::post('tourism-photos', [TourismPhotoController::class, 'store'])->name('tourism-photos.store');
    // Halaman arsip
    Route::get('tourism-photos/archived', [TourismPhotoController::class, 'archivedIndex'])->name('tourism-photos.archived');

    // Restore dari arsip
    Route::put('tourism-photos/{slug}/restore', [TourismPhotoController::class, 'restore'])->name('tourism-photos.restore');

    // Hapus permanen dari arsip
    Route::delete('tourism-photos/{slug}/delete-permanent', [TourismPhotoController::class, 'deletePermanent'])->name('tourism-photos.deletePermanent');

        
    // Menggunakan {slug} sebagai parameter rute untuk foto wisata
    Route::get('tourism-photos/{slug}', [TourismPhotoController::class, 'show'])->name('tourism-photos.show'); // Untuk preview admin
    Route::get('tourism-photos/{slug}/edit', [TourismPhotoController::class, 'edit'])->name('tourism-photos.edit');
    Route::post('tourism-photos/{slug}', [TourismPhotoController::class, 'update'])->name('tourism-photos.update'); // POST untuk file & method spoofing
    Route::delete('tourism-photos/{slug}', [TourismPhotoController::class, 'destroy'])->name('tourism-photos.destroy');
});