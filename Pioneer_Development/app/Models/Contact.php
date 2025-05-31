<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; // Sesuai migrasi Anda
use Illuminate\Notifications\Notifiable; // Jika digunakan
use Illuminate\Support\Str;

class Contact extends Model
{
    use HasFactory, HasUuids, Notifiable; // Tambahkan Notifiable jika Anda menggunakannya

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'slug', // Tambahkan slug
        'message',
        // 'sentAt' biasanya diisi otomatis oleh DB atau useCurrent()
        'isDeleted',
    ];

    /**
     * Indicates if the model should be timestamped.
     * Migrasi Anda tidak menggunakan $table->timestamps(); tetapi $table->timestamp('sentAt')->useCurrent();
     * Jadi, kita matikan timestamps default Laravel agar tidak mencari createdAt/updatedAt.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $casts = [
        'sentAt' => 'datetime',
        'isDeleted' => 'boolean',
    ];

    /**
     * Get the route key for the model.
     * Digunakan jika ingin route model binding bekerja dengan slug.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}