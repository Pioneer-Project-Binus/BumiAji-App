<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// PUBLIC LANDING PAGE
Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('home');

Route::get('/destinasi', function () {
    return Inertia::render('Destination');
})->name('destination');

Route::get('/produk', function () {
    return Inertia::render('Product');
})->name('product');

Route::get('/berita', function () {
    return Inertia::render('Product');
})->name('news');

Route::get('/testimoni', function () {
    return Inertia::render('Testimonial');
})->name('testimonial');

Route::get('/galeri', function () {
    return Inertia::render('Gallery');
})->name('gallery');
// END PUBLIC LANDING PAGE

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

});

require __DIR__.'/auth.php'; 
require __DIR__.'/products.php';
require __DIR__.'/categoryArticles.php';
require __DIR__.'/articles.php';
require __DIR__.'/photoProducts.php';
require __DIR__.'/tourism.php';
require __DIR__.'/tourismPhoto.php';
require __DIR__.'/profileVillage.php';
require __DIR__.'/albums.php';
require __DIR__.'/testimonials.php';
require __DIR__.'/galeries.php';
require __DIR__.'/contact.php';
require __DIR__.'/settings.php';