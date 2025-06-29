<?php

use App\Http\Controllers\TourismController;
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK UNTUK DESTINASI WISATA ---
Route::get('destinasi-wisata', [TourismController::class, 'index'])->name('public.tourism.index');
Route::get('destinasi-wisata/{slug}', [TourismController::class, 'show'])->name('public.tourism.show');

// --- RUTE ADMIN UNTUK MANAJEMEN DESTINASI WISATA ---
Route::middleware('auth')->group(function () {
    Route::get('/tourism', [TourismController::class, 'index'])->name('tourism.index'); // Index Admin
    Route::get('/tourism/create', [TourismController::class, 'create'])->name('tourism.create');
    Route::post('/tourism', [TourismController::class, 'store'])->name('tourism.store');
    Route::get('/tourism/{slug}/edit', [TourismController::class, 'edit'])->name('tourism.edit');
    Route::put('/tourism/{slug}', [TourismController::class, 'update'])->name('tourism.update');
    Route::delete('/tourism/{slug}', [TourismController::class, 'destroy'])->name('tourism.destroy');
    Route::get('/tourism/{slug}', [TourismController::class, 'show'])->name('tourism.show');
});
