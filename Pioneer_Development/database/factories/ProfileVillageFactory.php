<?php

namespace Database\Factories;

use App\Models\ProfileVillage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProfileVillageFactory extends Factory
{
    protected $model = ProfileVillage::class;

    public function definition(): array
    {
        $user = User::inRandomOrder()->first() ?? User::factory()->create();

        return [
            'name' => 'Desa ' . $this->faker->city,
            'history' => $this->faker->paragraph(3),
            'vision' => $this->faker->sentence(),
            'mission' => $this->faker->paragraph(2),
            'logo' => 'images/logos/' . $this->faker->uuid . '.png',
            'address' => $this->faker->address,
            'postalCode' => $this->faker->postcode,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->safeEmail,
            'website' => $this->faker->url,
            'socialMedia' => json_encode([
                'facebook' => 'https://facebook.com/' . Str::slug($this->faker->company),
                'instagram' => 'https://instagram.com/' . Str::slug($this->faker->company),
            ]),
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
            'createdBy' => $user->id,
            'updatedBy' => $user->id,
        ];
    }
}
