<?php

use App\Http\Controllers\CategoryProductController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/category-products', [CategoryProductController::class, 'index'])->name('category-products.index');
    Route::get('/category-products/create', [CategoryProductController::class, 'create'])->name('category-products.create');
    Route::post('/category-products', [CategoryProductController::class, 'store'])->name('category-products.store');
    Route::get('/category-products/{slug}', [CategoryProductController::class, 'show'])->name('category-products.show'); // Diubah ke {slug}
    Route::get('/category-products/{slug}/edit', [CategoryProductController::class, 'edit'])->name('category-products.edit'); // Diubah ke {slug}
    Route::put('/category-products/{slug}', [CategoryProductController::class, 'update'])->name('category-products.update'); // Diubah ke {slug}
    Route::delete('/category-products/{slug}', [CategoryProductController::class, 'destroy'])->name('category-products.destroy'); // Diubah ke {slug}
});
