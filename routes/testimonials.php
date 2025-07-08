<?php

use App\Http\Controllers\TestimonialController;
use Illuminate\Support\Facades\Route;

// --- RUTE PUBLIK UNTUK MENAMPILKAN TESTIMONI ---
// Menampilkan daftar semua testimoni yang aktif
Route::get('testimoni', [TestimonialController::class, 'index'])->name('public.testimonials.index');
// Menampilkan detail satu testimoni berdasarkan slug (opsional, jika ada halaman detail testimoni)
Route::get('testimoni/{slug}', [TestimonialController::class, 'show'])->name('public.testimonials.show');


// --- RUTE ADMIN UNTUK MANAJEMEN TESTIMONI ---
Route::middleware('auth')->group(function () {
    // Index admin bisa jadi sama dengan index publik atau memiliki lebih banyak info/aksi
    Route::get('testimonials', [TestimonialController::class, 'index'])->name('testimonials.index');
    Route::get('testimonials/create', [TestimonialController::class, 'create'])->name('testimonials.create');
    Route::post('testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
    
    // Menggunakan {slug} sebagai parameter rute
    Route::get('testimonials/{slug}', [TestimonialController::class, 'show'])->name('testimonials.show'); // Show detail untuk admin
    Route::get('testimonials/{slug}/edit', [TestimonialController::class, 'edit'])->name('testimonials.edit');
    Route::post('testimonials/{slug}', [TestimonialController::class, 'update'])->name('testimonials.update'); // Menggunakan POST karena bisa ada file (photo) & method spoofing
    Route::delete('testimonials/{slug}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');
});