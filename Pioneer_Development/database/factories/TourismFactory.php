<?php

namespace Database\Factories;

use App\Models\Tourism;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TourismFactory extends Factory
{
    protected $model = Tourism::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->company . ' Tourism Spot';
        $user = User::inRandomOrder()->first() ?? User::factory()->create();

        return [
            'name' => $name,
            'slug' => Str::slug($name) . '-' . Str::random(5),
            'description' => $this->faker->paragraph(),
            'address' => $this->faker->address(),
            'ticketPrice' => $this->faker->randomFloat(2, 0, 100), // Rp 0 - Rp 100
            'contactInfo' => $this->faker->phoneNumber(),
            'latitude' => $this->faker->latitude(-10, 10),
            'longitude' => $this->faker->longitude(95, 141), // Koordinat Indonesia
            'socialMedia' => [
                'instagram' => 'https://instagram.com/' . $this->faker->userName,
                'facebook' => 'https://facebook.com/' . $this->faker->userName,
                'tiktok' => 'https://tiktok.com/@' . $this->faker->userName,
            ],
            'status' => $this->faker->randomElement(['open', 'closed']),
            'createdBy' => $user->id,
            'updatedBy' => $user->id,
            'isDeleted' => false,
        ];
    }
}
