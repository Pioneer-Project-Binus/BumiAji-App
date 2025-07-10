<?php

use App\Http\Controllers\TourismController;
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK UNTUK DESTINASI WISATA ---
Route::get('destinasi-wisata', [TourismController::class, 'indexPublic'])->name('tourism.indexPublic');
Route::get('destinasi-wisata/{slug}', [TourismController::class, 'showPublic'])->name('tourism.showPublic');

// --- RUTE ADMIN UNTUK MANAJEMEN DESTINASI WISATA ---
Route::middleware('auth')->group(function () {
    Route::get('/tourism', [TourismController::class, 'indexAdmin'])->name('tourism.indexAdmin');
    Route::get('/tourism/create', [TourismController::class, 'create'])->name('tourism.create');
    Route::post('/tourism', [TourismController::class, 'store'])->name('tourism.store');
    Route::get('/tourism/archived', [TourismController::class, 'archivedIndex'])->name('tourism.archived');
    Route::put('/tourism/{slug}/restore', [TourismController::class, 'restore'])->name('tourism.restore');
    Route::delete('/tourism/{slug}/delete-permanent', [TourismController::class, 'deletePermanent'])->name('tourism.deletePermanent');
    Route::get('/tourism/{slug}/edit', [TourismController::class, 'edit'])->name('tourism.edit');
    Route::put('/tourism/{slug}', [TourismController::class, 'update'])->name('tourism.update');
    Route::delete('/tourism/{slug}', [TourismController::class, 'destroy'])->name('tourism.destroy');
    Route::get('/tourism/{slug}', [TourismController::class, 'showAdmin'])->name('tourism.showAdmin');
});