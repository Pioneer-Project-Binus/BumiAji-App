<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileVillage extends Model
{
    use HasFactory, Notifiable, HasUlids;

    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'profileVillage';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'history',
        'vision',
        'mission',
        'logo',
        'address',
        'postal_code',
        'phone',
        'email',
        'website',
        'social_media',
        'latitude',
        'longitude',
        'created_by',
        'updated_by'
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'createdAt' => 'datetime',
        'updatedAt' => 'datetime',
    ];
    
    /**
     * Get the user that created the profile.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    
    /**
     * Get the user that last updated the profile.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}