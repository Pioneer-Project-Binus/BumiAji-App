<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK UNTUK ARTIKEL ---
// Menampilkan daftar semua artikel yang dipublikasikan
Route::get('artikel', [ArticleController::class, 'index'])->name('public.articles.index');
// Menampilkan detail satu artikel berdasarkan slug
Route::get('artikel/{slug}', [ArticleController::class, 'show'])->name('public.articles.show');

// --- RUTE ADMIN UNTUK MANAJEMEN ARTIKEL ---
Route::middleware('auth')->group(function () {
    // Index admin mungkin memiliki filter/tampilan berbeda, atau bisa menggunakan method yang sama jika controllernya fleksibel
    Route::get('articles', [ArticleController::class, 'index'])->name('articles.index'); // Jika ingin index admin khusus
    Route::get('articles/create', [ArticleController::class, 'create'])->name('articles.create');
    Route::post('articles', [ArticleController::class, 'store'])->name('articles.store');
    // Admin mungkin tidak perlu 'show' terpisah jika sudah ada di publik, atau ini untuk preview draft.
    // Route::get('articles/{slug}', [ArticleController::class, 'show'])->name('articles.show');
    Route::get('articles/{slug}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
    Route::put('articles/{slug}', [ArticleController::class, 'update'])->name('articles.update'); // Inertia handle method spoofing
    Route::post('articles/{slug}/update', [ArticleController::class, 'update'])->name('articles.update.withfile'); // Jika perlu explicit POST untuk file
    Route::delete('articles/{slug}', [ArticleController::class, 'destroy'])->name('articles.destroy');
});
