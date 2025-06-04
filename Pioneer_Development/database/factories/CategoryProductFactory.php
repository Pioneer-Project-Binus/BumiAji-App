<?php

namespace Database\Factories;

use App\Models\CategoryProduct;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CategoryProduct>
 */
class CategoryProductFactory extends Factory
{
    protected $model = CategoryProduct::class;

    // Daftar nama kategori tetap
    protected static $staticNames = [
        'Makanan',
        'Minuman',
        'Snack',
        'Buah',
    ];

    public function definition(): array
    {
        static $index = 0;

        // Pastikan tidak melebihi jumlah nama tetap
        $name = static::$staticNames[$index % count(static::$staticNames)];
        $index++;

        $user = User::inRandomOrder()->first() ?? User::factory()->create();
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => "Kategori produk untuk {$name}",
            'createdBy' => $user->id,
            'updatedBy' => $user->id,
            'isDeleted' => false,
        ];
    }
}
