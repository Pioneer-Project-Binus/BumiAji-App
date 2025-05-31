<?php

use App\Http\Controllers\CategoryArticleController;
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK UNTUK KATEGORI ARTIKEL ---
// Menampilkan daftar semua kategori artikel
Route::get('kategori-artikel', [CategoryArticleController::class, 'index'])->name('public.category-articles.index');
// Menampilkan detail satu kategori artikel berdasarkan slug (mungkin menampilkan daftar artikel dalam kategori tsb)
Route::get('kategori-artikel/{slug}', [CategoryArticleController::class, 'show'])->name('public.category-articles.show');

// --- RUTE ADMIN UNTUK MANAJEMEN KATEGORI ARTIKEL ---
Route::middleware('auth')->group(function () {
    // Route::get('category-articles', [CategoryArticleController::class, 'index'])->name('category-articles.index'); // Index Admin
    Route::get('category-articles/create', [CategoryArticleController::class, 'create'])->name('category-articles.create');
    Route::post('category-articles', [CategoryArticleController::class, 'store'])->name('category-articles.store');
    Route::get('category-articles/{slug}/edit', [CategoryArticleController::class, 'edit'])->name('category-articles.edit');
    Route::put('category-articles/{slug}', [CategoryArticleController::class, 'update'])->name('category-articles.update');
    Route::delete('category-articles/{slug}', [CategoryArticleController::class, 'destroy'])->name('category-articles.destroy');
});