<?php

use App\Http\Controllers\PhotoProductController;
use Illuminate\Support\Facades\Route;

Route::get('foto-produk/{slug}', [PhotoProductController::class, 'show'])->name('public.photo-products.show');


// --- RUTE ADMIN UNTUK MANAJEMEN FOTO PRODUK ---
Route::middleware('auth')->group(function () {
    // Index bisa untuk semua foto atau difilter berdasarkan produk_id (dikirim via query string)
    Route::get('photo-products', [PhotoProductController::class, 'index'])->name('photo-products.index');
    // Saat create, Anda mungkin ingin mengirimkan product_id atau product_slug sebagai query parameter
    Route::get('photo-products/create', [PhotoProductController::class, 'create'])->name('photo-products.create');
    Route::post('photo-products', [PhotoProductController::class, 'store'])->name('photo-products.store');
    Route::get('photo-products/archived', [PhotoProductController::class, 'archived'])->name('photo-products.archived');
    
    // Menggunakan {slug} sebagai parameter rute untuk foto produk
    Route::get('photo-products/{slug}', [PhotoProductController::class, 'show'])->name('photo-products.show'); // Untuk preview admin
    Route::get('photo-products/{slug}/edit', [PhotoProductController::class, 'edit'])->name('photo-products.edit');
    Route::post('photo-products/{slug}', [PhotoProductController::class, 'update'])->name('photo-products.update'); // POST untuk file & method spoofing
    Route::delete('photo-products/{slug}', [PhotoProductController::class, 'destroy'])->name('photo-products.destroy');
    Route::put('photo-products/{slug}/restore', [PhotoProductController::class, 'restore'])->name('photo-products.restore');
    Route::delete('photo-products/{slug}/delete-permanent', [PhotoProductController::class, 'deletePermanent'])->name('photo-products.deletePermanent');
});