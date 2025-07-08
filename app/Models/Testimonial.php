<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; // Jika ID Anda UUID/ULID
                                                  // Sesuai migrasi testimonial Anda, ID adalah UUID
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class Testimonial extends Model
{
    use HasFactory, Notifiable, HasUuids; // Gunakan HasUuids karena migrasi memakai $table->uuid('id')

    protected $fillable = [
        'name',
        'slug', // Tambahkan slug
        'photo',
        'rating',
        'message',
        'createdBy', // Tidak ada updatedBy di migrasi awal
        'isDeleted',
    ];

    protected $casts = [
        'rating' => 'integer',
        'isDeleted' => 'boolean',
        // createdAt dan updatedAt dihandle otomatis oleh Laravel jika kolom ada (dari timestamps())
    ];

    // Relasi ke User (pembuat)
    public function creator()
    {
        return $this->belongsTo(User::class, 'createdBy');
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}