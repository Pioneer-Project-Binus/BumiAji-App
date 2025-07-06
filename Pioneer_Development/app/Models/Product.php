<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    use HasFactory, HasUlids, Notifiable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'productName',
        'slug',
        'description',
        'price',
        'stock',
        'status',
        'highlight',
        'categoryId',
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
        'price' => 'decimal:2',
        'stock' => 'integer',
        'highlight' => 'boolean',
        'isDeleted' => 'boolean',
    ];

    /**
     * Get the category that owns the product.
     */
    public function category()
    {
        return $this->belongsTo(CategoryProduct::class, 'categoryId');
    }

    /**
     * Get the photos for the product.
     */
    public function photos()
    {
        return $this->hasMany(PhotoProducts::class, 'productId');
    }

    /**
     * Get the user that created the product.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'createdBy');
    }

    /**
     * Get the user that last updated the product.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updatedBy');
    }
}
