<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Notifications\Notifiable;

class Tourism extends Model
{
    use HasFactory, Notifiable, HasUlids;
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tourisms';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'address',
        'ticketPrice',
        'contactInfo',
        'latitude',
        'longitude',
        'socialMedia',
        'status',
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
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'socialMedia' => 'json',
        'createdAt' => 'datetime',
        'updatedAt' => 'datetime',
        'isDeleted' => 'boolean',
    ];
    
    /**
     * Get the photos for the destination.
     */
    public function photos()
    {
        return $this->hasMany(PhotoTourism::class, 'destinationId');
    }
    
    /**
     * Get the user that created the destination.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'createdBy');
    }
    
    /**
     * Get the user that last updated the destination.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updatedBy');
    }
}
