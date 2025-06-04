<?php

namespace Database\Factories;

use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TestimonialFactory extends Factory
{
    protected $model = Testimonial::class;

    public function definition(): array
    {
        $user = User::inRandomOrder()->first() ?? User::factory()->create();

        return [
            'name' => $this->faker->name,
            'slug' => Str::slug($this->faker->unique()->name . '-' . Str::random(5)),
            'photo' => 'images/testimonials/' . $this->faker->uuid . '.jpg',
            'rating' => $this->faker->numberBetween(1, 5),
            'message' => $this->faker->paragraph,
            'createdBy' => $user->id,
            'isDeleted' => false,
        ];
    }
}
