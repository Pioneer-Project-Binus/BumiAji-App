<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

Route::get('artikel/landing', [ArticleController::class, 'landing'])->name('articles.landing');
Route::get('artikel', [ArticleController::class, 'indexPublic'])->name('articles.indexPublic');
Route::get('artikel/{slug}', [ArticleController::class, 'showPublic'])->name('articles.showPublic');
Route::middleware(['auth', 'verified'])->prefix('articles')->name('articles.')->group(function () {
    Route::get('/', [ArticleController::class, 'indexAdmin'])->name('indexAdmin');
    Route::get('/create', [ArticleController::class, 'create'])->name('create');
    Route::post('/', [ArticleController::class, 'store'])->name('store');
    Route::get('/archived', [ArticleController::class, 'archivedIndex'])->name('archived');
    Route::get('/{slug}', [ArticleController::class, 'showAdmin'])->name('showAdmin');
    Route::get('/{slug}/edit', [ArticleController::class, 'edit'])->name('edit');
    Route::put('/{slug}', [ArticleController::class, 'update'])->name('update');
    Route::post('/{slug}/update', [ArticleController::class, 'update'])->name('update.withfile');
    Route::delete('/{slug}', [ArticleController::class, 'destroy'])->name('destroy');
    Route::post('/{slug}/restore', [ArticleController::class, 'restore'])->name('restore');
    Route::delete('/{slug}/permanent-delete', [ArticleController::class, 'deletePermanent'])->name('deletePermanent');
});

