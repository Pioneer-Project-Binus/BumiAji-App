<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK UNTUK PRODUK ---
// Menampilkan daftar semua produk (jika ada halaman katalog)
Route::get('produk', [ProductController::class, 'indexPublic'])->name('products.indexPublic'); 
Route::get('produk/{slug}', [ProductController::class, 'showPublic'])->name('products.showPublic');

// --- RUTE ADMIN UNTUK MANAJEMEN PRODUK ---
Route::middleware('auth')->group(function () {
    Route::get('/products', [ProductController::class, 'indexAdmin'])->name('products.indexAdmin');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('products/export', [ProductController::class, 'export'])->name('products.export');
    Route::get('/products/archived', [ProductController::class, 'archived'])->name('products.archived');
    Route::put('/products/{slug}/restore', [ProductController::class, 'restore'])->name('products.restore');
    Route::delete('/products/{slug}/delete-permanent', [ProductController::class, 'deletePermanent'])->name('products.deletePermanent');
    Route::get('/products/{slug}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{slug}', [ProductController::class, 'update'])->name('products.update');
    Route::post('/products/{slug}/update', [ProductController::class, 'update'])->name('products.update.withfile');
Route::get('/products/view/{slug}', [ProductController::class, 'showAdmin'])->name('products.showAdmin');
    Route::delete('/products/{slug}', [ProductController::class, 'destroy'])->name('products.destroy');
});