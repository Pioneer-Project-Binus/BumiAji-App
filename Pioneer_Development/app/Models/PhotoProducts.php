<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; // Sesuai migrasi Anda yang menggunakan $table->uuid('id')
                                                   // atau HasUlids jika Anda menggantinya
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class PhotoProducts extends Model
{
    use HasFactory, Notifiable, HasUuids; // Gunakan HasUuids jika ID adalah UUID

    protected $table = 'photoProducts'; // Nama tabel sesuai migrasi
    public $timestamps = false;


    protected $fillable = [
        'productId',
        'title',      // Tambahkan title
        'slug',       // Tambahkan slug
        'filePath',
        'displayOrder',
        'createdBy',
        'updatedBy',
        'isDeleted',
    ];

    protected $casts = [
        'displayOrder' => 'integer',
        'isDeleted' => 'boolean',
    ];

    // Relasi ke Produk
    public function product()
    {
        return $this->belongsTo(Product::class, 'productId');
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