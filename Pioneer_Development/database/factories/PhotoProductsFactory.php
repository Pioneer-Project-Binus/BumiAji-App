<?php

namespace Database\Factories;

use App\Models\PhotoProducts;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PhotoProductsFactory extends Factory
{
    protected $model = PhotoProducts::class;

    public function definition(): array
    {
        $user = User::inRandomOrder()->first() ?? User::factory()->create();
        $product = Product::inRandomOrder()->first() ?? Product::factory()->create();
        $title = $this->faker->sentence(3);

        return [
            'productId' => $product->id,
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::random(5), // Pastikan slug unik
            'filePath' => 'storage/products/' . $this->faker->uuid . '.jpg',
            'displayOrder' => $this->faker->numberBetween(1, 5),
            'createdBy' => $user->id,
            'updatedBy' => $user->id,
            'isDeleted' => false,
        ];
    }
}
