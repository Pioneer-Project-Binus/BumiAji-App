<?php

use App\Http\Controllers\GaleryController;
use Illuminate\Support\Facades\Route;

Route::get('galeri', [GaleryController::class, 'indexPublic'])->name('galeries.indexPublic');
Route::get('galeri/{slug}', [GaleryController::class, 'showPublic'])->name('galeries.showPublic');

Route::middleware('auth')->group(function () {
    Route::get('/galeries', [GaleryController::class, 'indexAdmin'])->name('galeries.indexAdmin');
    Route::get('/galeries/archived', [GaleryController::class, 'archivedIndex'])->name('galeries.archived');
    Route::get('/galeries/create', [GaleryController::class, 'create'])->name('galeries.create');
    Route::post('/galeries', [GaleryController::class, 'store'])->name('galeries.store');
    Route::get('/galeries/{slug}/preview', [GaleryController::class, 'showAdmin'])->name('galeries.showAdmin');
    Route::get('/galeries/{slug}/edit', [GaleryController::class, 'edit'])->name('galeries.edit');
    Route::put('/galeries/{slug}', [GaleryController::class, 'update'])->name('galeries.update');
    Route::delete('/galeries/{slug}', [GaleryController::class, 'destroy'])->name('galeries.destroy');
    Route::put('/galeries/{slug}/restore', [GaleryController::class, 'restore'])->name('galeries.restore');
    Route::delete('/galeries/{slug}/delete-permanent', [GaleryController::class, 'deletePermanent'])->name('galeries.deletePermanent');
});