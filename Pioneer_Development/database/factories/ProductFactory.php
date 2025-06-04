<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use App\Models\CategoryProduct;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true);
        $user = User::inRandomOrder()->first() ?? User::factory()->create();
        $category = CategoryProduct::inRandomOrder()->first() ?? CategoryProduct::factory()->create();

        return [
            'productName' => ucfirst($name),
            'slug' => Str::slug($name) . '-' . Str::random(5),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 1000, 100000), // harga antara 1.000 - 100.000
            'stock' => $this->faker->numberBetween(10, 100),
            'status' => $this->faker->randomElement(['ready', 'outofstock']),
            'categoryId' => $category->id,
            'createdBy' => $user->id,
            'updatedBy' => $user->id,
            'isDeleted' => false,
        ];
    }
}
