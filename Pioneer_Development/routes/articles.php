<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK UNTUK ARTIKEL ---
// Menampilkan daftar semua artikel yang dipublikasikan
Route::get('artikel', [ArticleController::class, 'indexPublic'])->name('articles.indexPublic');
Route::get('artikel/landing', [ArticleController::class, 'landing'])->name('articles.landing');
Route::get('artikel/{slug}', [ArticleController::class, 'showPublic'])->name('articles.showPublic');

// --- RUTE ADMIN UNTUK MANAJEMEN ARTIKEL ---
Route::middleware('auth')->group(function () {
    Route::get('articles', [ArticleController::class, 'indexAdmin'])->name('articles.indexAdmin'); 
    Route::get('articles/create', [ArticleController::class, 'create'])->name('articles.create');
    Route::post('articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::get('articles/{slug}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
    Route::get('articles/{slug}', [ArticleController::class, 'showAdmin'])->name('articles.showAdmin');
    Route::put('articles/{slug}', [ArticleController::class, 'update'])->name('articles.update'); 
    Route::post('articles/{slug}/update', [ArticleController::class, 'update'])->name('articles.update.withfile'); 
    Route::delete('articles/{slug}', [ArticleController::class, 'destroy'])->name('articles.destroy');
});