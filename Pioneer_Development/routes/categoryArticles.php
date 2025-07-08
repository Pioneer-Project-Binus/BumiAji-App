<?php

use App\Http\Controllers\CategoryArticleController;
use Illuminate\Support\Facades\Route;

// Public
Route::get('/kategori-artikel', [CategoryArticleController::class, 'indexPublic'])->name('category-articles.indexPublic');
Route::get('/kategori-artikel/{slug}', [CategoryArticleController::class, 'showPublic'])->name('category-articles.showPublic');

// Admin (require auth)
Route::middleware(['auth'])->group(function () {
    Route::get('/category-articles', [CategoryArticleController::class, 'indexAdmin'])->name('category-articles.indexAdmin');
    Route::get('/category-articles/archived', [CategoryArticleController::class, 'archivedIndex'])->name('category-articles.archived');
    Route::get('/category-articles/create', [CategoryArticleController::class, 'create'])->name('category-articles.create');
    Route::post('/category-articles', [CategoryArticleController::class, 'store'])->name('category-articles.store');
    Route::get('/category-articles/{slug}', [CategoryArticleController::class, 'showAdmin'])->name('category-articles.showAdmin');
    Route::get('/category-articles/{slug}/edit', [CategoryArticleController::class, 'edit'])->name('category-articles.edit');
    Route::put('/category-articles/{slug}', [CategoryArticleController::class, 'update'])->name('category-articles.update');
    Route::delete('/category-articles/{slug}', [CategoryArticleController::class, 'destroy'])->name('category-articles.destroy');
    Route::put('/category-articles/{slug}/restore', [CategoryArticleController::class, 'restore'])->name('category-articles.restore');
    Route::delete('/category-articles/{slug}/delete-permanent', [CategoryArticleController::class, 'deletePermanent'])->name('category-articles.deletePermanent');
});
