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
    protected $table = 'galerys';
    
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
        'albumId',          
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
        'createdAt' => 'datetime', // Laravel handle ini otomatis jika kolomnya 'createdAt'
        'updatedAt' => 'datetime', // Laravel handle ini otomatis jika kolomnya 'updatedAt'
        // Jika kolom di DB memang createdAt (camelCase), maka cast Anda sebelumnya sudah benar.
        // Migrasi Anda menggunakan $table->timestamps(); yang membuat createdAt dan updatedAt.
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
     * Get the album that owns the gallery item.
     */
    public function album()
    {
        // Pastikan Album model Anda menggunakan primary key yang sesuai dengan tipe albumId (string/uuid/ulid)
        return $this->belongsTo(Album::class, 'albumId'); 
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

    // Anda bisa menambahkan mutator untuk auto-generate slug jika title diisi/diubah
    // Namun, karena kita butuh slug yang unik (mungkin global atau per album),
    // penanganan di controller saat store/update lebih fleksibel untuk check keunikan.
    // public function setTitleAttribute($value)
    // {
    //     $this->attributes['title'] = $value;
    //     if (empty($this->attributes['slug']) || $value !== $this->getOriginal('title')) {
    //          // Logika dasar pembuatan slug, keunikan tetap perlu dicek di controller
    //         $this->attributes['slug'] = Str::slug($value);
    //     }
    // }
}