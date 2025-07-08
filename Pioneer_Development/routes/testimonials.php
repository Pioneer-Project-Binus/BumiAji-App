<?php

use App\Http\Controllers\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::get('testimoni', [TestimonialController::class, 'indexPublic'])->name('testimonials.indexPublic');
Route::get('testimoni/{slug}', [TestimonialController::class, 'showPublic'])->name('testimonials.showPublic');

// RUTE ADMIN
Route::middleware('auth')->group(function () {
    Route::get('testimonials', [TestimonialController::class, 'indexAdmin'])->name('testimonials.indexAdmin');
    Route::get('testimonials/create', [TestimonialController::class, 'create'])->name('testimonials.create');
    Route::post('testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
    Route::get('testimonials/archived', [TestimonialController::class, 'archivedIndex'])->name('testimonials.archived');
    Route::put('testimonials/{slug}/restore', [TestimonialController::class, 'restore'])->name('testimonials.restore');
    Route::delete('testimonials/{slug}/delete-permanent', [TestimonialController::class, 'deletePermanent'])->name('testimonials.deletePermanent');
    Route::get('testimonials/{slug}', [TestimonialController::class, 'showAdmin'])->name('testimonials.showAdmin');
    Route::get('testimonials/{slug}/edit', [TestimonialController::class, 'edit'])->name('testimonials.edit');
    Route::post('testimonials/{slug}', [TestimonialController::class, 'update'])->name('testimonials.update');
    Route::delete('testimonials/{slug}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');
});