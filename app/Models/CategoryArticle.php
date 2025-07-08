<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Notifications\Notifiable;

class CategoryArticle extends Model
{
    use HasFactory, Notifiable, HasUlids;
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'CategoryArticles';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
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
     * Get the articles that belong to this category.
     */
    public function articles()
    {
        return $this->hasMany(Article::class, 'categoryId'); 
    }
    
    /**
     * Get the user that created the category.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'createdBy'); 
    }
    
    /**
     * Get the user that last updated the category.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updatedBy'); 
    }
}