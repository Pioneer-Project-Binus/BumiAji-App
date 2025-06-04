<?php

namespace Database\Factories;

use App\Models\PhotoTourism;
use App\Models\Tourism;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PhotoTourismFactory extends Factory
{
    protected $model = PhotoTourism::class;

    public function definition(): array
    {
        $title = $this->faker->words(3, true);
        $user = User::inRandomOrder()->first() ?? User::factory()->create();
        $tourism = Tourism::inRandomOrder()->first() ?? Tourism::factory()->create();

        return [
            'destinationId' => $tourism->id,
            'title' => ucfirst($title),
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'filePath' => 'images/tourism/' . $this->faker->uuid . '.jpg', // Simulasi path
            'description' => $this->faker->sentence(),
            'createdBy' => $user->id,
            'updatedBy' => $user->id,
            'isDeleted' => false,
        ];
    }
}
