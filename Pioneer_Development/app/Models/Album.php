<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Notifications\Notifiable;

class Album extends Model
{
    use HasFactory, Notifiable, HasUlids;
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'albums';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'coverImage',    
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
        'createdAt' => 'datetime',   
        'updatedAt' => 'datetime',   
        'isDeleted' => 'boolean',    
    ];
    
    /**
     * Get the gallery items for the album.
     */
    public function galeries()
    {
        return $this->hasMany(Galery::class, 'albumId');  
    }
    
    /**
     * Get the user that created the album.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'createdBy'); 
    }
    
    /**
     * Get the user that last updated the album.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updatedBy'); 
    }
}
