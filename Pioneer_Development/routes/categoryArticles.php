<?php

use App\Http\Controllers\CategoryArticleController;
use Illuminate\Support\Facades\Route;

// Public
Route::get('/kategori-artikel', [CategoryArticleController::class, 'indexPublic'])->name('public.category-articles.index');

// Admin (require auth)
Route::middleware(['auth'])->group(function () {
    Route::get('/category-articles', [CategoryArticleController::class, 'indexAdmin'])->name('category-articles.admin');
    Route::get('/category-articles/create', [CategoryArticleController::class, 'create'])->name('category-articles.create');
    Route::post('/category-articles', [CategoryArticleController::class, 'store'])->name('category-articles.store');
    Route::get('/category-articles/{slug}/edit', [CategoryArticleController::class, 'edit'])->name('category-articles.edit');
    Route::put('/category-articles/{slug}', [CategoryArticleController::class, 'update'])->name('category-articles.update');
    Route::delete('/category-articles/{slug}', [CategoryArticleController::class, 'destroy'])->name('category-articles.destroy');
});
