<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/test-carousel', function () {
    return Inertia::render('TestCarousel', [
        'products' => [
            [
                'name' => 'Produk A',
                'description' => 'Deskripsi A',
                'price' => 100000,
                'image' => '/images/sample1.jpg', // pastikan file ada
            ],
            [
                'name' => 'Produk B',
                'description' => 'Deskripsi B',
                'price' => 120000,
                'image' => '/images/sample2.jpg',
            ],
            [
                'name' => 'Produk C',
                'description' => 'Deskripsi C',
                'price' => 90000,
                'image' => '/images/sample3.jpg',
            ],
                        [
                'name' => 'Produk C',
                'description' => 'Deskripsi C',
                'price' => 90000,
                'image' => '/images/sample3.jpg',
            ],
                        [
                'name' => 'Produk C',
                'description' => 'Deskripsi C',
                'price' => 90000,
                'image' => '/images/sample3.jpg',
            ],
        ],
    ]);
});

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/auth.php';
require __DIR__.'/categoryProducts.php';
require __DIR__.'/products.php';
require __DIR__.'/photoProducts.php';
require __DIR__.'/categoryArticles.php';
require __DIR__.'/articles.php';
require __DIR__.'/tourism.php';
require __DIR__.'/tourismPhoto.php';
require __DIR__.'/profileVillage.php';
require __DIR__.'/albums.php';
require __DIR__.'/testimonials.php';
require __DIR__.'/galeries.php';
require __DIR__.'/contact.php';
require __DIR__.'/settings.php';
