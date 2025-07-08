<?php

use App\Http\Controllers\TourismController;
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK UNTUK DESTINASI WISATA ---
Route::get('destinasi-wisata', [TourismController::class, 'index'])->name('public.tourisms.index');
Route::get('destinasi-wisata/{slug}', [TourismController::class, 'show'])->name('public.tourisms.show');

// --- RUTE ADMIN UNTUK MANAJEMEN DESTINASI WISATA ---
Route::middleware('auth')->group(function () {
    // Route::get('tourisms', [TourismController::class, 'index'])->name('tourisms.index'); // Index Admin
    Route::get('tourisms/create', [TourismController::class, 'create'])->name('tourisms.create');
    Route::post('tourisms', [TourismController::class, 'store'])->name('tourisms.store');
    Route::get('tourisms/{slug}/edit', [TourismController::class, 'edit'])->name('tourisms.edit');
    Route::put('tourisms/{slug}', [TourismController::class, 'update'])->name('tourisms.update');
    Route::delete('tourisms/{slug}', [TourismController::class, 'destroy'])->name('tourisms.destroy');
});