<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Notifications\Notifiable;

class Article extends Model
{
    use HasFactory, Notifiable, HasUlids;
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'articles'; // bisa jadi 'artikels' tergantung nama tabel di migrasi
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'slug',
        'content',
        'featuredImage',   
        'status',
        'categoryId',      
        'authorId',        
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
     * Get the category that owns the article.
     */
    public function category()
    {
        return $this->belongsTo(CategoryArticle::class, 'categoryId');
    }
    
    /**
     * Get the user that authored the article.
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'authorId');
    }
    
    /**
     * Get the user that last updated the article.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updatedBy');
    }

    /**
     * Get the user who created the article.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'createdBy');
    }
}
