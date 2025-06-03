<?php

use App\Http\Controllers\GaleryController; // Pastikan nama controller ini benar
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK UNTUK MELIHAT ITEM GALERI ---
// Item galeri individual mungkin lebih sering ditampilkan dalam konteks halaman detail album.
// Namun, jika Anda ingin URL langsung ke item galeri berdasarkan slug-nya:
Route::get('galeri/{slug}', [GaleryController::class, 'show'])->name('public.galeries.show');
// Rute untuk menampilkan semua item galeri (mungkin dengan filter) bisa juga publik
// Route::get('galeri', [GaleryController::class, 'index'])->name('public.galeries.index'); // Sesuaikan jika perlu


// --- RUTE ADMIN UNTUK MANAJEMEN ITEM GALERI ---
Route::middleware('auth')->group(function () {
    Route::get('galeries', [GaleryController::class, 'index'])->name('galeries.index');
    Route::get('galeries/create', [GaleryController::class, 'create'])->name('galeries.create');
    Route::post('galeries', [GaleryController::class, 'store'])->name('galeries.store');
    
    // Menggunakan {slug} sebagai parameter rute
    Route::get('galeries/{slug}/preview', [GaleryController::class, 'show'])->name('galeries.show'); // Admin preview
    Route::get('galeries/{slug}/edit', [GaleryController::class, 'edit'])->name('galeries.edit');
    Route::post('galeries/{slug}', [GaleryController::class, 'update'])->name('galeries.update'); // POST untuk file & method spoofing
    Route::delete('galeries/{slug}', [GaleryController::class, 'destroy'])->name('galeries.destroy');
});