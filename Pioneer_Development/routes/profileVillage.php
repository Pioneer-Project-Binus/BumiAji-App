<?php

use App\Http\Controllers\ProfileVillageController;
use Illuminate\Support\Facades\Route;

Route::get('profil-desa', [ProfileVillageController::class, 'indexPublic'])->name('profile-village.indexPublic'); 

Route::middleware('auth')->group(function () {
    Route::get('profile-village', [ProfileVillageController::class, 'indexAdmin'])->name('profile-village.indexAdmin'); // Halaman untuk mengedit/membuat
    Route::get('profile-village/edit', [ProfileVillageController::class, 'showOrCreate'])->name('profile-village.edit'); // Halaman untuk mengedit/membuat
    Route::post('profile-village', [ProfileVillageController::class, 'storeOrUpdate'])->name('profile-village.storeOrUpdate');
});