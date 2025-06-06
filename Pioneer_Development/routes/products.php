<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK UNTUK PRODUK ---
// Menampilkan daftar semua produk (jika ada halaman katalog)
Route::get('produk', [ProductController::class, 'index'])->name('public.products.index'); // Anda perlu method index di ProductController
// Menampilkan detail satu produk berdasarkan slug
Route::get('produk/{slug}', [ProductController::class, 'show'])->name('public.products.show');

// --- RUTE ADMIN UNTUK MANAJEMEN PRODUK ---
Route::middleware('auth')->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('products.index'); // Index Admin
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('products/export', [ProductController::class, 'export'])->name('products.export');
    Route::get('/products/{slug}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{slug}', [ProductController::class, 'update'])->name('products.update');
    Route::post('/products/{slug}/update', [ProductController::class, 'update'])->name('products.update.withfile');
Route::get('/products/view/{slug}', [ProductController::class, 'show'])->name('products.show');
    Route::delete('/products/{slug}', [ProductController::class, 'destroy'])->name('products.destroy');
});