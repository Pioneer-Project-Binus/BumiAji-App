<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia; // Jika form kontak publiknya halaman Inertia

// --- RUTE PUBLIK UNTUK FORM KONTAK ---
Route::get('hubungi-kami', function () {
    return Inertia::render('Contact/Index'); // Asumsi form kontak Anda adalah halaman Inertia 'Contact/Index.tsx' atau 'ContactUs.tsx'
})->name('public.contact.form');
Route::post('hubungi-kami', [ContactController::class, 'store'])->name('public.contact.store');


// --- RUTE ADMIN UNTUK MELIHAT PESAN KONTAK ---
Route::middleware('auth')->group(function () {
    Route::get('contacts', [ContactController::class, 'index'])->name('contacts.index');
    Route::get('contacts-archived', [ContactController::class, 'archivedIndex'])->name('contacts.archived');
    Route::get('contacts/{id}', [ContactController::class, 'show'])->name('contacts.show');
    Route::delete('contacts/{id}', [ContactController::class, 'destroy'])->name('contacts.destroy');
    Route::put('contacts/{slug}/restore', [ContactController::class, 'restore'])->name('contacts.restore');
    Route::delete('contacts/{slug}/delete-permanent', [ContactController::class, 'deletePermanent'])->name('contacts.deletePermanent');
});