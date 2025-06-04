<?php

namespace Database\Factories;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ContactFactory extends Factory
{
    protected $model = Contact::class;

    public function definition(): array
    {
        $name = $this->faker->name;

        return [
            'name' => $name,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'subject' => $this->faker->sentence(4),
            'slug' => Str::slug($name . '-' . Str::random(5)),
            'message' => $this->faker->paragraph,
            'sentAt' => now(),
            'isDeleted' => false,
        ];
    }
}
