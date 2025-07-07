<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK UNTUK ARTIKEL ---
// Menampilkan daftar semua artikel yang dipublikasikan
Route::get('artikel', [ArticleController::class, 'indexPublic'])->name('public.articles.indexPublic');
Route::get('artikel/landing', [ArticleController::class, 'landing'])->name('public.articles.landing');
Route::get('artikel/{slug}', [ArticleController::class, 'show'])->name('public.articles.show');

// --- RUTE ADMIN UNTUK MANAJEMEN ARTIKEL ---
Route::middleware('auth')->group(function () {
    Route::get('articles', [ArticleController::class, 'indexAdmin'])->name('articles.indexAdmin'); 
    Route::get('articles/create', [ArticleController::class, 'create'])->name('articles.create');
    Route::get('articles/archived', [ArticleController::class, 'archivedIndex'])->name('articles.archived');
    Route::post('articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::get('articles/{slug}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
    Route::get('articles/{slug}', [ArticleController::class, 'show'])->name('articles.show');
    Route::put('articles/{slug}', [ArticleController::class, 'update'])->name('articles.update'); 
    Route::post('articles/{slug}/update', [ArticleController::class, 'update'])->name('articles.update.withfile'); 
    Route::delete('articles/{slug}', [ArticleController::class, 'destroy'])->name('articles.destroy');
    Route::post('articles/{slug}/restore', [ArticleController::class, 'restore'])->name('articles.restore');
    Route::delete('articles/{slug}/permanent-delete', [ArticleController::class, 'deletePermanent'])->name('articles.deletePermanent');
});