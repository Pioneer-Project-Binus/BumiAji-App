<?php

use App\Http\Controllers\TourismPhotoController;
use Illuminate\Support\Facades\Route;

Route::get('foto-wisata/{slug}', [TourismPhotoController::class, 'show'])->name('public.tourism-photos.show');


// --- RUTE ADMIN UNTUK MANAJEMEN FOTO WISATA ---
Route::middleware('auth')->group(function () {
    Route::get('tourism-photos', [TourismPhotoController::class, 'index'])->name('tourism-photos.index');
    Route::get('tourism-photos/create', [TourismPhotoController::class, 'create'])->name('tourism-photos.create');
    Route::post('tourism-photos', [TourismPhotoController::class, 'store'])->name('tourism-photos.store');
    Route::get('tourism-photos/archived', [TourismPhotoController::class, 'archivedIndex'])->name('tourism-photos.archived');
    Route::put('tourism-photos/{slug}/restore', [TourismPhotoController::class, 'restore'])->name('tourism-photos.restore');
    Route::delete('tourism-photos/{slug}/delete-permanent', [TourismPhotoController::class, 'deletePermanent'])->name('tourism-photos.deletePermanent');
    Route::get('tourism-photos/{slug}', [TourismPhotoController::class, 'show'])->name('tourism-photos.show');
    Route::get('tourism-photos/{slug}/edit', [TourismPhotoController::class, 'edit'])->name('tourism-photos.edit');
    Route::post('tourism-photos/{slug}', [TourismPhotoController::class, 'update'])->name('tourism-photos.update');
    Route::delete('tourism-photos/{slug}', [TourismPhotoController::class, 'destroy'])->name('tourism-photos.destroy');
});