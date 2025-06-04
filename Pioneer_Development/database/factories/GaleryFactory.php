<?php

namespace Database\Factories;

use App\Models\Galery;
use App\Models\Album;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class GaleryFactory extends Factory
{
    protected $model = Galery::class;

    public function definition(): array
    {
        $title = $this->faker->sentence(3);
        $user = User::inRandomOrder()->first() ?? User::factory()->create();
        $album = Album::inRandomOrder()->first() ?? Album::factory()->create();

        return [
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'description' => $this->faker->paragraph(),
            'type' => $this->faker->randomElement(['photo', 'video']),
            'filePath' => 'uploads/galery/' . $this->faker->uuid . '.jpg',
            'thumbnail' => 'uploads/galery/thumbnails/' . $this->faker->uuid . '.jpg',
            'displayOrder' => $this->faker->numberBetween(1, 100),
            'albumId' => $album->id,
            'createdBy' => $user->id,
            'updatedBy' => $user->id,
            'isDeleted' => false,
        ];
    }
}
