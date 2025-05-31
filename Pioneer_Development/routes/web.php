<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');


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