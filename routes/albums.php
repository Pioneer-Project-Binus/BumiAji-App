<?php

use App\Http\Controllers\AlbumController;
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK UNTUK ALBUM ---
Route::get('album-galeri', [AlbumController::class, 'index'])->name('public.albums.index');
Route::get('album-galeri/{slug}', [AlbumController::class, 'show'])->name('public.albums.show'); // Akan menampilkan detail album beserta galerinya

// --- RUTE ADMIN UNTUK MANAJEMEN ALBUM ---
Route::middleware('auth')->group(function () {
    // Route::get('albums', [AlbumController::class, 'index'])->name('albums.index'); // Index Admin
    Route::get('albums/create', [AlbumController::class, 'create'])->name('albums.create');
    Route::post('albums', [AlbumController::class, 'store'])->name('albums.store');
    Route::get('albums/{slug}/edit', [AlbumController::class, 'edit'])->name('albums.edit');
    Route::post('albums/{slug}', [AlbumController::class, 'update'])->name('albums.update'); // Menggunakan POST karena bisa ada file (coverImage)
    Route::delete('albums/{slug}', [AlbumController::class, 'destroy'])->name('albums.destroy');
});