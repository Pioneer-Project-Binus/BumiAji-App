<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids; // Primary key Anda adalah UUID di migrasi, ULID juga kompatibel.
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str; // Import Str untuk helper slug

class Galery extends Model
{
    use HasFactory, Notifiable, HasUlids; // Menggunakan HasUlids jika ID Anda adalah ULID
                                          // Jika ID adalah UUID biasa dari $table->uuid('id'), HasUlids tidak wajib tapi tidak masalah
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'galeries';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'slug', // Tambahkan slug di sini
        'description',
        'type',
        'filePath',         
        'thumbnail',
        'displayOrder',     
        'createdBy',        
        'updatedBy',        
        'isDeleted'         
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'displayOrder' => 'integer',
        'createdAt' => 'datetime', 
        'updatedAt' => 'datetime', 
        'isDeleted' => 'boolean',
    ];

    /**
     * Get the route key for the model.
     * Jika Anda ingin menggunakan slug untuk route model binding.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
    
    /**
     * Get the user that created the gallery item.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'createdBy'); 
    }
    
    /**
     * Get the user that last updated the gallery item.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updatedBy'); 
    }
}