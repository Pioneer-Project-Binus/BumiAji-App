<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; // Sesuai migrasi Anda
use Illuminate\Notifications\Notifiable; // Jika diperlukan
use Illuminate\Support\Str;

class PhotoTourism extends Model
{
    use HasFactory, HasUuids, Notifiable; // Tambahkan Notifiable jika Anda menggunakannya

    protected $table = 'tourismPhotos'; // Nama tabel sesuai migrasi

    protected $fillable = [
        'destinationId',
        'title',          // Tambahkan title
        'slug',           // Tambahkan slug
        'filePath',
        'description',
        'createdBy',
        'updatedBy',
        'isDeleted',
    ];

    protected $casts = [
        'isDeleted' => 'boolean',
    ];

    // Relasi ke Destinasi Wisata (Tourism)
    public function destination()
    {
        return $this->belongsTo(Tourism::class, 'destinationId');
    }

    // Relasi ke User (pembuat)
    public function creator()
    {
        return $this->belongsTo(User::class, 'createdBy');
    }

    // Relasi ke User (pengupdate)
    public function updater()
    {
        return $this->belongsTo(User::class, 'updatedBy');
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}